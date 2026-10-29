import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import sharp from 'sharp';
import { describe, expect, it } from 'vitest';
import { ITEMS, QUESTS, questRewardItemId } from '../src/sim/data';
import { drogmarQuestWeaponsItemImageUrl } from '../src/ui/drogmar_quest_weapons_item_art';

const root = resolve(import.meta.dirname, '..');
const ids = ['drogmars_skullcleaver', 'ogre_bonecharm_staff', 'gutripper_shiv'];
const hash = (bytes: Buffer) => createHash('sha256').update(bytes).digest('hex');

describe('Warlord Drogmar quest weapon paintings', () => {
  it('maps each live class reward and rejects arbitrary IDs', () => {
    const quest = QUESTS.q_drogmar;
    expect(questRewardItemId(quest, 'warrior')).toBe(ids[0]);
    expect(questRewardItemId(quest, 'mage')).toBe(ids[1]);
    expect(questRewardItemId(quest, 'rogue')).toBe(ids[2]);
    for (const id of ids) {
      expect(ITEMS[id]?.kind).toBe('weapon');
      expect(drogmarQuestWeaponsItemImageUrl(id)).toBe(`/ui/whetstorm/items/${id}.webp`);
    }
    for (const id of ['constructor', '__proto__', '../drogmars_skullcleaver', 'unknown']) {
      expect(drogmarQuestWeaponsItemImageUrl(id)).toBeNull();
    }
  });

  it('pins distinct opaque masters and shipping images', async () => {
    const manifest = JSON.parse(
      readFileSync(resolve(root, 'docs/whetstorm/drogmar-quest-weapons-generation.json'), 'utf8'),
    );
    expect(manifest.assets).toHaveLength(ids.length);
    const masters = new Set<string>();
    const deliveries = new Set<string>();
    for (const id of ids) {
      const rows = manifest.assets.filter((row: { itemId: string }) => row.itemId === id);
      expect(rows).toHaveLength(1);
      const asset = rows[0];
      const master = readFileSync(resolve(root, asset.file));
      const delivery = readFileSync(resolve(root, asset.delivery.path));
      expect(hash(master)).toBe(asset.sha256);
      expect(hash(delivery)).toBe(asset.delivery.sha256);
      expect(asset.prompt.length).toBeGreaterThan(100);
      const original = await sharp(master).raw().toBuffer({ resolveWithObject: true });
      const image = await sharp(delivery).raw().toBuffer({ resolveWithObject: true });
      expect(original.info.width).toBeGreaterThanOrEqual(512);
      expect(original.info.height).toBe(original.info.width);
      expect(original.info.channels).toBe(3);
      expect(image.info).toMatchObject({ width: 128, height: 128, channels: 3 });
      expect((await sharp(delivery).metadata()).format).toBe('webp');
      expect(delivery.length).toBeLessThan(16_384);
      masters.add(asset.sha256);
      deliveries.add(asset.delivery.sha256);
    }
    expect(masters.size).toBe(ids.length);
    expect(deliveries.size).toBe(ids.length);
  });
});
