import { describe, expect, it } from 'vitest';
import { ITEMS } from '../src/sim/data';
import { auraImageUrl, iconDataUrl, itemImageUrl } from '../src/ui/icons';

const ids = [
  'deathlord_sabatons',
  'peaksong_helm',
  'thunderward_legguards',
  'crownforged_gauntlets',
  'moonbark_vestments',
  'cragprowl_belt',
  'stormroot_cowl',
  'revenantstep_treads',
  'elixir_of_the_serpent',
  'potion_of_invisibility',
  'elixir_of_mana_regeneration',
  'resonant_steel',
  'resonant_timber',
  'resonant_hide',
  'resonant_links',
];
const auras = [
  ['aoe_slow', 'mob_aoe_slow'],
  ['bleed_ridge_stalker', 'mob_bleed'],
  ['bleed_rift_thornback', 'mob_bleed'],
  ['bleed_wildheart_ravager', 'mob_bleed'],
  ['stackpoison_mirefen_broodmother', 'mob_stack_poison'],
  ['stackpoison_rift_boss_venom', 'mob_stack_poison'],
  ['plague_drowned_dead', 'mob_plague'],
  ['plague_fenbridge_infiltrator', 'mob_plague'],
  ['plague_drowned_warlord', 'mob_plague'],
];

describe('mob aura and item painting checkpoint', () => {
  it('routes live items through both public image APIs', () => {
    for (const id of ids) {
      expect(Object.hasOwn(ITEMS, id)).toBe(true);
      expect(itemImageUrl(id)).toBe(`/ui/whetstorm/items/${id}.webp`);
      expect(iconDataUrl('item', id)).toBe(`/ui/whetstorm/items/${id}.webp`);
    }
  });
  it('routes exact mob aura identities to their shared effect paintings', () => {
    for (const [id, file] of auras) {
      expect(auraImageUrl(id)).toBe(`/ui/whetstorm/auras/${file}.webp`);
      expect(iconDataUrl('aura', id)).toBe(`/ui/whetstorm/auras/${file}.webp`);
    }
  });
});
