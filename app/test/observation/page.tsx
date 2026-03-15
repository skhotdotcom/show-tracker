'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Star, Clock, Film, Tv, ChevronDown, ChevronRight, Loader2, RefreshCw, Eye } from 'lucide-react';
import type { ObservationResponse, SuggestionLog } from '@/types';

// --- Types ---

interface Suggestion {
  content_type: 'tv' | 'movie';
  tmdb_id: number;
  title: string;
  poster_url: string | null;
  series_poster_url: string | null;
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

interface ResponseOption {
  value: ObservationResponse;
  label: string;
  category: 'immediate' | 'delayed' | 'rejection';
  description: string;
}

const RESPONSE_OPTIONS: ResponseOption[] = [
  { value: 'im_in', label: "I'm in", category: 'immediate', description: 'Strong match — stop searching, start watching' },
  { value: 'id_watch_this', label: "I'd watch this", category: 'immediate', description: 'Casual interest, willing to start' },
  { value: 'keep_on_radar', label: 'Keep it on my radar', category: 'delayed', description: 'Not now, but don\'t forget it' },
  { value: 'not_tonight', label: 'Not tonight', category: 'rejection', description: 'Right show, wrong moment' },
  { value: 'not_for_me', label: 'Not for me', category: 'rejection', description: 'Wrong show entirely' },
  { value: 'already_seen_it', label: 'Already seen it', category: 'rejection', description: 'Rate it below' },
];

const RESPONSE_LABELS: Record<string, string> = Object.fromEntries(
  RESPONSE_OPTIONS.map(o => [o.value, o.label])
);

const CATEGORY_COLORS: Record<string, string> = {
  immediate: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  delayed: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  rejection: 'bg-red-500/20 text-red-400 border-red-500/30',
};

// --- Main Page ---

export default function ObservationTestPage() {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [history, setHistory] = useState<SuggestionLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [responding, setResponding] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [alreadySeenRating, setAlreadySeenRating] = useState<number | null>(null);
  const [showAlreadySeen, setShowAlreadySeen] = useState(false);
  const dwellStartRef = useRef<number>(Date.now());

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
      const res = await fetch('/api/observations?limit=20');
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

  // Reset dwell timer when card changes
  useEffect(() => {
    dwellStartRef.current = Date.now();
    setShowAlreadySeen(false);
    setAlreadySeenRating(null);
  }, [currentIndex]);

  const handleResponse = async (response: ObservationResponse) => {
    if (!current || responding) return;

    if (response === 'already_seen_it') {
      setShowAlreadySeen(true);
      return;
    }

    setResponding(true);
    const dwellTime = (Date.now() - dwellStartRef.current) / 1000;

    try {
      await fetch('/api/observations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content_type: current.content_type,
          title: current.title,
          tmdb_id: current.tmdb_id,
          season_number: current.season_number,
          episode_number: current.episode_number,
          episode_title: current.episode_title,
          episode_description: current.episode_description,
          social_rating: current.social_rating,
          personal_score: current.personal_score,
          response,
          dwell_time_seconds: Math.round(dwellTime * 10) / 10,
        }),
      });
      await fetchHistory();
      // Advance to next card
      if (currentIndex < suggestions.length - 1) {
        setCurrentIndex(i => i + 1);
      }
    } catch (err) {
      console.error('Failed to log observation', err);
    } finally {
      setResponding(false);
    }
  };

  const handleAlreadySeenSubmit = async () => {
    if (!current || responding) return;
    setResponding(true);
    const dwellTime = (Date.now() - dwellStartRef.current) / 1000;
    try {
      await fetch('/api/observations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content_type: current.content_type,
          title: current.title,
          tmdb_id: current.tmdb_id,
          season_number: current.season_number,
          episode_number: current.episode_number,
          episode_title: current.episode_title,
          episode_description: current.episode_description,
          social_rating: current.social_rating,
          personal_score: current.personal_score,
          response: 'already_seen_it',
          dwell_time_seconds: Math.round(dwellTime * 10) / 10,
          user_rating: alreadySeenRating,
        }),
      });
      await fetchHistory();
      setShowAlreadySeen(false);
      setAlreadySeenRating(null);
      if (currentIndex < suggestions.length - 1) {
        setCurrentIndex(i => i + 1);
      }
    } catch (err) {
      console.error('Failed to log observation', err);
    } finally {
      setResponding(false);
    }
  };

  const handleRevise = async (id: number, newResponse: ObservationResponse) => {
    try {
      await fetch('/api/observations', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, response: newResponse }),
      });
      await fetchHistory();
    } catch (err) {
      console.error('Failed to revise observation', err);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="size-8 animate-spin text-muted-foreground" />
          <p className="text-sm text-muted-foreground">Loading suggestions from TMDB...</p>
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
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-semibold tracking-tight">What should you watch?</h1>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">
              {currentIndex + 1} / {suggestions.length}
            </span>
            <Button onClick={fetchSuggestions} variant="ghost" size="icon-sm">
              <RefreshCw className="size-3.5" />
            </Button>
          </div>
        </div>

        {/* Suggestion Card */}
        <SuggestionCard
          suggestion={current}
          onPosterClick={() => setPreviewOpen(true)}
        />

        {/* Already Seen Section */}
        {showAlreadySeen && (
          <div className="rounded-lg border border-border bg-card p-4 space-y-3">
            <p className="text-sm font-medium">You've seen this! How would you rate it?</p>
            <StarRating value={alreadySeenRating} onChange={setAlreadySeenRating} />
            <div className="flex gap-2">
              <Button
                size="sm"
                onClick={handleAlreadySeenSubmit}
                disabled={!alreadySeenRating || responding}
              >
                {responding ? <Loader2 className="size-3 animate-spin mr-1" /> : null}
                Submit rating
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => { setShowAlreadySeen(false); setAlreadySeenRating(null); }}
              >
                Cancel
              </Button>
            </div>
          </div>
        )}

        {/* Response Options */}
        {!showAlreadySeen && (
          <ResponsePanel
            onRespond={handleResponse}
            disabled={responding}
          />
        )}

        {/* History */}
        {history.length > 0 && (
          <HistoryPanel history={history} onRevise={handleRevise} />
        )}

        {/* Preview Dialog */}
        <PreviewDialog
          open={previewOpen}
          onOpenChange={setPreviewOpen}
          suggestion={current}
        />
      </div>
    </div>
  );
}

