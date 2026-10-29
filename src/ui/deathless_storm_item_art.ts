// Original paintings for two heroic weapons.
const DEATHLESS_STORM_ITEM_ART = new Map<string, string>([
  ['deathless_greatblade', '/ui/whetstorm/items/deathless_greatblade.webp'],
  ['stormcallers_focus', '/ui/whetstorm/items/stormcallers_focus.webp'],
]);

export function deathlessStormItemImageUrl(id: string): string | null {
  return DEATHLESS_STORM_ITEM_ART.get(id) ?? null;
}
