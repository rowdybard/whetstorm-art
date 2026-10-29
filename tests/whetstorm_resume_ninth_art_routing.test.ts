import { describe, expect, it } from 'vitest';
import { DEEDS } from '../src/sim/content/deeds';
import { deedCrestId } from '../src/ui/deeds_view';
import { iconDataUrl, itemImageUrl } from '../src/ui/icons';

describe('ninth resumed original art checkpoint', () => {
  it('routes the forgewall armor', () => {
    for (const id of ['forgewall_chest', 'forgewall_gloves', 'forgewall_legs']) {
      expect(itemImageUrl(id)).toBe(`/ui/whetstorm/items/${id}.webp`);
      expect(iconDataUrl('item', id)).toBe(`/ui/whetstorm/items/${id}.webp`);
    }
  });
  it('routes dungeon meta crests', () => {
    for (const id of ['dgn_deepward', 'dgn_mark_circuit', 'dgn_boss_clears_50']) {
      expect(iconDataUrl('crest', deedCrestId(id, DEEDS[id].category))).toBe(
        `/ui/whetstorm/deeds/${id}.webp`,
      );
    }
  });
  it('routes raid effect art', () => {
    for (const id of [
      'nythraxis_dread_curse',
      'nythraxis_soul_rend',
      'nythraxis_transition_stun',
      'nythraxis_deathless_stun',
    ]) {
      expect(iconDataUrl('aura', id)).toBe(`/ui/whetstorm/auras/${id}.webp`);
    }
  });
});
