import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { AUGMENTS } from '../src/sim/content/augments';
import { fiestaAugmentImageUrl } from '../src/ui/hud/fiesta/fiesta_art';

const ids = [
  'aug_apex_predator',
  'aug_archmage',
  'aug_unkillable',
  'aug_overdrive',
  'aug_avatar',
  'aug_ascendant',
];

describe('original Fiesta prismatic augment art', () => {
  it('covers exactly the live prismatic wave with distinct recorded assets', () => {
    const provenance = JSON.parse(
      readFileSync('docs/whetstorm/fiesta-prismatic-original-art.json', 'utf8'),
    );
    expect(
      AUGMENTS.filter((augment) => augment.tier === 'prismatic').map((augment) => augment.id),
    ).toEqual(ids);
    expect(provenance.records.map((record: { id: string }) => record.id)).toEqual(ids);
    const hashes = new Set<string>();
    for (const record of provenance.records) {
      expect(fiestaAugmentImageUrl(record.id)).toBe(
        `/ui/whetstorm/fiesta/augments/${record.id}.svg`,
      );
      expect(record.path).toBe(`public${fiestaAugmentImageUrl(record.id)}`);
      const bytes = readFileSync(record.path);
      expect(createHash('sha256').update(bytes).digest('hex')).toBe(record.sha256);
      expect(bytes.toString()).toContain('viewBox="0 0 48 48"');
      hashes.add(record.sha256);
    }
    expect(hashes.size).toBe(ids.length);
    expect(fiestaAugmentImageUrl('unknown')).toBeNull();
  });
});
