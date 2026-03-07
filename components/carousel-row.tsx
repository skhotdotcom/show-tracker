"use client";

import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, LayoutGrid, Rows3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ShowCard } from "./show-card";
import type { Show } from "@/types";
import type { NextEpisodeInfo } from "@/hooks/useUpcoming";

interface CarouselRowProps {
  title: string;
  shows: Show[];
  episodeInfo?: Record<number, NextEpisodeInfo>;
  onStatusChange?: (id: number, status: string) => void;
  onDelete?: (id: number) => void;
  onMarkWatched?: (id: number, season: number, episode: number) => Promise<void>;
  onSetProgress?: (id: number, season: number, episode: number) => Promise<void>;
  onRate?: (id: number, rating: number) => void;
  onShowClick?: (show: Show) => void;
  emptyMessage?: string;
}

export function CarouselRow({
  title,
  shows,
  episodeInfo,
  onStatusChange,
  onDelete,
  onMarkWatched,
  onSetProgress,
  onRate,
  onShowClick,
  emptyMessage = "No shows to display",
}: CarouselRowProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [viewAll, setViewAll] = useState(false);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    const ref = scrollRef.current;
    if (ref) {
      ref.addEventListener("scroll", checkScroll);
      return () => ref.removeEventListener("scroll", checkScroll);
    }
  }, [shows]);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.clientWidth * 0.8;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  if (shows.length === 0) {
    return (
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-3 px-4 md:px-12">{title}</h2>
        <p className="text-muted-foreground px-4 md:px-12">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="mb-8 relative group">
      <div className="flex items-center justify-between mb-3 px-4 md:px-12">
        <h2 className="text-xl font-semibold">{title}</h2>
        <Button
          variant="ghost"
          size="sm"
          className="text-muted-foreground hover:text-foreground gap-1.5"
          onClick={() => setViewAll((v) => !v)}
        >
          {viewAll ? (
            <>
              <Rows3 className="w-4 h-4" />
              Carousel
            </>
          ) : (
            <>
              <LayoutGrid className="w-4 h-4" />
              View All
            </>
          )}
        </Button>
      </div>

      {viewAll ? (
        /* Grid view */
        <div className="px-4 md:px-12 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {shows.map((show) => (
            <ShowCard
              key={show.id}
              show={show}
              nextEpisode={episodeInfo?.[show.id]}
              onStatusChange={onStatusChange}
              onDelete={onDelete}
              onMarkWatched={onMarkWatched}
              onSetProgress={onSetProgress}
              onRate={onRate}
              onShowClick={onShowClick}
              gridMode
            />
          ))}
        </div>
      ) : (
        /* Carousel view */
        <div className="relative">
          {canScrollLeft && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-0 top-1/2 -translate-y-1/2 z-20 h-full w-12 md:w-16 bg-gradient-to-r from-background via-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-none"
              onClick={() => scroll("left")}
            >
              <ChevronLeft className="w-8 h-8" />
            </Button>
          )}

          <div
            ref={scrollRef}
            className="flex gap-2 md:gap-3 overflow-x-auto hide-scrollbar px-4 md:px-12 py-2"
          >
            {shows.map((show) => (
              <ShowCard
                key={show.id}
                show={show}
                nextEpisode={episodeInfo?.[show.id]}
                onStatusChange={onStatusChange}
                onDelete={onDelete}
                onMarkWatched={onMarkWatched}
                onSetProgress={onSetProgress}
                onRate={onRate}
                onShowClick={onShowClick}
              />
            ))}
          </div>

          {canScrollRight && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-0 top-1/2 -translate-y-1/2 z-20 h-full w-12 md:w-16 bg-gradient-to-l from-background via-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-none"
              onClick={() => scroll("right")}
            >
              <ChevronRight className="w-8 h-8" />
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
