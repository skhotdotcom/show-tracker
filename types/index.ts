// types/index.ts — Shared TypeScript interfaces for the show-tracker app.
// DB row types mirror the SQLite schema in lib/db.ts.
// TMDB types mirror the subset of TMDB API v3 responses that we consume.

export type ShowType = 'tv' | 'movie';

export type ShowStatus = 'watching' | 'queued' | 'completed' | 'dropped';

export interface Show {
  id: number;
  tmdb_id: number | null;
  title: string;
  type: ShowType;
  poster_url: string | null;
  backdrop_url: string | null;
  overview: string | null;
  release_date: string | null;
  status: ShowStatus;
  rating: number | null;
  notes: string | null;
  next_season: number | null;
  next_episode: number | null;
  created_at: string;
  updated_at: string;
}

export interface Episode {
  id: number;
  show_id: number;
  season: number;
  episode: number;
  watched_at: string;
}

export interface ChatMessage {
  id: number;
  role: 'user' | 'assistant';
  content: string;
  created_at: string;
}

export interface ChatExtraction {
  id: number;
  message_id: number;
  show_id: number | null;
  show_title: string;
  action: 'add_queue' | 'mark_watching' | 'mark_completed' | 'mark_dropped';
}

export interface TMDBSearchResult {
  id: number;
  title?: string;
  name?: string;
  poster_path: string | null;
  backdrop_path: string | null;
  overview: string;
  release_date?: string;
  first_air_date?: string;
  media_type?: ShowType;
  vote_average: number;
}

export interface TMDBShowDetails {
  id: number;
  title?: string;
  name?: string;
  poster_path: string | null;
  backdrop_path: string | null;
  overview: string;
  release_date?: string;
  first_air_date?: string;
  status?: string;
  number_of_seasons?: number;
  number_of_episodes?: number;
  seasons?: TMDBSeason[];
  next_episode_to_air?: TMDBEpisode | null;
}

export interface TMDBSeason {
  id: number;
  season_number: number;
  episode_count: number;
  air_date: string;
}

export interface TMDBEpisode {
  id: number;
  season_number: number;
  episode_number: number;
  air_date: string;
  name: string;
}

export interface AIRecommendation {
  title: string;
  type: ShowType;
  reason: string;
}