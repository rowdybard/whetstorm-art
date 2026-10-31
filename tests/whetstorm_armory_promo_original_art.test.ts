import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { expect, it } from 'vitest';

it('preserves an unapproved generic armory promo candidate with recorded provenance', async () => {
  const record = JSON.parse(
    readFileSync('docs/whetstorm/armory-promo-original-generation.json', 'utf8'),
  );
  expect(record.referenceImages).toEqual([]);
  expect(record.status).toBe(
    'Unapproved generic illustration; does not match current catalog items. Draft candidate only, not for shipping.',
  );
  expect(record.candidate).toBe('docs/design/whetstorm-art/ui/armory-promo-candidate.webp');
  for (const [path, hash] of [
    [record.master, record.masterSha256],
    [record.candidate, record.candidateSha256],
  ]) {
    expect(createHash('sha256').update(readFileSync(path)).digest('hex')).toBe(hash);
  }
  const image = sharp(record.candidate);
  expect(await image.metadata()).toMatchObject({ format: 'webp', width: 1000, height: 590 });
  await image.raw().toBuffer();
});
