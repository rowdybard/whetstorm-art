// Original honor ring paintings in a closed map.
const ART = new Map<string, string>([
  ['unbroken_circle', '/ui/whetstorm/items/unbroken_circle.webp'],
  ['fleetblood_band', '/ui/whetstorm/items/fleetblood_band.webp'],
  ['last_step_signet', '/ui/whetstorm/items/last_step_signet.webp'],
  ['ashen_focus_ring', '/ui/whetstorm/items/ashen_focus_ring.webp'],
  ['spellbreakers_seal', '/ui/whetstorm/items/spellbreakers_seal.webp'],
]);

export function jewelryHonorRingsItemImageUrl(id: string): string | null {
  return ART.get(id) ?? null;
}
