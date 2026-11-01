import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { describe, expect, it } from 'vitest';
import { IGNIVAR_FORGE_CHAINS_AURA_ID } from '../src/sim/ignivar_forge_chains';
import { resolveAuraIconId } from '../src/ui/aura_icon_view';
import { auraImageUrl, hasAbilityIconIdentity, hasAuraImageIdentity, hasAuraRecipe } from '../src/ui/icons';
import { ignivarForgeChainsAuraImageUrl } from '../src/ui/ignivar_forge_chains_aura_art';

const hash = (path: string) => createHash('sha256').update(readFileSync(path)).digest('hex');

describe('Ignivar forge chains aura painting', () => {
  it('preserves the exact live aura through production identity and image routing', () => {
    const id = IGNIVAR_FORGE_CHAINS_AURA_ID;
    const expected = '/ui/whetstorm/auras/ignivar_forge_chains.webp';
    expect(id).toBe('ignivar_forge_chains');
    expect(ignivarForgeChainsAuraImageUrl(id)).toBe(expected);
    expect(hasAuraImageIdentity(id)).toBe(true);
    const identity = resolveAuraIconId({ id, kind: 'vulnerability' }, hasAbilityIconIdentity, hasAuraRecipe, hasAuraImageIdentity);
    expect(identity).toBe(id);
    expect(auraImageUrl(identity)).toBe(expected);
    expect(ignivarForgeChainsAuraImageUrl('ignivar_forge_chains_extra')).toBeNull();
    expect(ignivarForgeChainsAuraImageUrl('../ignivar_forge_chains')).toBeNull();
  });

  it('pins the original master and delivered image', async () => {
    const { assets } = JSON.parse(readFileSync('docs/whetstorm/ignivar-forge-chains-aura-generation.json', 'utf8'));
    expect(assets).toHaveLength(1);
    const [asset] = assets;
    expect(asset.runtimeIds).toEqual([IGNIVAR_FORGE_CHAINS_AURA_ID]);
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
