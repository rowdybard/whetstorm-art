// Original paintings for heroic armor and quest monuments.
const WYRM_BASIN_MONUMENTS_ITEM_ART = new Map<string, string>([
  ['wyrmchoir_handwraps', '/ui/whetstorm/items/wyrmchoir_handwraps.webp'],
  ['lunarward_cinch', '/ui/whetstorm/items/lunarward_cinch.webp'],
  ['stormbark_mantle', '/ui/whetstorm/items/stormbark_mantle.webp'],
  ['basin_stalkers_tunic', '/ui/whetstorm/items/basin_stalkers_tunic.webp'],
  ['monument_overlook', '/ui/whetstorm/items/monument_overlook.webp'],
  ['monument_court', '/ui/whetstorm/items/monument_court.webp'],
  ['monument_north', '/ui/whetstorm/items/monument_north.webp'],
  ['leyline_cache', '/ui/whetstorm/items/leyline_cache.webp'],
]);

export function wyrmBasinMonumentsItemImageUrl(id: string): string | null {
  return WYRM_BASIN_MONUMENTS_ITEM_ART.get(id) ?? null;
}
