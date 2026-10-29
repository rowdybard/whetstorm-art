import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { describe, expect, it } from 'vitest';
import { whetstormHunterAuraImageUrl } from '../src/ui/whetstorm_hunter_aura_art';

const hash = (path: string) => createHash('sha256').update(readFileSync(path)).digest('hex');

describe('original hunter aura paintings', () => {
  it('routes exact identities and rejects unrelated IDs', () => {
    for (const id of ['hunter_pack_rally_haste', 'hunter_pack_rally_speed', 'hunter_pack_rally_spellhaste']) {
      expect(whetstormHunterAuraImageUrl(id)).toBe('/ui/whetstorm/auras/hunter_pack_rally.webp');
    }
    for (const id of ['hunter_enduring_courser_burst', 'hunter_predators_pace']) {
      expect(whetstormHunterAuraImageUrl(id)).toBe(`/ui/whetstorm/auras/${id}.webp`);
    }
    expect(whetstormHunterAuraImageUrl('hunter_predators_pace_icd')).toBeNull();
    expect(whetstormHunterAuraImageUrl('../hunter_pack_rally_speed')).toBeNull();
  });

  it('pins three independent original sources and their shipping files', async () => {
    const { assets } = JSON.parse(readFileSync('docs/whetstorm/aura-hunter-generation.json', 'utf8'));
    expect(assets).toHaveLength(3);
    expect(new Set(assets.map((asset: { sha256: string }) => asset.sha256)).size).toBe(3);
    for (const asset of assets) {
      expect(asset.reference_images).toEqual([]);
      expect(asset.prompt.length).toBeGreaterThan(50);
      expect(hash(asset.file)).toBe(asset.sha256);
      expect(hash(asset.delivery.path)).toBe(asset.delivery.sha256);
      const source = await sharp(asset.file).metadata();
      expect(source.width).toBeGreaterThanOrEqual(512);
      expect(source.height).toBe(source.width);
      expect(await sharp(asset.delivery.path).metadata()).toMatchObject({ width: 128, height: 128, format: 'webp' });
      for (const id of asset.runtimeIds) expect(whetstormHunterAuraImageUrl(id)).toBe(`/${asset.delivery.path.slice(7)}`);
    }
  });
});