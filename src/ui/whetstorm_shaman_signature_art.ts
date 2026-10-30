// Original paintings for key Shaman abilities.
const ART = new Map<string, string>([
  ['lightning_bolt', '/ui/whetstorm/abilities/lightning_bolt.webp'],
  ['rockbiter_weapon', '/ui/whetstorm/abilities/rockbiter_weapon.webp'],
  ['healing_wave', '/ui/whetstorm/abilities/healing_wave.webp'],
  ['earth_shock', '/ui/whetstorm/abilities/earth_shock.webp'],
]);

export function whetstormShamanSignatureImageUrl(id: string): string | null {
  return ART.get(id) ?? null;
}
