"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Loader2 } from "lucide-react";
import type { TMDBSearchResult, ShowType } from "@/types";

const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p";

interface AddShowDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddShow: (show: {
    tmdb_id: number;
    title: string;
    type: ShowType;
    poster_url: string | null;
    backdrop_url: string | null;
    overview: string;
    release_date: string | null;
  }) => void;
}

export function AddShowDialog({ open, onOpenChange, onAddShow }: AddShowDialogProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<TMDBSearchResult[]>([]);
  const [searching, setSearching] = useState(false);
  const [adding, setAdding] = useState<number | null>(null);

  const handleSearch = async () => {
    if (!query.trim()) return;
    
    setSearching(true);
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
      const data = await res.json();
      setResults(data);
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setSearching(false);
    }
  };

  const handleAdd = async (result: TMDBSearchResult) => {
    setAdding(result.id);
    try {
      const type = result.media_type || (result.title ? "movie" : "tv");
      await onAddShow({
        tmdb_id: result.id,
        title: result.title || result.name || "Unknown",
        type,
        poster_url: result.poster_path ? `${TMDB_IMAGE_BASE}/w342${result.poster_path}` : null,
        backdrop_url: result.backdrop_path ? `${TMDB_IMAGE_BASE}/w780${result.backdrop_path}` : null,
        overview: result.overview,
        release_date: result.release_date || result.first_air_date || null,
      });
      onOpenChange(false);
      setQuery("");
      setResults([]);
    } finally {
      setAdding(null);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>Add Show or Movie</DialogTitle>
        </DialogHeader>

        <div className="flex gap-2 mb-4">
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            placeholder="Search for a TV show or movie..."
          />
          <Button onClick={handleSearch} disabled={searching}>
            {searching ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Search className="w-4 h-4" />
            )}
          </Button>
        </div>

        <div className="flex-1 overflow-auto">
          {results.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {results.map((result) => (
                <div
                  key={result.id}
                  className="relative group rounded-lg overflow-hidden bg-muted border"
                >
                  <div className="aspect-[2/3] relative">
                    {result.poster_path ? (
                      <Image
                        src={`https://image.tmdb.org/t/p/w342${result.poster_path}`}
                        alt={result.title || result.name || ""}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-muted">
                        <span className="text-sm text-center p-2">
                          {result.title || result.name}
                        </span>
                      </div>
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                    <div className="absolute bottom-0 left-0 right-0 p-2">
                      <p className="text-xs font-medium line-clamp-2">
                        {result.title || result.name}
                      </p>
                      <div className="flex items-center justify-between mt-1">
                        <Badge variant="outline" className="text-xs">
                          {result.media_type === "tv" ? "TV" : "Movie"}
                        </Badge>
                        <Button
                          size="sm"
                          className="h-6 px-2"
                          onClick={() => handleAdd(result)}
                          disabled={adding === result.id}
                        >
                          {adding === result.id ? (
                            <Loader2 className="w-3 h-3 animate-spin" />
                          ) : (
                            <Plus className="w-3 h-3" />
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {query && results.length === 0 && !searching && (
            <p className="text-center text-muted-foreground py-8">
              No results found. Try a different search term.
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}