import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { CLASSES } from '../src/sim/content/classes';
import { iconDataUrl, itemImageUrl, weaponIconUrl } from '../src/ui/icons';
import { starterItemImageUrl } from '../src/ui/starter_item_art';

const root = resolve(import.meta.dirname, '..');
const gear = [
  'recruit_tunic',
  'apprentice_robe',
  'footpad_jerkin',
  'worn_sword',
  'rusty_dagger',
  'rusty_hatchet',
  'gnarled_staff',
  'training_mace',
  'eastbrook_buckler',
];
const weapons = ['worn_sword', 'rusty_dagger', 'rusty_hatchet', 'gnarled_staff', 'training_mace'];

describe('original current starter equipment paintings', () => {
  it('covers every currently equipped starter item', () => {
    const equipped = new Set<string>();
    for (const cls of Object.values(CLASSES)) {
      equipped.add(cls.startWeapon);
      equipped.add(cls.startChest);
      if (cls.startOffhand) equipped.add(cls.startOffhand);
    }
    expect([...equipped].sort()).toEqual([...gear].sort());
  });

  it('routes each item through its dedicated asset in the existing APIs', () => {
    for (const id of gear) {
      const url = `/ui/whetstorm/items/${id}.webp`;
      expect(starterItemImageUrl(id)).toBe(url);
      expect(itemImageUrl(id)).toBe(url);
      expect(iconDataUrl('item', id)).toBe(url);
      if (weapons.includes(id)) expect(weaponIconUrl(id)).toBe(url);
    }
    for (const id of ['constructor', '__proto__', '../worn_sword', 'unknown']) {
      expect(starterItemImageUrl(id)).toBeNull();
    }
  });

  it('pins distinct masters and delivery images to the recorded bytes', () => {
    const manifest = JSON.parse(
      readFileSync(resolve(root, 'docs/whetstorm/starter-item-art-generation.json'), 'utf8'),
    );
    const masters = new Set<string>();
    const deliveries = new Set<string>();
    for (const id of gear) {
      const rows = manifest.assets.filter((row: { itemId?: string }) => row.itemId === id);
      expect(rows).toHaveLength(1);
      const asset = rows[0];
      const master = readFileSync(resolve(root, asset.file));
      const image = readFileSync(resolve(root, asset.delivery.path));
      expect(createHash('sha256').update(master).digest('hex')).toBe(asset.sha256);
      expect(createHash('sha256').update(image).digest('hex')).toBe(asset.delivery.sha256);
      expect(image.subarray(8, 12).toString()).toBe('WEBP');
      expect(image.length).toBeLessThan(16_384);
      masters.add(asset.sha256);
      deliveries.add(asset.delivery.sha256);
    }
    expect(masters.size).toBe(gear.length);
    expect(deliveries.size).toBe(gear.length);
  });
});
