// Original paintings for Evergarden farming seeds.
const EVERGARDEN_SEEDS_ART = new Map<string, string>([
  ['gilded_sunmelon_seed', '/ui/whetstorm/items/gilded_sunmelon_seed.webp'],
  ['evergarden_greens_seed', '/ui/whetstorm/items/evergarden_greens_seed.webp'],
  ['gilded_yam_seed', '/ui/whetstorm/items/gilded_yam_seed.webp'],
  ['evergarden_pumpkin_seed', '/ui/whetstorm/items/evergarden_pumpkin_seed.webp'],
]);

export function evergardenSeedsItemImageUrl(id: string): string | null {
  return EVERGARDEN_SEEDS_ART.get(id) ?? null;
}
