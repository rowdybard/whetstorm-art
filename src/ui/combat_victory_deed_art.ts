// Original paintings for combat victory deeds.
const COMBAT_VICTORY_DEED_ART = new Map<string, string>([
  ['cmb_legion_of_one', '/ui/whetstorm/deeds/cmb_legion_of_one.webp'],
  ['cmb_giantslayer', '/ui/whetstorm/deeds/cmb_giantslayer.webp'],
]);

export function combatVictoryDeedImageUrl(id: string): string | null {
  return COMBAT_VICTORY_DEED_ART.get(id) ?? null;
}
