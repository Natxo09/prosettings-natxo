import { getLeetifyProfile, LeetifyProfile } from '@/lib/leetify-api';
import { NextRequest, NextResponse } from 'next/server';

// In-memory cache for server-side caching
let cachedProfile: LeetifyProfile | null = null;
let cacheTimestamp: number | null = null;
const CACHE_DURATION = 3600000; // 1 hour in milliseconds

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const steamId = searchParams.get('steamId') || process.env.STEAM_ID || '';

  try {
    // Check if cache is valid
    const now = Date.now();
    if (cachedProfile && cacheTimestamp && (now - cacheTimestamp) < CACHE_DURATION) {
      console.log('✅ Returning cached Leetify profile (age: ' + Math.round((now - cacheTimestamp) / 1000) + 's)');
      return NextResponse.json(cachedProfile);
    }

    // Cache expired or doesn't exist, fetch new data
    console.log('🔄 Fetching fresh Leetify profile from API...');
    const profile = await getLeetifyProfile(steamId);

    if (!profile) {
      return NextResponse.json(
        { error: 'Failed to fetch profile' },
        { status: 404 }
      );
    }

    // Update cache
    cachedProfile = profile;
    cacheTimestamp = now;
    console.log('✅ Leetify profile cached successfully');

    return NextResponse.json(profile);
  } catch (error) {
    console.error('Error fetching Leetify profile:', error);

    // If we have cached data, return it even if expired (graceful degradation)
    if (cachedProfile) {
      console.log('⚠️ Error fetching fresh data, returning stale cache');
      return NextResponse.json(cachedProfile);
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
