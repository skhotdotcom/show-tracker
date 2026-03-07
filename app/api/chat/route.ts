// app/api/chat/route.ts — Chat endpoint backed by a local LLM (LM Studio).
// GET  — returns the last 50 messages in chronological order.
// POST — saves the user message, runs AI response and show-extraction in parallel,
//        then creates/updates any shows mentioned in the message.

import { NextRequest, NextResponse } from "next/server";
import {
  addChatMessage,
  getChatHistory,
  getAllShows,
  getShowByTmdbId,
  createShow,
  updateShowStatus,
  addChatExtraction,
  getDb,
} from "@/lib/db";
import {
  generateChatResponse,
  extractShowsFromMessage,
} from "@/lib/ai";
import { searchMulti, getShowDetails, getPosterUrl, getBackdropUrl } from "@/lib/tmdb";
import type { Show } from "@/types";

function buildShowsContext(shows: Show[]): string {
  const watching = shows.filter((s) => s.status === "watching").map((s) => s.title);
  const queued = shows.filter((s) => s.status === "queued").map((s) => s.title);
  const completed = shows.filter((s) => s.status === "completed").map((s) => s.title);

  let context = "";
  if (watching.length > 0) {
    context += `Currently watching: ${watching.join(", ")}\n`;
  }
  if (queued.length > 0) {
    context += `In queue: ${queued.join(", ")}\n`;
  }
  if (completed.length > 0) {
    context += `Completed: ${completed.join(", ")}`;
  }
  return context || "No shows tracked yet.";
}

export async function GET() {
  try {
    const history = getChatHistory(50);
    return NextResponse.json(history.reverse());
  } catch (error) {
    console.error("Error fetching chat history:", error);
    return NextResponse.json({ error: "Failed to fetch chat history" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message } = body;

    if (!message) {
      return NextResponse.json({ error: "Message required" }, { status: 400 });
    }

    const shows = getAllShows() as Show[];
    const showsContext = buildShowsContext(shows);

    const history = getChatHistory(10);
    const chatHistory = history
      .reverse()
      .map((m: { role: string; content: string }) => ({ role: m.role as "user" | "assistant", content: m.content }));

    const userMessage = addChatMessage("user", message);

    const [aiResponse, extractions] = await Promise.all([
      generateChatResponse(message, showsContext, chatHistory),
      extractShowsFromMessage(message),
    ]);

    const assistantMessage = addChatMessage("assistant", aiResponse);

    const extractionResults: Array<{
      title: string;
      action: string;
      status: "found" | "created" | "not_found" | "error";
      error?: string;
    }> = [];

    for (const extracted of extractions.shows) {
      try {
        const searchResults = await searchMulti(extracted.title);
        const match = searchResults.find(
          (r: any) =>
            (r.title?.toLowerCase() === extracted.title.toLowerCase() ||
              r.name?.toLowerCase() === extracted.title.toLowerCase())
        );

        if (match) {
          const type = match.media_type || (match.title ? "movie" : "tv");
          const showDetails = await getShowDetails(match.id, type as "tv" | "movie");

          const existingShow = getShowByTmdbId(match.id);

          if (existingShow) {
            const newStatus =
              extracted.action === "mark_watching"
                ? "watching"
                : extracted.action === "mark_completed"
                  ? "completed"
                  : extracted.action === "mark_dropped"
                    ? "dropped"
                    : existingShow.status;
            
            updateShowStatus(existingShow.id, newStatus);
            addChatExtraction(assistantMessage.id, extracted.title, extracted.action, existingShow.id);
            extractionResults.push({
              title: extracted.title,
              action: extracted.action,
              status: "found",
            });
          } else {
            const newShow = createShow({
              tmdb_id: match.id,
              title: showDetails.title || showDetails.name || extracted.title,
              type: type as "tv" | "movie",
              poster_url: getPosterUrl(showDetails.poster_path),
              backdrop_url: getBackdropUrl(showDetails.backdrop_path),
              overview: showDetails.overview,
              release_date: showDetails.release_date || showDetails.first_air_date,
              status:
                extracted.action === "mark_watching"
                  ? "watching"
                  : extracted.action === "mark_completed"
                    ? "completed"
                    : "queued",
            });

            if (newShow) {
              addChatExtraction(assistantMessage.id, extracted.title, extracted.action, newShow.id);
              extractionResults.push({
                title: extracted.title,
                action: extracted.action,
                status: "created",
              });
            }
          }
        } else {
          addChatExtraction(assistantMessage.id, extracted.title, extracted.action);
          extractionResults.push({
            title: extracted.title,
            action: extracted.action,
            status: "not_found",
          });
        }
      } catch (error) {
        console.error(`Error processing extraction for ${extracted.title}:`, error);
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        extractionResults.push({
          title: extracted.title,
          action: extracted.action,
          status: "error",
          error: errorMessage,
        });
      }
    }

    const errors = extractionResults.filter(r => r.status === "error");
    if (errors.length > 0) {
      const errorText = errors.map(e => `Error looking up "${e.title}": ${e.error}`).join("\n");
      const updatedAiResponse = aiResponse + "\n\n" + errorText;
      
      getDb().prepare(`UPDATE chat_messages SET content = ? WHERE id = ?`).run(updatedAiResponse, assistantMessage.id);
      assistantMessage.content = updatedAiResponse;
    }

    return NextResponse.json({
      userMessage,
      assistantMessage,
      extractions: extractionResults,
    });
  } catch (error) {
    console.error("Chat error:", error);
    return NextResponse.json({ error: "Chat failed" }, { status: 500 });
  }
}