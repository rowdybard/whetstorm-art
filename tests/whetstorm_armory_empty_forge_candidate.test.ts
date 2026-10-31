import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { expect, it } from 'vitest';

it('preserves the non-shipping empty forge candidate and its provenance', async () => {
  const record = JSON.parse(
    readFileSync('docs/design/whetstorm-art/ui/armory-empty-forge-provenance.json', 'utf8'),
  );
  expect(record.status).toBe('Unapproved draft candidate; not integrated or shipped.');
  expect(record.referenceImages).toEqual([]);
  expect(record.candidate).toBe('docs/design/whetstorm-art/ui/armory-empty-forge-candidate.webp');
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
