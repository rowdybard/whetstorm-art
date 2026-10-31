// Original Gracewing upper equipment paintings.
const ART = new Map<string, string>([
  ['vanguard_priest_holy_helmet', '/ui/whetstorm/items/vanguard_priest_holy_helmet.webp'],
  ['vanguard_priest_holy_shoulder', '/ui/whetstorm/items/vanguard_priest_holy_shoulder.webp'],
  ['vanguard_priest_holy_chest', '/ui/whetstorm/items/vanguard_priest_holy_chest.webp'],
]);

export function gracewingUpperItemImageUrl(id: string): string | null {
  return ART.get(id) ?? null;
}
