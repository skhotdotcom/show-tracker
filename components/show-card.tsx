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
  onRate?: (id: number, rating: number) => void;
  onShowClick?: (show: Show) => void;
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
  onRate,
  onShowClick,
  compact = false,
  gridMode = false,
}: ShowCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [marking, setMarking] = useState(false);
  const [editingProgress, setEditingProgress] = useState(false);

  const effectiveSeason = nextEpisode?.season_number ?? show.next_season ?? 1;
  const effectiveEpisode = nextEpisode?.episode_number ?? show.next_episode ?? 1;

  const [editSeason, setEditSeason] = useState(effectiveSeason);
  const [editEp, setEditEp] = useState(effectiveEpisode);

  useEffect(() => {
    if (!editingProgress) {
      setEditSeason(effectiveSeason);
      setEditEp(effectiveEpisode);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nextEpisode, show.next_season, show.next_episode, editingProgress]);

  const statusColors: Record<string, string> = {
    watching: "bg-green-600",
    queued: "bg-yellow-600",
    completed: "bg-blue-600",
    dropped: "bg-red-600",
  };

  const width = gridMode ? "w-full" : compact ? "w-48 md:w-56" : "w-64 md:w-80";
  const hasEpisode =
    show.type === "tv" &&
    (nextEpisode != null ||
      (show.status === "watching" && (show.next_season != null || show.next_episode != null)));

  const handleMarkWatched = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!onMarkWatched) return;
    setMarking(true);
    try {
      await onMarkWatched(show.id, effectiveSeason, effectiveEpisode);
    } finally {
      setMarking(false);
    }
  };

  const handleSetProgress = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!onSetProgress) return;
    await onSetProgress(show.id, editSeason, editEp);
    setEditingProgress(false);
  };

  return (
    <Card
      className={`relative ${width} aspect-video overflow-hidden rounded-md border-0 bg-card transition-transform duration-300 ${
        gridMode ? "" : "flex-shrink-0"
      } ${isHovered ? "scale-105 z-10" : "scale-100 z-0"} ${onShowClick ? "cursor-pointer" : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setEditingProgress(false);
      }}
      onClick={() => onShowClick?.(show)}
    >
      <div className="relative h-full w-full">
        {nextEpisode?.still_url || show.backdrop_url || show.poster_url ? (
          <Image
            src={nextEpisode?.still_url || show.backdrop_url || show.poster_url!}
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

        {/* Top-left: episode badge or status/type badge */}
        <div className="absolute top-2 left-2">
          {hasEpisode ? (
            <Badge className="bg-black/80 text-white text-xs font-mono border-0 tracking-wide">
              S{String(effectiveSeason).padStart(2, "0")}E{String(effectiveEpisode).padStart(2, "0")}
            </Badge>
          ) : (
            <Badge className={`${statusColors[show.status]} text-xs`}>
              {show.type === "tv" ? "TV" : "Movie"}
            </Badge>
          )}
        </div>

        <div className="absolute top-2 right-2 flex flex-col items-end gap-1">
          {show.rating && (
            <div className="flex items-center gap-1 bg-black/70 rounded px-1.5 py-0.5">
              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
              <span className="text-xs font-medium">{show.rating}</span>
            </div>
          )}
          {show.tmdb_rating != null && (
            <div className="flex items-center gap-1 bg-black/50 rounded px-1.5 py-0.5" title="TMDB rating">
              <Star className="w-3 h-3 fill-blue-400 text-blue-400" />
              <span className="text-xs text-white/70">{show.tmdb_rating.toFixed(1)}</span>
            </div>
          )}
        </div>

        {/* Hover overlay — quick actions, all stopPropagation to preserve card click */}
        <div
          className={`absolute bottom-0 left-0 right-0 p-2 transition-opacity duration-300 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        >
          <p className="text-sm font-medium line-clamp-1 mb-1">{show.title}</p>

          {/* Genre chips */}
          {show.genres && (() => {
            try {
              const genres: string[] = JSON.parse(show.genres);
              return genres.length > 0 ? (
                <div className="flex flex-wrap gap-1 mb-1.5">
                  {genres.slice(0, 3).map((g) => (
                    <span
                      key={g}
                      className="text-[10px] bg-white/15 rounded-full px-1.5 py-0.5 text-white/80"
                    >
                      {g}
                    </span>
                  ))}
                </div>
              ) : null;
            } catch { return null; }
          })()}

          {/* Star rating */}
          {onRate && (
            <div className="flex items-center gap-0.5 mb-1.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-3 h-3 cursor-pointer transition-colors ${
                    star <= (show.rating || 0)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-white/50 hover:text-yellow-400"
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    onRate(show.id, star);
                  }}
                />
              ))}
            </div>
          )}

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
                onClick={(e) => { e.stopPropagation(); setEditingProgress(false); }}
              >
                ✗
              </Button>
            </div>
          ) : (
            <div className="flex gap-1 flex-wrap">
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
                  onClick={(e) => {
                    e.stopPropagation();
                    setEditSeason(effectiveSeason);
                    setEditEp(effectiveEpisode);
                    setEditingProgress(true);
                  }}
                >
                  <Pencil className="w-3 h-3" />
                </Button>
              )}
              {show.status === "watching" && onStatusChange && (
                <Button
                  size="sm"
                  className="h-7 px-2 bg-blue-600 hover:bg-blue-700 text-xs"
                  onClick={(e) => { e.stopPropagation(); onStatusChange(show.id, "completed"); }}
                >
                  <Check className="w-3 h-3 mr-1" />
                  Done
                </Button>
              )}
              {show.status === "queued" && onStatusChange && (
                <Button
                  size="sm"
                  className="h-7 px-2 bg-primary hover:bg-primary/80 text-xs"
                  onClick={(e) => { e.stopPropagation(); onStatusChange(show.id, "watching"); }}
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
                  onClick={(e) => { e.stopPropagation(); onDelete(show.id); }}
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
                S{String(effectiveSeason).padStart(2, "0")}E{String(effectiveEpisode).padStart(2, "0")}{nextEpisode?.name ? `: ${nextEpisode.name}` : ""}
              </p>
            )}
          </div>
        )}
      </div>
    </Card>
  );
}
