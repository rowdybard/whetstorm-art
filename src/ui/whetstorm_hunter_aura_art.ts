// Original Whetstorm hunter status paintings, keyed by exact aura identity.
const HUNTER_AURA_ART: ReadonlyMap<string, string> = new Map([
  ['hunter_enduring_courser_burst', '/ui/whetstorm/auras/hunter_enduring_courser_burst.webp'],
  ['hunter_pack_rally_haste', '/ui/whetstorm/auras/hunter_pack_rally.webp'],
  ['hunter_pack_rally_speed', '/ui/whetstorm/auras/hunter_pack_rally.webp'],
  ['hunter_pack_rally_spellhaste', '/ui/whetstorm/auras/hunter_pack_rally.webp'],
  ['hunter_predators_pace', '/ui/whetstorm/auras/hunter_predators_pace.webp'],
]);

export function whetstormHunterAuraImageUrl(id: string): string | null {
  return HUNTER_AURA_ART.get(id) ?? null;
}