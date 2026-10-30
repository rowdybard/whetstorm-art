import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { expect, it } from 'vitest';
import { ABILITIES } from '../src/sim/data';
import { abilityImageUrl } from '../src/ui/icons';

it('resolves the four Mage utility paintings and verifies their provenance', async () => {
  const ids = ['frost_armor', 'arcane_intellect', 'conjure_water', 'ice_block'];
  const provenance = JSON.parse(
    readFileSync('public/ui/whetstorm/abilities/mage-utilities-provenance.json', 'utf8'),
  );
  expect(provenance.entries.map((entry: { id: string }) => entry.id)).toEqual(ids);
  const hashes = new Set<string>();
  for (const entry of provenance.entries) {
    expect(ABILITIES[entry.id]?.class).toBe('mage');
    expect(entry.path).toBe(`public/ui/whetstorm/abilities/${entry.id}.webp`);
    expect(abilityImageUrl(entry.id)).toBe(`/ui/whetstorm/abilities/${entry.id}.webp`);
    for (const file of [entry, entry.master]) {
      const bytes = readFileSync(file.path);
      expect(bytes.length).toBe(file.bytes);
      expect(createHash('sha256').update(bytes).digest('hex')).toBe(file.sha256);
    }
    const image = sharp(readFileSync(entry.path));
    expect(await image.metadata()).toMatchObject({
      format: 'webp',
      width: 128,
      height: 128,
      hasAlpha: false,
    });
    await image.raw().toBuffer();
    hashes.add(entry.sha256);
  }
  expect(hashes.size).toBe(ids.length);
});
