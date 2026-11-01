// Original paintings for the Season 2 Snaretooth survival hunter lower armor.
const SURVIVAL_HUNTER_LOWER_ART = new Map<string, string>([
  ['vanguard_hunter_survival_legs', '/ui/whetstorm/items/vanguard_hunter_survival_legs.webp'],
  ['vanguard_hunter_survival_gloves', '/ui/whetstorm/items/vanguard_hunter_survival_gloves.webp'],
]);

export function survivalHunterLowerItemImageUrl(id: string): string | null {
  return SURVIVAL_HUNTER_LOWER_ART.get(id) ?? null;
}
