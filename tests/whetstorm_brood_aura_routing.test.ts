import { describe, expect, it } from 'vitest';
import { auraImageUrl, iconDataUrl, itemImageUrl } from '../src/ui/icons';

describe('brood armor and mob aura public routing', () => {
  it('routes each armor identity to its own painting', () => {
    for (const id of [
      'wyrmcult_grand_robe',
      'wyrmcult_soulsteps',
      'moonshroud_robe',
      'necromancers_legwraps',
    ]) {
      const url = `/ui/whetstorm/items/${id}.webp`;
      expect(itemImageUrl(id)).toBe(url);
      expect(iconDataUrl('item', id)).toBe(url);
    }
  });

  it('routes exact aura identities to the intended family painting', () => {
    const mappings: [string, string][] = [
      ['lockout_threnos_first_voice', 'mob_lockout'],
      ['lockout_wyrmcult_zealot', 'mob_lockout'],
      ['mirefen_widowling_chill', 'mob_chill_on_hit'],
      ['rift_frost_revenant_chill', 'mob_chill_on_hit'],
      ['stormcrag_elemental_chill', 'mob_chill_on_hit'],
      ['mob_charge_stun', 'mob_charge_stun'],
      ['mob_demoralize', 'mob_demoralize'],
      ['expose_varkas_boneguard', 'mob_expose'],
      ['heal_absorb_gravecaller_summoner', 'mob_heal_absorb'],
      ['heal_absorb_rift_boss_necro', 'mob_heal_absorb'],
      ['hex_gravecaller_cultist', 'mob_hex'],
      ['hex_mudfin_murloc', 'mob_polymorph_hex'],
      ['cost_tax_gravecaller_mender', 'mob_cost_tax'],
      ['critvuln_mire_widow', 'mob_crit_vuln'],
      ['enervate_boneclad_revenant', 'mob_enervate'],
      ['enfeeble_threnos_first_voice', 'mob_enfeeble'],
      ['enfeeble_wyrmcult_zealot', 'mob_enfeeble'],
    ];
    for (const [id, painting] of mappings) {
      const url = `/ui/whetstorm/auras/${painting}.webp`;
      expect(auraImageUrl(id)).toBe(url);
      expect(iconDataUrl('aura', id)).toBe(url);
    }
  });
});
