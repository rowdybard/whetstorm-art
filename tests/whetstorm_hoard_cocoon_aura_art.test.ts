import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { describe, expect, it } from 'vitest';
import { HOARD_COCOONED_AURA_ID } from '../src/sim/rift/hoard_cocoon_core';
import { resolveAuraIconId } from '../src/ui/aura_icon_view';
import { auraImageUrl, hasAbilityIconIdentity, hasAuraImageIdentity, hasAuraRecipe } from '../src/ui/icons';
import { hoardCocoonAuraImageUrl } from '../src/ui/hoard_cocoon_aura_art';

const hash = (path: string) => createHash('sha256').update(readFileSync(path)).digest('hex');

describe('Buried Hoard cocoon aura painting', () => {
  it('preserves the exact live stun identity through production routing', () => {
    const id = HOARD_COCOONED_AURA_ID;
    const expected = '/ui/whetstorm/auras/hoard_cocooned.webp';
    expect(id).toBe('hoard_cocooned');
    expect(hoardCocoonAuraImageUrl(id)).toBe(expected);
    expect(hasAuraImageIdentity(id)).toBe(true);
    const identity = resolveAuraIconId({ id, kind: 'stun' }, hasAbilityIconIdentity, hasAuraRecipe, hasAuraImageIdentity);
    expect(identity).toBe(id);
    expect(auraImageUrl(identity)).toBe(expected);
    expect(hoardCocoonAuraImageUrl('hoard_cocooned_extra')).toBeNull();
    expect(hoardCocoonAuraImageUrl('../hoard_cocooned')).toBeNull();
    expect(resolveAuraIconId({ id: 'unrelated_test_stun', kind: 'stun' }, hasAbilityIconIdentity, hasAuraRecipe, hasAuraImageIdentity)).toBe('aura_stun');
  });

  it('pins the original master and delivery', async () => {
    const { assets } = JSON.parse(readFileSync('docs/whetstorm/hoard-cocoon-aura-generation.json', 'utf8'));
    expect(assets).toHaveLength(1);
    const [asset] = assets;
    expect(asset.runtimeIds).toEqual([HOARD_COCOONED_AURA_ID]);
    expect(asset.reference_images).toEqual([]);
    expect(asset.prompt.length).toBeGreaterThan(50);
    expect(hash(asset.file)).toBe(asset.sha256);
    expect(hash(asset.delivery.path)).toBe(asset.delivery.sha256);
    const source = await sharp(asset.file).metadata();
    expect(source.width).toBeGreaterThanOrEqual(512);
    expect(source.height).toBe(source.width);
    expect(await sharp(asset.delivery.path).metadata()).toMatchObject({ width: 128, height: 128, format: 'webp' });
  });
});
