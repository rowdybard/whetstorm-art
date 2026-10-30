import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { expect, it } from 'vitest';

it('ships the original jewel crest and its intact full-size master', async () => {
  const provenance = JSON.parse(
    readFileSync('public/ui/whetstorm/minigames/confection-jewel-crest-provenance.json', 'utf8'),
  );
  for (const file of [provenance.asset, provenance.master]) {
    const bytes = readFileSync(file.path);
    expect(bytes.length).toBe(file.bytes);
    expect(createHash('sha256').update(bytes).digest('hex')).toBe(file.sha256);
  }
  const image = sharp(provenance.asset.path);
  expect(await image.metadata()).toMatchObject({
    format: 'webp',
    width: 960,
    height: 370,
    hasAlpha: false,
  });
  await image.raw().toBuffer();
  expect(await sharp(provenance.master.path).metadata()).toMatchObject({
    format: 'png',
    width: 2020,
    height: 778,
  });
});
