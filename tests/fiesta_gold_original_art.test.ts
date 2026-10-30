import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { AUGMENTS } from '../src/sim/content/augments';
import { fiestaAugmentImageUrl } from '../src/ui/hud/fiesta/fiesta_art';

const ids = [
  'aug_warlords_might',
  'aug_arcane_surge',
  'aug_vampirism',
  'aug_juggernaut',
  'aug_bloodhunter',
  'aug_lightwell',
  'aug_bounty_hunter',
];

describe('original Fiesta gold augment art', () => {
  it('covers exactly the live gold wave with distinct recorded assets', () => {
    const provenance = JSON.parse(
      readFileSync('docs/whetstorm/fiesta-gold-original-art.json', 'utf8'),
    );
    expect(
      AUGMENTS.filter((augment) => augment.tier === 'gold').map((augment) => augment.id),
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
