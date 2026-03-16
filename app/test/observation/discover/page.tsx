'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Star, Clock, Film, Tv, ChevronDown, ChevronRight, Loader2, RefreshCw, Eye } from 'lucide-react';
import { toast } from 'sonner';
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
  original_language: string | null;
}

// --- Response options ---

interface ResponseOption {
  value: ObservationResponse;
  label: string;
  emoji: string;
}

const RESPONSE_OPTIONS: ResponseOption[] = [
  { value: 'im_in', label: "I'm in", emoji: '🙌' },
  { value: 'id_watch_this', label: 'Maybe', emoji: '👀' },
  { value: 'doesnt_grab_me', label: 'Meh', emoji: '😐' },
  { value: 'not_for_me', label: 'No', emoji: '🚫' },
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
      { value: 'the_cast', label: 'Cast', emoji: '🎭' },
      { value: 'the_genre', label: 'Genre', emoji: '🎬' },
      { value: 'the_rating', label: 'Rating', emoji: '⭐' },
      { value: 'the_description', label: 'Description', emoji: '📝' },
    ],
  },
  doesnt_grab_me: {
    question: "What's missing?",
    options: [
      { value: 'wrong_mood', label: 'Wrong mood', emoji: '⏰' },
      { value: 'not_enough_info', label: 'Need info', emoji: '❓' },
      { value: 'not_my_genre', label: 'Not my genre', emoji: '🎬' },
      { value: 'no_appeal', label: 'No appeal', emoji: '🤷' },
    ],
  },
  not_for_me: {
    question: "What's the boundary?",
    options: [
      { value: 'not_my_genre_at_all', label: 'Wrong genre', emoji: '🎬' },
      { value: 'seen_similar', label: 'Seen similar', emoji: '🔄' },
      { value: 'dislike_cast_premise', label: 'Cast/premise', emoji: '😕' },
      { value: 'just_know_no', label: 'Just know', emoji: '🚫' },
    ],
  },
};

const ALREADY_SEEN_OPTIONS: SubOption[] = [
  { value: 'couldnt_stop', label: 'Loved it', emoji: '🔥' },
  { value: 'would_recommend', label: 'Good', emoji: '👍' },
  { value: 'it_was_fine', label: 'Fine', emoji: '😐' },
  { value: 'couldnt_finish', label: 'Nah', emoji: '😬' },
];

const RESPONSE_LABELS: Record<string, string> = Object.fromEntries(
  RESPONSE_OPTIONS.map(o => [o.value, `${o.emoji} ${o.label}`])
);

// --- Strip state ---
type StripMode = 'interest' | 'sub' | 'already_seen';
type SlideDirection = 'left' | 'right' | 'none';

// --- Main Page ---

