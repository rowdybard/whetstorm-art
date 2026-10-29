import { describe, expect, it } from 'vitest';
import { ITEMS } from '../src/sim/data';
import { mailBonewardItemImageUrl } from '../src/ui/mail_boneward_item_art';

const ids = ['boneplate_vest', 'drogmar_warboots', 'marrowlord_boneboots', 'boneguard_breastplate'];

describe('Boneward mail original art', () => {
  it('maps current mail items to their individual images', () => {
    for (const id of ids) {
      expect(ITEMS[id]?.armorType).toBe('mail');
      expect(mailBonewardItemImageUrl(id)).toBe(`/ui/whetstorm/items/${id}.webp`);
    }
    expect(mailBonewardItemImageUrl('../boneplate_vest')).toBeNull();
  });
});
