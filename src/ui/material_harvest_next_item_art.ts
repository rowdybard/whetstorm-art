// Original harvest material paintings in a closed map.
const ART = new Map<string, string>([
  ['pristine_silk', '/ui/whetstorm/items/pristine_silk.webp'],
  ['venom_gland', '/ui/whetstorm/items/venom_gland.webp'],
  ['curved_tusk', '/ui/whetstorm/items/curved_tusk.webp'],
  ['pristine_claw', '/ui/whetstorm/items/pristine_claw.webp'],
]);

export function materialHarvestNextItemImageUrl(id: string): string | null {
  return ART.get(id) ?? null;
}
