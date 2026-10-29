// Original Whetstorm battleground status paintings, keyed by exact aura identity.
const BATTLEGROUND_AURA_ART: ReadonlyMap<string, string> = new Map([
  ['bg_battle_rune', '/ui/whetstorm/auras/bg_battle_rune.webp'],
  ['bg_carried_flag', '/ui/whetstorm/auras/bg_carried_flag.webp'],
  ['bg_sprint_rune', '/ui/whetstorm/auras/bg_sprint_rune.webp'],
  ['bg_ward_rune', '/ui/whetstorm/auras/bg_ward_rune.webp'],
]);

export function whetstormBattlegroundAuraImageUrl(id: string): string | null {
  return BATTLEGROUND_AURA_ART.get(id) ?? null;
}