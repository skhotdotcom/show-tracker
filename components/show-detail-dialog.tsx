"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { format } from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Star, Save } from "lucide-react";
import type { Show } from "@/types";

interface ShowDetailDialogProps {
  show: Show | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onRate?: (id: number, rating: number) => void;
  onSaveNotes?: (id: number, notes: string) => void;
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
  open,
  onOpenChange,
  onRate,
  onSaveNotes,
}: ShowDetailDialogProps) {
  const [notes, setNotes] = useState("");
  const [notesDirty, setNotesDirty] = useState(false);

  useEffect(() => {
    if (show) {
      setNotes(show.notes ?? "");
      setNotesDirty(false);
    }
  }, [show]);

  if (!show) return null;

  const handleSaveNotes = () => {
    onSaveNotes?.(show.id, notes);
    setNotesDirty(false);
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

        <div className="p-4 space-y-4">
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
            {show.type === "tv" && show.next_season != null && (
              <Badge variant="secondary" className="font-mono text-xs">
                Up next: S{String(show.next_season).padStart(2, "0")}E{String(show.next_episode ?? 1).padStart(2, "0")}
              </Badge>
            )}
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

          {/* Overview */}
          {show.overview && (
            <p className="text-sm text-muted-foreground leading-relaxed line-clamp-4">
              {show.overview}
            </p>
          )}

          {/* Date added */}
          {show.created_at && (
            <p className="text-xs text-muted-foreground">
              Added {format(new Date(show.created_at), "MMM d, yyyy")}
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
        </div>
      </DialogContent>
    </Dialog>
  );
}
