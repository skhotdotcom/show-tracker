"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import Image from "next/image";
import {
  differenceInDays,
  format,
  parseISO,
  isAfter,
  isBefore,
  addDays,
  startOfDay,
  isSameDay,
} from "date-fns";
import { parseDbDate } from "@/lib/dates";
import { CheckCircle2, Calendar, Play, Plus, Tv } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ViewSwitcher } from "@/components/view-switcher";
import { AddShowDialog } from "@/components/add-show-dialog";
import { ShowDetailDialog } from "@/components/show-detail-dialog";
import { useShows } from "@/hooks/useShows";
import { useUpcoming } from "@/hooks/useUpcoming";
import type { NextEpisodeInfo, UpcomingItem } from "@/hooks/useUpcoming";
import type { Show } from "@/types";

// ─── Urgency ──────────────────────────────────────────────────────────────

interface Urgency {
  label: string;
  dotColor: string;
  badgeClass: string;
  priority: number;
}

function getUrgency(show: Show): Urgency {
  if (!show.updated_at) {
    return { label: "New", dotColor: "bg-blue-500", badgeClass: "bg-blue-600 text-white", priority: 50 };
  }
  const days = differenceInDays(startOfDay(new Date()), startOfDay(parseDbDate(show.updated_at)));
  if (days === 0) return { label: "On a roll", dotColor: "bg-green-500", badgeClass: "bg-green-600 text-white", priority: 100 };
  if (days === 1) return { label: "On a roll", dotColor: "bg-green-500", badgeClass: "bg-green-600 text-white", priority: 95 };
  if (days <= 3) return { label: "Continue", dotColor: "bg-emerald-500", badgeClass: "bg-emerald-700 text-white", priority: 80 };
  if (days <= 7) return { label: "Pick back up", dotColor: "bg-amber-500", badgeClass: "bg-amber-600 text-white", priority: 60 };
  return { label: "Dive back in", dotColor: "bg-blue-500", badgeClass: "bg-blue-700 text-white", priority: 40 - Math.min(days - 7, 35) };
}

// ─── Now Card ─────────────────────────────────────────────────────────────

