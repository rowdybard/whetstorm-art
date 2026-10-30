import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { expect, it } from 'vitest';
import { ABILITIES } from '../src/sim/data';
import { abilityImageUrl, iconDataUrl } from '../src/ui/icons';

it('resolves Warrior utility paintings and verifies their provenance', async () => {
  const ids = ['raised_guard', 'demoralizing_shout', 'taunt', 'pummel'];
  const provenance = JSON.parse(
    readFileSync('public/ui/whetstorm/abilities/warrior-utilities-provenance.json', 'utf8'),
  );
  expect(provenance.entries.map((entry: { id: string }) => entry.id)).toEqual(ids);
  const hashes = new Set<string>();
  for (const entry of provenance.entries) {
    expect(ABILITIES[entry.id]?.class).toBe('warrior');
    const url = `/ui/whetstorm/abilities/${entry.id}.webp`;
    expect(entry.path).toBe(`public${url}`);
    expect(abilityImageUrl(entry.id)).toBe(url);
    expect(iconDataUrl('ability', entry.id)).toBe(url);
    for (const file of [entry, entry.master]) {
      const bytes = readFileSync(file.path);
      expect(bytes.length).toBe(file.bytes);
      expect(createHash('sha256').update(bytes).digest('hex')).toBe(file.sha256);
    }
    const image = sharp(readFileSync(entry.path));
    expect(await image.metadata()).toMatchObject({
      format: 'webp', width: 128, height: 128, hasAlpha: false,
    });
    await image.raw().toBuffer();
    hashes.add(entry.sha256);
  }
  expect(hashes.size).toBe(ids.length);
});
