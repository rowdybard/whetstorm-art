import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { describe, expect, it } from 'vitest';
import { VARKHUL_INTERCEPT_BEAM_DEBUFF_AURA_ID } from '../src/sim/varkhul_intercept_beam';
import { VARKHUL_SHARED_PYRE_AURA_ID } from '../src/sim/varkhul_shared_pyre';
import { resolveAuraIconId } from '../src/ui/aura_icon_view';
import { auraImageUrl, hasAbilityIconIdentity, hasAuraImageIdentity, hasAuraRecipe } from '../src/ui/icons';
import { varkhulBeamSoakAuraImageUrl } from '../src/ui/varkhul_beam_soak_aura_art';

const entries = [
  [VARKHUL_INTERCEPT_BEAM_DEBUFF_AURA_ID, 'vuln_source'],
  [VARKHUL_SHARED_PYRE_AURA_ID, 'vulnerability'],
] as const;
const hash = (path: string) => createHash('sha256').update(readFileSync(path)).digest('hex');

describe('Varkhul beam and soak aura paintings', () => {
  it('preserves live exact identities through production aura routing', () => {
    for (const [id, kind] of entries) {
      const expected = `/ui/whetstorm/auras/${id}.webp`;
      expect(varkhulBeamSoakAuraImageUrl(id)).toBe(expected);
      expect(hasAuraImageIdentity(id)).toBe(true);
      const identity = resolveAuraIconId({ id, kind }, hasAbilityIconIdentity, hasAuraRecipe, hasAuraImageIdentity);
      expect(identity).toBe(id);
      expect(auraImageUrl(identity)).toBe(expected);
    }
    expect(varkhulBeamSoakAuraImageUrl('varkhul_shared_pyre_extra')).toBeNull();
    expect(varkhulBeamSoakAuraImageUrl('../varkhul_tempered_wound')).toBeNull();
  });

  it('pins two independent masters and delivered images', async () => {
    const { assets } = JSON.parse(readFileSync('docs/whetstorm/varkhul-beam-soak-auras-generation.json', 'utf8'));
    expect(assets.map((asset: { runtimeIds: string[] }) => asset.runtimeIds)).toEqual(entries.map(([id]) => [id]));
    expect(new Set(assets.map((asset: { sha256: string }) => asset.sha256)).size).toBe(2);
    expect(new Set(assets.map((asset: { delivery: { sha256: string } }) => asset.delivery.sha256)).size).toBe(2);
    for (const asset of assets) {
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
