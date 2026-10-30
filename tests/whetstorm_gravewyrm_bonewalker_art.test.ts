import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { expect, it } from 'vitest';
import { DUNGEON_MOBS } from '../src/sim/content/dungeons';

it('keeps the summoned Bonewalker portrait tied to its original master', async () => {
  const record = JSON.parse(
    readFileSync('public/ui/whetstorm/mobs/gravewyrm-bonewalker-provenance.json', 'utf8'),
  );
  const [asset] = record.entries;
  expect(record.entries).toHaveLength(1);
  expect(asset.id).toBe('raised_bonewalker');
  expect(asset.source).toBe('OpenAI built-in image generation, text only');
  expect(asset.prompt.length).toBeGreaterThan(100);
  expect(asset.path).toBe('public/ui/whetstorm/mobs/raised_bonewalker.webp');
  expect(asset.master.path).toBe('docs/design/whetstorm-art/mobs/raised_bonewalker.png');
  for (const file of [asset, asset.master]) {
    const bytes = readFileSync(file.path);
    expect(bytes.length).toBe(file.bytes);
    expect(createHash('sha256').update(bytes).digest('hex')).toBe(file.sha256);
  }
  expect(await sharp(asset.path).metadata()).toMatchObject({
    format: 'webp',
    width: 128,
    height: 128,
  });
  const master = await sharp(asset.master.path).metadata();
  expect(master.format).toBe('png');
  expect(master.width).toBeGreaterThanOrEqual(512);
  expect(master.width).toBe(master.height);
  expect(DUNGEON_MOBS.grand_necromancer_velkhar.summonAdds?.mobId).toBe(asset.id);
});
