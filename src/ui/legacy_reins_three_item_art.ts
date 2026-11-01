// Original paintings for retained inert legacy ignition-key souvenirs.
const LEGACY_REINS_THREE_ART = new Map<string, string>([
  ['reins_mech_bird', '/ui/whetstorm/items/reins_mech_bird.webp'],
  ['reins_rallycart_rxt', '/ui/whetstorm/items/reins_rallycart_rxt.webp'],
  ['reins_goblin_rocket_sled', '/ui/whetstorm/items/reins_goblin_rocket_sled.webp'],
]);

export function legacyReinsThreeItemImageUrl(id: string): string | null {
  return LEGACY_REINS_THREE_ART.get(id) ?? null;
}
