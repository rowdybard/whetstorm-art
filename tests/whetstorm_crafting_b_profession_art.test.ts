import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { describe, expect, it } from 'vitest';
import { whetstormCraftingBProfessionImageUrl } from '../src/ui/hud/professions/whetstorm_crafting_b_art';

const hash = (path: string) => createHash('sha256').update(readFileSync(path)).digest('hex');

describe('original crafting profession paintings B', () => {
  it('routes the exact five crafting identities', () => {
    for (const id of [
      'prof_inscription',
      'prof_jewelcrafting',
      'prof_leatherworking',
      'prof_tailoring',
      'prof_weaponcrafting',
    ]) {
      expect(whetstormCraftingBProfessionImageUrl(id)).toBe(`/ui/whetstorm/professions/${id}.webp`);
    }
    expect(whetstormCraftingBProfessionImageUrl('prof_unknown')).toBeNull();
    expect(whetstormCraftingBProfessionImageUrl('../prof_tailoring')).toBeNull();
  });

  it('pins five independent original sources and their shipping files', async () => {
    const { assets } = JSON.parse(
      readFileSync('docs/whetstorm/profession-crafting-b-generation.json', 'utf8'),
    );
    expect(assets).toHaveLength(5);
    expect(new Set(assets.map((asset: { sha256: string }) => asset.sha256)).size).toBe(5);
    for (const asset of assets) {
      expect(asset.reference_images).toEqual([]);
      expect(asset.prompt.length).toBeGreaterThan(50);
      expect(hash(asset.file)).toBe(asset.sha256);
      expect(hash(asset.delivery.path)).toBe(asset.delivery.sha256);
      const source = await sharp(asset.file).metadata();
      expect(source.width).toBeGreaterThanOrEqual(512);
      expect(source.height).toBe(source.width);
      expect(await sharp(asset.delivery.path).metadata()).toMatchObject({
        width: 128,
        height: 128,
        format: 'webp',
      });
      expect(whetstormCraftingBProfessionImageUrl(asset.id)).toBe(
        `/${asset.delivery.path.slice(7)}`,
      );
    }
  });
});
