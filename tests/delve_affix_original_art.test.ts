import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { DELVE_AFFIX_IMAGE_IDS, delveAffixImageUrl } from '../src/ui/hud/delve/delve_affix_art';

const ids = [
  'bad_air',
  'belligerent_dead',
  'candleblind',
  'high_water',
  'lively_choir',
  'restless_graves',
];

describe('original Delve affix art', () => {
  it('routes exactly the live affixes to distinct, recorded original assets', () => {
    const provenance = JSON.parse(
      readFileSync('docs/whetstorm/delve-affix-original-art.json', 'utf8'),
    );
    expect([...DELVE_AFFIX_IMAGE_IDS]).toEqual(ids);
    expect(provenance.records.map((record: { id: string }) => record.id)).toEqual(ids);
    const hashes = new Set<string>();
    for (const record of provenance.records) {
      expect(delveAffixImageUrl(record.id)).toBe(`/ui/whetstorm/delve-affixes/${record.id}.svg`);
      expect(record.path).toBe(`public${delveAffixImageUrl(record.id)}`);
      const bytes = readFileSync(record.path);
      expect(createHash('sha256').update(bytes).digest('hex')).toBe(record.sha256);
      expect(bytes.toString()).toContain('viewBox="0 0 48 48"');
      hashes.add(record.sha256);
    }
    expect(hashes.size).toBe(ids.length);
    expect(delveAffixImageUrl('old_mechanisms')).toBeNull();
    expect(delveAffixImageUrl('../bad_air')).toBeNull();
    expect(delveAffixImageUrl('unknown')).toBeNull();
  });
});
