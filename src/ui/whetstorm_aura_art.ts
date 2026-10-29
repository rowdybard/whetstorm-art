import { whetstormMobAuraAfflictionsImageUrl } from './whetstorm_mob_aura_afflictions_art';
import { whetstormMobAuraBatchImageUrl } from './whetstorm_mob_aura_batch_art';
import { whetstormMobAuraControlImageUrl } from './whetstorm_mob_aura_control_art';
import { whetstormMobAuraCursesImageUrl } from './whetstorm_mob_aura_curses_art';
import { whetstormMobAuraDebuffsImageUrl } from './whetstorm_mob_aura_debuffs_art';
import { whetstormMobAuraDrainsImageUrl } from './whetstorm_mob_aura_drains_art';
import { whetstormMobAuraImpairmentsImageUrl } from './whetstorm_mob_aura_impairments_art';
import { whetstormMobAuraMagicImageUrl } from './whetstorm_mob_aura_magic_art';
import { whetstormMobAuraStatusImageUrl } from './whetstorm_mob_aura_status_art';

// Original Whetstorm aura paintings, keyed by exact runtime identity.
const WHETSTORM_AURA_ART: ReadonlyMap<string, string> = new Map([
  ['well_fed', '/ui/whetstorm/auras/well_fed.webp'],
  ...[
    'mob_aoe_slow',
    'mob_bleed',
    'mob_stack_poison',
    'mob_plague',
    'mob_arcane_rot',
    'mob_blind',
    'mob_cinder',
    'mob_concuss',
    'mob_corrode',
    'mob_disarm',
    'mob_ensnare',
    'mob_frostbite',
    'mob_lockout',
    'mob_chill_on_hit',
    'mob_charge_stun',
    'mob_demoralize',
    'mob_expose',
    'mob_heal_absorb',
    'mob_hex',
    'mob_polymorph_hex',
    'mob_cost_tax',
    'mob_crit_vuln',
    'mob_enervate',
    'mob_enfeeble',
    'mob_mortal_strike',
    'mob_pack_frenzy',
    'mob_rally',
    'mob_rampage',
    'mob_slow_strike',
    'mob_stagger_hit',
    'mob_tongues',
    'mob_wither',
    'mob_frenzy_on_hit',
    'mob_silence',
    'mob_siphon_spirit',
    'mob_spell_vuln',
    'mob_smolder',
    'mob_soulrot',
    'mob_venom',
    'mob_vulnerability',
  ].map((id): [string, string] => [id, `/ui/whetstorm/auras/${id}.webp`]),
  ['mortal_wound_bastion_revenant', '/ui/whetstorm/auras/mob_mortal_strike.webp'],
  ['mortal_wound_deathstalker_voss', '/ui/whetstorm/auras/mob_mortal_strike.webp'],
  ['mortal_wound_reliquary_gravecall_acolyte', '/ui/whetstorm/auras/mob_mortal_strike.webp'],
  ['mortal_wound_voskar_emberwing', '/ui/whetstorm/auras/mob_mortal_strike.webp'],
  ['pack_frenzy', '/ui/whetstorm/auras/mob_pack_frenzy.webp'],
  ['rally_ironvein_foreman', '/ui/whetstorm/auras/mob_rally.webp'],
  ['rampage_rift_boss_brute', '/ui/whetstorm/auras/mob_rampage.webp'],
  ['rampage_warlord_drogmar', '/ui/whetstorm/auras/mob_rampage.webp'],
]);

export function whetstormAuraImageUrl(id: string): string | null {
  return (
    WHETSTORM_AURA_ART.get(id) ??
    whetstormMobAuraBatchImageUrl(id) ??
    whetstormMobAuraDebuffsImageUrl(id) ??
    whetstormMobAuraStatusImageUrl(id) ??
    whetstormMobAuraControlImageUrl(id) ??
    whetstormMobAuraCursesImageUrl(id) ??
    whetstormMobAuraDrainsImageUrl(id) ??
    whetstormMobAuraImpairmentsImageUrl(id) ??
    whetstormMobAuraMagicImageUrl(id) ??
    whetstormMobAuraAfflictionsImageUrl(id)
  );
}
