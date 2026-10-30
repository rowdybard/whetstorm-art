// Pure target-portrait selection. Every catalogued mob template has committed,
// prerendered portrait art; players use their live class portrait and NPCs keep
// their crest. Short-lived guardians are not MOBS rows, so they deliberately
// borrow the portrait of the exact existing creature body used in-world.

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
  const sourceId = targetPortraitSourceId(templateId, isMobEntity);
  return sourceId
    ? (ORIGINAL_MOB_PORTRAITS.get(sourceId) ?? `/ui/mobs/${encodeURIComponent(sourceId)}.webp`)
    : null;
}
