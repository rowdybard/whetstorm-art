import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { describe, expect, it } from 'vitest';
import { NYTHRAXIS_IMPALED_AURA_ID } from '../src/sim/nythraxis_bone_spike';
import {
  NYTHRAXIS_ASCENSION_AURA_ID, NYTHRAXIS_ASCENSION_HASTE_AURA_ID,
  NYTHRAXIS_BOUND_AURA_ID, NYTHRAXIS_BOUND_STUN_AURA_ID,
} from '../src/sim/nythraxis_binding_sigil';
import { resolveAuraIconId } from '../src/ui/aura_icon_view';
import { auraImageUrl, hasAbilityIconIdentity, hasAuraImageIdentity, hasAuraRecipe } from '../src/ui/icons';
import { whetstormNythraxisBindingAuraImageUrl } from '../src/ui/whetstorm_nythraxis_binding_aura_art';

const groups = [
  [NYTHRAXIS_IMPALED_AURA_ID],
  [NYTHRAXIS_ASCENSION_AURA_ID, NYTHRAXIS_ASCENSION_HASTE_AURA_ID],
  [NYTHRAXIS_BOUND_AURA_ID, NYTHRAXIS_BOUND_STUN_AURA_ID],
];
const hash = (path: string) => createHash('sha256').update(readFileSync(path)).digest('hex');

describe('Nythraxis binding aura paintings', () => {
  it('routes exact simulation components through the production aura identity and image path', () => {
    for (const group of groups) {
      const expected = `/ui/whetstorm/auras/${group[0]}.webp`;
      for (const id of group) {
        expect(whetstormNythraxisBindingAuraImageUrl(id)).toBe(expected);
        expect(hasAuraImageIdentity(id)).toBe(true);
        const identity = resolveAuraIconId({ id, kind: 'stun' }, hasAbilityIconIdentity, hasAuraRecipe, hasAuraImageIdentity);
        expect(identity).toBe(id);
        expect(auraImageUrl(identity)).toBe(expected);
      }
    }
    expect(whetstormNythraxisBindingAuraImageUrl('nythraxis_bound_extra')).toBeNull();
    expect(whetstormNythraxisBindingAuraImageUrl('../nythraxis_bound')).toBeNull();
  });
  it('pins three independent original masters and their delivered images', async () => {
    const { assets } = JSON.parse(readFileSync('docs/whetstorm/nythraxis-binding-aura-generation.json', 'utf8'));
    expect(assets.map((asset: { runtimeIds: string[] }) => asset.runtimeIds)).toEqual(groups);
    expect(new Set(assets.map((asset: { sha256: string }) => asset.sha256)).size).toBe(3);
    expect(new Set(assets.map((asset: { delivery: { sha256: string } }) => asset.delivery.sha256)).size).toBe(3);
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
