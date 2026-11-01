// Original Thistlebloom Season 2 upper armor paintings.
const ART = new Map<string, string>([
  ['vanguard_druid_restoration_helmet', '/ui/whetstorm/items/vanguard_druid_restoration_helmet.webp'],
  ['vanguard_druid_restoration_shoulder', '/ui/whetstorm/items/vanguard_druid_restoration_shoulder.webp'],
  ['vanguard_druid_restoration_chest', '/ui/whetstorm/items/vanguard_druid_restoration_chest.webp'],
]);

export function thistlebloomUpperItemImageUrl(id: string): string | null {
  return ART.get(id) ?? null;
}
