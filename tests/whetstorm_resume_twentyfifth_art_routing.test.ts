import { describe, expect, it } from 'vitest';
import { DEEDS } from '../src/sim/content/deeds';
import { deedCrestId } from '../src/ui/deeds_view';
import { iconDataUrl, itemImageUrl } from '../src/ui/icons';

describe('twenty-fifth resumed original art checkpoint', () => {
  it('routes vanguard weapons', () => {
    for (const id of ['vanguard_fang_dagger', 'vanguard_warstaff']) {
      expect(itemImageUrl(id)).toBe(`/ui/whetstorm/items/${id}.webp`);
      expect(iconDataUrl('item', id)).toBe(`/ui/whetstorm/items/${id}.webp`);
    }
  });
  it('routes raid challenge crests', () => {
    for (const id of [
      'dgn_nythraxis_gravebreaker',
      'dgn_nythraxis_wardens',
      'dgn_nythraxis_deathless',
    ]) {
      expect(iconDataUrl('crest', deedCrestId(id, DEEDS[id].category))).toBe(
        `/ui/whetstorm/deeds/${id}.webp`,
      );
    }
  });
  it('routes hunter cooldowns', () => {
    for (const id of ['hunter_enduring_courser_icd', 'hunter_predators_pace_icd']) {
      expect(iconDataUrl('aura', id)).toBe(`/ui/whetstorm/auras/${id}.webp`);
    }
  });
});
