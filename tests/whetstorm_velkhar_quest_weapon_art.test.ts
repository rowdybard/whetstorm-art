import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import sharp from 'sharp';
import { expect, it } from 'vitest';
import { ITEMS, QUESTS, questRewardItemId } from '../src/sim/data';
import { velkharQuestWeaponItemImageUrl } from '../src/ui/velkhar_quest_weapon_item_art';

const root = resolve(import.meta.dirname, '..');
const hash = (bytes: Buffer) => createHash('sha256').update(bytes).digest('hex');

it('maps the live quest reward and rejects other IDs', () => {
  expect(questRewardItemId(QUESTS.q_velkhar, 'mage')).toBe('staff_of_velkhar');
  expect(ITEMS.staff_of_velkhar?.kind).toBe('weapon');
  expect(velkharQuestWeaponItemImageUrl('staff_of_velkhar')).toBe(
    '/ui/whetstorm/items/staff_of_velkhar.webp',
  );
  for (const id of ['constructor', '__proto__', '../staff_of_velkhar', 'unknown']) {
    expect(velkharQuestWeaponItemImageUrl(id)).toBeNull();
  }
});

it('pins the opaque master and shipping image', async () => {
  const manifest = JSON.parse(
    readFileSync(resolve(root, 'docs/whetstorm/velkhar-quest-weapon-generation.json'), 'utf8'),
  );
  expect(manifest.assets).toHaveLength(1);
  const asset = manifest.assets[0];
  expect(asset.itemId).toBe('staff_of_velkhar');
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
});
