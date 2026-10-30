import { afterEach, describe, expect, it, vi } from 'vitest';
import { ITEMS } from '../src/sim/data';
import { iconDataUrl, itemImageUrl } from '../src/ui/icons';
import * as paintedArt from '../src/ui/painted_item_art';

const testIds = ['test_heroic_variant', 'test_heroic_base'];
afterEach(() => {
  for (const id of testIds) delete ITEMS[id];
  vi.restoreAllMocks();
});

function addItem(id: string, heroicOf?: string) {
  ITEMS[id] = { ...Object.values(ITEMS)[0], id, heroicOf };
}

describe('heroic item original art', () => {
  it('uses painted base art for live catalog variants through both public routes', () => {
    const variants = Object.values(ITEMS).filter(
      (item) =>
        item.heroicOf &&
        Object.hasOwn(ITEMS, item.heroicOf) &&
        !paintedArt.paintedItemImageUrl(item.id) &&
        paintedArt.paintedItemImageUrl(item.heroicOf),
    );
    expect(variants.length).toBeGreaterThan(0);
    for (const item of variants) {
      const expected = paintedArt.paintedItemImageUrl(item.heroicOf ?? '');
      expect(itemImageUrl(item.id)).toBe(expected);
      expect(iconDataUrl('item', item.id)).toBe(expected);
    }
  });

  it('prefers exact art and only inherits from a real catalog base', () => {
    const lookup = vi
      .spyOn(paintedArt, 'paintedItemImageUrl')
      .mockImplementation((id) =>
        id === testIds[0] ? '/variant.webp' : id === testIds[1] ? '/base.webp' : null,
      );
    addItem(testIds[0], testIds[1]);
    addItem(testIds[1]);
    expect(itemImageUrl(testIds[0])).toBe('/variant.webp');
    expect(iconDataUrl('item', testIds[0])).toBe('/variant.webp');
    lookup.mockImplementation((id) => (id === testIds[1] ? '/base.webp' : null));
    delete ITEMS[testIds[1]];
    expect(itemImageUrl(testIds[0])).not.toBe('/base.webp');
    expect(iconDataUrl('item', testIds[0])).not.toBe('/base.webp');
  });

  it('does not infer identity from a prefix or follow cycles', () => {
    vi.spyOn(paintedArt, 'paintedItemImageUrl').mockImplementation((id) =>
      id === 'mark' ? '/mark.webp' : null,
    );
    const unrelated = itemImageUrl('heroic_mark');
    expect(unrelated).not.toBe('/mark.webp');
    expect(iconDataUrl('item', 'heroic_mark')).toBe(unrelated);
    addItem(testIds[0], testIds[1]);
    addItem(testIds[1], testIds[0]);
    expect(itemImageUrl(testIds[0])).toBeTruthy();
    expect(itemImageUrl(testIds[0])).not.toBe('/mark.webp');
    expect(iconDataUrl('item', testIds[0])).toBe(itemImageUrl(testIds[0]));
  });
});
