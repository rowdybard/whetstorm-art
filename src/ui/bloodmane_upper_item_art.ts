// Original Bloodmane Season 2 upper armor paintings.
const ART = new Map<string, string>([
  ['vanguard_druid_feral_helmet', '/ui/whetstorm/items/vanguard_druid_feral_helmet.webp'],
  ['vanguard_druid_feral_shoulder', '/ui/whetstorm/items/vanguard_druid_feral_shoulder.webp'],
  ['vanguard_druid_feral_chest', '/ui/whetstorm/items/vanguard_druid_feral_chest.webp'],
]);

export function bloodmaneUpperItemImageUrl(id: string): string | null {
  return ART.get(id) ?? null;
}