function NowCard({
  show,
  episodeInfo,
  onShowClick,
  onMarkWatched,
  onStatusChange,
}: {
  show: Show;
  episodeInfo?: NextEpisodeInfo | null;
  onShowClick: (show: Show) => void;
  onMarkWatched: (id: number, season: number, episode: number) => Promise<void>;
  onStatusChange: (id: number, status: string) => void;
}) {
  const [marking, setMarking] = useState(false);
  const urgency = getUrgency(show);
  const isMovie = show.type === "movie";
  const season = episodeInfo?.season_number ?? show.next_season ?? 1;
  const episode = episodeInfo?.episode_number ?? show.next_episode ?? 1;
  const episodeName = episodeInfo?.name;

  const handleAction = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isMovie) {
      onStatusChange(show.id, "completed");
    } else {
      setMarking(true);
      try { await onMarkWatched(show.id, season, episode); }
      finally { setMarking(false); }
    }
  };

  return (
    <div
      className="relative flex-shrink-0 w-60 md:w-72 rounded-xl overflow-hidden cursor-pointer group"
      style={{ height: "172px" }}
      onClick={() => onShowClick(show)}
    >
      {/* Backdrop */}
      {show.backdrop_url || show.poster_url ? (
        <Image
          src={show.backdrop_url || show.poster_url!}
          alt={show.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="288px"
        />
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-muted to-muted/50" />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

      {/* Top badges */}
      <div className="absolute top-2 left-2 right-2 flex justify-between items-start">
        {!isMovie && (
          <span className="text-xs bg-black/60 text-white px-1.5 py-0.5 rounded font-mono">
            S{String(season).padStart(2, "0")}E{String(episode).padStart(2, "0")}
          </span>
        )}
        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ml-auto ${urgency.badgeClass}`}>
          {urgency.label}
        </span>
      </div>

      {/* Bottom content — always visible */}
      <div className="absolute bottom-0 left-0 right-0 p-3 space-y-1.5">
        <div>
          <p className="text-white font-semibold text-sm leading-tight line-clamp-1">{show.title}</p>
          {episodeName && (
            <p className="text-white/60 text-xs line-clamp-1 mt-0.5">{episodeName}</p>
          )}
        </div>
        <button
          className="w-full h-7 text-xs rounded-md border border-white/20 text-white flex items-center justify-center gap-1.5 bg-white/10 hover:bg-green-600 transition-colors"
          onClick={handleAction}
          disabled={marking}
        >
          <CheckCircle2 className="w-3 h-3" />
          {marking ? "Marking…" : isMovie ? "Mark Complete" : "Mark Watched"}
        </button>
      </div>
    </div>
  );
}

// ─── This Week ────────────────────────────────────────────────────────────

interface WeekItem {
  date: Date;
  type: "airing" | "ready";
  show: Show;
  episodeInfo?: NextEpisodeInfo | null;
}

function ThisWeekSection({
  items,
  onShowClick,
  onStatusChange,
}: {
  items: WeekItem[];
  onShowClick: (show: Show) => void;
  onStatusChange: (id: number, status: string) => void;
}) {
  const today = startOfDay(new Date());

  // Group by day key
  const grouped = useMemo(() => {
    const map = new Map<string, WeekItem[]>();
    for (const item of items) {
      const key = format(item.date, "yyyy-MM-dd");
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(item);
    }
    return Array.from(map.entries()).sort(([a], [b]) => a.localeCompare(b));
  }, [items]);

  if (grouped.length === 0) return null;

  return (
    <div className="space-y-5">
      {grouped.map(([dateKey, dayItems]) => {
        const date = parseISO(dateKey);
        const isToday = isSameDay(date, today);
        const isTomorrow = isSameDay(date, addDays(today, 1));
        const dayLabel = isToday
          ? "Today"
          : isTomorrow
          ? "Tomorrow"
          : format(date, "EEEE, MMM d");

        return (
          <div key={dateKey}>
            <div className="flex items-center gap-3 mb-2">
              <p className="text-sm font-semibold">{dayLabel}</p>
              <div className="flex-1 h-px bg-border" />
            </div>
            <div className="space-y-1.5">
              {dayItems.map((item) => (
                <div
                  key={item.show.id}
                  className="flex items-center gap-3 p-3 rounded-lg bg-card border hover:bg-muted/40 transition-colors cursor-pointer"
                  onClick={() => onShowClick(item.show)}
                >
                  <div className="w-9 h-12 relative rounded overflow-hidden flex-shrink-0">
                    {item.show.poster_url ? (
                      <Image src={item.show.poster_url} alt={item.show.title} fill className="object-cover" sizes="36px" />
                    ) : (
                      <div className="w-full h-full bg-muted" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium line-clamp-1">{item.show.title}</p>
                    {item.episodeInfo && (
                      <p className="text-xs text-muted-foreground line-clamp-1">
                        S{String(item.episodeInfo.season_number).padStart(2, "0")}
                        E{String(item.episodeInfo.episode_number).padStart(2, "0")}
                        {" — "}{item.episodeInfo.name}
                      </p>
                    )}
                  </div>
                  <div className="flex-shrink-0">
                    {item.type === "airing" ? (
                      <Badge variant="outline" className="text-xs gap-1">
                        <Calendar className="w-3 h-3" />
                        {isToday ? "Today" : isTomorrow ? "Tomorrow" : format(item.date, "EEE")}
                      </Badge>
                    ) : (
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-7 text-xs gap-1"
                        onClick={(e) => { e.stopPropagation(); onStatusChange(item.show.id, "watching"); }}
                      >
                        <Play className="w-3 h-3" />
                        Start
                      </Button>
                    )}
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

// ─── Activity Journal ─────────────────────────────────────────────────────

interface JournalEntry {
  date: Date;
  show: Show;
  type: "watching" | "completed" | "dropped" | "queued";
  detail: string;
}

const ACTIVITY_STYLES: Record<string, { bar: string; badge: string; label: string }> = {
  watching:  { bar: "bg-green-500",  badge: "bg-green-600 text-white",  label: "Watching" },
  completed: { bar: "bg-blue-500",   badge: "bg-blue-600 text-white",   label: "Completed" },
  dropped:   { bar: "bg-red-500",    badge: "bg-red-600 text-white",    label: "Dropped" },
  queued:    { bar: "bg-yellow-500", badge: "bg-yellow-600 text-white", label: "Queued" },
};

function ActivityJournal({
  entries,
  onShowClick,
}: {
  entries: JournalEntry[];
  onShowClick: (show: Show) => void;
}) {
  const today = startOfDay(new Date());

  const grouped = useMemo(() => {
    const map = new Map<string, JournalEntry[]>();
    for (const e of entries) {
      const key = format(e.date, "yyyy-MM-dd");
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(e);
    }
    return Array.from(map.entries()).sort(([a], [b]) => b.localeCompare(a));
  }, [entries]);

  return (
    <div className="space-y-6">
      {grouped.map(([dateKey, dayEntries]) => {
        const date = parseISO(dateKey);
        const isToday = isSameDay(date, today);
        const dayLabel = isToday ? "Today" : format(date, "EEEE, MMM d, yyyy");

        return (
          <div key={dateKey}>
            <div className="flex items-center gap-3 mb-2">
              <p className="text-sm font-semibold">{dayLabel}</p>
              <div className="flex-1 h-px bg-border" />
            </div>
            <div className="space-y-1">
              {dayEntries.map((entry) => {
                const style = ACTIVITY_STYLES[entry.type];
                return (
                  <div
                    key={entry.show.id}
                    className="flex items-center gap-3 px-2 py-2.5 rounded-lg hover:bg-muted/40 transition-colors cursor-pointer"
                    onClick={() => onShowClick(entry.show)}
                  >
                    <div className={`w-1 h-12 rounded-full flex-shrink-0 ${style.bar}`} />
                    <div className="w-9 h-12 relative rounded overflow-hidden flex-shrink-0">
                      {entry.show.poster_url ? (
                        <Image src={entry.show.poster_url} alt={entry.show.title} fill className="object-cover" sizes="36px" />
                      ) : (
                        <div className="w-full h-full bg-muted" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium line-clamp-1">{entry.show.title}</p>
                      <p className="text-xs text-muted-foreground">{entry.detail}</p>
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded-full flex-shrink-0 ${style.badge}`}>
                      {style.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────

export default function TemporalView() {
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

  // Episode info map from availableNow
  const episodeInfoMap = useMemo(() => {
    const map: Record<number, NextEpisodeInfo> = {};
    for (const item of upcoming.availableNow) {
      if (item.nextEpisode) map[item.show.id] = item.nextEpisode;
    }
    return map;
  }, [upcoming.availableNow]);

  const detailNextEpisode = detailShowId != null ? (episodeInfoMap[detailShowId] ?? null) : null;

  // Scroll preservation for the Now carousel — mirrors the CarouselRow pattern
  const nowScrollRef = useRef<HTMLDivElement>(null);
  const nowScrollPositionRef = useRef(0);

  // NOW zone: watching shows (excluding comingSoon), sorted by urgency
  const comingSoonIds = useMemo(
    () => new Set(upcoming.comingSoon.map((i) => i.show.id)),
    [upcoming.comingSoon]
  );

  const activeShows = useMemo(() => {
    return shows.shows
      .filter((s) => s.status === "watching" && !comingSoonIds.has(s.id))
      .sort((a, b) => getUrgency(b).priority - getUrgency(a).priority);
  }, [shows.shows, comingSoonIds]);

  useEffect(() => {
    const el = nowScrollRef.current;
    if (!el) return;
    el.scrollLeft = nowScrollPositionRef.current;
    const save = () => { nowScrollPositionRef.current = el.scrollLeft; };
    el.addEventListener("scroll", save);
    return () => el.removeEventListener("scroll", save);
  }, [activeShows]);

  // THIS WEEK: queued shows (ready today) + comingSoon items airing in next 7 days
  const thisWeekItems = useMemo((): WeekItem[] => {
    const today = startOfDay(new Date());
    const weekEnd = addDays(today, 7);
    const items: WeekItem[] = [];

    for (const show of shows.shows.filter((s) => s.status === "queued")) {
      items.push({ date: today, type: "ready", show });
    }

    for (const item of upcoming.comingSoon) {
      if (!item.nextEpisode) continue;
      const airDate = parseISO(item.nextEpisode.air_date);
      if (isAfter(airDate, new Date()) && isBefore(startOfDay(airDate), weekEnd)) {
        items.push({
          date: startOfDay(airDate),
          type: "airing",
          show: item.show,
          episodeInfo: item.nextEpisode,
        });
      }
    }

    return items.sort((a, b) => a.date.getTime() - b.date.getTime());
  }, [shows.shows, upcoming.comingSoon]);

  // PAST: activity journal derived from show state
  const journalEntries = useMemo((): JournalEntry[] => {
    const entries: JournalEntry[] = [];

    for (const show of shows.shows) {
      const date = show.updated_at
        ? parseDbDate(show.updated_at)
        : parseDbDate(show.created_at);

      if (show.status === "watching") {
        const s = show.next_season ?? 1;
        const e = show.next_episode ?? 1;
        const detail =
          e > 1
            ? `Up next S${String(s).padStart(2, "0")}E${String(e).padStart(2, "0")}`
            : "Just started";
        entries.push({ date, show, type: "watching", detail });
      } else if (show.status === "completed") {
        entries.push({
          date,
          show,
          type: "completed",
          detail: show.rating ? `Rated ${show.rating}/5` : "Finished",
        });
      } else if (show.status === "dropped") {
        const s = String(show.next_season ?? 1).padStart(2, "0");
        const e = String(show.next_episode ?? 1).padStart(2, "0");
        entries.push({
          date,
          show,
          type: "dropped",
          detail: `Stopped at S${s}E${e}`,
        });
      } else if (show.status === "queued") {
        entries.push({
          date: parseDbDate(show.created_at),
          show,
          type: "queued",
          detail: `${show.type === "tv" ? "TV series" : "Movie"} · Added to queue`,
        });
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

  return (
    <div className="min-h-screen bg-background text-foreground pb-10">
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b">
        <div className="max-w-4xl mx-auto flex items-center justify-between px-4 py-3 gap-4">
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

      <main className="max-w-4xl mx-auto px-4 py-8 space-y-12">

        {/* ── NOW ────────────────────────────────────────────────── */}
        <section>
          <div className="flex items-baseline gap-2 mb-4">
            <h2 className="text-xl font-bold">Now</h2>
            <span className="text-sm text-muted-foreground">
              {activeShows.length} in progress
            </span>
          </div>
          {activeShows.length === 0 ? (
            <p className="text-muted-foreground text-sm py-4">
              Nothing to continue. Start something from your queue below.
            </p>
          ) : (
            <div ref={nowScrollRef} className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 snap-x">
              {activeShows.map((show) => (
                <div key={show.id} className="snap-start">
                  <NowCard
                    show={show}
                    episodeInfo={episodeInfoMap[show.id]}
                    onShowClick={(s) => setDetailShowId(s.id)}
                    onMarkWatched={handleMarkWatched}
                    onStatusChange={handleStatusChange}
                  />
                </div>
              ))}
            </div>
          )}
        </section>

        {/* ── THIS WEEK ───────────────────────────────────────────── */}
        {thisWeekItems.length > 0 && (
          <section>
            <div className="flex items-baseline gap-2 mb-4">
              <h2 className="text-xl font-bold">This Week</h2>
              <span className="text-sm text-muted-foreground">
                {upcoming.comingSoon.filter((i) => {
                  if (!i.nextEpisode) return false;
                  const d = parseISO(i.nextEpisode.air_date);
                  return isAfter(d, new Date()) && isBefore(d, addDays(new Date(), 7));
                }).length} airing
                {shows.shows.filter((s) => s.status === "queued").length > 0 &&
                  ` · ${shows.shows.filter((s) => s.status === "queued").length} ready`}
              </span>
            </div>
            <ThisWeekSection
              items={thisWeekItems}
              onShowClick={(s) => setDetailShowId(s.id)}
              onStatusChange={handleStatusChange}
            />
          </section>
        )}

        {/* ── ACTIVITY ────────────────────────────────────────────── */}
        {journalEntries.length > 0 && (
          <section>
            <div className="flex items-baseline gap-2 mb-4">
              <h2 className="text-xl font-bold">Activity</h2>
              <span className="text-sm text-muted-foreground">your history</span>
            </div>
            <ActivityJournal
              entries={journalEntries}
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
