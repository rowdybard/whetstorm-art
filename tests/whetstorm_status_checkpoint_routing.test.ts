import { describe, expect, it } from 'vitest';
import { ITEMS } from '../src/sim/data';
import { auraImageUrl, iconDataUrl, itemImageUrl } from '../src/ui/icons';

const items = [
  'varric_shadow_cowl',
  'sunken_reliquary_hood',
  'orchard_sapbinder_grips',
  'mantle_of_the_meredark',
  'thornpeak_cabbage_seed',
  'thornpeak_cabbage',
  'fine_thornpeak_cabbage',
  'frost_lentils_seed',
  'swiftfang_talisman',
  'medallion_of_endless_profit',
  'warhewn_signet',
  'prismglass_loop',
  'bloodmane_warleggings',
  'spiritweld_girdle',
  'forgefold_legguards',
  'wardspeaker_sabatons',
];
const auras = [
  ['arcaneRot_deacon_voss', 'mob_arcane_rot'],
  ['arcaneRot_rift_void_acolyte', 'mob_arcane_rot'],
  ['blind_vale_bandit', 'mob_blind'],
  ['cinder_ironvein_sapper', 'mob_cinder'],
  ['cinder_rift_boss_ember', 'mob_cinder'],
  ['cinder_rift_ember_fiend', 'mob_cinder'],
  ['concuss_brakka_wallbreaker', 'mob_concuss'],
  ['concuss_rift_boss_storm', 'mob_concuss'],
  ['concuss_rift_storm_caller', 'mob_concuss'],
  ['concuss_thornpeak_ogre', 'mob_concuss'],
  ['corrode_deepfen_murloc', 'mob_corrode'],
  ['corrode_reliquary_ledger_wraith', 'mob_corrode'],
  ['corrode_rift_deep_lurker', 'mob_corrode'],
  ['disarm_ogre_crusher', 'mob_disarm'],
  ['ensnare_rift_boss_venom', 'mob_ensnare'],
  ['ensnare_rift_venom_weaver', 'mob_ensnare'],
  ['ensnare_webwood_spider', 'mob_ensnare'],
  ['frostbite_rift_rime_elemental', 'mob_frostbite'],
  ['frostbite_shardlord_kazzix', 'mob_frostbite'],
];

describe('item and mob status painting checkpoint', () => {
  it('routes live items through both public image APIs', () => {
    for (const id of items) {
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
