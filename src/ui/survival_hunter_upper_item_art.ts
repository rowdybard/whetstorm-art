// Original paintings for the Season 2 Snaretooth survival hunter upper armor.
const SURVIVAL_HUNTER_UPPER_ART = new Map<string, string>([
  ['vanguard_hunter_survival_helmet', '/ui/whetstorm/items/vanguard_hunter_survival_helmet.webp'],
  ['vanguard_hunter_survival_shoulder', '/ui/whetstorm/items/vanguard_hunter_survival_shoulder.webp'],
  ['vanguard_hunter_survival_chest', '/ui/whetstorm/items/vanguard_hunter_survival_chest.webp'],
]);

export function survivalHunterUpperItemImageUrl(id: string): string | null {
  return SURVIVAL_HUNTER_UPPER_ART.get(id) ?? null;
}
