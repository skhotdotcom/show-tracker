// app/api/upcoming/route.ts — Fetches the next unwatched episode for every
// "watching" TV show and flags whether it has already aired (isAvailable).
// Null nextEpisode means the user is caught up or between seasons.

import { NextResponse } from "next/server";
import { getWatchingShows } from "@/lib/db";
import { getEpisodeDetails } from "@/lib/tmdb";
import type { Show } from "@/types";

export async function GET() {
  try {
    const watchingShows = getWatchingShows().filter(
      (s: Show) => s.tmdb_id && s.type === "tv"
    );

    const results = await Promise.all(
      watchingShows.map(async (show: Show) => {
        const season = show.next_season ?? 1;
        const episode = show.next_episode ?? 1;

        try {
          const ep = await getEpisodeDetails(show.tmdb_id!, season, episode);
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          // TMDB air dates are YYYY-MM-DD; parse as local midnight to avoid UTC offset issues
          const airDate = new Date(ep.air_date + "T00:00:00");
          const isAvailable = airDate <= today;

          return {
            show,
            nextEpisode: {
              season_number: ep.season_number,
              episode_number: ep.episode_number,
              name: ep.name,
              air_date: ep.air_date,
              isAvailable,
              still_url: ep.still_path
                ? `https://image.tmdb.org/t/p/w500${ep.still_path}`
                : null,
            },
          };
        } catch {
          // Episode not found in TMDB — caught up or between seasons
          return { show, nextEpisode: null };
        }
      })
    );

    return NextResponse.json(results);
  } catch (error) {
    console.error("Error fetching upcoming:", error);
    return NextResponse.json({ error: "Failed to fetch upcoming" }, { status: 500 });
  }
}
