// Pure target-portrait selection. Every catalogued mob template has committed,
// prerendered portrait art; players use their live class portrait and NPCs keep
// their crest. Short-lived guardians are not MOBS rows, so they deliberately
// borrow an existing source for fallback metadata and, where no override exists,
// portrait art.

export const TRANSIENT_MOB_PORTRAIT_SOURCE_IDS: Readonly<Record<string, string>> = Object.freeze({
  guardian_tithefiend: 'rift_dread_stalker',
  guardian_stampede_0: 'old_greyjaw',
  guardian_stampede_1: 'wild_boar',
  guardian_stampede_2: 'gloam_strider',
});

// A mob whose visual comes from a procedural world renderer rather than the
// creature manifest keeps its hand-painted portrait here, outside the
// deterministic mob-render ledger (the retired Vale Cup ball was the one
// occupant; the seam stays for the next bespoke-visual mob).
const STATIC_MOB_PORTRAIT_URLS: Readonly<Record<string, string>> = Object.freeze({});

const ORIGINAL_MOB_PORTRAITS: ReadonlyMap<string, string> = new Map([
  ...[
    'forest_wolf',
    'wild_boar',
    'webwood_spider',
    'mudfin_murloc',
    'mire_prowler',
    'deepfen_murloc',
    'mire_widow',
    'drowned_dead',
    'ridge_stalker',
    'deeprock_kobold',
    'thornpeak_ogre',
    'stormcrag_elemental',
    'tunnel_rat',
    'vale_bandit',
    'restless_bones',
    'old_greyjaw',
    'fen_troll',
    'grubjaw',
    'drowned_warlord',
    'mirefen_broodmother',
    'ogre_crusher',
    'wyrmcult_zealot',
    'wyrmcult_necromancer',
    'boneclad_revenant',
    'crypt_shambler',
    'hollow_acolyte',
    'bonechill_widow',
    'bastion_revenant',
    'hoard_coinsack_scurrier',
    'ignivar_ember_sentinel',
    'ignivar_crucible_warden',
    'ignivar_cinder_artificer',
    'guardian_tithefiend',
    'wildheart_stalker',
    'wildheart_ravager',
    'wildheart_hexcaller',
    'wildheart_beastmaster',
    'dragonkin_egg',
    'dragonkin_whelp',
    'dragonkin_broodguard',
    'drakemaw_broodlord',
    'topiary_stag',
    'topiary_wolf',
    'hedge_gnome',
    'hedge_knight',
    'drowned_templeguard',
    'pale_choir_acolyte',
    'glimmerscale_lurker',
    'pearlguard_sentinel',
    'nythraxis_skeleton_warrior',
    'nythraxis_heroic_warrior_add',
    'nythraxis_heroic_priest_add',
    'nythraxis_heroic_rogue_add',
    'sexton_marrow',
    'tidebound_acolyte',
    'drowned_thrall',
    'knight_commander_olen',
    'ashbone_raider',
    'ashbone_warcaller',
    'dune_troll',
    'cindraleth_maw_matriarch',
    'ignivar_heart_of_the_end',
    'nythraxis_bone_spike',
    'sanctum_boneguard',
    'sanctum_drakonid',
    'the_topiary_bull',
    'gilded_stag',
    'gloam_fox',
    'orchard_treant',
    'hoard_boss_mushroom',
    'hoard_boss_mole',
    'hoard_boss_bat',
    'hoard_boss_mimic',
  ].map((id): [string, string] => [id, `/ui/whetstorm/mobs/${id}.webp`]),
  ...['morthen', 'vael_the_mistcaller', 'ysolei', 'varkhul_forgefather_of_the_last_flame'].map(
    (id): [string, string] => [id, `/ui/whetstorm/encounters/finder-${id}.webp`],
  ),
  ['ignivar_herald_of_the_last_flame', '/ui/whetstorm/encounters/ignivar-finder.webp'],
  ['nythraxis_scourge_of_thornpeak', '/ui/whetstorm/mobs/nythraxis_scourge_of_thornpeak.webp'],
]);

export function targetPortraitSourceId(templateId: string, isMobEntity: boolean): string | null {
  if (!isMobEntity) return null;
  return TRANSIENT_MOB_PORTRAIT_SOURCE_IDS[templateId] ?? templateId;
}

export function targetPortraitUrl(templateId: string, isMobEntity: boolean): string | null {
  if (isMobEntity && STATIC_MOB_PORTRAIT_URLS[templateId]) {
    return STATIC_MOB_PORTRAIT_URLS[templateId];
  }
  if (isMobEntity && ORIGINAL_MOB_PORTRAITS.has(templateId)) {
    return ORIGINAL_MOB_PORTRAITS.get(templateId) ?? null;
  }
  const sourceId = targetPortraitSourceId(templateId, isMobEntity);
  return sourceId
    ? (ORIGINAL_MOB_PORTRAITS.get(sourceId) ?? `/ui/mobs/${encodeURIComponent(sourceId)}.webp`)
    : null;
}
