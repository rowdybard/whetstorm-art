// Original Thornhide upper equipment paintings.
const ART = new Map<string, string>([
  ['thornhide_headdress', '/ui/whetstorm/items/thornhide_headdress.webp'],
  ['thornhide_mantle', '/ui/whetstorm/items/thornhide_mantle.webp'],
  ['thornhide_vestment', '/ui/whetstorm/items/thornhide_vestment.webp'],
]);

export function thornhideUpperItemImageUrl(id: string): string | null {
  return ART.get(id) ?? null;
}
