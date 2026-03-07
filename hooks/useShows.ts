"use client";

// useShows — manages the full list of tracked shows.
// Wraps all /api/shows mutations with optimistic local state updates
// and user-facing toast notifications.

import { useState, useCallback } from "react";
import { toast } from "sonner";
import type { Show } from "@/types";

export function useShows() {
  const [shows, setShows] = useState<Show[]>([]);

  const refresh = useCallback(async () => {
    const res = await fetch("/api/shows");
    if (res.ok) setShows(await res.json());
  }, []);

  const updateStatus = async (id: number, status: string) => {
    const res = await fetch("/api/shows", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    if (res.ok) {
      setShows((prev) =>
        prev.map((s) => (s.id === id ? { ...s, status: status as Show["status"] } : s))
      );
      toast.success(`Show moved to ${status}`);
    } else {
      toast.error("Failed to update show");
    }
  };

  const remove = async (id: number) => {
    const res = await fetch(`/api/shows?id=${id}`, { method: "DELETE" });
    if (res.ok) {
      setShows((prev) => prev.filter((s) => s.id !== id));
      toast.success("Show removed");
    } else {
      toast.error("Failed to delete show");
    }
  };

  const add = async (showData: {
    tmdb_id: number;
    title: string;
    type: "tv" | "movie";
    poster_url: string | null;
    backdrop_url?: string | null;
    overview?: string;
    release_date?: string | null;
  }) => {
    const res = await fetch("/api/shows", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(showData),
    });
    if (res.ok) {
      const newShow = await res.json();
      setShows((prev) => [...prev, newShow]);
      toast.success(`Added ${showData.title} to your queue`);
    } else {
      toast.error("Failed to add show");
    }
  };

  // Record an episode as watched. The API auto-advances next_season/next_episode.
  const markWatchedEpisode = async (showId: number, season: number, episode: number) => {
    const res = await fetch("/api/shows", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: showId, markEpisodeWatched: true, season, episode }),
    });
    if (res.ok) {
      const updated = await res.json();
      setShows((prev) => prev.map((s) => (s.id === showId ? updated : s)));
      toast.success(`Marked S${String(season).padStart(2, "0")}E${String(episode).padStart(2, "0")} watched`);
    } else {
      toast.error("Failed to mark episode watched");
    }
  };

  const setProgress = async (showId: number, nextSeason: number, nextEpisode: number) => {
    const res = await fetch("/api/shows", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: showId, next_season: nextSeason, next_episode: nextEpisode }),
    });
    if (res.ok) {
      const updated = await res.json();
      setShows((prev) => prev.map((s) => (s.id === showId ? updated : s)));
    } else {
      toast.error("Failed to update progress");
    }
  };

  const rate = async (id: number, rating: number) => {
    const res = await fetch("/api/shows", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, rating }),
    });
    if (res.ok) {
      setShows((prev) =>
        prev.map((s) => (s.id === id ? { ...s, rating } : s))
      );
      toast.success("Rating saved");
    } else {
      toast.error("Failed to save rating");
    }
  };

  return { shows, refresh, updateStatus, remove, add, rate, markWatchedEpisode, setProgress };
}
