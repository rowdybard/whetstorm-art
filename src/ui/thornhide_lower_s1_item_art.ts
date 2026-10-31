// Original Season 1 Thornhide lower-slot leather paintings.
const ART = new Map<string, string>([
  ['thornhide_cinch', '/ui/whetstorm/items/thornhide_cinch.webp'],
  ['thornhide_leggings', '/ui/whetstorm/items/thornhide_leggings.webp'],
  ['thornhide_gloves', '/ui/whetstorm/items/thornhide_gloves.webp'],
  ['thornhide_boots', '/ui/whetstorm/items/thornhide_boots.webp'],
]);

export function thornhideLowerS1ItemImageUrl(id: string): string | null {
  return ART.get(id) ?? null;
}
