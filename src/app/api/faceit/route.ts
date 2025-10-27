import { getFaceitPlayerElo } from '@/lib/faceit-api';
import { NextRequest, NextResponse } from 'next/server';

// In-memory cache for server-side caching
let cachedElo: { elo: number; level: number } | null = null;
let cacheTimestamp: number | null = null;
const CACHE_DURATION = 3600000; // 1 hour in milliseconds

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const nickname = searchParams.get('nickname') || 'VGNatxo'; // Default nickname

  try {
    // Check if cache is valid
    const now = Date.now();
    if (cachedElo && cacheTimestamp && (now - cacheTimestamp) < CACHE_DURATION) {
      console.log('✅ Returning cached FACEIT ELO (age: ' + Math.round((now - cacheTimestamp) / 1000) + 's)');
      return NextResponse.json(cachedElo);
    }

    // Cache expired or doesn't exist, fetch new data
    console.log('🔄 Fetching fresh FACEIT ELO from API...');
    const eloData = await getFaceitPlayerElo(nickname);

    if (!eloData) {
      return NextResponse.json(
        { error: 'Failed to fetch FACEIT ELO' },
        { status: 404 }
      );
    }

    // Update cache
    cachedElo = eloData;
    cacheTimestamp = now;
    console.log('✅ FACEIT ELO cached successfully:', eloData);

    return NextResponse.json(eloData);
  } catch (error) {
    console.error('Error fetching FACEIT ELO:', error);

    // If we have cached data, return it even if expired (graceful degradation)
    if (cachedElo) {
      console.log('⚠️ Error fetching fresh data, returning stale cache');
      return NextResponse.json(cachedElo);
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
