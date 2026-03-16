// lib/tmdb.ts — Thin wrapper around the TMDB v3 REST API.
// All requests are authenticated via the TMDB_API_KEY environment variable.
// Image helpers (getPosterUrl, getBackdropUrl) build CDN URLs for a given size.

const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p';

export function getTmdbApiKey(): string {
  const apiKey = process.env.TMDB_API_KEY;
  if (!apiKey) {
    throw new Error('TMDB_API_KEY environment variable is not set');
  }
  return apiKey;
}

export async function tmdbFetch(endpoint: string, params: Record<string, string> = {}) {
  const apiKey = getTmdbApiKey();
  const url = new URL(`${TMDB_BASE_URL}${endpoint}`);
  url.searchParams.set('api_key', apiKey);
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.set(key, value);
  });

  const response = await fetch(url.toString());
  if (!response.ok) {
    throw new Error(`TMDB API error: ${response.status}`);
  }
  return response.json();
}

export function getPosterUrl(path: string | null, size: 'w92' | 'w185' | 'w342' | 'w500' | 'original' = 'w342'): string | null {
  if (!path) return null;
  return `${TMDB_IMAGE_BASE}/${size}${path}`;
}

export function getBackdropUrl(path: string | null, size: 'w300' | 'w780' | 'w1280' | 'original' = 'w780'): string | null {
  if (!path) return null;
  return `${TMDB_IMAGE_BASE}/${size}${path}`;
}

export async function searchMulti(query: string) {
  const data = await tmdbFetch('/search/multi', { query });
  return data.results.filter((r: any) => r.media_type === 'tv' || r.media_type === 'movie');
}

export async function searchShow(query: string, type: 'tv' | 'movie' = 'tv') {
  return tmdbFetch(`/search/${type}`, { query });
}

export async function getShowDetails(tmdbId: number, type: 'tv' | 'movie') {
  return tmdbFetch(`/${type}/${tmdbId}`);
}

export async function getSimilarShows(tmdbId: number, type: 'tv' | 'movie') {
  return tmdbFetch(`/${type}/${tmdbId}/similar`);
}

export async function getRecommendationsFromTMDB(tmdbId: number, type: 'tv' | 'movie') {
  return tmdbFetch(`/${type}/${tmdbId}/recommendations`);
}

export async function getUpcomingEpisodes(tmdbId: number) {
  const details = await tmdbFetch(`/tv/${tmdbId}`);
  return details.next_episode_to_air || null;
}

export async function getEpisodeDetails(tmdbId: number, season: number, episode: number) {
  return tmdbFetch(`/tv/${tmdbId}/season/${season}/episode/${episode}`);
}

export async function getSeasonEpisodeCount(tmdbId: number, season: number): Promise<number> {
  const data = await tmdbFetch(`/tv/${tmdbId}/season/${season}`);
  return (data.episodes as any[])?.length ?? 0;
}

export async function getTrending(type: 'tv' | 'movie' | 'all' = 'all') {
  return tmdbFetch(`/trending/${type}/week`);
}

export async function getPopular(type: 'tv' | 'movie' = 'tv') {
  return tmdbFetch(`/${type}/popular`);
}

export async function getCredits(tmdbId: number, type: 'tv' | 'movie') {
  return tmdbFetch(`/${type}/${tmdbId}/credits`);
}

export async function getVideos(tmdbId: number, type: 'tv' | 'movie') {
  const data = await tmdbFetch(`/${type}/${tmdbId}/videos`);
  return data.results || [];
}

export function getTrailerUrl(videos: any[]): string | null {
  const trailer = videos.find(
    (v: any) => v.type === 'Trailer' && v.site === 'YouTube' && v.official
  ) || videos.find(
    (v: any) => v.type === 'Trailer' && v.site === 'YouTube'
  ) || videos.find(
    (v: any) => v.site === 'YouTube'
  );
  if (!trailer) return null;
  return `https://www.youtube.com/embed/${trailer.key}?autoplay=1&mute=1`;
}