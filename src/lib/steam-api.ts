const STEAM_API_KEY = process.env.STEAM_API_KEY;
const STEAM_ID_64 = process.env.STEAM_ID_64;
const STEAM_COOKIES = process.env.STEAM_COOKIES; 


export interface SteamInventoryItem {
  assetid: string;
  classid: string;
  instanceid: string;
  amount: string;
  hideInChina?: number;
}

export interface SteamInventoryDescription {
  appid: number;
  classid: string;
  instanceid: string;
  currency: number;
  background_color: string;
  icon_url: string;
  icon_url_large?: string;
  descriptions: Array<{
    type: string;
    value: string;
    color?: string;
    name?: string;
  }>;
  tradable: number;
  marketable: number;
  market_name: string;
  market_hash_name: string;
  name: string;
  name_color?: string;
  type: string;
  tags: Array<{
    category: string;
    internal_name: string;
    localized_category_name: string;
    localized_tag_name: string;
    color?: string;
  }>;
  actions?: Array<{
    link: string;
    name: string;
  }>;
}

export interface AssetProperty {
  propertyid: number;
  float_value?: number;
  int_value?: number;
  name: string;
}

export interface AssetPropertyData {
  appid: number;
  contextid: string;
  assetid: string;
  asset_properties: AssetProperty[];
}

export interface SteamInventoryResponse {
  assets?: SteamInventoryItem[];
  descriptions?: SteamInventoryDescription[];
  asset_properties?: AssetPropertyData[];
  total_inventory_count: number;
  success: number;
  rwgrsn: number;
}

export interface Sticker {
  name: string;
  image: string;
}

export interface Charm {
  name: string;
  image: string;
}

export interface ProcessedSkin {
  assetid: string;
  name: string;
  market_name: string;
  type: string;
  rarity: string;
  rarity_color?: string;
  exterior?: string;
  image: string;
  image_large: string;
  statTrak: boolean;
  souvenir: boolean;
  tradable: boolean;
  marketable: boolean;
  stickers: Sticker[];
  charm?: Charm;
  floatValue?: number;
  patternTemplate?: number;
}

/**
 * Parse stickers from HTML description
 */
