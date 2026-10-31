// Original Whetstorm paintings for epic Emberforge hoard armor.
const ART: ReadonlyMap<string, string> = new Map([
  ['ember_wrought_crown', '/ui/whetstorm/items/ember_wrought_crown.webp'],
  ['cinder_stitched_robes', '/ui/whetstorm/items/cinder_stitched_robes.webp'],
  ['molten_clinker_girdle', '/ui/whetstorm/items/molten_clinker_girdle.webp'],
]);
export function emberforgeEpicItemImageUrl(id: string): string | null {
  return ART.get(id) ?? null;
}
