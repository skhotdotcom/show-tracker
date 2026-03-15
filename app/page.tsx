"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { CarouselRow } from "@/components/carousel-row";
import { ChatPanel } from "@/components/chat-panel";
import { AddShowDialog } from "@/components/add-show-dialog";
import { HistoryList } from "@/components/history-list";
import { ComingSoon } from "@/components/coming-soon";
import { RecommendationCard } from "@/components/recommendation-card";
import { ShowDetailDialog } from "@/components/show-detail-dialog";
import { useShows } from "@/hooks/useShows";
import { useChat } from "@/hooks/useChat";
import { useRecommendations } from "@/hooks/useRecommendations";
import { useUpcoming } from "@/hooks/useUpcoming";
import type { NextEpisodeInfo } from "@/hooks/useUpcoming";
import { Plus, RefreshCw, Tv, Bot, Home as HomeIcon, History } from "lucide-react";
import { ViewSwitcher } from "@/components/view-switcher";
import { WatchPatterns } from "@/components/watch-patterns";

export default function Home() {
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"home" | "history">("home");
  const [detailShowId, setDetailShowId] = useState<number | null>(null);
  const [activeGenre, setActiveGenre] = useState<string | null>(null);

  const shows = useShows();
  const upcoming = useUpcoming();
  const chat = useChat(async () => {
    await shows.refresh();
    await upcoming.load();
  });
  const recommendations = useRecommendations();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    shows.refresh();
    chat.loadMessages();
    recommendations.load();
    upcoming.load();
  }, []);

  // Derive detailShow from ID so it auto-syncs with useShows optimistic updates
  const detailShow = detailShowId != null
    ? (shows.shows.find((s) => s.id === detailShowId) ?? null)
    : null;

  // Build episode info map for the "Continue Watching" carousel
  const episodeInfoMap: Record<number, NextEpisodeInfo> = {};
  for (const item of upcoming.availableNow) {
    if (item.nextEpisode) {
      episodeInfoMap[item.show.id] = item.nextEpisode;
    }
  }

  const detailNextEpisode = detailShowId != null ? (episodeInfoMap[detailShowId] ?? null) : null;

  // Genre filter — null means "show all"
  const filterByGenre = (list: typeof shows.shows) => {
    if (!activeGenre) return list;
    return list.filter((s) => {
      if (!s.genres) return false;
      try { return (JSON.parse(s.genres) as string[]).includes(activeGenre); } catch { return false; }
    });
  };

  // TV shows whose next episode hasn't aired yet go to Coming Soon, not Continue Watching
  const comingSoonShowIds = new Set(upcoming.comingSoon.map((i) => i.show.id));

  const watchingTvAvailable = filterByGenre(shows.shows.filter(
    (s) => s.status === "watching" && s.type === "tv" && !comingSoonShowIds.has(s.id)
  ));
  const watchingMovies = filterByGenre(shows.shows.filter(
    (s) => s.status === "watching" && s.type === "movie"
  ));
  const continueWatching = [...watchingTvAvailable, ...watchingMovies];

  const queuedShows = filterByGenre(shows.shows.filter((s) => s.status === "queued"));
  const historyShows = shows.shows.filter(
    (s) => s.status === "completed" || s.status === "dropped"
  );

  // Scoped refresh handlers — each only fetches what its mutation affects
  const handleDelete = async (id: number) => {
    await shows.remove(id);
    await upcoming.load();
  };

  const handleStatusChange = async (id: number, status: string) => {
    await shows.updateStatus(id, status);
    await upcoming.load();
  };

  const handleMarkWatched = async (showId: number, season: number, episode: number) => {
    await shows.markWatchedEpisode(showId, season, episode);
    await upcoming.load();
  };

  const handleSetProgress = async (showId: number, season: number, episode: number) => {
    await shows.setProgress(showId, season, episode);
    await upcoming.load();
  };

  return (
    <div className="min-h-screen bg-background pb-16 md:pb-0">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b">
        <div className="flex items-center justify-between px-4 md:px-12 py-4">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Tv className="w-6 h-6 text-primary" />
              <span className="font-bold text-xl">Show Tracker</span>
            </div>
            <nav className="hidden md:flex gap-4">
              <Button
                variant={activeTab === "home" ? "default" : "ghost"}
                onClick={() => setActiveTab("home")}
              >
                Home
              </Button>
              <Button
                variant={activeTab === "history" ? "default" : "ghost"}
                onClick={() => setActiveTab("history")}
              >
                History
              </Button>
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <ViewSwitcher />
            <Button onClick={() => setAddDialogOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Add Show
            </Button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="py-6">
        {activeTab === "home" ? (
          <div className="space-y-6 px-4 md:px-12">
            <WatchPatterns
              activeGenre={activeGenre}
              onGenreClick={setActiveGenre}
              onBackfillComplete={shows.refresh}
            />

            {continueWatching.length > 0 && (
              <CarouselRow
                title="Continue Watching"
                shows={continueWatching}
                episodeInfo={episodeInfoMap}
                onStatusChange={handleStatusChange}
                onDelete={handleDelete}
                onMarkWatched={handleMarkWatched}
                onSetProgress={handleSetProgress}
                onRate={shows.rate}
                onShowClick={(s) => setDetailShowId(s.id)}
              />
            )}

            <CarouselRow
              title="Watch Next"
              shows={queuedShows}
              onStatusChange={handleStatusChange}
              onDelete={handleDelete}
              onRate={shows.rate}
              onShowClick={(s) => setDetailShowId(s.id)}
              emptyMessage="Add shows to your queue to see them here"
            />

            {upcoming.comingSoon.length > 0 && (
              <ComingSoon
                items={upcoming.comingSoon}
                onShowClick={(s) => setDetailShowId(s.id)}
              />
            )}

            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">AI Recommendations</h2>
              <Button
                variant="outline"
                size="sm"
                onClick={recommendations.refresh}
                disabled={recommendations.loading}
              >
                <RefreshCw
                  className={`w-4 h-4 mr-2 ${recommendations.loading ? "animate-spin" : ""}`}
                />
                Refresh
              </Button>
            </div>

            {recommendations.recommendations.length > 0 ? (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {recommendations.recommendations.map((r) => (
                  <RecommendationCard
                    key={r.id}
                    {...r}
                    onAddToQueue={async (tmdbId, title, type, posterUrl) => {
                      await shows.add({ tmdb_id: tmdbId, title, type, poster_url: posterUrl });
                    }}
                  />
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">
                Watch some shows and refresh to get AI recommendations
              </p>
            )}
          </div>
        ) : (
          <div className="px-4 md:px-12">
            <HistoryList
              shows={historyShows}
              onDelete={handleDelete}
              onRate={shows.rate}
              onRequeue={(id) => handleStatusChange(id, "queued")}
              onShowClick={(s) => setDetailShowId(s.id)}
            />
          </div>
        )}
      </main>

      {/* Mobile bottom nav */}
      <nav className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-background/95 backdrop-blur border-t flex">
        <button
          className={`flex-1 flex flex-col items-center gap-1 py-3 text-xs transition-colors ${
            activeTab === "home" ? "text-primary" : "text-muted-foreground"
          }`}
          onClick={() => setActiveTab("home")}
        >
          <HomeIcon className="w-5 h-5" />
          Home
        </button>
        <button
          className={`flex-1 flex flex-col items-center gap-1 py-3 text-xs transition-colors ${
            activeTab === "history" ? "text-primary" : "text-muted-foreground"
          }`}
          onClick={() => setActiveTab("history")}
        >
          <History className="w-5 h-5" />
          History
        </button>
      </nav>

      {/* Floating chat button */}
      <Button
        className="fixed bottom-20 right-6 md:bottom-6 rounded-full h-12 w-12 shadow-lg z-40 p-0"
        onClick={() => setChatOpen(true)}
        aria-label="Open chat"
      >
        <Bot className="w-5 h-5" />
      </Button>

      {/* Chat drawer */}
      <Sheet open={chatOpen} onOpenChange={setChatOpen}>
        <SheetContent side="right" className="p-0 flex flex-col sm:max-w-[420px]">
          <SheetHeader>
            <SheetTitle>Chat with Tracker</SheetTitle>
          </SheetHeader>
          <ChatPanel
            messages={chat.messages}
            onSendMessage={chat.sendMessage}
            className="flex-1 h-auto rounded-none border-0"
          />
        </SheetContent>
      </Sheet>

      <AddShowDialog
        open={addDialogOpen}
        onOpenChange={setAddDialogOpen}
        onAddShow={shows.add}
      />

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
