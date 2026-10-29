import { describe, expect, it } from 'vitest';
import { DEEDS } from '../src/sim/content/deeds';
import { deedCrestId } from '../src/ui/deeds_view';
import { iconDataUrl, itemImageUrl } from '../src/ui/icons';

describe('sixteenth resumed original art checkpoint', () => {
  it('routes original gathering tools and weapons', () => {
    for (const id of [
      'arcanite_mining_pick',
      'ashwood_axe',
      'elderwood_axe',
      'sunpetal_sickle',
      'springtouched_crozier',
      'wand_of_quenched_sparks',
    ]) {
      expect(itemImageUrl(id)).toBe(`/ui/whetstorm/items/${id}.webp`);
      expect(iconDataUrl('item', id)).toBe(`/ui/whetstorm/items/${id}.webp`);
    }
  });
  it('routes heroic dungeon crests', () => {
    for (const id of [
      'dgn_hollow_crypt_heroic',
      'dgn_sunken_bastion_heroic',
      'dgn_drowned_temple_heroic',
    ]) {
      expect(iconDataUrl('crest', deedCrestId(id, DEEDS[id].category))).toBe(
        `/ui/whetstorm/deeds/${id}.webp`,
      );
    }
  });
});
