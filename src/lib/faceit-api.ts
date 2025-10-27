const FACEIT_API_KEY = process.env.FACEIT_API_KEY;
const BASE_URL = 'https://open.faceit.com/data/v4';

export interface FaceitPlayer {
  player_id: string;
  nickname: string;
  avatar: string;
  country: string;
  games: {
    [key: string]: {
      region: string;
      game_player_id: string;
      skill_level: number;
      faceit_elo: number;
      game_player_name: string;
      skill_level_label: string;
      regions: {
        [key: string]: {
          selected_ladder_id: string;
        };
      };
    };
  };
}

export interface FaceitPlayerStats {
  player_id: string;
  game_id: string;
  lifetime: {
    'Recent Results': string[];
    'Win Rate %': string;
    Wins: string;
    'Average K/D Ratio': string;
    'K/D Ratio': string;
    Matches: string;
    'Average Headshots %': string;
    'Total Headshots %': string;
    'Current Winning Streak': string;
    'Longest Win Streak': string;
    [key: string]: string | string[];
  };
  segments: Array<{
    label: string;
    stats: {
      [key: string]: string;
    };
  }>;
}

/**
 * Get player data by nickname
 */
export async function getFaceitPlayer(nickname: string): Promise<FaceitPlayer | null> {
  const url = `${BASE_URL}/players?nickname=${encodeURIComponent(nickname)}`;

  try {
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${FACEIT_API_KEY}`,
        'Accept': 'application/json',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      console.error(`FACEIT API error: ${response.status} ${response.statusText}`);
      return null;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching FACEIT player:', error);
    return null;
  }
}

/**
 * Get player statistics for a specific game
 */
export async function getFaceitPlayerStats(playerId: string, gameId: string = 'cs2'): Promise<FaceitPlayerStats | null> {
  const url = `${BASE_URL}/players/${playerId}/stats/${gameId}`;

  try {
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${FACEIT_API_KEY}`,
        'Accept': 'application/json',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      console.error(`FACEIT Stats API error: ${response.status} ${response.statusText}`);
      return null;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching FACEIT stats:', error);
    return null;
  }
}

/**
 * Get player ELO and level for CS2
 */
export async function getFaceitPlayerElo(nickname: string): Promise<{ elo: number; level: number } | null> {
  try {
    const player = await getFaceitPlayer(nickname);

    if (!player) {
      return null;
    }

    // Check for CS2 first, fallback to CSGO
    const cs2Data = player.games?.cs2 || player.games?.csgo;

    if (!cs2Data) {
      console.error('No CS2/CSGO data found for player');
      return null;
    }

    return {
      elo: cs2Data.faceit_elo,
      level: cs2Data.skill_level,
    };
  } catch (error) {
    console.error('Error fetching FACEIT ELO:', error);
    return null;
  }
}
