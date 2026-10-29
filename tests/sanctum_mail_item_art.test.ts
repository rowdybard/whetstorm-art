import { describe, expect, it } from 'vitest';
import { ITEMS } from '../src/sim/data';
import { sanctumMailItemImageUrl } from '../src/ui/sanctum_mail_item_art';

const ids = ['boundstone_helm', 'boundstone_girdle', 'gravewyrm_mantle', 'gravewyrm_gauntlets'];

describe('Sanctum mail original art', () => {
  it('maps current mail items to their individual images', () => {
    for (const id of ids) {
      expect(ITEMS[id]?.armorType).toBe('mail');
      expect(sanctumMailItemImageUrl(id)).toBe(`/ui/whetstorm/items/${id}.webp`);
    }
    expect(sanctumMailItemImageUrl('../boundstone_helm')).toBeNull();
  });
});
