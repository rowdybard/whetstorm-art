// Original fishing rod paintings in a closed map.
const ART = new Map<string, string>([
  ['stormreel_fishing_rod', '/ui/whetstorm/items/stormreel_fishing_rod.webp'],
  ['tidewrought_fishing_rod', '/ui/whetstorm/items/tidewrought_fishing_rod.webp'],
  ['clockreel_fishing_rod', '/ui/whetstorm/items/clockreel_fishing_rod.webp'],
]);

export function fishingRodsItemImageUrl(id: string): string | null {
  return ART.get(id) ?? null;
}
