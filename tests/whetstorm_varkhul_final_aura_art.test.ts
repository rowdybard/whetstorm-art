import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { describe, expect, it } from 'vitest';
import {
  VARKHUL_ASSEMBLY_STUN_AURA_ID,
  VARKHUL_FORGE_BEAM_EXPOSURE_AURA_ID,
  VARKHUL_MASTERPIECE_UNBOUND_AURA_ID,
} from '../src/sim/encounters/varkhul';
import { resolveAuraIconId } from '../src/ui/aura_icon_view';
import { auraImageUrl, hasAbilityIconIdentity, hasAuraImageIdentity, hasAuraRecipe } from '../src/ui/icons';
import { whetstormVarkhulFinalAuraImageUrl } from '../src/ui/whetstorm_varkhul_final_aura_art';

const ids = [VARKHUL_ASSEMBLY_STUN_AURA_ID, VARKHUL_FORGE_BEAM_EXPOSURE_AURA_ID, VARKHUL_MASTERPIECE_UNBOUND_AURA_ID];
const kinds = ['vulnerability', 'vulnerability', 'enrage'];
const hash = (path: string) => createHash('sha256').update(readFileSync(path)).digest('hex');

describe('Varkhul final aura paintings', () => {
  it('routes exact live identities through the production aura resolver', () => {
    for (const [index, id] of ids.entries()) {
      const expected = `/ui/whetstorm/auras/${id}.webp`;
      expect(whetstormVarkhulFinalAuraImageUrl(id)).toBe(expected);
      expect(hasAuraImageIdentity(id)).toBe(true);
      const identity = resolveAuraIconId({ id, kind: kinds[index] }, hasAbilityIconIdentity, hasAuraRecipe, hasAuraImageIdentity);
      expect(identity).toBe(id);
      expect(auraImageUrl(identity)).toBe(expected);
    }
    expect(whetstormVarkhulFinalAuraImageUrl('varkhul_forge_shattered_extra')).toBeNull();
    expect(whetstormVarkhulFinalAuraImageUrl('../varkhul_forge_shattered')).toBeNull();
  });
  it('pins three independent masters and delivery files', async () => {
    const { assets } = JSON.parse(readFileSync('docs/whetstorm/varkhul-final-aura-generation.json', 'utf8'));
    expect(assets.map((asset: { auraId: string }) => asset.auraId)).toEqual(ids);
    expect(new Set(assets.map((asset: { sha256: string }) => asset.sha256)).size).toBe(3);
    expect(new Set(assets.map((asset: { delivery: { sha256: string } }) => asset.delivery.sha256)).size).toBe(3);
    for (const asset of assets) {
      expect(asset.runtimeIds).toEqual([asset.auraId]);
      expect(asset.reference_images).toEqual([]);
      expect(asset.prompt.length).toBeGreaterThan(50);
      expect(hash(asset.file)).toBe(asset.sha256);
      expect(hash(asset.delivery.path)).toBe(asset.delivery.sha256);
      const source = await sharp(asset.file).metadata();
      expect(source.width).toBeGreaterThanOrEqual(512);
      expect(source.height).toBe(source.width);
      expect(await sharp(asset.delivery.path).metadata()).toMatchObject({ width: 128, height: 128, format: 'webp' });
    }
  });
});
