// Original paintings for regional quest collection drops.
const QUEST_REGIONAL_DROPS_ART = new Map<string, string>([
  ['evergarden_bloom_clipping', '/ui/whetstorm/items/evergarden_bloom_clipping.webp'],
  ['farshore_salt_moss', '/ui/whetstorm/items/farshore_salt_moss.webp'],
  ['galecrest_ram_wool', '/ui/whetstorm/items/galecrest_ram_wool.webp'],
]);

export function questRegionalDropsItemImageUrl(id: string): string | null {
  return QUEST_REGIONAL_DROPS_ART.get(id) ?? null;
}
