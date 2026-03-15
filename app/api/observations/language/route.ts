import { NextRequest, NextResponse } from 'next/server';
import { logLanguageCapture, getLanguageCaptures } from '@/lib/db';

export async function GET(request: NextRequest) {
  const limit = parseInt(request.nextUrl.searchParams.get('limit') || '200', 10);
  const captures = getLanguageCaptures(limit);
  return NextResponse.json(captures);
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  if (!body.title || !body.tmdb_id || !body.content_type || !body.raw_response) {
    return NextResponse.json(
      { error: 'Missing required fields: title, tmdb_id, content_type, raw_response' },
      { status: 400 }
    );
  }

  const capture = logLanguageCapture({
    content_type: body.content_type,
    title: body.title,
    tmdb_id: body.tmdb_id,
    season_number: body.season_number ?? null,
    episode_number: body.episode_number ?? null,
    raw_response: body.raw_response,
    persona: body.persona ?? null,
    dwell_time_seconds: body.dwell_time_seconds ?? null,
  });

  return NextResponse.json(capture, { status: 201 });
}
