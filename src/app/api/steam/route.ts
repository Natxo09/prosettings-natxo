import { getSteamInventory, ProcessedSkin } from '@/lib/steam-api';
import { NextRequest, NextResponse } from 'next/server';

// In-memory cache for server-side caching
let cachedInventory: ProcessedSkin[] | null = null;
let cacheTimestamp: number | null = null;
const CACHE_DURATION = 3600000; // 1 hour in milliseconds

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const steamId64 = searchParams.get('steamId64') || process.env.STEAM_ID_64 || '';

  console.log('🎮 Steam API route called with Steam ID 64:', steamId64);

  try {
    // Check if cache is valid
    const now = Date.now();
    if (cachedInventory && cacheTimestamp && (now - cacheTimestamp) < CACHE_DURATION) {
      console.log('✅ Returning cached Steam inventory (age: ' + Math.round((now - cacheTimestamp) / 1000) + 's)');
      return NextResponse.json(cachedInventory);
    }

    // Cache expired or doesn't exist, fetch new data
    console.log('🔄 Fetching fresh Steam inventory from API...');
    const inventory = await getSteamInventory(steamId64);

    if (!inventory) {
      console.error('❌ getSteamInventory returned null');
      return NextResponse.json(
        { error: 'Failed to fetch Steam inventory. Make sure your inventory is public and STEAM_ID_64 is correct.' },
        { status: 404 }
      );
    }

    // Update cache
    cachedInventory = inventory;
    cacheTimestamp = now;
    console.log(`✅ Steam inventory cached successfully (${inventory.length} items)`);

    return NextResponse.json(inventory);
  } catch (error) {
    console.error('Error fetching Steam inventory:', error);

    // If we have cached data, return it even if expired (graceful degradation)
    if (cachedInventory) {
      console.log('⚠️ Error fetching fresh data, returning stale cache');
      return NextResponse.json(cachedInventory);
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
