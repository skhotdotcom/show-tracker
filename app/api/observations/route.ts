import { NextRequest, NextResponse } from 'next/server';
import { logObservation, getObservations, updateObservationResponse } from '@/lib/db';
import type { ObservationResponse } from '@/types';

const VALID_RESPONSES: ObservationResponse[] = [
  'im_in', 'id_watch_this', 'keep_on_radar',
  'not_tonight', 'not_for_me', 'already_seen_it',
  'im_curious', 'doesnt_grab_me',
];

export async function GET(request: NextRequest) {
  const limit = parseInt(request.nextUrl.searchParams.get('limit') || '50', 10);
  const observations = getObservations(limit);
  return NextResponse.json(observations);
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  if (!body.title || !body.tmdb_id || !body.content_type || !body.response) {
    return NextResponse.json({ error: 'Missing required fields: title, tmdb_id, content_type, response' }, { status: 400 });
  }
  if (!VALID_RESPONSES.includes(body.response)) {
    return NextResponse.json({ error: `Invalid response. Must be one of: ${VALID_RESPONSES.join(', ')}` }, { status: 400 });
  }

  const observation = logObservation({
    content_type: body.content_type,
    title: body.title,
    tmdb_id: body.tmdb_id,
    season_number: body.season_number ?? null,
    episode_number: body.episode_number ?? null,
    episode_title: body.episode_title ?? null,
    episode_description: body.episode_description ?? null,
    social_rating: body.social_rating ?? null,
    personal_score: body.personal_score ?? null,
    response: body.response,
    dwell_time_seconds: body.dwell_time_seconds ?? null,
    user_rating: body.user_rating ?? null,
    sub_response: body.sub_response ?? null,
  });

  return NextResponse.json(observation, { status: 201 });
}

export async function PATCH(request: NextRequest) {
  const body = await request.json();

  if (!body.id || !body.response) {
    return NextResponse.json({ error: 'Missing required fields: id, response' }, { status: 400 });
  }
  if (!VALID_RESPONSES.includes(body.response)) {
    return NextResponse.json({ error: `Invalid response` }, { status: 400 });
  }

  const updated = updateObservationResponse(body.id, body.response, body.user_rating);
  if (!updated) {
    return NextResponse.json({ error: 'Observation not found' }, { status: 404 });
  }

  return NextResponse.json(updated);
}
