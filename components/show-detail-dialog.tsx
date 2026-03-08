"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { format } from "date-fns";
import { parseDbDate } from "@/lib/dates";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Star, Save, CheckCircle2, Play, Check, Trash2, Pencil, X } from "lucide-react";
import type { Show } from "@/types";
import type { NextEpisodeInfo } from "@/hooks/useUpcoming";

interface ShowDetailDialogProps {
  show: Show | null;
  nextEpisode?: NextEpisodeInfo | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onRate?: (id: number, rating: number) => void;
  onSaveNotes?: (id: number, notes: string) => void;
  onMarkWatched?: (id: number, season: number, episode: number) => Promise<void>;
  onSetProgress?: (id: number, season: number, episode: number) => Promise<void>;
  onStatusChange?: (id: number, status: string) => void;
  onDelete?: (id: number) => void;
}

const STATUS_LABELS: Record<string, string> = {
  watching: "Watching",
  queued: "In Queue",
  completed: "Completed",
  dropped: "Dropped",
};

const STATUS_COLORS: Record<string, string> = {
  watching: "bg-green-600",
  queued: "bg-yellow-600",
  completed: "bg-blue-600",
  dropped: "bg-red-600",
};

export function ShowDetailDialog({
  show,
  nextEpisode,
  open,
  onOpenChange,
  onRate,
  onSaveNotes,
  onMarkWatched,
  onSetProgress,
  onStatusChange,
  onDelete,
}: ShowDetailDialogProps) {
  const [notes, setNotes] = useState("");
  const [notesDirty, setNotesDirty] = useState(false);
  const [marking, setMarking] = useState(false);
  const [editingProgress, setEditingProgress] = useState(false);

  const effectiveSeason = nextEpisode?.season_number ?? show?.next_season ?? 1;
  const effectiveEpisode = nextEpisode?.episode_number ?? show?.next_episode ?? 1;

  const [editSeason, setEditSeason] = useState(effectiveSeason);
  const [editEp, setEditEp] = useState(effectiveEpisode);

  useEffect(() => {
    if (show) {
      setNotes(show.notes ?? "");
      setNotesDirty(false);
      setEditingProgress(false);
    }
  }, [show?.id]);

  useEffect(() => {
    if (!editingProgress) {
      setEditSeason(effectiveSeason);
      setEditEp(effectiveEpisode);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nextEpisode, show?.next_season, show?.next_episode, editingProgress]);

  if (!show) return null;

  const hasEpisode =
    show.type === "tv" &&
    (nextEpisode != null ||
      (show.status === "watching" && (show.next_season != null || show.next_episode != null)));

  const handleSaveNotes = () => {
    onSaveNotes?.(show.id, notes);
    setNotesDirty(false);
  };

  const handleMarkWatched = async () => {
    if (!onMarkWatched) return;
    setMarking(true);
    try {
      await onMarkWatched(show.id, effectiveSeason, effectiveEpisode);
    } finally {
      setMarking(false);
    }
  };

  const handleSetProgress = async () => {
    if (!onSetProgress) return;
    await onSetProgress(show.id, editSeason, editEp);
    setEditingProgress(false);
  };

  const handleDelete = () => {
    onDelete?.(show.id);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg p-0 overflow-hidden">
        {/* Backdrop / poster header */}
        {(show.backdrop_url || show.poster_url) && (
          <div className="relative w-full aspect-video">
            <Image
              src={show.backdrop_url || show.poster_url!}
              alt={show.title}
              fill
              className="object-cover object-center"
              sizes="512px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-3 left-4 right-4">
              <DialogHeader>
                <DialogTitle className="text-white text-lg font-bold leading-tight line-clamp-2">
                  {show.title}
                </DialogTitle>
              </DialogHeader>
            </div>
          </div>
        )}

        <div className="p-4 space-y-4 max-h-[60vh] overflow-y-auto">
          {/* Title when no image */}
          {!show.backdrop_url && !show.poster_url && (
            <DialogHeader>
              <DialogTitle>{show.title}</DialogTitle>
            </DialogHeader>
          )}

          {/* Badges row */}
          <div className="flex items-center gap-2 flex-wrap">
            <Badge className={`${STATUS_COLORS[show.status]} text-white`}>
              {STATUS_LABELS[show.status]}
            </Badge>
            <Badge variant="outline">{show.type === "tv" ? "TV" : "Movie"}</Badge>
          </div>

          {/* Star rating */}
          {onRate && (
            <div className="flex items-center gap-1">
              <span className="text-sm text-muted-foreground mr-1">Rating</span>
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-5 h-5 cursor-pointer transition-colors ${
                    star <= (show.rating || 0)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-muted-foreground hover:text-yellow-400"
                  }`}
                  onClick={() => onRate(show.id, star)}
                />
              ))}
              {show.rating && (
                <span className="text-sm text-muted-foreground ml-1">{show.rating}/5</span>
              )}
            </div>
          )}

          {/* Episode actions */}
          {hasEpisode && (onMarkWatched || onSetProgress) && (
            <div className="space-y-2 border rounded-lg p-3 bg-muted/30">
              <p className="text-sm font-medium">
                Up next: S{String(effectiveSeason).padStart(2, "0")}E{String(effectiveEpisode).padStart(2, "0")}
                {nextEpisode?.name ? ` — ${nextEpisode.name}` : ""}
              </p>
              {editingProgress ? (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">S</span>
                  <input
                    type="number"
                    min={1}
                    value={editSeason}
                    onChange={(e) => setEditSeason(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-14 text-sm bg-background border rounded px-2 py-1 text-center"
                  />
                  <span className="text-sm text-muted-foreground">E</span>
                  <input
                    type="number"
                    min={1}
                    value={editEp}
                    onChange={(e) => setEditEp(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-14 text-sm bg-background border rounded px-2 py-1 text-center"
                  />
                  <Button size="sm" className="h-7 px-3" onClick={handleSetProgress}>
                    Save
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-7 w-7 p-0"
                    onClick={() => setEditingProgress(false)}
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </div>
              ) : (
                <div className="flex gap-2 flex-wrap">
                  {onMarkWatched && (
                    <Button
                      size="sm"
                      className="bg-green-600 hover:bg-green-700"
                      onClick={handleMarkWatched}
                      disabled={marking}
                    >
                      <CheckCircle2 className="w-3 h-3 mr-1.5" />
                      {marking ? "Marking…" : "Mark Watched"}
                    </Button>
                  )}
                  {onSetProgress && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setEditSeason(effectiveSeason);
                        setEditEp(effectiveEpisode);
                        setEditingProgress(true);
                      }}
                    >
                      <Pencil className="w-3 h-3 mr-1.5" />
                      Set Position
                    </Button>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Status actions */}
          {onStatusChange && (
            <div className="flex gap-2 flex-wrap">
              {show.status === "queued" && (
                <Button
                  size="sm"
                  className="bg-primary hover:bg-primary/80"
                  onClick={() => onStatusChange(show.id, "watching")}
                >
                  <Play className="w-3 h-3 mr-1.5" />
                  Start Watching
                </Button>
              )}
              {show.status === "watching" && (
                <Button
                  size="sm"
                  className="bg-blue-600 hover:bg-blue-700"
                  onClick={() => onStatusChange(show.id, "completed")}
                >
                  <Check className="w-3 h-3 mr-1.5" />
                  Mark Complete
                </Button>
              )}
              {(show.status === "watching" || show.status === "queued") && (
                <Button
                  size="sm"
                  variant="outline"
                  className="hover:text-red-400 hover:border-red-400"
                  onClick={() => onStatusChange(show.id, "dropped")}
                >
                  Drop
                </Button>
              )}
            </div>
          )}

          {/* Overview */}
          {show.overview && (
            <p className="text-sm text-muted-foreground leading-relaxed line-clamp-4">
              {show.overview}
            </p>
          )}

          {/* Date added */}
          {show.created_at && (
            <p className="text-xs text-muted-foreground">
              Added {format(parseDbDate(show.created_at), "MMM d, yyyy")}
            </p>
          )}

          {/* Notes */}
          {onSaveNotes && (
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Notes</label>
              <Textarea
                value={notes}
                onChange={(e) => {
                  setNotes(e.target.value);
                  setNotesDirty(true);
                }}
                placeholder="Add personal notes..."
                className="text-sm resize-none"
                rows={3}
              />
              {notesDirty && (
                <Button size="sm" className="gap-1.5" onClick={handleSaveNotes}>
                  <Save className="w-3 h-3" />
                  Save Notes
                </Button>
              )}
            </div>
          )}

          {/* Delete */}
          {onDelete && (
            <div className="pt-2 border-t">
              <Button
                size="sm"
                variant="ghost"
                className="text-muted-foreground hover:text-red-400 hover:bg-red-400/10"
                onClick={handleDelete}
              >
                <Trash2 className="w-3 h-3 mr-1.5" />
                Remove from Tracker
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
