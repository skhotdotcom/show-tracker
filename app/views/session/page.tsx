"use client";

import { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import {
  differenceInDays,
  format,
  parseISO,
  isSameDay,
  startOfDay,
} from "date-fns";
import { parseDbDate } from "@/lib/dates";
import { Sparkles, Play, Plus, Tv, Clock, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ViewSwitcher } from "@/components/view-switcher";
import { AddShowDialog } from "@/components/add-show-dialog";
import { ShowDetailDialog } from "@/components/show-detail-dialog";
import { useShows } from "@/hooks/useShows";
import { useUpcoming } from "@/hooks/useUpcoming";
import type { NextEpisodeInfo } from "@/hooks/useUpcoming";
import type { Show } from "@/types";

// ─── Session suggestion algorithm ─────────────────────────────────────────

interface SessionCandidate {
  show: Show;
  reason: string;
  episodeInfo?: NextEpisodeInfo | null;
  priority: number;
}

function buildSession(
  allShows: Show[],
  episodeInfoMap: Record<number, NextEpisodeInfo>,
  comingSoon: { show: Show; nextEpisode: NextEpisodeInfo | null }[]
): SessionCandidate[] {
  const now = new Date();
  const candidates: SessionCandidate[] = [];
  const usedIds = new Set<number>();

  // 1. Watching shows with a new episode airing within 2 days — catch up before it drops
  for (const item of comingSoon) {
    if (!item.nextEpisode || item.show.status !== "watching") continue;
    const daysUntil = differenceInDays(parseISO(item.nextEpisode.air_date), startOfDay(now));
    if (daysUntil <= 2) {
      const when = daysUntil === 0 ? "today" : daysUntil === 1 ? "tomorrow" : `in ${daysUntil} days`;
      candidates.push({
        show: item.show,
        reason: `New episode airs ${when} — good time to catch up`,
        priority: 100,
        episodeInfo: episodeInfoMap[item.show.id],
      });
      usedIds.add(item.show.id);
    }
  }

  // 2. Most recently watched (momentum — keep the streak going)
  const recentlyActive = allShows
    .filter((s) => s.status === "watching" && !usedIds.has(s.id) && s.updated_at)
    .map((s) => ({ show: s, days: differenceInDays(startOfDay(now), startOfDay(parseDbDate(s.updated_at!))) }))
    .filter(({ days }) => days <= 3)
    .sort((a, b) => a.days - b.days);

  for (const { show, days } of recentlyActive.slice(0, 1)) {
    const when = days === 0 ? "today" : days === 1 ? "yesterday" : `${days} days ago`;
    candidates.push({
      show,
      reason: `Watched ${when} — keep the momentum going`,
      priority: 85 - days * 3,
      episodeInfo: episodeInfoMap[show.id],
    });
    usedIds.add(show.id);
  }

  // 3. Shows gone idle 5–14 days — a gentle nudge
  if (candidates.length < 3) {
    const idle = allShows
      .filter((s) => s.status === "watching" && !usedIds.has(s.id) && s.updated_at)
      .map((s) => ({ show: s, days: differenceInDays(startOfDay(now), startOfDay(parseDbDate(s.updated_at!))) }))
      .filter(({ days }) => days >= 5 && days <= 14)
      .sort((a, b) => a.days - b.days);

    if (idle.length > 0) {
      const { show, days } = idle[0];
      candidates.push({
        show,
        reason: `You haven't watched this in ${days} days`,
        priority: 65,
        episodeInfo: episodeInfoMap[show.id],
      });
      usedIds.add(show.id);
    }
  }

  // 4. Fill remaining slot with a queued show
  if (candidates.length < 3) {
    const queued = allShows.filter((s) => s.status === "queued" && !usedIds.has(s.id));
    if (queued.length > 0) {
      candidates.push({
        show: queued[0],
        reason: "Ready to start whenever you are",
        priority: 40,
      });
    }
  }

  return candidates.sort((a, b) => b.priority - a.priority).slice(0, 3);
}

// ─── Session hero card ────────────────────────────────────────────────────

function SessionCard({
  candidates,
  onShowClick,
  onMarkWatched,
  onStatusChange,
}: {
  candidates: SessionCandidate[];
  onShowClick: (show: Show) => void;
  onMarkWatched: (id: number, season: number, episode: number) => Promise<void>;
  onStatusChange: (id: number, status: string) => void;
}) {
  if (candidates.length === 0) {
    return (
      <div className="rounded-xl border border-dashed p-8 text-center text-muted-foreground">
        <p className="font-medium mb-1">Your slate is clear</p>
        <p className="text-sm">Add some shows to get a session suggestion</p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border bg-card overflow-hidden">
      {/* Card header */}
      <div className="px-5 py-4 border-b flex items-center gap-2 bg-muted/30">
        <Sparkles className="w-4 h-4 text-primary" />
        <span className="font-semibold text-sm">Suggested for tonight</span>
      </div>

      {/* Show list */}
      <div className="divide-y">
        {candidates.map((candidate, idx) => {
          const { show, reason, episodeInfo } = candidate;
          const isMovie = show.type === "movie";
          const season = episodeInfo?.season_number ?? show.next_season ?? 1;
          const episode = episodeInfo?.episode_number ?? show.next_episode ?? 1;

          return (
            <div
              key={show.id}
              className="flex items-start gap-4 px-5 py-4 hover:bg-muted/30 transition-colors cursor-pointer group"
              onClick={() => onShowClick(show)}
            >
              {/* Number */}
              <span className="text-2xl font-bold text-muted-foreground/40 w-6 flex-shrink-0 mt-0.5 select-none">
                {idx + 1}
              </span>

              {/* Poster */}
              <div className="w-12 h-16 relative rounded-md overflow-hidden flex-shrink-0">
                {show.poster_url ? (
                  <Image src={show.poster_url} alt={show.title} fill className="object-cover" sizes="48px" />
                ) : (
                  <div className="w-full h-full bg-muted flex items-center justify-center">
                    <Tv className="w-4 h-4 text-muted-foreground" />
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="font-semibold line-clamp-1">{show.title}</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {isMovie
                    ? "Movie"
                    : `S${String(season).padStart(2, "0")}E${String(episode).padStart(2, "0")}${episodeInfo?.name ? ` — ${episodeInfo.name}` : ""}`}
                </p>
                <p className="text-xs text-primary/80 mt-1.5 italic">{reason}</p>
              </div>

              {/* Quick action — visible always, not just hover */}
              <div
                className="flex-shrink-0 flex flex-col items-end gap-1"
                onClick={(e) => e.stopPropagation()}
              >
                {show.status === "queued" ? (
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-7 text-xs gap-1"
                    onClick={() => onStatusChange(show.id, "watching")}
                  >
                    <Play className="w-3 h-3" />
                    Start
                  </Button>
                ) : isMovie ? (
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-7 text-xs gap-1"
                    onClick={() => onStatusChange(show.id, "completed")}
                  >
                    <CheckCircle2 className="w-3 h-3" />
                    Done
                  </Button>
                ) : (
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-7 text-xs gap-1"
                    onClick={async () => {
                      await onMarkWatched(show.id, season, episode);
                    }}
                  >
                    <CheckCircle2 className="w-3 h-3" />
                    Watched
                  </Button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Available grid ────────────────────────────────────────────────────────

function AvailableGrid({
  shows,
  sessionIds,
  episodeInfoMap,
  onShowClick,
}: {
  shows: Show[];
  sessionIds: Set<number>;
  episodeInfoMap: Record<number, NextEpisodeInfo>;
  onShowClick: (show: Show) => void;
}) {
  if (shows.length === 0) return null;

  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
      {shows.map((show) => {
        const inSession = sessionIds.has(show.id);
        const info = episodeInfoMap[show.id];
        const isQueued = show.status === "queued";
        const season = info?.season_number ?? show.next_season ?? 1;
        const episode = info?.episode_number ?? show.next_episode ?? 1;

        return (
          <div
            key={show.id}
            className={`relative cursor-pointer group rounded-lg overflow-hidden ${
              inSession ? "ring-2 ring-primary ring-offset-2 ring-offset-background" : ""
            }`}
            onClick={() => onShowClick(show)}
          >
            {/* Poster */}
            <div className="aspect-[2/3] relative bg-muted">
              {show.poster_url ? (
                <Image
                  src={show.poster_url}
                  alt={show.title}
                  fill
                  className="object-cover transition-transform duration-200 group-hover:scale-105"
                  sizes="160px"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center p-2">
                  <span className="text-xs text-muted-foreground text-center line-clamp-3">{show.title}</span>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>

            {/* Title + episode below */}
            <div className="py-1.5 px-1">
              <p className="text-xs font-medium line-clamp-1">{show.title}</p>
              <p className="text-xs text-muted-foreground">
                {isQueued
                  ? "Queued"
                  : show.type === "movie"
                  ? "Movie"
                  : `S${String(season).padStart(2, "0")}E${String(episode).padStart(2, "0")}`}
              </p>
            </div>

            {inSession && (
              <div className="absolute top-1.5 right-1.5">
                <span className="text-xs bg-primary text-primary-foreground px-1.5 py-0.5 rounded-full font-medium">
                  Tonight
                </span>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── Past activity ────────────────────────────────────────────────────────

interface PastEntry {
  date: Date;
  show: Show;
  type: "watching" | "completed" | "dropped" | "queued";
  detail: string;
}

function PastActivity({
  entries,
  onShowClick,
}: {
  entries: PastEntry[];
  onShowClick: (show: Show) => void;
}) {
  const today = startOfDay(new Date());

  const grouped = useMemo(() => {
    const map = new Map<string, PastEntry[]>();
    for (const e of entries) {
      const key = format(e.date, "yyyy-MM-dd");
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(e);
    }
    return Array.from(map.entries()).sort(([a], [b]) => b.localeCompare(a));
  }, [entries]);

  const STATUS_DOT: Record<string, string> = {
    watching: "bg-green-500",
    completed: "bg-blue-500",
    dropped: "bg-red-500",
    queued: "bg-yellow-500",
  };

  return (
    <div className="space-y-6">
      {grouped.map(([dateKey, dayEntries]) => {
        const date = parseISO(dateKey);
        const isToday = isSameDay(date, today);
        const dayLabel = isToday ? "Today" : format(date, "EEEE, MMM d, yyyy");

        return (
          <div key={dateKey}>
            <div className="flex items-center gap-3 mb-2">
              <p className="text-sm font-semibold text-muted-foreground">{dayLabel}</p>
              <div className="flex-1 h-px bg-border" />
              <span className="text-xs text-muted-foreground">
                {dayEntries.length} {dayEntries.length === 1 ? "show" : "shows"}
              </span>
            </div>
            <div className="space-y-1">
              {dayEntries.map((entry) => (
                <div
                  key={entry.show.id}
                  className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-muted/40 transition-colors cursor-pointer"
                  onClick={() => onShowClick(entry.show)}
                >
                  <span className={`w-2 h-2 rounded-full flex-shrink-0 ${STATUS_DOT[entry.type]}`} />
                  <div className="w-8 h-11 relative rounded overflow-hidden flex-shrink-0">
                    {entry.show.poster_url ? (
                      <Image src={entry.show.poster_url} alt={entry.show.title} fill className="object-cover" sizes="32px" />
                    ) : (
                      <div className="w-full h-full bg-muted" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium line-clamp-1">{entry.show.title}</p>
                    <p className="text-xs text-muted-foreground">{entry.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────

export default function SessionView() {
  const shows = useShows();
  const upcoming = useUpcoming();
  const [addOpen, setAddOpen] = useState(false);
  const [detailShowId, setDetailShowId] = useState<number | null>(null);

  useEffect(() => {
    shows.refresh();
    upcoming.load();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const detailShow = detailShowId != null
    ? (shows.shows.find((s) => s.id === detailShowId) ?? null)
    : null;

  const episodeInfoMap = useMemo(() => {
    const map: Record<number, NextEpisodeInfo> = {};
    for (const item of upcoming.availableNow) {
      if (item.nextEpisode) map[item.show.id] = item.nextEpisode;
    }
    return map;
  }, [upcoming.availableNow]);

  const detailNextEpisode = detailShowId != null ? (episodeInfoMap[detailShowId] ?? null) : null;

  // Session suggestion
  const sessionCandidates = useMemo(
    () => buildSession(shows.shows, episodeInfoMap, upcoming.comingSoon),
    [shows.shows, episodeInfoMap, upcoming.comingSoon]
  );
  const sessionIds = useMemo(
    () => new Set(sessionCandidates.map((c) => c.show.id)),
    [sessionCandidates]
  );

  // Available: all actionable shows (watching + queued), sorted by recency
  const availableShows = useMemo(() => {
    const comingSoonIds = new Set(upcoming.comingSoon.map((i) => i.show.id));
    return shows.shows
      .filter((s) => (s.status === "watching" || s.status === "queued") && !comingSoonIds.has(s.id))
      .sort((a, b) => {
        const da = a.updated_at ? parseDbDate(a.updated_at).getTime() : 0;
        const db = b.updated_at ? parseDbDate(b.updated_at).getTime() : 0;
        return db - da;
      });
  }, [shows.shows, upcoming.comingSoon]);

  // Past activity journal
  const pastEntries = useMemo((): PastEntry[] => {
    const entries: PastEntry[] = [];
    for (const show of shows.shows) {
      const date = show.updated_at ? parseDbDate(show.updated_at) : parseDbDate(show.created_at);
      if (show.status === "watching") {
        const s = show.next_season ?? 1;
        const e = show.next_episode ?? 1;
        entries.push({
          date, show, type: "watching",
          detail: e > 1 ? `Up next S${String(s).padStart(2,"0")}E${String(e).padStart(2,"0")}` : "Just started",
        });
      } else if (show.status === "completed") {
        entries.push({ date, show, type: "completed", detail: show.rating ? `Rated ${show.rating}/5` : "Finished" });
      } else if (show.status === "dropped") {
        entries.push({
          date, show, type: "dropped",
          detail: `Stopped at S${String(show.next_season ?? 1).padStart(2,"0")}E${String(show.next_episode ?? 1).padStart(2,"0")}`,
        });
      } else if (show.status === "queued") {
        entries.push({ date: parseDbDate(show.created_at), show, type: "queued", detail: "Added to queue" });
      }
    }
    return entries.sort((a, b) => b.date.getTime() - a.date.getTime());
  }, [shows.shows]);

  const handleMarkWatched = async (id: number, season: number, episode: number) => {
    await shows.markWatchedEpisode(id, season, episode);
    await upcoming.load();
  };
  const handleSetProgress = async (id: number, season: number, episode: number) => {
    await shows.setProgress(id, season, episode);
    await upcoming.load();
  };
  const handleStatusChange = (id: number, status: string) => shows.updateStatus(id, status);
  const handleDelete = (id: number) => shows.remove(id);

  const timeGreeting = () => {
    const h = new Date().getHours();
    if (h < 12) return "this morning";
    if (h < 17) return "this afternoon";
    return "tonight";
  };

  return (
    <div className="min-h-screen bg-background text-foreground pb-10">
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b">
        <div className="max-w-3xl mx-auto flex items-center justify-between px-4 py-3 gap-4">
          <div className="flex items-center gap-2">
            <Tv className="w-5 h-5 text-primary" />
            <span className="font-bold text-lg">Show Tracker</span>
          </div>
          <ViewSwitcher />
          <Button size="sm" onClick={() => setAddOpen(true)}>
            <Plus className="w-4 h-4 mr-1.5" />
            Add Show
          </Button>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8 space-y-12">

        {/* ── TONIGHT ─────────────────────────────────────────────── */}
        <section>
          <div className="flex items-baseline gap-2 mb-4">
            <h2 className="text-xl font-bold capitalize">Watch {timeGreeting()}</h2>
            <span className="text-sm text-muted-foreground">
              {sessionCandidates.length} suggested
            </span>
          </div>
          <SessionCard
            candidates={sessionCandidates}
            onShowClick={(s) => setDetailShowId(s.id)}
            onMarkWatched={handleMarkWatched}
            onStatusChange={handleStatusChange}
          />
        </section>

        {/* ── AVAILABLE ───────────────────────────────────────────── */}
        {availableShows.length > 0 && (
          <section>
            <div className="flex items-baseline gap-2 mb-4">
              <h2 className="text-xl font-bold">Available</h2>
              <span className="text-sm text-muted-foreground">
                {availableShows.filter((s) => s.status === "watching").length} watching
                {" · "}
                {availableShows.filter((s) => s.status === "queued").length} queued
              </span>
            </div>
            <AvailableGrid
              shows={availableShows}
              sessionIds={sessionIds}
              episodeInfoMap={episodeInfoMap}
              onShowClick={(s) => setDetailShowId(s.id)}
            />
          </section>
        )}

        {/* ── PAST ACTIVITY ───────────────────────────────────────── */}
        {pastEntries.length > 0 && (
          <section>
            <div className="flex items-baseline gap-2 mb-4">
              <h2 className="text-xl font-bold">History</h2>
            </div>
            <PastActivity
              entries={pastEntries}
              onShowClick={(s) => setDetailShowId(s.id)}
            />
          </section>
        )}
      </main>

      <AddShowDialog open={addOpen} onOpenChange={setAddOpen} onAddShow={shows.add} />

      <ShowDetailDialog
        show={detailShow}
        nextEpisode={detailNextEpisode}
        open={detailShowId !== null}
        onOpenChange={(open) => { if (!open) setDetailShowId(null); }}
        onRate={shows.rate}
        onSaveNotes={shows.saveNotes}
        onMarkWatched={handleMarkWatched}
        onSetProgress={handleSetProgress}
        onStatusChange={handleStatusChange}
        onDelete={handleDelete}
      />
    </div>
  );
}