// --- Suggestion Card ---

function SuggestionCard({ suggestion: s, onPosterClick }: { suggestion: Suggestion; onPosterClick: () => void }) {
  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      {/* Poster / Still */}
      <button
        onClick={onPosterClick}
        className="relative w-full aspect-video bg-muted overflow-hidden group cursor-pointer"
      >
        {s.poster_url ? (
          <img
            src={s.poster_url}
            alt={s.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
            {s.content_type === 'tv' ? <Tv className="size-12" /> : <Film className="size-12" />}
          </div>
        )}
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        {/* Type badge */}
        <div className="absolute top-3 left-3">
          <Badge variant="secondary" className="bg-black/60 text-white border-0 text-[10px] uppercase tracking-wider">
            {s.content_type === 'tv' ? 'TV Series' : 'Movie'}
          </Badge>
        </div>
        {/* Expand hint */}
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <Badge variant="secondary" className="bg-black/60 text-white border-0 text-[10px]">
            <Eye className="size-3 mr-1" /> Preview
          </Badge>
        </div>
        {/* Bottom info overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h2 className="text-white font-semibold text-lg leading-tight">{s.title}</h2>
          {s.episode_label && s.episode_title && (
            <p className="text-white/80 text-sm mt-1">
              {s.episode_label} &mdash; {s.episode_title}
            </p>
          )}
        </div>
      </button>

      {/* Card body */}
      <div className="p-4 space-y-3">
        {/* Description */}
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
          {s.content_type === 'tv' && s.episode_description
            ? s.episode_description
            : s.overview || 'No description available.'}
        </p>

        {/* Tagline for movies */}
        {s.content_type === 'movie' && s.tagline && (
          <p className="text-xs italic text-muted-foreground/70">&ldquo;{s.tagline}&rdquo;</p>
        )}

        {/* Meta row */}
        <div className="flex items-center gap-3 flex-wrap text-xs text-muted-foreground">
          {/* Air date */}
          {s.air_date && (
            <span className="flex items-center gap-1">
              <Clock className="size-3" />
              {formatDate(s.air_date)}
            </span>
          )}
          {/* Runtime for movies */}
          {s.content_type === 'movie' && s.runtime && (
            <span>{s.runtime} min</span>
          )}
          {/* Social rating */}
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
              <Badge key={g} variant="outline" className="text-[10px] px-2 py-0.5">
                {g}
              </Badge>
            ))}
          </div>
        )}

        {/* Personal Score */}
        <div className="rounded-md bg-primary/10 border border-primary/20 px-3 py-2">
          <p className="text-xs text-primary font-medium">{s.personal_score}</p>
        </div>
      </div>
    </div>
  );
}

