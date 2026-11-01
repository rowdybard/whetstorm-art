import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { describe, expect, it } from 'vitest';
import { NYTHRAXIS_UNBOUND_AURA_ID } from '../src/sim/nythraxis_binding_sigil';
import {
  NYTHRAXIS_CROWN_ENDURES_AURA_ID,
  NYTHRAXIS_CROWN_ENDURES_HASTE_AURA_ID,
} from '../src/sim/nythraxis_enrage_clock';
import { NYTHRAXIS_KINGS_WRATH_AURA_ID } from '../src/sim/nythraxis_kings_wrath';
import { resolveAuraIconId } from '../src/ui/aura_icon_view';
import { auraImageUrl, hasAbilityIconIdentity, hasAuraImageIdentity, hasAuraRecipe } from '../src/ui/icons';
import { nythraxisEnrageAuraImageUrl } from '../src/ui/nythraxis_enrage_aura_art';

const groups = [
  [NYTHRAXIS_UNBOUND_AURA_ID],
  [NYTHRAXIS_KINGS_WRATH_AURA_ID],
  [NYTHRAXIS_CROWN_ENDURES_AURA_ID, NYTHRAXIS_CROWN_ENDURES_HASTE_AURA_ID],
];
const hash = (path: string) => createHash('sha256').update(readFileSync(path)).digest('hex');

describe('Nythraxis enrage aura paintings', () => {
  it('routes exact simulation components through production aura identity and image paths', () => {
    for (const group of groups) {
      const expected = `/ui/whetstorm/auras/${group[0]}.webp`;
      for (const id of group) {
        expect(nythraxisEnrageAuraImageUrl(id)).toBe(expected);
        expect(hasAuraImageIdentity(id)).toBe(true);
        const kind = id === NYTHRAXIS_CROWN_ENDURES_HASTE_AURA_ID ? 'buff_haste' : 'buff_dmg_done';
        const identity = resolveAuraIconId({ id, kind }, hasAbilityIconIdentity, hasAuraRecipe, hasAuraImageIdentity);
        expect(identity).toBe(id);
        expect(auraImageUrl(identity)).toBe(expected);
      }
    }
    expect(nythraxisEnrageAuraImageUrl('nythraxis_crown_endures_extra')).toBeNull();
    expect(nythraxisEnrageAuraImageUrl('../nythraxis_unbound')).toBeNull();
  });

  it('pins three independent masters and their delivered images', async () => {
    const { assets } = JSON.parse(readFileSync('docs/whetstorm/nythraxis-enrage-auras-generation.json', 'utf8'));
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
