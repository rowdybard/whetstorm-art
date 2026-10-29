// Original abyss ring paintings in a closed map.
const ART = new Map<string, string>([
  ['abyssal_loop', '/ui/whetstorm/items/abyssal_loop.webp'],
  ['abysswrought_band', '/ui/whetstorm/items/abysswrought_band.webp'],
]);

export function jewelryAbyssRingsItemImageUrl(id: string): string | null {
  return ART.get(id) ?? null;
}
