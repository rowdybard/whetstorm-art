// Original paintings for retained developer and future-source mount items.
const ART = new Map<string, string>([
  ['reins_terrorspark_groundshaker', '/ui/whetstorm/items/reins_terrorspark_groundshaker.webp'],
  ['reins_drakemaw_raptor', '/ui/whetstorm/items/reins_drakemaw_raptor.webp'],
]);

export function retainedMountReinsItemImageUrl(id: string): string | null {
  return ART.get(id) ?? null;
}
