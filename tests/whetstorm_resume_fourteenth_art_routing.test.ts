import { describe, expect, it } from 'vitest';
import { DEEDS } from '../src/sim/content/deeds';
import { deedCrestId } from '../src/ui/deeds_view';
import { iconDataUrl, itemImageUrl } from '../src/ui/icons';

describe('fourteenth resumed original art checkpoint', () => {
  it('routes faction utility items', () => {
    for (const id of [
      'rift_feather_glider',
      'clockwork_target_dummy',
      'clockwork_shock_bomb',
      'allied_hearthstone',
    ]) {
      expect(itemImageUrl(id)).toBe(`/ui/whetstorm/items/${id}.webp`);
      expect(iconDataUrl('item', id)).toBe(`/ui/whetstorm/items/${id}.webp`);
    }
  });
  it('routes delve challenge crests', () => {
    for (const id of ['dlv_clears_50', 'dlv_tumbler_premium', 'dlv_rite_flawless']) {
      expect(iconDataUrl('crest', deedCrestId(id, DEEDS[id].category))).toBe(
        `/ui/whetstorm/deeds/${id}.webp`,
      );
    }
  });
  it('routes general effects', () => {
    for (const id of [
      'set_clearcasting',
      'set_soulblaze',
      'bg_carrier_vulnerability',
      'elixir_buff_sta',
    ]) {
      expect(iconDataUrl('aura', id)).toBe(`/ui/whetstorm/auras/${id}.webp`);
    }
  });
});
