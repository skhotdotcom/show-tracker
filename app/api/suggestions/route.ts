import { NextResponse } from 'next/server';
import { getTrending, getShowDetails, getEpisodeDetails, getCredits, getVideos, getEpisodeVideos, getSeasonVideos, getTrailerUrl, getPosterUrl, getBackdropUrl } from '@/lib/tmdb';
import { getAllShows, getWatchPatterns, getObservedTmdbIds } from '@/lib/db';

// Returns a batch of suggestion cards (mix of TV episodes and movies)
// enriched with episode-level data for TV shows.
export async function GET() {
  try {
    const [tvTrending, movieTrending] = await Promise.all([
      getTrending('tv'),
      getTrending('movie'),
    ]);

    const existingShows = getAllShows();
    const existingTmdbIds = new Set(existingShows.map(s => s.tmdb_id));
    const observedTmdbIds = getObservedTmdbIds();
    const patterns = getWatchPatterns();

    // Filter out shows already in the user's library or previously observed
    const tvResults = (tvTrending.results || [])
      .filter((r: any) => !existingTmdbIds.has(r.id) && !observedTmdbIds.has(r.id))
      .slice(0, 5);
    const movieResults = (movieTrending.results || [])
      .filter((r: any) => !existingTmdbIds.has(r.id) && !observedTmdbIds.has(r.id))
      .slice(0, 5);

    // Build suggestion cards
    const suggestions = await Promise.all([
      ...tvResults.map(async (show: any) => {
        try {
          const details = await getShowDetails(show.id, 'tv');
          const genres = (details.genres || []).map((g: any) => g.name);

          // Always start at S1E1 — users wouldn't start a series in the middle
          let episodeData: any = null;
          let episodePoster: string | null = null;
          try {
            episodeData = await getEpisodeDetails(show.id, 1, 1);
            episodePoster = episodeData.still_path
              ? getPosterUrl(episodeData.still_path, 'w500')
              : null;
          } catch { /* fallback to series poster */ }

          // Get top-billed cast
          let cast: any[] = [];
          try {
            const credits = await getCredits(show.id, 'tv');
            cast = (credits.cast || []).slice(0, 5).map((c: any) => ({
              name: c.name,
              character: c.character,
              profile_path: c.profile_path ? getPosterUrl(c.profile_path, 'w185') : null,
            }));
          } catch { /* no cast */ }

          // Personal score based on genre match
          const personalScore = computePersonalScore(genres, patterns, existingShows);

          // Get trailer — try episode-specific, then season, then series
          let trailerUrl: string | null = null;
          try {
            if (episodeData) {
              const epVideos = await getEpisodeVideos(show.id, episodeData.season_number, episodeData.episode_number);
              trailerUrl = getTrailerUrl(epVideos);
            }
            if (!trailerUrl) {
              const seasonVideos = await getSeasonVideos(show.id, episodeData?.season_number || 1);
              trailerUrl = getTrailerUrl(seasonVideos);
            }
            if (!trailerUrl) {
              const seriesVideos = await getVideos(show.id, 'tv');
              trailerUrl = getTrailerUrl(seriesVideos);
            }
          } catch { /* no trailer */ }

          return {
            content_type: 'tv' as const,
            tmdb_id: show.id,
            title: details.name || show.name,
            poster_url: episodePoster || getPosterUrl(show.poster_path),
            series_poster_url: getPosterUrl(show.poster_path),
            backdrop_url: getBackdropUrl(show.backdrop_path, 'w1280'),
            overview: details.overview,
            episode_title: episodeData?.name || null,
            episode_description: episodeData?.overview || null,
            episode_label: episodeData
              ? `S${episodeData.season_number}E${String(episodeData.episode_number).padStart(2, '0')}`
              : null,
            season_number: episodeData?.season_number || null,
            episode_number: episodeData?.episode_number || null,
            air_date: episodeData?.air_date || details.first_air_date,
            social_rating: details.vote_average || show.vote_average,
            genres,
            personal_score: personalScore,
            cast,
            tagline: details.tagline || null,
            trailer_url: trailerUrl,
            original_language: details.original_language || show.original_language || null,
          };
        } catch {
          return null;
        }
      }),
      ...movieResults.map(async (movie: any) => {
        try {
          const details = await getShowDetails(movie.id, 'movie');
          const genres = (details.genres || []).map((g: any) => g.name);

          // Get top-billed cast
          let cast: any[] = [];
          try {
            const credits = await getCredits(movie.id, 'movie');
            cast = (credits.cast || []).slice(0, 5).map((c: any) => ({
              name: c.name,
              character: c.character,
              profile_path: c.profile_path ? getPosterUrl(c.profile_path, 'w185') : null,
            }));
          } catch { /* no cast */ }

          const personalScore = computePersonalScore(genres, patterns, existingShows);

          // Get trailer
          let trailerUrl: string | null = null;
          try {
            const videos = await getVideos(movie.id, 'movie');
            trailerUrl = getTrailerUrl(videos);
          } catch { /* no trailer */ }

          return {
            content_type: 'movie' as const,
            tmdb_id: movie.id,
            title: details.title || movie.title,
            poster_url: getPosterUrl(movie.poster_path, 'w500'),
            series_poster_url: null,
            backdrop_url: getBackdropUrl(movie.backdrop_path, 'w1280'),
            overview: details.overview,
            episode_title: null,
            episode_description: null,
            episode_label: null,
            season_number: null,
            episode_number: null,
            air_date: details.release_date || movie.release_date,
            social_rating: details.vote_average || movie.vote_average,
            genres,
            personal_score: personalScore,
            cast,
            tagline: details.tagline || null,
            runtime: details.runtime || null,
            trailer_url: trailerUrl,
            original_language: details.original_language || movie.original_language || null,
          };
        } catch {
          return null;
        }
      }),
    ]);

    // Filter nulls and shuffle
    const valid = suggestions.filter(Boolean);
    for (let i = valid.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [valid[i], valid[j]] = [valid[j], valid[i]];
    }

    return NextResponse.json(valid);
  } catch (error: any) {
    console.error('Suggestions API error:', error);
    return NextResponse.json({ error: error.message || 'Failed to fetch suggestions' }, { status: 500 });
  }
}

function computePersonalScore(
  genres: string[],
  patterns: { genre: string; avgUserRating: number | null; count: number }[],
  existingShows: any[]
): string {
  // Find matching genre patterns
  const matchingPatterns = patterns.filter(p => genres.includes(p.genre));
  if (matchingPatterns.length === 0) {
    return "New territory for you — give it a try";
  }

  // Weighted average of user ratings for matching genres
  let totalWeight = 0;
  let weightedSum = 0;
  for (const p of matchingPatterns) {
    if (p.avgUserRating != null) {
      weightedSum += p.avgUserRating * p.count;
      totalWeight += p.count;
    }
  }

  if (totalWeight === 0) {
    const topGenre = matchingPatterns[0].genre;
    return `You track ${topGenre} — this might click`;
  }

  const predicted = Math.round(weightedSum / totalWeight);
  const clamped = Math.max(1, Math.min(5, predicted));

  // Find a similar highly-rated show
  const highRated = existingShows.find(s => {
    if (!s.genres || !s.rating || s.rating < 4) return false;
    try {
      const showGenres = JSON.parse(s.genres);
      return genres.some((g: string) => showGenres.includes(g));
    } catch { return false; }
  });

  if (highRated) {
    return `We think you'll rate this ${clamped}/5 based on your history with ${highRated.title}`;
  }
  return `We think you'll rate this ${clamped}/5 based on your watch patterns`;
}
