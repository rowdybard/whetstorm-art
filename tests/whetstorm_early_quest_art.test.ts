import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { ZONE1_QUESTS } from '../src/sim/content/zone1';
import { earlyQuestItemImageUrl } from '../src/ui/early_quest_item_art';
import { iconDataUrl, itemImageUrl, weaponIconUrl } from '../src/ui/icons';

const root = resolve(import.meta.dirname, '..');
const ids = [
  'redbrook_blade',
  'apprentice_staff',
  'keen_dirk',
  'militia_vest',
  'woven_robe',
  'shadow_jerkin',
];
const weapons = ['redbrook_blade', 'apprentice_staff', 'keen_dirk'];

describe('original early quest equipment paintings', () => {
  it('covers every reward item for the two named quest steps', () => {
    const rewards = [
      ...Object.values(ZONE1_QUESTS.q_bandits.itemRewards),
      ...Object.values(ZONE1_QUESTS.q_ringleader.itemRewards),
    ];
    expect(rewards.sort()).toEqual([...ids].sort());
  });

  it('routes each item through its dedicated asset in the existing APIs', () => {
    for (const id of ids) {
      const url = `/ui/whetstorm/items/${id}.webp`;
      expect(earlyQuestItemImageUrl(id)).toBe(url);
      expect(itemImageUrl(id)).toBe(url);
      expect(iconDataUrl('item', id)).toBe(url);
      if (weapons.includes(id)) expect(weaponIconUrl(id)).toBe(url);
    }
    for (const id of ['constructor', '__proto__', '../keen_dirk', 'unknown']) {
      expect(earlyQuestItemImageUrl(id)).toBeNull();
    }
  });

  it('pins distinct masters and delivery images to the recorded bytes', () => {
    const manifest = JSON.parse(
      readFileSync(resolve(root, 'docs/whetstorm/early-quest-item-art-generation.json'), 'utf8'),
    );
    const masters = new Set<string>();
    const deliveries = new Set<string>();
    for (const id of ids) {
      const rows = manifest.assets.filter((row: { itemId: string }) => row.itemId === id);
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
    expect(masters.size).toBe(ids.length);
    expect(deliveries.size).toBe(ids.length);
  });
});
