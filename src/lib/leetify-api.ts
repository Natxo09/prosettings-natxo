const LEETIFY_API_KEY = process.env.LEETIFY_API_KEY;
const BASE_URL = 'https://api-public.cs-prod.leetify.com';

export interface LeetifyBan {
  platform: string;
  platform_nickname: string;
  banned_since: string;
}

export interface LeetifyRanks {
  leetify: number;
  premier: number;           // CS2 Premier rank
  faceit: number | null;
  faceit_elo: number | null;
  wingman: number;
  renown: number | null;
  competitive: Array<{
    map_name: string;
    rank: number;
  }>;
}

export interface LeetifyRating {
  aim: number;
  positioning: number;
  utility: number;
  clutch: number;
  opening: number;
  ct_leetify: number;
  t_leetify: number;
}

export interface LeetifyStats {
  accuracy_enemy_spotted: number;
  accuracy_head: number;
  counter_strafing_good_shots_ratio: number;
  ct_opening_aggression_success_rate: number;
  ct_opening_duel_success_percentage: number;
  flashbang_hit_foe_avg_duration: number;
  flashbang_hit_foe_per_flashbang: number;
  flashbang_hit_friend_per_flashbang: number;
  flashbang_leading_to_kill: number;
  flashbang_thrown: number;
  he_foes_damage_avg: number;
  he_friends_damage_avg: number;
  preaim: number;
  reaction_time_ms: number;
  spray_accuracy: number;
  t_opening_aggression_success_rate: number;
  t_opening_duel_success_percentage: number;
  traded_deaths_success_percentage: number;
  trade_kill_opportunities_per_round: number;
  trade_kills_success_percentage: number;
  utility_on_death_avg: number;
}

export interface LeetifyRecentMatch {
  id: string;
  finished_at: string;
  data_source: string;
  outcome: 'win' | 'loss' | 'tie';
  rank: number;
  rank_type: string | null;
  map_name: string;
  leetify_rating: number;
  score: [number, number];
  preaim: number;
  reaction_time_ms: number;
  accuracy_enemy_spotted: number;
  accuracy_head: number;
  spray_accuracy: number;
}

export interface LeetifyRecentTeammate {
  steam64_id: string;
  recent_matches_count: number;
}

export interface LeetifyProfile {
  privacy_mode: string;
  winrate: number;
  total_matches: number;
  first_match_date: string;
  name: string;
  bans: LeetifyBan[];
  steam64_id: string;
  id: string;
  ranks: LeetifyRanks;
  rating: LeetifyRating;
  stats: LeetifyStats;
  recent_matches: LeetifyRecentMatch[];
  recent_teammates: LeetifyRecentTeammate[];
}

/**
 * Get player profile from Leetify
 */
export async function getLeetifyProfile(steam64Id: string): Promise<LeetifyProfile | null> {
  const url = `${BASE_URL}/v3/profile?steam64_id=${steam64Id}`;

  try {
    const response = await fetch(url, {
      headers: {
        '_leetify_key': LEETIFY_API_KEY || '',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      console.error(`Leetify API error: ${response.status} ${response.statusText}`);
      return null;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching Leetify profile:', error);
    return null;
  }
}
