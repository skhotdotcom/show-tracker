// app/api/recommendations/route.ts — AI-powered recommendation engine.
// GET  — returns stored recommendations from the DB.
// POST — generates fresh recommendations from the local LLM, resolves each title
//        against TMDB for poster/metadata, then persists them (replaces prior set).

import { NextResponse } from "next/server";
import {
  getRecommendations,
  clearRecommendations,
  addRecommendation,
  getAllShows,
} from "@/lib/db";
import { generateRecommendations } from "@/lib/ai";
import { getShowDetails, getPosterUrl, searchMulti } from "@/lib/tmdb";
import type { Show } from "@/types";

export async function GET() {
  try {
    const recommendations = getRecommendations();
    return NextResponse.json(recommendations);
  } catch (error) {
    console.error("Error fetching recommendations:", error);
    return NextResponse.json({ error: "Failed to fetch recommendations" }, { status: 500 });
  }
}

export async function POST() {
  try {
    const shows = getAllShows() as Show[];

    const watchingShows = shows
      .filter((s) => s.status === "watching")
      .map((s) => s.title);

    const completedShows = shows
      .filter((s) => s.status === "completed")
      .map((s) => s.title);

    if (watchingShows.length === 0 && completedShows.length === 0) {
      return NextResponse.json({
        message: "Watch some shows first to get recommendations!",
        recommendations: [],
      });
    }

    const aiRecommendations = await generateRecommendations(
      watchingShows,
      completedShows,
      10
    );

    clearRecommendations();

    for (const rec of aiRecommendations) {
      try {
        const searchResults = await searchMulti(rec.title);
        const match = searchResults.find(
          (r: any) =>
            r.title?.toLowerCase() === rec.title.toLowerCase() ||
            r.name?.toLowerCase() === rec.title.toLowerCase() ||
            r.media_type === rec.type
        );

        if (match) {
          const details = await getShowDetails(match.id, rec.type);
          addRecommendation(
            match.id,
            details.title || details.name || rec.title,
            rec.type,
            getPosterUrl(details.poster_path),
            rec.reason
          );
        } else {
          addRecommendation(
            0,
            rec.title,
            rec.type,
            null,
            rec.reason
          );
        }
      } catch (error) {
        console.error(`Error adding recommendation ${rec.title}:`, error);
      }
    }

    const recommendations = getRecommendations();
    return NextResponse.json(recommendations);
  } catch (error) {
    console.error("Error generating recommendations:", error);
    return NextResponse.json({ error: "Failed to generate recommendations" }, { status: 500 });
  }
}