// Original cloth and enchanting material paintings in a closed map.
const ART = new Map<string, string>([
  ['homespun_cloth', '/ui/whetstorm/items/homespun_cloth.webp'],
  ['arcane_shard', '/ui/whetstorm/items/arcane_shard.webp'],
  ['arcane_essence', '/ui/whetstorm/items/arcane_essence.webp'],
  ['arcane_dust', '/ui/whetstorm/items/arcane_dust.webp'],
]);

export function materialChimeClothItemImageUrl(id: string): string | null {
  return ART.get(id) ?? null;
}
