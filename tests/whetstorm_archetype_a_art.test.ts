import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { describe, expect, it } from 'vitest';
import { ARCHETYPE_IMAGE_ID_BY_PAIR } from '../src/ui/hud/professions/profession_art';
import { whetstormArchetypeAImageUrl } from '../src/ui/hud/professions/whetstorm_archetype_a_art';

const ids = [
  'archetype_apothecary',
  'archetype_cogsmith',
  'archetype_trapper',
  'archetype_gembinder',
  'archetype_bombardier',
];
const hash = (path: string) => createHash('sha256').update(readFileSync(path)).digest('hex');

describe('original profession archetype paintings', () => {
  it('maps registered archetypes to distinct pinned art', async () => {
    const { assets } = JSON.parse(
      readFileSync('docs/whetstorm/profession-archetypes-a-generation.json', 'utf8'),
    );
    expect(assets.map((asset: { id: string }) => asset.id)).toEqual(ids);
    expect(
      new Set(assets.map((asset: { delivery: { sha256: string } }) => asset.delivery.sha256)).size,
    ).toBe(ids.length);
    for (const asset of assets) {
      expect(Object.values(ARCHETYPE_IMAGE_ID_BY_PAIR)).toContain(asset.id);
      expect(whetstormArchetypeAImageUrl(asset.id)).toBe(
        `/${asset.delivery.path.replace(/^public\//, '')}`,
      );
      expect(asset.reference_images).toEqual([]);
      expect(hash(asset.file)).toBe(asset.sha256);
      expect(hash(asset.delivery.path)).toBe(asset.delivery.sha256);
      expect(await sharp(asset.delivery.path).metadata()).toMatchObject({
        format: 'webp',
        width: 128,
        height: 128,
      });
    }
    expect(whetstormArchetypeAImageUrl('unknown')).toBeNull();
  });
});
