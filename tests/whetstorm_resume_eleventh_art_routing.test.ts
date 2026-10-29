import { describe, expect, it } from 'vitest';
import { DEEDS } from '../src/sim/content/deeds';
import { deedCrestId } from '../src/ui/deeds_view';
import { iconDataUrl, itemImageUrl } from '../src/ui/icons';

describe('eleventh resumed original art checkpoint', () => {
  it('routes woven bags', () => {
    for (const id of ['silkspun_satchel', 'duskweave_bag', 'resonant_weave_bag']) {
      expect(itemImageUrl(id)).toBe(`/ui/whetstorm/items/${id}.webp`);
      expect(iconDataUrl('item', id)).toBe(`/ui/whetstorm/items/${id}.webp`);
    }
  });
  it('routes delve crests', () => {
    for (const id of ['dlv_reliquary', 'dlv_litany', 'dlv_lore_journal']) {
      expect(iconDataUrl('crest', deedCrestId(id, DEEDS[id].category))).toBe(
        `/ui/whetstorm/deeds/${id}.webp`,
      );
    }
  });
  it('routes stonebound stance and status effects', () => {
    for (const id of [
      'shaman_stonebound_armor',
      'shaman_stonebound_dr',
      'shaman_stonebound_stamina',
    ]) {
      expect(iconDataUrl('aura', id)).toBe('/ui/whetstorm/auras/shaman_stonebound.webp');
    }
    for (const id of [
      'shaman_stonebound_unleash_guard',
      'shaman_stonebound_ward_smooth',
      'shaman_warspirit_cadence',
    ]) {
      expect(iconDataUrl('aura', id)).toBe(`/ui/whetstorm/auras/${id}.webp`);
    }
  });
});
