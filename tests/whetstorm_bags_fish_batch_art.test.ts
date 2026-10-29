import { describe, expect, it } from 'vitest';
import { ITEMS } from '../src/sim/data';
import { bagsFishItemImageUrl } from '../src/ui/bags_fish_item_art';

describe('early bag and fishing paintings', () => {
  it('maps each real item to its own image and rejects unknown IDs', () => {
    const entries = [
      ['linen_pouch', 'bag'],
      ['travelers_knapsack', 'bag'],
      ['raw_mirror_trout', 'junk'],
      ['raw_marsh_pike', 'junk'],
    ];
    const urls = entries.map(([id, kind]) => {
      expect(ITEMS[id]?.kind).toBe(kind);
      expect(bagsFishItemImageUrl(id)).toBe(`/ui/whetstorm/items/${id}.webp`);
      return bagsFishItemImageUrl(id);
    });
    expect(new Set(urls).size).toBe(entries.length);
    expect(bagsFishItemImageUrl('../linen_pouch')).toBeNull();
  });
});
