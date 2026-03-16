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
  trailer_url: string | null;
}

// --- Likert options ---

interface LikertOption {
  value: ObservationResponse;
  label: string;
  emoji: string;
}

const LIKERT_OPTIONS: LikertOption[] = [
  { value: 'im_in', label: "I'm in", emoji: '🙌' },
  { value: 'id_watch_this', label: "I'd watch this", emoji: '👀' },
  { value: 'im_curious', label: "I'm curious", emoji: '🤔' },
  { value: 'doesnt_grab_me', label: "Doesn't grab me", emoji: '😐' },
  { value: 'not_for_me', label: 'Not for me', emoji: '🚫' },
];

interface SubOption {
  value: string;
  label: string;
  emoji: string;
}

const SUB_LEVELS: Record<string, { question: string; options: SubOption[] }> = {
  id_watch_this: {
    question: 'What caught your eye?',
    options: [
      { value: 'the_cast', label: 'The cast', emoji: '🎭' },
      { value: 'the_genre', label: 'The genre', emoji: '🎬' },
      { value: 'the_rating', label: 'The rating', emoji: '⭐' },
      { value: 'the_description', label: 'The description', emoji: '📝' },
    ],
  },
  im_curious: {
    question: 'What are you curious about?',
    options: [
      { value: 'the_premise', label: 'The premise', emoji: '💡' },
      { value: 'the_cast', label: 'The cast', emoji: '🎭' },
      { value: 'the_genre', label: 'The genre', emoji: '🎬' },
      { value: 'like_trying_new', label: 'I just like trying new things', emoji: '🌱' },
    ],
  },
  doesnt_grab_me: {
    question: "What's missing?",
    options: [
      { value: 'wrong_mood', label: 'Not the right mood/timing', emoji: '⏰' },
      { value: 'not_enough_info', label: "Don't know enough about it", emoji: '❓' },
      { value: 'not_my_genre', label: 'Not my genre', emoji: '🎬' },
      { value: 'no_appeal', label: "It just doesn't appeal to me", emoji: '🤷' },
    ],
  },
  not_for_me: {
    question: "What's the boundary?",
    options: [
      { value: 'not_my_genre_at_all', label: 'Not my genre at all', emoji: '🎬' },
      { value: 'seen_similar', label: 'Seen shows like this before', emoji: '🔄' },
      { value: 'dislike_cast_premise', label: "Don't like the cast/premise", emoji: '😕' },
      { value: 'just_know_no', label: "I just know it's not for me", emoji: '🚫' },
    ],
  },
};

const ALREADY_SEEN_OPTIONS: SubOption[] = [
  { value: 'couldnt_stop', label: "I couldn't stop watching", emoji: '🔥' },
  { value: 'would_recommend', label: "I'd recommend it", emoji: '👍' },
  { value: 'it_was_fine', label: 'It was fine', emoji: '😐' },
  { value: 'almost_turned_off', label: 'I almost turned it off', emoji: '😬' },
  { value: 'couldnt_finish', label: "I couldn't finish it", emoji: '❌' },
];

const RESPONSE_LABELS: Record<string, string> = Object.fromEntries(
  LIKERT_OPTIONS.map(o => [o.value, `${o.emoji} ${o.label}`])
);

// --- Main Page ---

