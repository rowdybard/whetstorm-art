// Original Sovereign Emberforge hoard armor paintings.
const ART = new Map<string, string>([
  ['legendary_ember_wrought_crown', '/ui/whetstorm/items/legendary_ember_wrought_crown.webp'],
  ['legendary_cinder_stitched_robes', '/ui/whetstorm/items/legendary_cinder_stitched_robes.webp'],
  ['legendary_molten_clinker_girdle', '/ui/whetstorm/items/legendary_molten_clinker_girdle.webp'],
]);

export function sovereignEmberforgeItemImageUrl(id: string): string | null {
  return ART.get(id) ?? null;
}
