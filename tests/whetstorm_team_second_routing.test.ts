import { describe, expect, it } from 'vitest';
import { DEEDS } from '../src/sim/content/deeds';
import { ITEMS } from '../src/sim/data';
import { resolveAuraIconId } from '../src/ui/aura_icon_view';
import { deedCrestId } from '../src/ui/deeds_view';
import {
  auraImageUrl,
  deedImageUrl,
  hasAbilityIconIdentity,
  hasAuraImageIdentity,
  iconDataUrl,
  itemImageUrl,
} from '../src/ui/icons';

describe('team second batch routing', () => {
  it('routes each live item to its own painting', () => {
    for (const id of [
      'vestments_of_the_acolyte',
      'cord_of_the_dawn',
      'dawnlit_slippers',
      'forgefold_plating',
      'wyrmhide_cording',
      'sunspun_bolt',
      'duskforged_billet',
      'veilsteel_blade',
      'duskfang_dirk',
      'gleamwood_stave',
    ]) {
      expect(ITEMS[id]).toBeDefined();
      expect(itemImageUrl(id)).toBe(`/ui/whetstorm/items/${id}.webp`);
      expect(iconDataUrl('item', id)).toBe(`/ui/whetstorm/items/${id}.webp`);
    }
  });
  it('routes live chronicle deeds to their own crests', () => {
    for (const id of [
      'chr_vale_gatherer',
      'chr_vale_first_harvest',
      'chr_marsh_first_harvest',
      'chr_peaks_first_harvest',
    ]) {
      expect(DEEDS[id]).toBeDefined();
      const crest = deedCrestId(id, DEEDS[id].category);
      expect(deedImageUrl(crest)).toBe(`/ui/whetstorm/deeds/${id}.webp`);
      expect(iconDataUrl('crest', crest)).toBe(`/ui/whetstorm/deeds/${id}.webp`);
    }
  });
  it('routes aura runtime and family identities without changing the pet spell identity', () => {
    for (const [id, family] of [
      ['blood_frenzy', 'mob_frenzy_on_hit'],
      ['silence_gravecaller_summoner', 'mob_silence'],
      ['siphon_spirit_sister_nhalia', 'mob_siphon_spirit'],
      ['spellvuln_rift_boss_arcane', 'mob_spell_vuln'],
      ['spellvuln_stormcrag_elemental', 'mob_spell_vuln'],
    ]) {
      const url = `/ui/whetstorm/auras/${family}.webp`;
      expect(auraImageUrl(id)).toBe(url);
      expect(auraImageUrl(family)).toBe(url);
      expect(iconDataUrl('aura', id)).toBe(url);
    }
    expect(
      resolveAuraIconId(
        { id: 'raise_bone_mage', kind: 'spellvuln' },
        hasAbilityIconIdentity,
        () => false,
        hasAuraImageIdentity,
      ),
    ).toBe('mob_spell_vuln');
    expect(auraImageUrl('raise_bone_mage')).not.toBe('/ui/whetstorm/auras/mob_spell_vuln.webp');
  });
});
