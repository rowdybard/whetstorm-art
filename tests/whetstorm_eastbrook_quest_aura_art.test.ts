import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { describe, expect, it } from 'vitest';
import { WORLD_QUEST_DELIVERY_AURA_ID } from '../src/sim/world_quest_delivery';
import { SHADOW_CLOAK_AURA_ID } from '../src/sim/shadow_action_lock';
import { resolveAuraIconId } from '../src/ui/aura_icon_view';
import { auraImageUrl, hasAbilityIconIdentity, hasAuraImageIdentity, hasAuraRecipe } from '../src/ui/icons';
import { eastbrookQuestAuraImageUrl } from '../src/ui/eastbrook_quest_aura_art';

const entries = [
  [WORLD_QUEST_DELIVERY_AURA_ID, 'world_quest_cargo'],
  [SHADOW_CLOAK_AURA_ID, 'stealth'],
] as const;
const hash = (path: string) => createHash('sha256').update(readFileSync(path)).digest('hex');
const resolve = (id: string, kind: string) =>
  resolveAuraIconId({ id, kind }, hasAbilityIconIdentity, hasAuraRecipe, hasAuraImageIdentity);

describe('Eastbrook world quest aura paintings', () => {
  it('preserves exact live IDs through production identity and image routing', () => {
    expect(entries.map(([id]) => id)).toEqual(['world_quest_delivery_cargo', 'world_quest_shadow_cloak']);
    for (const [id, kind] of entries) {
      const expected = `/ui/whetstorm/auras/${id}.webp`;
      expect(eastbrookQuestAuraImageUrl(id)).toBe(expected);
      expect(hasAuraImageIdentity(id)).toBe(true);
      expect(resolve(id, kind)).toBe(id);
      expect(auraImageUrl(resolve(id, kind))).toBe(expected);
    }
    expect(eastbrookQuestAuraImageUrl('world_quest_delivery_cargo_extra')).toBeNull();
    expect(eastbrookQuestAuraImageUrl('../world_quest_shadow_cloak')).toBeNull();
    expect(resolve('unrelated_test_cargo', 'world_quest_cargo')).toBe('aura_world_quest_cargo');
    expect(resolve('unrelated_test_cloak', 'stealth')).toBe('aura_stealth');
  });

  it('pins two independent masters and delivered images', async () => {
    const { assets } = JSON.parse(readFileSync('docs/whetstorm/eastbrook-quest-auras-generation.json', 'utf8'));
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
