import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { CLASSES } from '../src/sim/content/classes';
import { iconDataUrl, itemImageUrl } from '../src/ui/icons';
import { starterItemImageUrl } from '../src/ui/starter_item_art';

const root = resolve(import.meta.dirname, '..');
const ids = ['baked_bread', 'spring_water'];

describe('original starter ration paintings', () => {
  it('serves each existing ration through both item icon APIs', () => {
    for (const id of ids) {
      const url = `/ui/whetstorm/items/${id}.webp`;
      expect(starterItemImageUrl(id)).toBe(url);
      expect(itemImageUrl(id)).toBe(url);
      expect(iconDataUrl('item', id)).toBe(url);
    }
  });

  it('does not route unrelated or unsafe ids to a painted asset', () => {
    for (const id of ['constructor', '__proto__', '../baked_bread', 'unknown']) {
      expect(starterItemImageUrl(id)).toBeNull();
    }
  });

  it('matches the rations currently given to new characters', () => {
    for (const cls of Object.values(CLASSES)) {
      expect(cls.startItems.some((item) => item.itemId === 'baked_bread')).toBe(true);
      expect(cls.startItems.some((item) => item.itemId === 'spring_water')).toBe(
        cls.resourceType === 'mana',
      );
    }
  });

  it('pins each source and delivery to its recorded bytes', () => {
    const manifest = JSON.parse(
      readFileSync(resolve(root, 'docs/whetstorm/starter-item-art-generation.json'), 'utf8'),
    );
    for (const id of ids) {
      const asset = manifest.assets.find((row: { itemId?: string }) => row.itemId === id);
      expect(asset).toBeDefined();
      const master = readFileSync(resolve(root, asset.file));
      const image = readFileSync(resolve(root, asset.delivery.path));
      expect(createHash('sha256').update(master).digest('hex')).toBe(asset.sha256);
      expect(createHash('sha256').update(image).digest('hex')).toBe(asset.delivery.sha256);
      expect(image.subarray(8, 12).toString()).toBe('WEBP');
      expect(image.length).toBeLessThan(16_384);
    }
  });
});
