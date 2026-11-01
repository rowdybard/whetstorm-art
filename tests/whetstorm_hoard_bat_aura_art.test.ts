import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { describe, expect, it } from 'vitest';
import { resolveAuraIconId } from '../src/ui/aura_icon_view';
import { auraImageUrl, hasAbilityIconIdentity, hasAuraImageIdentity, hasAuraRecipe } from '../src/ui/icons';
import { whetstormHoardBatAuraImageUrl } from '../src/ui/whetstorm_hoard_bat_aura_art';

const canonical = 'hoard_bat_screech';
const expected = '/ui/whetstorm/auras/hoard_bat_screech.webp';
const resolve = (id: string) => resolveAuraIconId({ id, kind: 'slow' }, hasAbilityIconIdentity, hasAuraRecipe, hasAuraImageIdentity);
const hash = (path: string) => createHash('sha256').update(readFileSync(path)).digest('hex');

describe('Colossal Bat screech aura art', () => {
  it('normalizes only the authored decimal boss-id family through production routing', () => {
    expect(whetstormHoardBatAuraImageUrl(canonical)).toBe(expected);
    for (const id of ['hoard_bat_screech_1', 'hoard_bat_screech_42']) {
      expect(resolve(id)).toBe(canonical);
      expect(auraImageUrl(resolve(id))).toBe(expected);
    }
    for (const id of ['hoard_bat_screech_', 'hoard_bat_screech_-1', 'hoard_bat_screech_+1', 'hoard_bat_screech_01', 'hoard_bat_screech_1.0', 'hoard_bat_screech_1e3', 'hoard_bat_screech_1_x', 'hoard_bat_screech_1/', 'other_bat_screech_42']) {
      expect(resolve(id)).toBe('aura_slow');
    }
    expect(whetstormHoardBatAuraImageUrl('hoard_bat_screech_1')).toBeNull();
  });
  it('pins the original master and delivered file with provenance', async () => {
    const { assets } = JSON.parse(readFileSync('docs/whetstorm/hoard-bat-screech-aura-generation.json', 'utf8'));
    expect(assets).toHaveLength(1);
    const [asset] = assets;
    expect(asset.auraId).toBe(canonical);
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
