// Original paintings for key Shaman abilities.
const ART = new Map<string, string>([
  ['lightning_bolt', '/ui/whetstorm/abilities/lightning_bolt.webp'],
  ['rockbiter_weapon', '/ui/whetstorm/abilities/rockbiter_weapon.webp'],
  ['healing_wave', '/ui/whetstorm/abilities/healing_wave.webp'],
  ['earth_shock', '/ui/whetstorm/abilities/earth_shock.webp'],
  ['chain_lightning', '/ui/whetstorm/abilities/shaman_core_chain_lightning.webp'],
  ['flame_shock', '/ui/whetstorm/abilities/shaman_core_flame_shock.webp'],
  ['frost_shock', '/ui/whetstorm/abilities/shaman_core_frost_shock.webp'],
  ['ghost_wolf', '/ui/whetstorm/abilities/shaman_core_ghost_wolf.webp'],
]);

export function whetstormShamanSignatureImageUrl(id: string): string | null {
  return ART.get(id) ?? null;
}
