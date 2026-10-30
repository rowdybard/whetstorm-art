// Original Whetstorm powerup aura paintings. Source identities also resolve the
// simulation-authored powerup_<id>_<kind> aliases in aura_icon_view.ts.
const POWERUP_AURA_ART: ReadonlyMap<string, string> = new Map([
  ['pow_berserker', '/ui/whetstorm/auras/pow_berserker.webp'],
  ['pow_colossus', '/ui/whetstorm/auras/pow_colossus.webp'],
  ['pow_moon_boots', '/ui/whetstorm/auras/pow_moon_boots.webp'],
  ['pow_speed_demon', '/ui/whetstorm/auras/pow_speed_demon.webp'],
]);

export function whetstormPowerupAuraImageUrl(id: string): string | null {
  return POWERUP_AURA_ART.get(id) ?? null;
}
