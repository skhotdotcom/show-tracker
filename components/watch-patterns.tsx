"use client";

// WatchPatterns — shows per-genre stats (count, completion rate, avg rating).
// Includes a backfill trigger for existing shows that lack genre data.

import { useEffect, useState, useCallback } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RefreshCw, Star, TrendingUp } from "lucide-react";
import { toast } from "sonner";

interface GenrePattern {
  genre: string;
  count: number;
  completed: number;
  dropped: number;
  avgUserRating: number | null;
  avgTmdbRating: number | null;
  completionRate: number | null;
}

interface WatchPatternsProps {
  /** Called after backfill completes so the parent can refresh shows */
  onBackfillComplete?: () => void;
  /** Genre selected for filtering — highlights the active chip */
  activeGenre?: string | null;
  onGenreClick?: (genre: string | null) => void;
}

export function WatchPatterns({ onBackfillComplete, activeGenre, onGenreClick }: WatchPatternsProps) {
  const [patterns, setPatterns] = useState<GenrePattern[]>([]);
  const [loading, setLoading] = useState(false);
  const [backfilling, setBackfilling] = useState(false);
  const [hasGenreData, setHasGenreData] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/watch-patterns");
      if (res.ok) {
        const data = await res.json();
        setPatterns(data);
        setHasGenreData(data.length > 0);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const handleBackfill = async () => {
    setBackfilling(true);
    try {
      const res = await fetch("/api/shows/backfill", { method: "POST" });
      if (res.ok) {
        const result = await res.json();
        toast.success(`Updated ${result.updated} shows with genre data`);
        await load();
        onBackfillComplete?.();
      }
    } catch {
      toast.error("Failed to fetch genre data");
    } finally {
      setBackfilling(false);
    }
  };

  const top = patterns.slice(0, 12);

  if (loading && patterns.length === 0) return null;

  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-muted-foreground" />
          <h2 className="text-xl font-semibold">Watch Patterns</h2>
        </div>
        {!hasGenreData && (
          <Button
            variant="outline"
            size="sm"
            onClick={handleBackfill}
            disabled={backfilling}
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${backfilling ? "animate-spin" : ""}`} />
            {backfilling ? "Fetching genres…" : "Load genre data"}
          </Button>
        )}
      </div>

      {top.length === 0 ? (
        <p className="text-muted-foreground text-sm">
          Add shows and load genre data to see your watch patterns.
        </p>
      ) : (
        <div className="space-y-2">
          {/* Genre chips — clickable to filter */}
          <div className="flex flex-wrap gap-2">
            {activeGenre && (
              <Badge
                variant="outline"
                className="cursor-pointer border-dashed text-muted-foreground hover:bg-muted"
                onClick={() => onGenreClick?.(null)}
              >
                × Clear filter
              </Badge>
            )}
            {top.map((p) => (
              <button
                key={p.genre}
                onClick={() => onGenreClick?.(activeGenre === p.genre ? null : p.genre)}
                className="group flex items-center gap-1.5 rounded-full border px-3 py-1 text-sm transition-colors
                  hover:bg-primary hover:text-primary-foreground hover:border-primary
                  data-[active=true]:bg-primary data-[active=true]:text-primary-foreground data-[active=true]:border-primary"
                data-active={activeGenre === p.genre}
              >
                <span className="font-medium">{p.genre}</span>
                <span className="text-xs opacity-60">{p.count}</span>
                {p.avgUserRating != null && (
                  <span className="flex items-center gap-0.5 text-xs opacity-70">
                    <Star className="w-2.5 h-2.5 fill-current" />
                    {p.avgUserRating.toFixed(1)}
                  </span>
                )}
                {p.completionRate != null && (
                  <span
                    className="text-xs opacity-60"
                    title={`${Math.round(p.completionRate * 100)}% completion rate`}
                  >
                    {Math.round(p.completionRate * 100)}%✓
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