export default function DiscoverPage() {
  const router = useRouter();
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [history, setHistory] = useState<SuggestionLog[]>([]);
  const [historyHasMore, setHistoryHasMore] = useState(true);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [responding, setResponding] = useState(false);
  const [trailerUrl, setTrailerUrl] = useState<string | null>(null);
  const [stripMode, setStripMode] = useState<StripMode>('interest');
  const [slideDir, setSlideDir] = useState<SlideDirection>('none');
  const [selectedOption, setSelectedOption] = useState<ObservationResponse | null>(null);
  const [editingHistoryId, setEditingHistoryId] = useState<number | null>(null);
  const dwellStartRef = useRef<number>(Date.now());

  const current = suggestions[currentIndex] || null;

  const advanceCard = useCallback(() => {
    setCurrentIndex(prev => prev < (suggestions.length - 1) ? prev + 1 : prev);
  }, [suggestions.length]);

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

  const HISTORY_PAGE_SIZE = 20;
  const historyLengthRef = useRef(0);
  historyLengthRef.current = history.length;

  const fetchHistory = useCallback(async (append = false) => {
    try {
      setHistoryLoading(true);
      const offset = append ? historyLengthRef.current : 0;
      const res = await fetch(`/api/observations?limit=${HISTORY_PAGE_SIZE}&offset=${offset}`);
      const data = await res.json();
      if (append) {
        setHistory(prev => [...prev, ...data]);
      } else {
        setHistory(data);
      }
      setHistoryHasMore(data.length === HISTORY_PAGE_SIZE);
    } catch (err) {
      console.error('Failed to fetch history', err);
    } finally {
      setHistoryLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSuggestions();
    fetchHistory();
  }, [fetchSuggestions, fetchHistory]);

  useEffect(() => {
    dwellStartRef.current = Date.now();
    setStripMode('interest');
    setSlideDir('none');
    setSelectedOption(null);
    setTrailerUrl(null);
  }, [currentIndex]);

  const logObservation = async (
    response: ObservationResponse,
    subResponse: string | null,
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
          user_rating: null,
        }),
      });
      fetchHistory();
    } catch (err) {
      console.error('Failed to log observation', err);
    } finally {
      setResponding(false);
    }
  };

  // --- Handlers ---

  const handleTopLevel = (option: ResponseOption) => {
    if (option.value === 'im_in') {
      // Navigate to proto-end page showing the selection
      const s = current!;
      logObservation('im_in', null);
      const params = new URLSearchParams({
        title: s.title,
        type: s.content_type,
        tmdb_id: String(s.tmdb_id),
      });
      if (s.series_poster_url) params.set('poster', s.series_poster_url);
      else if (s.poster_url) params.set('poster', s.poster_url);
      router.push(`/test/observation/discover/selected?${params.toString()}`);
      return;
    }

    // Has sub-level — slide to sub
    setSelectedOption(option.value);
    setSlideDir('left');
    setStripMode('sub');
  };

  const handleSubLevel = (response: ObservationResponse, subValue: string) => {
    const opt = RESPONSE_OPTIONS.find(o => o.value === response);
    const title = current!.title;
    logObservation(response, subValue);
    toast(`${opt?.emoji || ''} ${title}`, { description: opt?.label || response, duration: 4000 });
    advanceCard();
  };

  const handleSkipSub = () => {
    if (!selectedOption) return;
    const opt = RESPONSE_OPTIONS.find(o => o.value === selectedOption);
    const title = current!.title;
    logObservation(selectedOption, null);
    toast(`${opt?.emoji || ''} ${title}`, { description: opt?.label || selectedOption, duration: 4000 });
    advanceCard();
  };

  const handleAlreadySeen = () => {
    setSlideDir('left');
    setStripMode('already_seen');
    setSelectedOption(null);
  };

  const handleAlreadySeenOption = (subValue: string) => {
    const opt = ALREADY_SEEN_OPTIONS.find(o => o.value === subValue);
    const title = current!.title;
    logObservation('already_seen_it', subValue);
    toast(`${opt?.emoji || ''} ${title}`, { description: opt?.label || subValue, duration: 4000 });
    advanceCard();
  };

  const handleSkip = () => {
    advanceCard();
  };

  const handleBack = () => {
    setSlideDir('right');
    setStripMode('interest');
    setSelectedOption(null);
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

  const subLevel = selectedOption ? SUB_LEVELS[selectedOption] : null;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-md lg:max-w-5xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
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

        <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-8">
          {/* Left column: card with integrated strip */}
          <div>
            <SuggestionCard
              suggestion={current}
              onPosterClick={() => {
                if (trailerUrl) {
                  setTrailerUrl(null);
                } else if (current?.trailer_url) {
                  setTrailerUrl(current.trailer_url);
                }
              }}
              stripMode={stripMode}
              slideDir={slideDir}
              selectedOption={selectedOption}
              subLevel={subLevel}
              responding={responding}
              onTopLevel={handleTopLevel}
              onSubLevel={handleSubLevel}
              onSkipSub={handleSkipSub}
              onAlreadySeen={handleAlreadySeen}
              onAlreadySeenOption={handleAlreadySeenOption}
              onSkip={handleSkip}
              onBack={handleBack}
            />
          </div>

          {/* Right column (desktop) / below card (mobile): history */}
          {history.length > 0 && (
            <div className="mt-6 lg:mt-0 lg:sticky lg:top-8 lg:self-start lg:max-h-[calc(100vh-4rem)] lg:overflow-y-auto">
              <HistoryPanel
                history={history}
                hasMore={historyHasMore}
                loadingMore={historyLoading}
                onLoadMore={() => fetchHistory(true)}
                editingId={editingHistoryId}
                onEditId={setEditingHistoryId}
                onChangeResponse={async (id, response) => {
                  try {
                    await fetch('/api/observations', {
                      method: 'PATCH',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ id, response }),
                    });
                    setEditingHistoryId(null);
                    fetchHistory();
                  } catch (err) {
                    console.error('Failed to update observation', err);
                  }
                }}
              />
            </div>
          )}
        </div>

        {/* Trailer Bottom Sheet */}
        <Sheet open={!!trailerUrl} onOpenChange={(open) => { if (!open) setTrailerUrl(null); }}>
          <SheetContent side="bottom" className="h-[60vh] max-h-[400px] sm:max-h-[500px] p-0 rounded-t-xl">
            <SheetHeader className="px-4 py-3">
              <SheetTitle className="text-sm">{current?.title} &mdash; Trailer</SheetTitle>
            </SheetHeader>
            <div className="flex-1 min-h-0">
              {trailerUrl && (
                <iframe
                  src={trailerUrl}
                  title={`${current?.title} trailer`}
                  className="w-full h-full"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                />
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}

// --- Pill component ---

function Pill({
  emoji,
  label,
  onClick,
  disabled,
  variant = 'default',
}: {
  emoji?: string;
  label: string;
  onClick: () => void;
  disabled?: boolean;
  variant?: 'default' | 'muted';
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        shrink-0 px-3.5 py-1.5 rounded-full text-xs font-medium
        border transition-all duration-150
        hover:scale-105 active:scale-95
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variant === 'muted'
          ? 'border-border/60 text-muted-foreground hover:text-foreground hover:border-border hover:bg-muted/30'
          : 'border-primary/30 bg-primary/10 text-primary hover:bg-primary/20 hover:border-primary/50'
        }
      `}
    >
      {emoji && <span className="mr-1">{emoji}</span>}
      {label}
    </button>
  );
}

// --- Suggestion Card with integrated pill strip ---

interface SuggestionCardProps {
  suggestion: Suggestion;
  onPosterClick: () => void;
  stripMode: StripMode;
  slideDir: SlideDirection;
  selectedOption: ObservationResponse | null;
  subLevel: { question: string; options: { value: string; label: string; emoji: string }[] } | null;
  responding: boolean;
  onTopLevel: (option: ResponseOption) => void;
  onSubLevel: (response: ObservationResponse, subValue: string) => void;
  onSkipSub: () => void;
  onAlreadySeen: () => void;
  onAlreadySeenOption: (subValue: string) => void;
  onSkip: () => void;
  onBack: () => void;
}

function SuggestionCard({
  suggestion: s,
  onPosterClick,
  stripMode,
  slideDir,
  selectedOption,
  subLevel,
  responding,
  onTopLevel,
  onSubLevel,
  onSkipSub,
  onAlreadySeen,
  onAlreadySeenOption,
  onSkip,
  onBack,
}: SuggestionCardProps) {
  // Slide animation classes
  const enterClass = slideDir === 'left'
    ? 'animate-in slide-in-from-right-4 fade-in duration-200'
    : slideDir === 'right'
      ? 'animate-in slide-in-from-left-4 fade-in duration-200'
      : '';

  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      {/* Poster */}
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

      {/* Content */}
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
          <div className="space-y-2">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Cast</p>
            <div className="flex gap-3 overflow-x-auto pb-2 hide-scrollbar">
              {s.cast.map(c => (
                <div key={c.name} className="flex flex-col items-center gap-1 min-w-[64px] max-w-[72px] shrink-0">
                  {c.profile_path ? (
                    <img
                      src={c.profile_path}
                      alt={c.name}
                      loading="lazy"
                      className="size-10 rounded-full object-cover bg-muted"
                    />
                  ) : (
                    <div className="size-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground text-xs">
                      {c.name.charAt(0)}
                    </div>
                  )}
                  <span className="text-[10px] text-center leading-tight max-w-[72px] line-clamp-2">{c.name}</span>
                </div>
              ))}
            </div>
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
          {s.original_language && s.original_language !== 'en' && (
            <span className="flex items-center gap-1">
              🌐 {new Intl.DisplayNames(['en'], { type: 'language' }).of(s.original_language)}
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

      {/* === Pill Strip (card footer) === */}
      <div className="border-t border-border overflow-hidden">
        <div className="px-3 py-2.5 overflow-x-auto hide-scrollbar">
          {/* Interest pills */}
          {stripMode === 'interest' && (
            <div className={`flex items-center gap-2 ${enterClass}`}>
              {RESPONSE_OPTIONS.map((opt) => (
                <Pill
                  key={opt.value}
                  emoji={opt.emoji}
                  label={opt.label}
                  onClick={() => onTopLevel(opt)}
                  disabled={responding}
                />
              ))}
              <Pill emoji="👁" label="Seen it" onClick={onAlreadySeen} disabled={responding} variant="muted" />
              <Pill label="Skip" onClick={onSkip} disabled={responding} variant="muted" />
            </div>
          )}

          {/* Sub-level pills */}
          {stripMode === 'sub' && subLevel && (
            <div className={`flex items-center gap-2 ${enterClass}`}>
              <Pill label="←" onClick={onBack} variant="muted" />
              {subLevel.options.map((sub) => (
                <Pill
                  key={sub.value}
                  emoji={sub.emoji}
                  label={sub.label}
                  onClick={() => onSubLevel(selectedOption!, sub.value)}
                  disabled={responding}
                />
              ))}
              <Pill label="Skip" onClick={onSkipSub} disabled={responding} variant="muted" />
            </div>
          )}

          {/* Already seen pills */}
          {stripMode === 'already_seen' && (
            <div className={`flex items-center gap-2 ${enterClass}`}>
              <Pill label="←" onClick={onBack} variant="muted" />
              {ALREADY_SEEN_OPTIONS.map((sub) => (
                <Pill
                  key={sub.value}
                  emoji={sub.emoji}
                  label={sub.label}
                  onClick={() => onAlreadySeenOption(sub.value)}
                  disabled={responding}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// --- History Panel ---

const ALL_RESPONSE_OPTIONS: ResponseOption[] = [
  ...RESPONSE_OPTIONS,
  { value: 'already_seen_it' as ObservationResponse, label: 'Seen it', emoji: '👁' },
];

function HistoryPanel({
  history,
  hasMore,
  loadingMore,
  onLoadMore,
  editingId,
  onEditId,
  onChangeResponse,
}: {
  history: SuggestionLog[];
  hasMore: boolean;
  loadingMore: boolean;
  onLoadMore: () => void;
  editingId: number | null;
  onEditId: (id: number | null) => void;
  onChangeResponse: (id: number, response: ObservationResponse) => void;
}) {
  return (
    <div className="space-y-2">
      <h3 className="text-sm font-medium text-muted-foreground">Your choices</h3>
      <div className="space-y-1">
        {history.map(entry => (
          <div key={entry.id} className="rounded-lg border border-border bg-card/50">
            <button
              onClick={() => onEditId(editingId === entry.id ? null : entry.id)}
              className="w-full flex items-center justify-between px-3 py-2 text-left"
            >
              <div className="flex items-center gap-2 min-w-0">
                <Badge variant="outline" className="text-[10px] shrink-0">
                  {entry.content_type === 'tv' ? 'TV' : 'Movie'}
                </Badge>
                <span className="text-sm truncate">{entry.title}</span>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className="px-2 py-0.5 rounded-full text-[10px] font-medium border bg-primary/10 text-primary border-primary/30">
                  {RESPONSE_LABELS[entry.response] || entry.response}
                </span>
                {editingId === entry.id
                  ? <ChevronDown className="size-3 text-muted-foreground" />
                  : <ChevronRight className="size-3 text-muted-foreground" />
                }
              </div>
            </button>

            {editingId === entry.id && (
              <div className="px-3 pb-3">
                <p className="text-[10px] text-muted-foreground/60 mb-2">Change your response:</p>
                <div className="flex flex-wrap gap-1.5">
                  {ALL_RESPONSE_OPTIONS.map(opt => (
                    <button
                      key={opt.value}
                      onClick={() => onChangeResponse(entry.id, opt.value)}
                      className={`
                        px-2.5 py-1 rounded-full text-[10px] font-medium border transition-all
                        ${entry.response === opt.value
                          ? 'bg-primary text-primary-foreground border-primary'
                          : 'border-border text-muted-foreground hover:text-foreground hover:border-primary/50 hover:bg-primary/10'
                        }
                      `}
                    >
                      {opt.emoji} {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Load more */}
      {hasMore && (
        <div className="pt-2">
          <Button
            onClick={onLoadMore}
            variant="ghost"
            size="sm"
            className="w-full text-xs text-muted-foreground"
            disabled={loadingMore}
          >
            {loadingMore ? (
              <><Loader2 className="size-3 mr-1.5 animate-spin" /> Loading...</>
            ) : (
              'Load more'
            )}
          </Button>
        </div>
      )}
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
