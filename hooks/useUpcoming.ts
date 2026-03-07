"use client";

// useUpcoming — fetches next-episode data for all "watching" TV shows.
// Splits results into availableNow (air date passed) and comingSoon (future).

import { useState, useCallback } from "react";
import type { Show } from "@/types";

export interface NextEpisodeInfo {
  season_number: number;
  episode_number: number;
  name: string;
  air_date: string;
  isAvailable: boolean;
  still_url: string | null;
}

export interface UpcomingItem {
  show: Show;
  nextEpisode: NextEpisodeInfo | null;
}

export function useUpcoming() {
  const [items, setItems] = useState<UpcomingItem[]>([]);

  const load = useCallback(async () => {
    const res = await fetch("/api/upcoming");
    if (res.ok) setItems(await res.json());
  }, []);

  const availableNow = items.filter((i) => i.nextEpisode?.isAvailable);
  const comingSoon = items.filter((i) => i.nextEpisode && !i.nextEpisode.isAvailable);

  return { items, availableNow, comingSoon, load };
}
