// app/api/shows/route.ts — REST endpoint for show CRUD.
// GET    ?status=<status>  — list shows (all or filtered by status)
// POST                     — create a new show (defaults to "queued")
// PATCH                    — update status, rating, or episode progress
// DELETE ?id=<id>          — remove a show and its episode history

import { NextRequest, NextResponse } from "next/server";
import {
  getAllShows,
  getShowsByStatus,
  getShowById,
  createShow,
  updateShowStatus,
  updateShowRating,
  updateShowNotes,
  updateShowProgress,
  markEpisodeWatched as recordEpisodeWatched,
  deleteShow,
} from "@/lib/db";
import { getShowDetails, getPosterUrl, getBackdropUrl, getSeasonEpisodeCount } from "@/lib/tmdb";
import { updateShowMetadata } from "@/lib/db";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const status = searchParams.get("status");

  try {
    const shows = status ? getShowsByStatus(status) : getAllShows();
    return NextResponse.json(shows);
  } catch (error) {
    console.error("Error fetching shows:", error);
    return NextResponse.json({ error: "Failed to fetch shows" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { tmdb_id, title, type, status, poster_url, backdrop_url, overview, release_date } = body;

    const show = createShow({
      tmdb_id,
      title,
      type,
      status: status || "queued",
      poster_url,
      backdrop_url,
      overview,
      release_date,
    });

    // Enrich with genres + TMDB rating in the background (don't block the response)
    if (show && tmdb_id) {
      getShowDetails(tmdb_id, type).then((details) => {
        const genres = details.genres?.map((g: { id: number; name: string }) => g.name) ?? [];
        const tmdbRating = details.vote_average ?? null;
        updateShowMetadata(show.id, genres.length ? JSON.stringify(genres) : null, tmdbRating || null);
      }).catch(() => {/* non-fatal */});
    }

    return NextResponse.json(show);
  } catch (error) {
    console.error("Error creating show:", error);
    return NextResponse.json({ error: "Failed to create show" }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, status, rating, notes, next_season, next_episode, markEpisodeWatched, season, episode } = body;

    // Mark a specific episode watched and auto-advance to next
    if (markEpisodeWatched && season !== undefined && episode !== undefined) {
      const show = getShowById(id);
      recordEpisodeWatched(id, season, episode);

      if (show?.tmdb_id) {
        try {
          const count = await getSeasonEpisodeCount(show.tmdb_id, season);
          if (episode >= count) {
            updateShowProgress(id, season + 1, 1);
          } else {
            updateShowProgress(id, season, episode + 1);
          }
        } catch {
          // Fallback: just increment episode
          updateShowProgress(id, season, episode + 1);
        }
      }

      return NextResponse.json(getShowById(id));
    }

    // Manually set episode position
    if (next_season !== undefined && next_episode !== undefined) {
      return NextResponse.json(updateShowProgress(id, next_season, next_episode));
    }

    let show;
    if (status !== undefined) {
      show = updateShowStatus(id, status);
    } else if (rating !== undefined) {
      show = updateShowRating(id, rating);
    } else if (notes !== undefined) {
      show = updateShowNotes(id, notes);
    } else {
      return NextResponse.json({ error: "No update provided" }, { status: 400 });
    }

    return NextResponse.json(show);
  } catch (error) {
    console.error("Error updating show:", error);
    return NextResponse.json({ error: "Failed to update show" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID required" }, { status: 400 });
    }

    deleteShow(parseInt(id));
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting show:", error);
    return NextResponse.json({ error: "Failed to delete show" }, { status: 500 });
  }
}