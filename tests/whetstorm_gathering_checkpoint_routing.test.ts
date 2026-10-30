import { describe, expect, it } from 'vitest';
import { DEEDS } from '../src/sim/content/deeds';
import { deedCrestId } from '../src/ui/deeds_view';
import { professionImageUrl } from '../src/ui/hud/professions/profession_art';
import { iconDataUrl, itemImageUrl, professionIconUrl } from '../src/ui/icons';

describe('original gathering checkpoint routing', () => {
  it('routes gathering icons and preserves legacy fallback', () => {
    for (const id of [
      'gather_farming',
      'gather_fishing',
      'gather_herbalism',
      'gather_logging',
      'gather_mining',
    ]) {
      const url = `/ui/whetstorm/professions/${id}.webp`;
      expect(professionImageUrl(id)).toBe(url);
      expect(professionIconUrl(id)).toBe(url);
    }
    expect(professionImageUrl('prof_alchemy')).toBe('/ui/professions/prof_alchemy.webp');
    expect(professionImageUrl('../gather_mining')).toBeNull();
  });
  it('routes gathering deeds and the collectible keepsake', () => {
    for (const id of ['prog_first_harvest', 'prog_master_gatherer']) {
      expect(iconDataUrl('crest', deedCrestId(id, DEEDS[id].category))).toBe(
        `/ui/whetstorm/deeds/${id}.webp`,
      );
    }
    expect(itemImageUrl('dawnhold_posy')).toBe('/ui/whetstorm/items/dawnhold_posy.webp');
    expect(iconDataUrl('item', 'dawnhold_posy')).toBe('/ui/whetstorm/items/dawnhold_posy.webp');
  });
});