// --- Response Panel ---

function ResponsePanel({ onRespond, disabled }: { onRespond: (r: ObservationResponse) => void; disabled: boolean }) {
  const categories: { key: string; label: string; options: ResponseOption[] }[] = [
    { key: 'immediate', label: 'I\'m interested', options: RESPONSE_OPTIONS.filter(o => o.category === 'immediate') },
    { key: 'delayed', label: 'Save for later', options: RESPONSE_OPTIONS.filter(o => o.category === 'delayed') },
    { key: 'rejection', label: 'Pass', options: RESPONSE_OPTIONS.filter(o => o.category === 'rejection') },
  ];

  return (
    <div className="space-y-3">
      <p className="text-sm font-medium text-muted-foreground">How do you feel about this one?</p>
      <div className="space-y-2">
        {categories.map(cat => (
          <div key={cat.key} className="space-y-1.5">
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground/60 font-medium">{cat.label}</p>
            <div className="flex flex-wrap gap-2">
              {cat.options.map(opt => (
                <button
                  key={opt.value}
                  onClick={() => onRespond(opt.value)}
                  disabled={disabled}
                  className={`
                    px-3 py-1.5 rounded-full text-xs font-medium border transition-all
                    hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed
                    ${CATEGORY_COLORS[opt.category]}
                  `}
                  title={opt.description}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// --- History Panel ---

function HistoryPanel({ history, onRevise }: { history: SuggestionLog[]; onRevise: (id: number, response: ObservationResponse) => void }) {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  return (
    <div className="space-y-2">
      <h3 className="text-sm font-medium text-muted-foreground">Your choices</h3>
      <div className="space-y-1">
        {history.map(entry => (
          <div key={entry.id} className="rounded-lg border border-border bg-card/50">
            <button
              onClick={() => setExpandedId(expandedId === entry.id ? null : entry.id)}
              className="w-full flex items-center justify-between px-3 py-2 text-left"
            >
              <div className="flex items-center gap-2 min-w-0">
                <Badge variant="outline" className="text-[10px] shrink-0">
                  {entry.content_type === 'tv' ? 'TV' : 'Film'}
                </Badge>
                <span className="text-sm truncate">{entry.title}</span>
                {entry.season_number && entry.episode_number && (
                  <span className="text-[10px] text-muted-foreground shrink-0">
                    S{entry.season_number}E{String(entry.episode_number).padStart(2, '0')}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <ResponseBadge response={entry.response} />
                {entry.revision_count > 0 && (
                  <span className="text-[10px] text-muted-foreground">
                    revised {entry.revision_count}x
                  </span>
                )}
                {expandedId === entry.id
                  ? <ChevronDown className="size-3 text-muted-foreground" />
                  : <ChevronRight className="size-3 text-muted-foreground" />
                }
              </div>
            </button>

            {expandedId === entry.id && (
              <div className="px-3 pb-3 space-y-2">
                <p className="text-xs text-muted-foreground">
                  You said &ldquo;{RESPONSE_LABELS[entry.response] || entry.response}&rdquo; &mdash; change your mind?
                </p>
                {entry.user_rating && (
                  <p className="text-xs text-muted-foreground">
                    Your rating: {'★'.repeat(entry.user_rating)}{'☆'.repeat(5 - entry.user_rating)}
                  </p>
                )}
                <div className="flex flex-wrap gap-1.5">
                  {RESPONSE_OPTIONS.filter(o => o.value !== entry.response).map(opt => (
                    <button
                      key={opt.value}
                      onClick={() => onRevise(entry.id, opt.value)}
                      className={`
                        px-2 py-1 rounded-full text-[10px] font-medium border transition-all
                        hover:scale-105 active:scale-95
                        ${CATEGORY_COLORS[opt.category]}
                      `}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// --- Preview Dialog ---

function PreviewDialog({ open, onOpenChange, suggestion: s }: { open: boolean; onOpenChange: (open: boolean) => void; suggestion: Suggestion }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto p-0">
        {/* Backdrop image */}
        {s.backdrop_url && (
          <div className="relative w-full aspect-video">
            <img
              src={s.backdrop_url}
              alt={s.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
          </div>
        )}
        <div className="p-6 space-y-4">
          <DialogHeader>
            <DialogTitle className="text-xl">{s.title}</DialogTitle>
            {s.episode_label && s.episode_title && (
              <DialogDescription className="text-sm">
                {s.episode_label} &mdash; {s.episode_title}
              </DialogDescription>
            )}
            {s.tagline && (
              <p className="text-sm italic text-muted-foreground/70">&ldquo;{s.tagline}&rdquo;</p>
            )}
          </DialogHeader>

          {/* Full description */}
          <div className="space-y-2">
            {s.content_type === 'tv' && s.episode_description && (
              <p className="text-sm text-muted-foreground">{s.episode_description}</p>
            )}
            {s.overview && (s.content_type === 'movie' || !s.episode_description) && (
              <p className="text-sm text-muted-foreground">{s.overview}</p>
            )}
            {s.content_type === 'tv' && s.episode_description && s.overview && (
              <details className="text-sm">
                <summary className="text-xs text-muted-foreground/60 cursor-pointer hover:text-muted-foreground">
                  Series overview
                </summary>
                <p className="text-sm text-muted-foreground mt-1">{s.overview}</p>
              </details>
            )}
          </div>

          {/* Meta */}
          <div className="flex items-center gap-3 text-xs text-muted-foreground flex-wrap">
            {s.air_date && <span><Clock className="size-3 inline mr-1" />{formatDate(s.air_date)}</span>}
            {s.runtime && <span>{s.runtime} min</span>}
            {s.social_rating != null && (
              <span><Star className="size-3 inline mr-1 fill-blue-400 text-blue-400" />{s.social_rating.toFixed(1)}</span>
            )}
          </div>

          {/* Genres */}
          {s.genres.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {s.genres.map(g => (
                <Badge key={g} variant="outline" className="text-[10px]">{g}</Badge>
              ))}
            </div>
          )}

          {/* Cast */}
          {s.cast.length > 0 && (
            <div className="space-y-2">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Top billed</p>
              <div className="flex gap-3 overflow-x-auto pb-2">
                {s.cast.map(c => (
                  <div key={c.name} className="flex flex-col items-center gap-1 min-w-[64px]">
                    {c.profile_path ? (
                      <img
                        src={c.profile_path}
                        alt={c.name}
                        className="size-12 rounded-full object-cover bg-muted"
                      />
                    ) : (
                      <div className="size-12 rounded-full bg-muted flex items-center justify-center text-muted-foreground text-xs">
                        {c.name.charAt(0)}
                      </div>
                    )}
                    <span className="text-[10px] text-center leading-tight">{c.name}</span>
                    <span className="text-[9px] text-muted-foreground/60 text-center leading-tight">{c.character}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Personal Score */}
          <div className="rounded-md bg-primary/10 border border-primary/20 px-3 py-2">
            <p className="text-xs text-primary font-medium">{s.personal_score}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// --- Helpers ---

function ResponseBadge({ response }: { response: string }) {
  const opt = RESPONSE_OPTIONS.find(o => o.value === response);
  const category = opt?.category || 'rejection';
  return (
    <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium border ${CATEGORY_COLORS[category]}`}>
      {opt?.label || response}
    </span>
  );
}

function StarRating({ value, onChange }: { value: number | null; onChange: (v: number) => void }) {
  const [hover, setHover] = useState<number | null>(null);
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map(star => (
        <button
          key={star}
          onClick={() => onChange(star)}
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(null)}
          className="text-lg transition-transform hover:scale-110"
        >
          {(hover ?? value ?? 0) >= star ? (
            <Star className="size-6 fill-yellow-400 text-yellow-400" />
          ) : (
            <Star className="size-6 text-muted-foreground/30" />
          )}
        </button>
      ))}
    </div>
  );
}

function formatDate(dateStr: string): string {
  try {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  } catch {
    return dateStr;
  }
}
