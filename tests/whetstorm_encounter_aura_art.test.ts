import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { describe, expect, it } from 'vitest';
import {
  IGNIVAR_BRAND_AURA_ID,
  IGNIVAR_LAST_INFERNO_AURA_ID,
  IGNIVAR_MOLTEN_ARMOR_AURA_ID,
} from '../src/sim/encounters/ignivar';
import { NYTHRAXIS_BONE_STORM_AURA_ID } from '../src/sim/nythraxis_bone_storm';
import { whetstormEncounterAuraImageUrl } from '../src/ui/whetstorm_encounter_aura_art';

const ids = [
  IGNIVAR_BRAND_AURA_ID,
  IGNIVAR_MOLTEN_ARMOR_AURA_ID,
  IGNIVAR_LAST_INFERNO_AURA_ID,
  NYTHRAXIS_BONE_STORM_AURA_ID,
];
const hash = (path: string) => createHash('sha256').update(readFileSync(path)).digest('hex');

describe('original encounter aura paintings', () => {
  it('routes live exact identities and rejects unrelated IDs', () => {
    for (const id of ids) {
      expect(whetstormEncounterAuraImageUrl(id)).toBe(`/ui/whetstorm/auras/${id}.webp`);
      expect(whetstormEncounterAuraImageUrl(`${id}_extra`)).toBeNull();
    }
    expect(whetstormEncounterAuraImageUrl('../nythraxis_bone_storm')).toBeNull();
  });

  it('pins independent masters and shipping files with provenance', async () => {
    const { assets } = JSON.parse(
      readFileSync('docs/whetstorm/aura-encounter-oct30-generation.json', 'utf8'),
    );
    expect(assets.map((asset: { auraId: string }) => asset.auraId)).toEqual(ids);
    expect(new Set(assets.map((asset: { sha256: string }) => asset.sha256)).size).toBe(4);
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
      expect(whetstormEncounterAuraImageUrl(asset.auraId)).toBe(`/${asset.delivery.path.slice(7)}`);
    }
  });
});
