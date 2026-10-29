// Original Whetstorm raid status paintings, keyed by exact aura identity.
const RAID_AURA_ART: ReadonlyMap<string, string> = new Map([
  ['nythraxis_deathless_stun', '/ui/whetstorm/auras/nythraxis_deathless_stun.webp'],
  ['nythraxis_dread_curse', '/ui/whetstorm/auras/nythraxis_dread_curse.webp'],
  ['nythraxis_soul_rend', '/ui/whetstorm/auras/nythraxis_soul_rend.webp'],
  ['nythraxis_transition_stun', '/ui/whetstorm/auras/nythraxis_transition_stun.webp'],
]);

export function whetstormRaidAuraImageUrl(id: string): string | null {
  return RAID_AURA_ART.get(id) ?? null;
}