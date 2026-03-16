'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { Suspense } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, ArrowLeft, Tv, Film } from 'lucide-react';

function SelectedContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const title = searchParams.get('title') || 'Unknown';
  const posterUrl = searchParams.get('poster');
  const contentType = searchParams.get('type') || 'tv';
  const tmdbId = searchParams.get('tmdb_id');

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
      <div className="max-w-sm w-full mx-auto px-4">
        <div className="flex flex-col items-center gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {/* Success icon */}
          <div className="size-16 rounded-full bg-primary/20 flex items-center justify-center">
            <CheckCircle className="size-8 text-primary" />
          </div>

          {/* Poster */}
          {posterUrl && (
            <div className="rounded-xl overflow-hidden shadow-2xl shadow-primary/10 border border-border">
              <img
                src={posterUrl}
                alt={title}
                className="w-48 aspect-[2/3] object-cover"
              />
            </div>
          )}

          {/* Title */}
          <div className="text-center space-y-2">
            <Badge variant="outline" className="text-[10px] uppercase tracking-wider">
              {contentType === 'tv' ? 'TV Series' : 'Movie'}
            </Badge>
            <h1 className="text-xl font-semibold">{title}</h1>
            <p className="text-sm text-muted-foreground">
              Added to your watchlist
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-2 w-full mt-4">
            <Button
              onClick={() => router.push('/test/observation/discover')}
              className="w-full"
            >
              Keep browsing
            </Button>
            <Button
              onClick={() => router.back()}
              variant="ghost"
              size="sm"
              className="text-muted-foreground"
            >
              <ArrowLeft className="size-3.5 mr-1.5" />
              Go back
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SelectedPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground text-sm">Loading...</p>
      </div>
    }>
      <SelectedContent />
    </Suspense>
  );
}