export default function LikertObservationPage() {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [history, setHistory] = useState<SuggestionLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [responding, setResponding] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [trailerUrl, setTrailerUrl] = useState<string | null>(null);
  const [expandedOption, setExpandedOption] = useState<ObservationResponse | null>(null);
  const [showAlreadySeen, setShowAlreadySeen] = useState(false);
  const [toast, setToast] = useState<{ title: string; emoji: string; label: string; committed: boolean } | null>(null);
  const [pendingUndo, setPendingUndo] = useState<{ index: number } | null>(null);
  const dwellStartRef = useRef<number>(Date.now());
  const toastTimerRef = useRef<NodeJS.Timeout | null>(null);

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

  useEffect(() => {
    dwellStartRef.current = Date.now();
    setExpandedOption(null);
    setShowAlreadySeen(false);
  }, [currentIndex]);

  const showToast = (title: string, emoji: string, label: string, committed: boolean) => {
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    setToast({ title, emoji, label, committed });
    if (committed) {
      toastTimerRef.current = setTimeout(() => {
        setToast(null);
        advanceCard();
      }, 1500);
    } else {
      toastTimerRef.current = setTimeout(() => {
        setToast(null);
        advanceCard();
      }, 1500);
    }
  };

  const dismissToast = () => {
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    setToast(null);
    advanceCard();
  };

  const handleUndo = () => {
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    setToast(null);
    if (pendingUndo) {
      setCurrentIndex(pendingUndo.index);
      setPendingUndo(null);
    }
  };

  const advanceCard = () => {
    setPendingUndo(null);
    if (currentIndex < suggestions.length - 1) {
      setCurrentIndex(i => i + 1);
    }
  };

  const logAndAdvance = async (
    response: ObservationResponse,
    subResponse: string | null,
    userRating?: number | null
  ) => {
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
          response,
          sub_response: subResponse,
          dwell_time_seconds: Math.round(dwellTime * 10) / 10,
          user_rating: userRating ?? null,
        }),
      });
      await fetchHistory();
    } catch (err) {
      console.error('Failed to log observation', err);
    } finally {
      setResponding(false);
    }
  };

  const handleTopLevel = async (option: LikertOption) => {
    if (option.value === 'im_in') {
      // No sub-level, commit immediately
      setPendingUndo({ index: currentIndex });
      await logAndAdvance('im_in', null);
      showToast(current!.title, '✅', `Starting ${current!.title}...`, true);
      return;
    }

    // Toggle sub-level
    if (expandedOption === option.value) {
      setExpandedOption(null);
    } else {
      setExpandedOption(option.value);
      setShowAlreadySeen(false);
    }
  };

  const handleSubLevel = async (response: ObservationResponse, subValue: string) => {
    const opt = LIKERT_OPTIONS.find(o => o.value === response);
    setPendingUndo({ index: currentIndex });
    await logAndAdvance(response, subValue);
    showToast(current!.title, opt?.emoji || '', opt?.label || response, false);
    setExpandedOption(null);
  };

  const handleSkipTopLevel = async () => {
    // No response logged — just advance
    if (currentIndex < suggestions.length - 1) {
      setCurrentIndex(i => i + 1);
    }
  };

  const handleSkipSubLevel = async () => {
    if (!expandedOption) return;
    const opt = LIKERT_OPTIONS.find(o => o.value === expandedOption);
    setPendingUndo({ index: currentIndex });
    await logAndAdvance(expandedOption, null);
    showToast(current!.title, opt?.emoji || '', opt?.label || expandedOption, false);
    setExpandedOption(null);
  };

  const handleAlreadySeen = () => {
    setShowAlreadySeen(true);
    setExpandedOption(null);
  };

  const handleAlreadySeenOption = async (subValue: string) => {
    setPendingUndo({ index: currentIndex });
    await logAndAdvance('already_seen_it', subValue);
    const opt = ALREADY_SEEN_OPTIONS.find(o => o.value === subValue);
    showToast(current!.title, opt?.emoji || '', opt?.label || subValue, false);
    setShowAlreadySeen(false);
  };

  const handleAlreadySeenSkip = async () => {
    setPendingUndo({ index: currentIndex });
    await logAndAdvance('already_seen_it', null);
    showToast(current!.title, '👁️', 'Already seen it', false);
    setShowAlreadySeen(false);
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

  const subLevel = expandedOption ? SUB_LEVELS[expandedOption] : null;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-md mx-auto px-4 py-8 space-y-6">
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
          onPosterClick={() => {
            if (trailerUrl) {
              setTrailerUrl(null); // close trailer if already open
            } else if (current?.trailer_url) {
              setTrailerUrl(current.trailer_url);
            } else {
              setTrailerUrl(null); // no trailer available
            }
          }}
        />

        {/* Likert Question */}
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">Are you interested?</p>

          {/* 5 Likert buttons */}
          <div className="flex flex-wrap gap-2">
            {LIKERT_OPTIONS.map(opt => (
              <button
                key={opt.value}
                onClick={() => handleTopLevel(opt)}
                disabled={responding}
                className={`
                  px-3 py-2 rounded-lg text-xs font-medium border transition-all
                  hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed
                  ${expandedOption === opt.value
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'bg-primary/10 text-primary border-primary/30 hover:bg-primary/20'
                  }
                `}
              >
                {opt.emoji} {opt.label}
              </button>
            ))}
          </div>

          {/* Secondary links */}
          <div className="flex gap-4">
            <button
              onClick={handleAlreadySeen}
              disabled={responding}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50"
            >
              Already seen it
            </button>
            <button
              onClick={handleSkipTopLevel}
              disabled={responding}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50"
            >
              Skip
            </button>
          </div>

          {/* Sub-level expansion */}
          <div
            className={`overflow-hidden transition-all duration-200 ease-in-out ${
              subLevel ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            {subLevel && (
              <div className="rounded-lg border border-border bg-card p-4 space-y-3">
                <p className="text-sm font-medium text-muted-foreground italic">
                  {subLevel.question}
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {subLevel.options.map(sub => (
                    <button
                      key={sub.value}
                      onClick={() => handleSubLevel(expandedOption!, sub.value)}
                      disabled={responding}
                      className="px-3 py-2 rounded-lg text-xs font-medium border border-border bg-background
                        hover:bg-muted transition-all hover:scale-[1.02] active:scale-95
                        disabled:opacity-50 disabled:cursor-not-allowed text-left"
                    >
                      {sub.emoji} {sub.label}
                    </button>
                  ))}
                </div>
                <button
                  onClick={handleSkipSubLevel}
                  disabled={responding}
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50"
                >
                  Skip
                </button>
              </div>
            )}
          </div>

          {/* Already seen expansion */}
          <div
            className={`overflow-hidden transition-all duration-200 ease-in-out ${
              showAlreadySeen ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            {showAlreadySeen && (
              <div className="rounded-lg border border-border bg-card p-4 space-y-3">
                <p className="text-sm font-medium text-muted-foreground italic">
                  How was it?
                </p>
                <div className="grid grid-cols-1 gap-2">
                  {ALREADY_SEEN_OPTIONS.map(sub => (
                    <button
                      key={sub.value}
                      onClick={() => handleAlreadySeenOption(sub.value)}
                      disabled={responding}
                      className="px-3 py-2 rounded-lg text-xs font-medium border border-border bg-background
                        hover:bg-muted transition-all hover:scale-[1.02] active:scale-95
                        disabled:opacity-50 disabled:cursor-not-allowed text-left"
                    >
                      {sub.emoji} {sub.label}
                    </button>
                  ))}
                </div>
                <button
                  onClick={handleAlreadySeenSkip}
                  disabled={responding}
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50"
                >
                  Skip
                </button>
              </div>
            )}
          </div>
        </div>

        {/* History */}
        {history.length > 0 && (
          <HistoryPanel history={history} />
        )}

        {/* Inline Trailer Player */}
        {trailerUrl && current && (
          <div className="rounded-xl overflow-hidden border border-border bg-card">
            <div className="relative w-full aspect-video">
              <iframe
                src={trailerUrl}
                title={`${current.title} trailer`}
                className="w-full h-full"
                allow="autoplay; encrypted-media"
                allowFullScreen
              />
            </div>
            <div className="p-3 flex justify-between items-center">
              <p className="text-sm font-medium">{current.title} — Trailer</p>
              <button
                onClick={() => setTrailerUrl(null)}
                className="text-xs text-muted-foreground hover:text-foreground"
              >
                Close trailer
              </button>
            </div>
          </div>
        )}

        {/* Toast */}
        {toast && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-in slide-in-from-bottom-4 fade-in duration-200">
            <div className="rounded-xl border border-border bg-card shadow-xl px-5 py-3 flex items-center gap-3 min-w-[280px]">
              <span className="text-lg">{toast.emoji}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{toast.title}</p>
                <p className="text-xs text-muted-foreground">{toast.label}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                {!toast.committed && (
                  <button
                    onClick={handleUndo}
                    className="text-xs text-primary hover:underline font-medium"
                  >
                    Undo
                  </button>
                )}
                <button
                  onClick={dismissToast}
                  className="text-xs text-muted-foreground hover:text-foreground"
                >
                  Keep going
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// --- Suggestion Card ---

function SuggestionCard({ suggestion: s, onPosterClick }: { suggestion: Suggestion; onPosterClick: () => void }) {
  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
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
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <div className="absolute top-3 left-3">
          <Badge variant="secondary" className="bg-black/60 text-white border-0 text-[10px] uppercase tracking-wider">
            {s.content_type === 'tv' ? 'TV Series' : 'Movie'}
          </Badge>
        </div>
        <div className="absolute top-3 right-3">
          <Badge variant="secondary" className="bg-black/60 text-white border-0 text-[10px]">
            <Eye className="size-3 mr-1" /> Play trailer
          </Badge>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h2 className="text-white font-semibold text-lg leading-tight">{s.title}</h2>
          {s.episode_label && s.episode_title && (
            <p className="text-white/80 text-sm mt-1">
              {s.episode_label} &mdash; {s.episode_title}
            </p>
          )}
        </div>
      </button>

      <div className="p-4 space-y-3">
        {s.tagline && (
          <p className="text-xs italic text-muted-foreground/70">&ldquo;{s.tagline}&rdquo;</p>
        )}

        <p className="text-sm text-muted-foreground leading-relaxed">
          {s.content_type === 'tv' && s.episode_description
            ? s.episode_description
            : s.overview || 'No description available.'}
        </p>

        {s.content_type === 'tv' && s.episode_description && s.overview && (
          <details className="text-sm">
            <summary className="text-xs text-muted-foreground/60 cursor-pointer hover:text-muted-foreground">
              Series overview
            </summary>
            <p className="text-sm text-muted-foreground mt-1">{s.overview}</p>
          </details>
        )}

        {s.cast.length > 0 && (
          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">Cast</p>
            <p className="text-sm text-muted-foreground">
              {s.cast.map(c => c.name).join(', ')}
            </p>
          </div>
        )}

        <div className="flex items-center gap-3 flex-wrap text-xs text-muted-foreground">
          {s.air_date && (
            <span className="flex items-center gap-1">
              <Clock className="size-3" />
              {formatDate(s.air_date)}
            </span>
          )}
          {s.content_type === 'movie' && s.runtime && (
            <span>{s.runtime} min</span>
          )}
          {s.social_rating != null && (
            <span className="flex items-center gap-1">
              <Star className="size-3 fill-blue-400 text-blue-400" />
              {s.social_rating.toFixed(1)}
            </span>
          )}
        </div>

        {s.genres.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {s.genres.map(g => (
              <Badge key={g} variant="outline" className="text-[10px] px-2 py-0.5">
                {g}
              </Badge>
            ))}
          </div>
        )}

        <div className="rounded-md bg-primary/10 border border-primary/20 px-3 py-2">
          <p className="text-xs text-primary font-medium">{s.personal_score}</p>
        </div>
      </div>
    </div>
  );
}

// --- History Panel ---

function HistoryPanel({ history }: { history: SuggestionLog[] }) {
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
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className="px-2 py-0.5 rounded-full text-[10px] font-medium border bg-primary/10 text-primary border-primary/30">
                  {RESPONSE_LABELS[entry.response] || entry.response}
                </span>
                {expandedId === entry.id
                  ? <ChevronDown className="size-3 text-muted-foreground" />
                  : <ChevronRight className="size-3 text-muted-foreground" />
                }
              </div>
            </button>

            {expandedId === entry.id && (
              <div className="px-3 pb-3 space-y-1">
                {entry.sub_response && (
                  <p className="text-xs text-muted-foreground">
                    Sub-response: {entry.sub_response}
                  </p>
                )}
                <p className="text-[10px] text-muted-foreground/60">
                  Dwell: {entry.dwell_time_seconds?.toFixed(1)}s
                  {entry.revision_count > 0 && ` · revised ${entry.revision_count}x`}
                </p>
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
        {s.backdrop_url && (
          <div className="relative w-full aspect-video">
            <img src={s.backdrop_url} alt={s.title} className="w-full h-full object-cover" />
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

          <div className="flex items-center gap-3 text-xs text-muted-foreground flex-wrap">
            {s.air_date && <span><Clock className="size-3 inline mr-1" />{formatDate(s.air_date)}</span>}
            {s.runtime && <span>{s.runtime} min</span>}
            {s.social_rating != null && (
              <span><Star className="size-3 inline mr-1 fill-blue-400 text-blue-400" />{s.social_rating.toFixed(1)}</span>
            )}
          </div>

          {s.genres.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {s.genres.map(g => (
                <Badge key={g} variant="outline" className="text-[10px]">{g}</Badge>
              ))}
            </div>
          )}

          {s.cast.length > 0 && (
            <div className="space-y-2">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Top billed</p>
              <div className="flex gap-3 overflow-x-auto pb-2">
                {s.cast.map(c => (
                  <div key={c.name} className="flex flex-col items-center gap-1 min-w-[64px]">
                    {c.profile_path ? (
                      <img src={c.profile_path} alt={c.name} className="size-12 rounded-full object-cover bg-muted" />
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

          <div className="rounded-md bg-primary/10 border border-primary/20 px-3 py-2">
            <p className="text-xs text-primary font-medium">{s.personal_score}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// --- Helpers ---

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
