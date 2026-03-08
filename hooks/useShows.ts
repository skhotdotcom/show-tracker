"use client";

// useShows — manages the full list of tracked shows.
// All mutations apply optimistic local state updates immediately,
// then revert (via refresh) and show a toast on server error.

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
    setShows((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: status as Show["status"] } : s))
    );
    const res = await fetch("/api/shows", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    if (res.ok) {
      toast.success(`Show moved to ${status}`);
    } else {
      await refresh();
      toast.error("Failed to update show");
    }
  };

  const remove = async (id: number) => {
    setShows((prev) => prev.filter((s) => s.id !== id));
    const res = await fetch(`/api/shows?id=${id}`, { method: "DELETE" });
    if (res.ok) {
      toast.success("Show removed");
    } else {
      await refresh();
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
    // Use a temporary negative ID so we can replace it once the server responds
    const tempId = -Date.now();
    const now = new Date().toISOString();
    const optimisticShow: Show = {
      id: tempId,
      tmdb_id: showData.tmdb_id,
      title: showData.title,
      type: showData.type,
      status: "queued",
      poster_url: showData.poster_url,
      backdrop_url: showData.backdrop_url ?? null,
      overview: showData.overview ?? null,
      release_date: showData.release_date ?? null,
      rating: null,
      notes: null,
      next_season: 1,
      next_episode: 1,
      created_at: now,
      updated_at: now,
    };
    setShows((prev) => [...prev, optimisticShow]);
    toast.success(`Added ${showData.title} to your queue`);

    const res = await fetch("/api/shows", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(showData),
    });
    if (res.ok) {
      const newShow = await res.json();
      setShows((prev) => prev.map((s) => (s.id === tempId ? newShow : s)));
    } else {
      setShows((prev) => prev.filter((s) => s.id !== tempId));
      toast.error("Failed to add show");
    }
  };

  // Record an episode as watched. Optimistically advances by one episode;
  // the server response corrects the final position (handles season boundaries).
  const markWatchedEpisode = async (showId: number, season: number, episode: number) => {
    setShows((prev) =>
      prev.map((s) =>
        s.id === showId ? { ...s, next_season: season, next_episode: episode + 1 } : s
      )
    );
    toast.success(`Marked S${String(season).padStart(2, "0")}E${String(episode).padStart(2, "0")} watched`);

    const res = await fetch("/api/shows", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: showId, markEpisodeWatched: true, season, episode }),
    });
    if (res.ok) {
      const updated = await res.json();
      // Replace the optimistic guess with the server-corrected progress
      setShows((prev) => prev.map((s) => (s.id === showId ? updated : s)));
    } else {
      await refresh();
      toast.error("Failed to mark episode watched");
    }
  };

  const setProgress = async (showId: number, nextSeason: number, nextEpisode: number) => {
    setShows((prev) =>
      prev.map((s) =>
        s.id === showId ? { ...s, next_season: nextSeason, next_episode: nextEpisode } : s
      )
    );
    const res = await fetch("/api/shows", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: showId, next_season: nextSeason, next_episode: nextEpisode }),
    });
    if (res.ok) {
      toast.success("Position updated");
    } else {
      await refresh();
      toast.error("Failed to update progress");
    }
  };

  const saveNotes = async (id: number, notes: string) => {
    setShows((prev) =>
      prev.map((s) => (s.id === id ? { ...s, notes } : s))
    );
    const res = await fetch("/api/shows", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, notes }),
    });
    if (res.ok) {
      toast.success("Notes saved");
    } else {
      await refresh();
      toast.error("Failed to save notes");
    }
  };

  const rate = async (id: number, rating: number) => {
    setShows((prev) =>
      prev.map((s) => (s.id === id ? { ...s, rating } : s))
    );
    toast.success("Rating saved");
    const res = await fetch("/api/shows", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, rating }),
    });
    if (!res.ok) {
      await refresh();
      toast.error("Failed to save rating");
    }
  };

  return { shows, refresh, updateStatus, remove, add, rate, saveNotes, markWatchedEpisode, setProgress };
}
