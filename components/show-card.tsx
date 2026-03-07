"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Play, Check, Star, Trash2, CheckCircle2, Pencil } from "lucide-react";
import type { Show } from "@/types";
import type { NextEpisodeInfo } from "@/hooks/useUpcoming";

interface ShowCardProps {
  show: Show;
  nextEpisode?: NextEpisodeInfo;
  onStatusChange?: (id: number, status: string) => void;
  onDelete?: (id: number) => void;
  onMarkWatched?: (id: number, season: number, episode: number) => Promise<void>;
  onSetProgress?: (id: number, season: number, episode: number) => Promise<void>;
  compact?: boolean;
  gridMode?: boolean;
}

export function ShowCard({
  show,
  nextEpisode,
  onStatusChange,
  onDelete,
  onMarkWatched,
  onSetProgress,
  compact = false,
  gridMode = false,
}: ShowCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [marking, setMarking] = useState(false);
  const [editingProgress, setEditingProgress] = useState(false);
  const [editSeason, setEditSeason] = useState(nextEpisode?.season_number ?? 1);
  const [editEp, setEditEp] = useState(nextEpisode?.episode_number ?? 1);

  // Sync edit inputs when nextEpisode prop changes
  useEffect(() => {
    if (nextEpisode && !editingProgress) {
      setEditSeason(nextEpisode.season_number);
      setEditEp(nextEpisode.episode_number);
    }
  }, [nextEpisode, editingProgress]);

  const statusColors: Record<string, string> = {
    watching: "bg-green-600",
    queued: "bg-yellow-600",
    completed: "bg-blue-600",
    dropped: "bg-red-600",
  };

  const width = gridMode ? "w-full" : compact ? "w-48 md:w-56" : "w-64 md:w-80";
  const hasEpisode = show.type === "tv" && nextEpisode;

  const handleMarkWatched = async () => {
    if (!nextEpisode || !onMarkWatched) return;
    setMarking(true);
    try {
      await onMarkWatched(show.id, nextEpisode.season_number, nextEpisode.episode_number);
    } finally {
      setMarking(false);
    }
  };

  const handleSetProgress = async () => {
    if (!onSetProgress) return;
    await onSetProgress(show.id, editSeason, editEp);
    setEditingProgress(false);
  };

  return (
    <Card
      className={`relative ${width} aspect-video overflow-hidden rounded-md border-0 bg-card transition-transform duration-300 ${
        gridMode ? "" : "flex-shrink-0"
      } ${isHovered ? "scale-105 z-10" : "scale-100 z-0"}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setEditingProgress(false);
      }}
    >
      <div className="relative h-full w-full">
        {(hasEpisode && nextEpisode.still_url) || show.backdrop_url || show.poster_url ? (
          <Image
            src={(hasEpisode && nextEpisode.still_url) || show.backdrop_url || show.poster_url!}
            alt={show.title}
            fill
            className="object-cover object-center"
            sizes="(max-width: 768px) 128px, 224px"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-muted">
            <span className="text-center text-sm text-muted-foreground px-2">{show.title}</span>
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

        {/* Top-left: episode badge (for watching TV) or status badge */}
        <div className="absolute top-2 left-2">
          {hasEpisode ? (
            <Badge className="bg-black/80 text-white text-xs font-mono border-0 tracking-wide">
              S{String(nextEpisode.season_number).padStart(2, "0")}E{String(nextEpisode.episode_number).padStart(2, "0")}
            </Badge>
          ) : (
            <Badge className={`${statusColors[show.status]} text-xs`}>
              {show.type === "tv" ? "TV" : "Movie"}
            </Badge>
          )}
        </div>

        {show.rating && (
          <div className="absolute top-2 right-2 flex items-center gap-1 bg-black/70 rounded px-1.5 py-0.5">
            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
            <span className="text-xs font-medium">{show.rating}</span>
          </div>
        )}

        {/* Hover overlay */}
        <div
          className={`absolute bottom-0 left-0 right-0 p-2 transition-opacity duration-300 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        >
          <p className="text-sm font-medium line-clamp-1 mb-2">{show.title}</p>

          {/* Inline episode position editor */}
          {hasEpisode && editingProgress ? (
            <div className="flex items-center gap-1 mb-2">
              <span className="text-xs text-white/60">S</span>
              <input
                type="number"
                min={1}
                value={editSeason}
                onChange={(e) => setEditSeason(Math.max(1, parseInt(e.target.value) || 1))}
                onClick={(e) => e.stopPropagation()}
                className="w-10 text-xs bg-white/20 rounded px-1 py-0.5 text-white text-center"
              />
              <span className="text-xs text-white/60">E</span>
              <input
                type="number"
                min={1}
                value={editEp}
                onChange={(e) => setEditEp(Math.max(1, parseInt(e.target.value) || 1))}
                onClick={(e) => e.stopPropagation()}
                className="w-10 text-xs bg-white/20 rounded px-1 py-0.5 text-white text-center"
              />
              <Button
                size="sm"
                className="h-6 px-2 text-xs bg-primary hover:bg-primary/80"
                onClick={handleSetProgress}
              >
                ✓
              </Button>
              <Button
                size="sm"
                variant="ghost"
                className="h-6 px-1 hover:bg-white/20"
                onClick={() => setEditingProgress(false)}
              >
                ✗
              </Button>
            </div>
          ) : (
            <div className="flex gap-1 flex-wrap">
              {/* TV watching: Mark Watched + edit position */}
              {hasEpisode && onMarkWatched && (
                <Button
                  size="sm"
                  className="h-7 px-2 bg-green-600 hover:bg-green-700 text-xs"
                  onClick={handleMarkWatched}
                  disabled={marking}
                >
                  {marking ? (
                    <span className="text-xs">…</span>
                  ) : (
                    <>
                      <CheckCircle2 className="w-3 h-3 mr-1" />
                      Watched
                    </>
                  )}
                </Button>
              )}
              {hasEpisode && onSetProgress && (
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-7 w-7 p-0 hover:bg-white/20"
                  title="Set episode position"
                  onClick={() => {
                    setEditSeason(nextEpisode.season_number);
                    setEditEp(nextEpisode.episode_number);
                    setEditingProgress(true);
                  }}
                >
                  <Pencil className="w-3 h-3" />
                </Button>
              )}
              {/* Mark series complete */}
              {show.status === "watching" && onStatusChange && (
                <Button
                  size="sm"
                  className="h-7 px-2 bg-blue-600 hover:bg-blue-700 text-xs"
                  onClick={() => onStatusChange(show.id, "completed")}
                >
                  <Check className="w-3 h-3 mr-1" />
                  Done
                </Button>
              )}
              {/* Queued: start watching */}
              {show.status === "queued" && onStatusChange && (
                <Button
                  size="sm"
                  className="h-7 px-2 bg-primary hover:bg-primary/80 text-xs"
                  onClick={() => onStatusChange(show.id, "watching")}
                >
                  <Play className="w-3 h-3 mr-1" />
                  Watch
                </Button>
              )}
              {onDelete && (
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-7 px-2 hover:bg-red-600/20 hover:text-red-400"
                  onClick={() => onDelete(show.id)}
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              )}
            </div>
          )}
        </div>

        {!isHovered && (
          <div className="absolute bottom-0 left-0 right-0 p-2">
            <p className="text-sm font-medium line-clamp-1">{show.title}</p>
            {hasEpisode && (
              <p className="text-xs text-white/70 line-clamp-1 mt-0.5">
                S{String(nextEpisode.season_number).padStart(2, "0")}E{String(nextEpisode.episode_number).padStart(2, "0")}: {nextEpisode.name}
              </p>
            )}
          </div>
        )}
      </div>
    </Card>
  );
}
