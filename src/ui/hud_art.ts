// Original painted HUD identities from the owner's launch brief. Closed maps
// prevent arbitrary input from becoming a public asset path.
export const HUD_CHROME_ART_IDS = [
  'bags',
  'character',
  'spellbook',
  'talents',
  'questlog',
  'map',
  'social',
  'book',
] as const;
export const HUD_MARKER_ART_IDS = [
  'quest-available',
  'quest-ready',
  'quest-repeat',
  'quest-cooldown',
  'service-mailbox',
  'service-noticeboard',
] as const;
export const HUD_COIN_ART_IDS = ['coin_copper', 'coin_silver', 'coin_gold'] as const;

type HudArtFamily = 'chrome' | 'map-markers' | 'currency';
const catalog: Readonly<Record<HudArtFamily, ReadonlyMap<string, string>>> = {
  chrome: new Map(HUD_CHROME_ART_IDS.map((id) => [id, `/ui/whetstorm/hud/chrome/${id}.webp`])),
  'map-markers': new Map(
    HUD_MARKER_ART_IDS.map((id) => [id, `/ui/whetstorm/hud/map-markers/${id}.webp`]),
  ),
  currency: new Map(HUD_COIN_ART_IDS.map((id) => [id, `/ui/whetstorm/hud/currency/${id}.webp`])),
};

export function hudArtworkUrl(family: HudArtFamily, id: string): string | null {
  return catalog[family].get(id) ?? null;
}
