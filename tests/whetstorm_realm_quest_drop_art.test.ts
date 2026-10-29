import { describe, expect, it } from 'vitest';
import { ITEMS } from '../src/sim/data';
import { realmQuestDropItemImageUrl } from '../src/ui/realm_quest_drop_art';

describe('realm quest drop paintings', () => {
  it('maps the four real quest items to their individual paintings', () => {
    for (const id of ['wardens_seal', 'duskwisp_essence', 'spore_heart', 'wisp_mote']) {
      expect(ITEMS[id]?.kind).toBe('quest');
      expect(realmQuestDropItemImageUrl(id)).toBe(`/ui/whetstorm/items/${id}.webp`);
    }
    expect(realmQuestDropItemImageUrl('__proto__')).toBeNull();
    expect(realmQuestDropItemImageUrl('unknown')).toBeNull();
  });
});
