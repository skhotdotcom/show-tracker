"use client";

import { format, isAfter, parseISO, differenceInDays, startOfDay } from "date-fns";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock } from "lucide-react";
import type { Show } from "@/types";

interface ComingSoonItem {
  show: Show;
  nextEpisode?: {
    season_number: number;
    episode_number: number;
    air_date: string;
    name: string;
  } | null;
}

interface ComingSoonProps {
  items: ComingSoonItem[];
  onShowClick?: (show: Show) => void;
}

export function ComingSoon({ items, onShowClick }: ComingSoonProps) {
  const upcomingItems = items
    .filter((item) => item.nextEpisode && isAfter(parseISO(item.nextEpisode.air_date), new Date()))
    .sort((a, b) => {
      if (!a.nextEpisode || !b.nextEpisode) return 0;
      return parseISO(a.nextEpisode.air_date).getTime() - parseISO(b.nextEpisode.air_date).getTime();
    });

  if (upcomingItems.length === 0) {
    return null;
  }

  return (
    <div className="bg-card rounded-lg border p-4">
      <h3 className="font-semibold mb-4">Coming Soon</h3>
      <div className="space-y-3">
        {upcomingItems.map((item) => {
          const days = differenceInDays(parseISO(item.nextEpisode!.air_date), startOfDay(new Date()));
          const airDate = parseISO(item.nextEpisode!.air_date);

          return (
            <div
              key={item.show.id}
              className={`flex gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors ${onShowClick ? "cursor-pointer" : ""}`}
              onClick={() => onShowClick?.(item.show)}
            >
              <div className="w-12 h-16 relative rounded overflow-hidden flex-shrink-0">
                {item.show.poster_url ? (
                  <Image
                    src={item.show.poster_url}
                    alt={item.show.title}
                    fill
                    className="object-cover"
                    sizes="48px"
                  />
                ) : (
                  <div className="w-full h-full bg-muted flex items-center justify-center">
                    <span className="text-xs text-center p-1">{item.show.title}</span>
                  </div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <p className="font-medium line-clamp-1">{item.show.title}</p>
                <p className="text-sm text-muted-foreground line-clamp-1">
                  S{item.nextEpisode!.season_number}E{item.nextEpisode!.episode_number}: {item.nextEpisode!.name}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="outline" className="text-xs">
                    <Calendar className="w-3 h-3 mr-1" />
                    {format(airDate, "MMM d")}
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    <Clock className="w-3 h-3 mr-1" />
                    {days === 0 ? "Today" : days === 1 ? "Tomorrow" : `${days} days`}
                  </Badge>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}