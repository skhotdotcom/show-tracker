'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Star, Clock, Film, Tv, Loader2, RefreshCw, Send, ChevronDown, ChevronRight } from 'lucide-react';

interface Suggestion {
  content_type: 'tv' | 'movie';
  tmdb_id: number;
  title: string;
  poster_url: string | null;
  backdrop_url: string | null;
  overview: string | null;
  episode_title: string | null;
  episode_description: string | null;
  episode_label: string | null;
  season_number: number | null;
  episode_number: number | null;
  air_date: string | null;
  social_rating: number | null;
  genres: string[];
  personal_score: string;
  cast: { name: string; character: string; profile_path: string | null }[];
  tagline: string | null;
  runtime?: number | null;
}

interface CaptureEntry {
  id: number;
  content_type: string;
  title: string;
  tmdb_id: number;
  raw_response: string;
  persona: string | null;
  timestamp: string;
}

export default function LanguageCapturePage() {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [history, setHistory] = useState<CaptureEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [response, setResponse] = useState('');
  const dwellStartRef = useRef<number>(Date.now());
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const current = suggestions[currentIndex] || null;

  const fetchSuggestions = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/suggestions');
      const data = await res.json();
      setSuggestions(data);
      setCurrentIndex(0);
      dwellStartRef.current = Date.now();
    } catch (err) {
      console.error('Failed to fetch suggestions', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchHistory = useCallback(async () => {
    try {
      const res = await fetch('/api/observations/language?limit=50');
      const data = await res.json();
      setHistory(data);
    } catch (err) {
      console.error('Failed to fetch history', err);
    }
  }, []);

  useEffect(() => {
    fetchSuggestions();
    fetchHistory();
  }, [fetchSuggestions, fetchHistory]);

  useEffect(() => {
    dwellStartRef.current = Date.now();
    setResponse('');
    // Focus the input when card changes
    setTimeout(() => inputRef.current?.focus(), 100);
  }, [currentIndex]);

  const handleSubmit = async () => {
    if (!current || !response.trim() || submitting) return;
    setSubmitting(true);
    const dwellTime = (Date.now() - dwellStartRef.current) / 1000;

    try {
      await fetch('/api/observations/language', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content_type: current.content_type,
          title: current.title,
          tmdb_id: current.tmdb_id,
          season_number: current.season_number,
          episode_number: current.episode_number,
          raw_response: response.trim(),
          dwell_time_seconds: Math.round(dwellTime * 10) / 10,
        }),
      });
      await fetchHistory();
      setResponse('');
      if (currentIndex < suggestions.length - 1) {
        setCurrentIndex(i => i + 1);
      }
    } catch (err) {
      console.error('Failed to log response', err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="size-8 animate-spin text-muted-foreground" />
          <p className="text-sm text-muted-foreground">Loading suggestions...</p>
        </div>
      </div>
    );
  }

  if (!current) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="flex flex-col items-center gap-4">
          <p className="text-muted-foreground">No suggestions available.</p>
          <Button onClick={fetchSuggestions} variant="outline" size="sm">
            <RefreshCw className="size-4 mr-2" /> Try again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-xl mx-auto px-4 py-8 space-y-6">
        {/* Header */}
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <h1 className="text-lg font-semibold tracking-tight">Language Test</h1>
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">
                {currentIndex + 1} / {suggestions.length}
              </span>
              <Button onClick={fetchSuggestions} variant="ghost" size="icon-sm">
                <RefreshCw className="size-3.5" />
              </Button>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            Look at this suggestion. In your own words, what would you say? There are no right answers.
          </p>
        </div>

        {/* Card */}
        <CompactCard suggestion={current} />

        {/* Open text input */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">
            What would you say about this one?
          </label>
          <div className="relative">
            <Textarea
              ref={inputRef}
              value={response}
              onChange={e => setResponse(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={'e.g. "yeah I\'d watch that" or "nah not for me" or "hmm maybe"'}
              className="pr-12 min-h-[60px] resize-none"
            />
            <Button
              size="icon-sm"
              onClick={handleSubmit}
              disabled={!response.trim() || submitting}
              className="absolute bottom-2 right-2"
            >
              {submitting ? <Loader2 className="size-3 animate-spin" /> : <Send className="size-3" />}
            </Button>
          </div>
          <p className="text-[10px] text-muted-foreground/50">
            Enter to submit. Say whatever comes to mind — short is fine.
          </p>
        </div>

        {/* Quick prompts for inspiration (not buttons — just example text) */}
        <div className="flex flex-wrap gap-1.5">
          {[
            "I'm in",
            "Nah",
            "Maybe",
            "I've seen this",
            "Not tonight",
            "Tell me more",
            "Looks boring",
            "Ooh yes",
          ].map(hint => (
            <button
              key={hint}
              onClick={() => { setResponse(hint); inputRef.current?.focus(); }}
              className="px-2 py-0.5 rounded-full text-[10px] text-muted-foreground/40 border border-border/30 hover:border-border hover:text-muted-foreground transition-colors"
            >
              {hint}
            </button>
          ))}
        </div>

        {/* History */}
        {history.length > 0 && <CaptureHistory entries={history} />}
      </div>
    </div>
  );
}

// --- Compact Card (shows enough to react, not everything) ---

function CompactCard({ suggestion: s }: { suggestion: Suggestion }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      {/* Poster */}
      <div className="relative w-full aspect-video bg-muted overflow-hidden">
        {s.poster_url ? (
          <img src={s.poster_url} alt={s.title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
            {s.content_type === 'tv' ? <Tv className="size-12" /> : <Film className="size-12" />}
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <div className="absolute top-3 left-3">
          <Badge variant="secondary" className="bg-black/60 text-white border-0 text-[10px] uppercase tracking-wider">
            {s.content_type === 'tv' ? 'TV Series' : 'Movie'}
          </Badge>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h2 className="text-white font-semibold text-lg leading-tight">{s.title}</h2>
          {s.episode_label && s.episode_title && (
            <p className="text-white/80 text-sm mt-1">{s.episode_label} &mdash; {s.episode_title}</p>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="p-4 space-y-2">
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
          {s.content_type === 'tv' && s.episode_description ? s.episode_description : s.overview || 'No description available.'}
        </p>

        {s.content_type === 'movie' && s.tagline && (
          <p className="text-xs italic text-muted-foreground/70">&ldquo;{s.tagline}&rdquo;</p>
        )}

        {/* Meta row */}
        <div className="flex items-center gap-3 flex-wrap text-xs text-muted-foreground">
          {s.air_date && (
            <span className="flex items-center gap-1">
              <Clock className="size-3" />
              {formatDate(s.air_date)}
            </span>
          )}
          {s.content_type === 'movie' && s.runtime && <span>{s.runtime} min</span>}
          {s.social_rating != null && (
            <span className="flex items-center gap-1">
              <Star className="size-3 fill-blue-400 text-blue-400" />
              {s.social_rating.toFixed(1)}
            </span>
          )}
        </div>

        {/* Genres */}
        {s.genres.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {s.genres.map(g => (
              <Badge key={g} variant="outline" className="text-[10px] px-2 py-0.5">{g}</Badge>
            ))}
          </div>
        )}

        {/* Expandable cast + personal score */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-1 text-[10px] text-muted-foreground/50 hover:text-muted-foreground transition-colors"
        >
          {expanded ? <ChevronDown className="size-3" /> : <ChevronRight className="size-3" />}
          {expanded ? 'Less' : 'More details'}
        </button>

        {expanded && (
          <div className="space-y-2 pt-1">
            {/* Cast */}
            {s.cast.length > 0 && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {s.cast.map(c => (
                  <div key={c.name} className="flex items-center gap-1.5 shrink-0">
                    {c.profile_path ? (
                      <img src={c.profile_path} alt={c.name} className="size-6 rounded-full object-cover bg-muted" />
                    ) : (
                      <div className="size-6 rounded-full bg-muted flex items-center justify-center text-[8px] text-muted-foreground">
                        {c.name.charAt(0)}
                      </div>
                    )}
                    <span className="text-[10px] text-muted-foreground">{c.name}</span>
                  </div>
                ))}
              </div>
            )}
            {/* Personal score */}
            <div className="rounded-md bg-primary/10 border border-primary/20 px-3 py-2">
              <p className="text-xs text-primary font-medium">{s.personal_score}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// --- History ---

function CaptureHistory({ entries }: { entries: CaptureEntry[] }) {
  return (
    <div className="space-y-2">
      <h3 className="text-sm font-medium text-muted-foreground">What you said</h3>
      <div className="space-y-1">
        {entries.map(entry => (
          <div key={entry.id} className="flex items-start gap-2 rounded-lg border border-border bg-card/50 px-3 py-2">
            <Badge variant="outline" className="text-[10px] shrink-0 mt-0.5">
              {entry.content_type === 'tv' ? 'TV' : 'Film'}
            </Badge>
            <div className="min-w-0">
              <span className="text-xs font-medium">{entry.title}</span>
              <p className="text-sm text-muted-foreground mt-0.5">&ldquo;{entry.raw_response}&rdquo;</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function formatDate(dateStr: string): string {
  try {
    return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  } catch { return dateStr; }
}
