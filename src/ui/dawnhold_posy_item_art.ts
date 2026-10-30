// Original Dawnhold keepsake painting in a closed map.
const ART = new Map<string, string>([
  ['dawnhold_posy', '/ui/whetstorm/items/dawnhold_posy.webp'],
]);

export function dawnholdPosyItemImageUrl(id: string): string | null {
  return ART.get(id) ?? null;
}
