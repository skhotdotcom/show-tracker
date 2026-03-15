// app/api/shows/backfill/route.ts
// POST — fetches genres + TMDB rating for all shows that are missing them.
// Safe to call multiple times (skips shows that already have genres).

import { NextResponse } from "next/server";
import { getAllShows, updateShowMetadata } from "@/lib/db";
import { getShowDetails } from "@/lib/tmdb";

export async function POST() {
  const shows = getAllShows();
  const missing = shows.filter((s) => s.tmdb_id && s.genres == null);

  let updated = 0;
  let failed = 0;

  for (const show of missing) {
    try {
      const details = await getShowDetails(show.tmdb_id!, show.type);
      const genres = details.genres?.map((g: { id: number; name: string }) => g.name) ?? [];
      const tmdbRating = details.vote_average ?? null;
      updateShowMetadata(
        show.id,
        genres.length ? JSON.stringify(genres) : null,
        tmdbRating || null
      );
      updated++;
      // Polite rate limiting — TMDB allows ~50 req/s but we throttle to be safe
      await new Promise((r) => setTimeout(r, 100));
    } catch {
      failed++;
    }
  }

  return NextResponse.json({ updated, failed, skipped: shows.length - missing.length });
}
