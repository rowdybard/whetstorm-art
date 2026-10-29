// Original crafting component paintings in a closed map.
const ART = new Map<string, string>([
  ['cogwheel_blank', '/ui/whetstorm/items/cogwheel_blank.webp'],
  ['sharp_claw', '/ui/whetstorm/items/sharp_claw.webp'],
  ['pristine_venom_gland', '/ui/whetstorm/items/pristine_venom_gland.webp'],
  ['resonant_thread', '/ui/whetstorm/items/resonant_thread.webp'],
]);

export function materialComponentBatchItemImageUrl(id: string): string | null {
  return ART.get(id) ?? null;
}
