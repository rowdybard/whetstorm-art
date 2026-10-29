// Original paintings for four quest inventory objects.
const QUEST_RELICS_ART = new Map<string, string>([
  ['crypt_keystone', '/ui/whetstorm/items/crypt_keystone.webp'],
  ['moongate_rubbing', '/ui/whetstorm/items/moongate_rubbing.webp'],
  ['drowned_offering', '/ui/whetstorm/items/drowned_offering.webp'],
  ['hedgewick_shears', '/ui/whetstorm/items/hedgewick_shears.webp'],
]);

export function questRelicsItemImageUrl(id: string): string | null {
  return QUEST_RELICS_ART.get(id) ?? null;
}
