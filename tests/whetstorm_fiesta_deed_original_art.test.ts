import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { describe, expect, it } from 'vitest';
import { DEEDS } from '../src/sim/content/deeds';
import { fiestaDeedOriginalImageUrl } from '../src/ui/fiesta_deed_original_art';
import { deedImageUrl, iconDataUrl } from '../src/ui/icons';

const ids = [
  'pvp_fiesta_first_bout',
  'pvp_fiesta_first_win',
  'pvp_fiesta_double',
  'pvp_fiesta_shutdown',
  'pvp_fiesta_full_build',
  'pvp_fiesta_powerups',
  'pvp_fiesta_five_kills',
];
const hash = (path: string) => createHash('sha256').update(readFileSync(path)).digest('hex');

describe('retained Fiesta deed paintings', () => {
  it('resolves each historical feat through the production crest path', () => {
    for (const id of ids) {
      expect(DEEDS[id]).toMatchObject({ id, category: 'pvp', feat: true });
      expect(DEEDS[id].desc).toContain('cannot be newly earned');
      const path = `/ui/whetstorm/deeds/${id}.webp`;
      expect(fiestaDeedOriginalImageUrl(id)).toBe(path);
      expect(deedImageUrl(`deed_${id}`)).toBe(path);
      expect(iconDataUrl('crest', `deed_${id}`)).toBe(path);
    }
    expect(fiestaDeedOriginalImageUrl('../pvp_fiesta_first_bout')).toBeNull();
  });

  it('pins seven distinct decodable masters and deliveries', async () => {
    const { assets } = JSON.parse(
      readFileSync('docs/whetstorm/fiesta-deed-original-generation.json', 'utf8'),
    );
    expect(assets.map((asset: { id: string }) => asset.id)).toEqual(ids);
    const masters = new Set<string>();
    const deliveries = new Set<string>();
    for (const asset of assets) {
      expect(hash(asset.file)).toBe(asset.sha256);
      expect(hash(asset.delivery.path)).toBe(asset.delivery.sha256);
      expect(asset.prompt.length).toBeGreaterThan(50);
      const original = await sharp(asset.file).metadata();
      const delivery = await sharp(asset.delivery.path).metadata();
      expect(original.width).toBeGreaterThanOrEqual(512);
      expect(original.height).toBe(original.width);
      expect(delivery).toMatchObject({ width: 128, height: 128, format: 'webp' });
      masters.add(asset.sha256);
      deliveries.add(asset.delivery.sha256);
    }
    expect(masters.size).toBe(ids.length);
    expect(deliveries.size).toBe(ids.length);
  });
});
