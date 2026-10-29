import { describe, expect, it } from 'vitest';
import { DEEDS } from '../src/sim/content/deeds';
import { deedCrestId } from '../src/ui/deeds_view';
import { iconDataUrl, itemImageUrl } from '../src/ui/icons';

describe('seventeenth resumed original art checkpoint', () => {
  it('routes armor and farming tools', () => {
    for (const id of [
      'oathpyre_helmet',
      'oathpyre_shoulder',
      'oathpyre_chest',
      'oathpyre_gloves',
      'oathpyre_legs',
      'bronze_hoe',
      'skysilver_hoe',
      'osmium_hoe',
      'evergarden_hoe',
    ]) {
      expect(itemImageUrl(id)).toBe(`/ui/whetstorm/items/${id}.webp`);
      expect(iconDataUrl('item', id)).toBe(`/ui/whetstorm/items/${id}.webp`);
    }
  });
  it('routes heroic depths crests', () => {
    for (const id of [
      'dgn_gravewyrm_sanctum_heroic',
      'dgn_nythraxis_heroic',
      'dlv_reliquary_heroic',
    ]) {
      expect(iconDataUrl('crest', deedCrestId(id, DEEDS[id].category))).toBe(
        `/ui/whetstorm/deeds/${id}.webp`,
      );
    }
  });
  it('routes shadow effects with shared identity art', () => {
    for (const id of ['wlk_forbidden_reflection', 'wlk_forbidden_reflection_lock']) {
      expect(iconDataUrl('aura', id)).toBe('/ui/whetstorm/auras/wlk_forbidden_reflection.webp');
    }
    for (const id of ['wlk_leaden_hex_root', 'wlk_leaden_hex_root_lock', 'wlk_leaden_hex_slow']) {
      expect(iconDataUrl('aura', id)).toBe('/ui/whetstorm/auras/wlk_leaden_hex.webp');
    }
    expect(iconDataUrl('aura', 'voidsong_echo')).toBe('/ui/whetstorm/auras/voidsong_echo.webp');
  });
});
