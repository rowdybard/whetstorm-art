import { describe, expect, it } from 'vitest';
import { professionImageUrl } from '../src/ui/hud/professions/profession_art';
import { iconDataUrl, itemImageUrl, professionIconUrl } from '../src/ui/icons';

describe('original crafting checkpoint routing', () => {
  it('routes five crafting identities through the profession UI', () => {
    for (const id of [
      'prof_alchemy',
      'prof_armorcrafting',
      'prof_cooking',
      'prof_enchanting',
      'prof_engineering',
    ]) {
      expect(professionImageUrl(id)).toBe(`/ui/whetstorm/professions/${id}.webp`);
      expect(professionIconUrl(id)).toBe(`/ui/whetstorm/professions/${id}.webp`);
    }
  });
  it('routes original weapons', () => {
    for (const id of ['hoarfrost_edge', 'pitlords_cleaver']) {
      expect(itemImageUrl(id)).toBe(`/ui/whetstorm/items/${id}.webp`);
      expect(iconDataUrl('item', id)).toBe(`/ui/whetstorm/items/${id}.webp`);
    }
  });
});
