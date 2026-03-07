"use client";

// useRecommendations — fetches and refreshes AI-generated show recommendations.
// load() reads stored recs from the DB; refresh() triggers new AI generation via POST.

import { useState, useCallback } from "react";
import { toast } from "sonner";

export interface Recommendation {
  id: number;
  tmdb_id: number;
  title: string;
  type: "tv" | "movie";
  poster_url: string | null;
  reason: string;
}

export function useRecommendations() {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState(false);

  const load = useCallback(async () => {
    const res = await fetch("/api/recommendations");
    if (res.ok) setRecommendations(await res.json());
  }, []);

  const refresh = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/recommendations", { method: "POST" });
      if (res.ok) {
        setRecommendations(await res.json());
        toast.success("Recommendations updated!");
      } else {
        toast.error("Failed to refresh recommendations");
      }
    } finally {
      setLoading(false);
    }
  };

  return { recommendations, loading, load, refresh };
}