function parseStickers(descriptions: SteamInventoryDescription['descriptions']): Sticker[] {
  if (!descriptions) return [];

  const stickerInfo = descriptions.find(d => d.name === 'sticker_info');
  if (!stickerInfo || !stickerInfo.value) return [];

  const stickers: Sticker[] = [];
  const html = stickerInfo.value;

  // Regex to extract img tags with src and title
  const imgRegex = /<img[^>]+src="([^"]+)"[^>]+title="([^"]+)"/g;
  let match;

  while ((match = imgRegex.exec(html)) !== null) {
    stickers.push({
      image: match[1],
      name: match[2].replace('Sticker: ', ''), // Remove "Sticker: " prefix
    });
  }

  return stickers;
}

/**
 * Parse charm (keychain) from HTML description
 */
function parseCharm(descriptions: SteamInventoryDescription['descriptions']): Charm | undefined {
  if (!descriptions) return undefined;

  const keychainInfo = descriptions.find(d => d.name === 'keychain_info');
  if (!keychainInfo || !keychainInfo.value) return undefined;

  const html = keychainInfo.value;

  // Regex to extract img tag with src and title
  const imgRegex = /<img[^>]+src="([^"]+)"[^>]+title="([^"]+)"/;
  const match = imgRegex.exec(html);

  if (match) {
    return {
      image: match[1],
      name: match[2].replace('Charm: ', ''), // Remove "Charm: " prefix
    };
  }

  return undefined;
}

/**
 * Check if item is a collectible (medal, coin, trophy)
 */
function isCollectible(item: ProcessedSkin): boolean {
  const type = item.type.toLowerCase();
  const name = item.name.toLowerCase();

  return type.includes('collectible')
    || type.includes('display item')
    || name.includes('service medal')
    || name.includes('coin')
    || name.includes('trophy');
}

/**
 * Get rarity weight for sorting (higher = rarer/better)
 */
function getRarityWeight(rarity: string, rarityColor?: string, item?: ProcessedSkin): number {
  // Collectibles (medals, coins) go to the bottom even if "Extraordinary"
  if (item && isCollectible(item)) {
    return -1; // Lowest priority
  }

  const rarityLower = rarity.toLowerCase();

  // Knives, gloves, and other extraordinarily rare items
  if (rarityColor === 'e4ae39' ||
      rarityLower.includes('extraordinary') ||
      rarityLower.includes('★')) {
    return 7;
  }

  // Covert (Red)
  if (rarityColor === 'eb4b4b' || rarityLower.includes('covert')) {
    return 6;
  }

  // Classified (Pink)
  if (rarityColor === 'd32ce6' || rarityLower.includes('classified')) {
    return 5;
  }

  // Restricted (Purple)
  if (rarityColor === '8847ff' || rarityLower.includes('restricted')) {
    return 4;
  }

  // Mil-Spec (Blue)
  if (rarityColor === '4b69ff' || rarityLower.includes('mil-spec')) {
    return 3;
  }

  // Industrial Grade (Light Blue)
  if (rarityColor === '5e98d9' || rarityLower.includes('industrial')) {
    return 2;
  }

  // Consumer Grade (White/Gray)
  if (rarityColor === 'b0c3d9' || rarityLower.includes('consumer')) {
    return 1;
  }

  // Default/Unknown
  return 0;
}

/**
 * Get CS2/CSGO inventory from Steam Community
 * Uses the public inventory API (requires public inventory)
 */
export async function getSteamInventory(steamId64?: string): Promise<ProcessedSkin[] | null> {
  const userId = steamId64 || STEAM_ID_64;
  if (!userId) {
    console.error('❌ Steam ID 64 is required. Please set STEAM_ID_64 in .env');
    return null;
  }

  console.log('🔍 Fetching Steam inventory for Steam ID:', userId);

  const BASE = `https://steamcommunity.com/inventory/${userId}/730/2`;
  const LANG = 'english';
  const PAGE_COUNT = 2000; // <= bajamos de 5000 para evitar 400
  let start: string | undefined = undefined;

  const headers: Record<string, string> = {
    'User-Agent':
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
    'Accept': 'application/json',
    'Accept-Language': 'en-US,en;q=0.9',
    'Referer': 'https://steamcommunity.com/', // <= ayuda a evitar 400
  };
  if (STEAM_COOKIES) headers['Cookie'] = STEAM_COOKIES;

  const allAssets: SteamInventoryItem[] = [];
  const allDescriptions: SteamInventoryDescription[] = [];
  const allAssetProperties: AssetPropertyData[] = [];

  // Pequeño helper de reintentos
  async function fetchWithRetry(url: string, tries = 4): Promise<Response> {
    let attempt = 0;
    while (true) {
      attempt++;
      const res = await fetch(url, { headers, cache: 'no-store' });
      if (res.ok) return res;

      // Si 400/429/5xx reintenta con backoff
      if ((res.status === 400 || res.status === 429 || res.status >= 500) && attempt < tries) {
        const waitMs = 500 * attempt + Math.floor(Math.random() * 200);
        console.warn(`⚠️ ${res.status} on ${url} — retrying in ${waitMs}ms (attempt ${attempt}/${tries})`);
        await new Promise(r => setTimeout(r, waitMs));
        continue;
      }

      // Log de error útil
      const txt = await res.text().catch(() => '');
      console.error(`❌ Steam API error: ${res.status} ${res.statusText}`);
      console.error('Error details:', txt || '(empty body)');
      throw new Error(`HTTP_${res.status}`);
    }
  }

  try {
    while (true) {
      const url =
        `${BASE}?l=${encodeURIComponent(LANG)}&count=${PAGE_COUNT}` +
        (start ? `&start_assetid=${start}` : '');

      console.log('📡 Steam API URL:', url);
      const response = await fetchWithRetry(url);
      console.log('📥 Steam API Response Status:', response.status, response.statusText);

      const data: SteamInventoryResponse = await response.json();

      // Algunos 400/privado devuelven success: false
      if (!data || (data as any).success === false) {
        console.error('❌ Invalid Steam inventory response (success:false o vacío)');
        return null;
      }

      if (Array.isArray(data.assets)) allAssets.push(...data.assets);
      if (Array.isArray(data.descriptions)) allDescriptions.push(...data.descriptions);
      if (Array.isArray(data.asset_properties)) allAssetProperties.push(...data.asset_properties);

      // Paginación
      const more = (data as any).more_items;
      const last = (data as any).last_assetid as string | undefined;
      if (!more || !last) break;
      start = last;

      // Rate-limit friendly delay
      await new Promise(r => setTimeout(r, 800));
    }

    if (!allAssets.length || !allDescriptions.length) {
      console.error('❌ No assets/descriptions found');
      return null;
    }

    // Índice de descriptions por (classid, instanceid)
    const descIndex = new Map<string, SteamInventoryDescription>();
    for (const d of allDescriptions) {
      descIndex.set(`${d.classid}:${d.instanceid || '0'}`, d);
    }

    // Índice de asset_properties por assetid
    const propsIndex = new Map<string, AssetPropertyData>();
    for (const prop of allAssetProperties) {
      propsIndex.set(prop.assetid, prop);
    }

    const processedItems: ProcessedSkin[] = allAssets
      .map(asset => {
        const key = `${asset.classid}:${asset.instanceid || '0'}`;
        const description = descIndex.get(key);
        if (!description) return null;

        const rarityTag = description.tags?.find(t => t.category === 'Rarity');
        const exteriorTag = description.tags?.find(t => t.category === 'Exterior');
        const typeTag = description.tags?.find(t => t.category === 'Type');

        const isStatTrak = !!description.market_name?.includes('StatTrak™');
        const isSouvenir = !!description.market_name?.includes('Souvenir');
        const stickers = parseStickers(description.descriptions);
        const charm = parseCharm(description.descriptions);

        // Get float and pattern from asset_properties
        const assetProps = propsIndex.get(asset.assetid);
        let floatValue: number | undefined;
        let patternTemplate: number | undefined;

        if (assetProps?.asset_properties) {
          const wearRating = assetProps.asset_properties.find(p => p.name === 'Wear Rating');
          const pattern = assetProps.asset_properties.find(p => p.name === 'Pattern Template');
          const charmTemplate = assetProps.asset_properties.find(p => p.name === 'Charm Template');

          if (wearRating?.float_value !== undefined) {
            floatValue = wearRating.float_value;
          }
          // Use Pattern Template for skins or Charm Template for charms
          if (pattern?.int_value !== undefined) {
            patternTemplate = pattern.int_value;
          } else if (charmTemplate?.int_value !== undefined) {
            patternTemplate = charmTemplate.int_value;
          }
        }

        return {
          assetid: asset.assetid,
          name: description.name,
          market_name: description.market_name,
          type: typeTag?.localized_tag_name || description.type,
          rarity: rarityTag?.localized_tag_name || 'Unknown',
          rarity_color: rarityTag?.color,
          exterior: exteriorTag?.localized_tag_name,
          image: `https://community.cloudflare.steamstatic.com/economy/image/${description.icon_url}`,
          image_large: description.icon_url_large
            ? `https://community.cloudflare.steamstatic.com/economy/image/${description.icon_url_large}`
            : `https://community.cloudflare.steamstatic.com/economy/image/${description.icon_url}`,
          statTrak: isStatTrak,
          souvenir: isSouvenir,
          tradable: description.tradable === 1,
          marketable: description.marketable === 1,
          stickers,
          charm,
          floatValue,
          patternTemplate,
        } as ProcessedSkin;
      })
      .filter((x): x is ProcessedSkin => !!x)
      // Filtrado: excluir stickers, cajas, llaves, etc. pero INCLUIR medallas
      .filter(item => {
        const type = item.type.toLowerCase();

        return !type.includes('sticker')
          && !type.includes('case')
          && !type.includes('key')
          && !type.includes('patch')
          && !type.includes('pin')
          && !type.includes('music kit')
          && !type.includes('graffiti')
          && !type.includes('tool');
      });

    // Sort by rarity (highest to lowest quality)
    const sortedItems = processedItems.sort((a, b) => {
      const weightA = getRarityWeight(a.rarity, a.rarity_color, a);
      const weightB = getRarityWeight(b.rarity, b.rarity_color, b);

      // Primary sort: by rarity weight (descending)
      if (weightB !== weightA) {
        return weightB - weightA;
      }

      // Secondary sort: StatTrak items first
      if (a.statTrak !== b.statTrak) {
        return a.statTrak ? -1 : 1;
      }

      // Tertiary sort: alphabetically by name
      return a.market_name.localeCompare(b.market_name);
    });

    console.log(`✅ Steam inventory loaded: ${sortedItems.length} skins found (sorted by rarity)`);
    return sortedItems;
  } catch (err) {
    console.error('Error fetching Steam inventory:', err);
    return null;
  }
}