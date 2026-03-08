"use client";

import { useState } from "react";
import { format } from "date-fns";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trash2, Star, RotateCcw } from "lucide-react";
import type { Show } from "@/types";

interface HistoryListProps {
  shows: Show[];
  onDelete?: (id: number) => void;
  onRate?: (id: number, rating: number) => void;
  onRequeue?: (id: number) => void;
  onShowClick?: (show: Show) => void;
}

export function HistoryList({ shows, onDelete, onRate, onRequeue, onShowClick }: HistoryListProps) {
  const [filter, setFilter] = useState<"all" | "completed" | "dropped">("all");

  const filteredShows = shows.filter((show) => {
    if (filter === "all") return true;
    return show.status === filter;
  });

  return (
    <div className="bg-card rounded-lg border p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">Watch History</h3>
        <div className="flex gap-2">
          {(["all", "completed", "dropped"] as const).map((f) => (
            <Button
              key={f}
              variant={filter === f ? "default" : "ghost"}
              size="sm"
              onClick={() => setFilter(f)}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </Button>
          ))}
        </div>
      </div>

      {filteredShows.length === 0 ? (
        <p className="text-muted-foreground text-center py-8">
          No shows in history yet
        </p>
      ) : (
        <div className="space-y-3">
          {filteredShows.map((show) => (
            <div
              key={show.id}
              className={`flex gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors ${onShowClick ? "cursor-pointer" : ""}`}
              onClick={() => onShowClick?.(show)}
            >
              <div className="w-16 h-24 relative rounded overflow-hidden flex-shrink-0">
                {show.poster_url ? (
                  <Image
                    src={show.poster_url}
                    alt={show.title}
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                ) : (
                  <div className="w-full h-full bg-muted flex items-center justify-center">
                    <span className="text-xs text-center p-1">{show.title}</span>
                  </div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <p className="font-medium line-clamp-1">{show.title}</p>
                <div className="flex items-center gap-2 mt-1">
                  <Badge
                    variant={show.status === "completed" ? "default" : "destructive"}
                  >
                    {show.status}
                  </Badge>
                  <Badge variant="outline">{show.type}</Badge>
                </div>
                <div className="flex items-center gap-1 mt-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-3 h-3 cursor-pointer transition-colors ${
                        star <= (show.rating || 0)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-muted-foreground hover:text-yellow-400"
                      }`}
                      onClick={(e) => { e.stopPropagation(); onRate?.(show.id, star); }}
                    />
                  ))}
                </div>
                {show.updated_at && (
                  <p className="text-xs text-muted-foreground mt-1">
                    {format(new Date(show.updated_at), "MMM d, yyyy")}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-1">
                {show.status === "dropped" && onRequeue && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="hover:text-primary"
                    title="Re-add to queue"
                    onClick={(e) => { e.stopPropagation(); onRequeue(show.id); }}
                  >
                    <RotateCcw className="w-4 h-4" />
                  </Button>
                )}
                {onDelete && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="hover:text-red-400"
                    onClick={(e) => { e.stopPropagation(); onDelete(show.id); }}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}