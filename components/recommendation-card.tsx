"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Loader2 } from "lucide-react";
import { useState } from "react";

interface RecommendationCardProps {
  id: number;
  tmdb_id: number;
  title: string;
  type: "tv" | "movie";
  poster_url: string | null;
  reason: string;
  onAddToQueue: (tmdbId: number, title: string, type: "tv" | "movie", posterUrl: string | null) => Promise<void>;
}

export function RecommendationCard({
  tmdb_id,
  title,
  type,
  poster_url,
  reason,
  onAddToQueue,
}: RecommendationCardProps) {
  const [adding, setAdding] = useState(false);

  const handleAdd = async () => {
    setAdding(true);
    try {
      await onAddToQueue(tmdb_id, title, type, poster_url);
    } finally {
      setAdding(false);
    }
  };

  return (
    <div className="relative rounded-lg overflow-hidden bg-muted border flex-shrink-0 w-40">
      <div className="aspect-[2/3] relative">
        {poster_url ? (
          <Image
            src={poster_url}
            alt={title}
            fill
            className="object-cover"
            sizes="160px"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-muted p-2">
            <span className="text-xs text-center">{title}</span>
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 p-2 space-y-1">
          <p className="text-xs font-medium line-clamp-2 text-white">{title}</p>
          <Badge variant="outline" className="text-xs">
            {type === "tv" ? "TV" : "Movie"}
          </Badge>
          <p className="text-xs text-white/70 line-clamp-2">{reason}</p>
          <Button
            size="sm"
            className="w-full h-6 text-xs"
            onClick={handleAdd}
            disabled={adding}
          >
            {adding ? (
              <Loader2 className="w-3 h-3 animate-spin" />
            ) : (
              <>
                <Plus className="w-3 h-3 mr-1" />
                Add to Queue
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
