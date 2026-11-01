# 3D replacement and Tripo planning snapshot

Checked 2026-10-29 against the clean `D:/whetstorm-deploy` checkout at
`6c15e449a82ab5b7233b70416b8cd0d5abf97d21` and its `CREDITS.md`. This is a
planning inventory, not a release clearance or authorization to buy or generate
models. The private art branch is a separate partial checkout.

### Art-branch update (2026-10-30)

At art-branch commit `f453ad0db8`, the historical legacy-weapon table below
no longer describes every active held-model mapping. `marrowpoint`,
`duskwhisper`, and `courtiers_bonefang` now use `adv_dagger`, and
`thornpeak_wardblade` uses `adv_sword_1handed`. `gravecourt_hewer` still maps
to `purple_axe`. The four inscription tomes remain mapped as offhand models.
These mappings also feed model preloading; heroic variants inherit their base
item's mapping. See `src/ui/weapon_variants.ts` and
`src/render/characters/manifest.ts` in the art branch.

### Active held-model follow-up (2026-10-30)

The art branch also maps the Rift dagger `rimefang` to `ice_fang` in
`src/ui/weapon_variants.ts`. That same model is the Hoarfrost skin in
`src/sim/content/weapon_skins.ts`, and the Season 1 Armory collection is marked
permission required in `CREDITS.md`. This ordinary item mapping remains relevant
even with the commerce UI switched off. `gravecourt_hewer` maps to the restricted
legacy `purple_axe` and appears in `src/sim/content/nythraxis_loot.ts`.

Together with the four inscription tome keys `tome_silverleaf`, `tome_goldleaf`,
`tome_sunpetal` and `tome_voidbound`, mapped to equipped offhands in
`src/render/characters/manifest.ts` and backed by recipes in
`src/sim/content/recipes.ts`, these are six distinct restricted model keys with
equipment paths. Prioritize clearance, exclusion or replacement for these paths;
the existing 40-weapon and 16-named-file inventories already include them, so
this does not add six to the historical 56-file count. The resolver also follows
`heroicOf`, so audit inherited items before choosing substitutes. The partial art
worktree lacks these GLBs: this follow-up verifies source mappings, not geometry,
embedded textures, grip, distribution contents or actual in-game availability.
Candidate substitutes need independent provenance and visual fit checks.

The restricted Guildmark model `brasscrown_walking_staff` also has an NPC-held
consumer: `NPC_MODULAR_PROP_ATTACH` in `src/render/characters/manifest.ts` maps
`walking_staff` to it, and `src/render/characters/npc_looks.ts` uses that prop
set. It is already included among the 40 collection files, and is a separate
NPC attachment path rather than another player equipment mapping. Preserve its
hand attachment and check NPC poses when selecting a replacement.

`adv_axe_1handed` is a candidate for the remaining axe: the game already uses
it for other one-handed axes and it follows the existing axe attachment path.
Before substituting it, verify the exact model's source and embedded assets,
then test grip and clipping in both hands and all relevant poses. Remapping
alone does not remove restricted files from a distribution. These observations
do not change the 56-file historical inventory or establish release clearance.

Read-only geometry comparison against KayKit Adventures upstream commit
`672074b73ba276876a19e8816ecdc5241817ab47` found the candidate's 340 vertices
and 822 indices match the source glTF data within floating-point precision.
The full-reference candidate GLB SHA-256 is
`35658e3e8b4b2b3350bb8c2f1d7beac29653c99f47fc9090707ee700da6ce09a`.
Both the candidate and restricted axe use the same `VAR_AXE` family attachment.
The embedded 1024-square KTX2 was subsequently decoded and compared with the
official source atlas PNG. Mean absolute channel difference was 4.13/255, with
41.78% of channels exactly equal; the pixels are similar but not identical.
This does not establish whether the differences are solely compression or also
reflect edits. Review drawn and stowed positions, both hands, combat animation,
heroic inheritance, preload, clipping, and enhancement effects before selecting
the substitute. This comparison does not prove an unmodified texture or visual fit.

For the four inscription tomes, `spellbook_open.glb` is a free candidate from
the KayKit Adventure character pack, whose source and atlas are documented by
the [upstream pack](https://github.com/KayKit-Game-Assets/KayKit-Character-Pack-Adventures-1.0)
as CC0. The deployed GLB embeds a KTX2 texture; its transformed bytes have not
been compared to the source atlas. The game already uses this open book as a
rigid hand prop, but it is not a drop-in replacement for the closed tomes: the
offhand attachment path does not carry the prop's `gripRef`. A replacement needs
an explicit attachment solution and visual checks for scale, clipping, both
hands and relevant animations. Its silhouette also changes the item appearance.
Keep the existing tome files until a complete candidate is tested; a remap by
itself would not remove restricted files from a distribution.

Read-only GLB JSON inspection on 2026-11-01 in `D:/whetstorm-deploy` found
that all four tomes have zero animations, skins, and embedded images. They are
rigid closed-book props, so no independent page or book animation is needed:
the character rig moves the attached model. The open-book candidate likewise
has zero animations and skins, but has one embedded image; its texture lineage
and grip still need the checks above. One cleared model could serve all four
runtime mappings, but would replace their distinct closed-book appearances with
one open-book silhouette. Validate each caster rig's drawn and sheathed poses,
equipment swaps, movement and casting, clipping, preload, and packaged files
before accepting any substitute.

### Harbor route marker: free interim candidate

A later read-only inspection found the CC0 KayKit `dungeon/sign_right.glb`
has one right-pointing board, unlike the two-opposing-board Kenney
`biome/camp_signpost.glb`. It is a possible interim substitute for the
restricted harbor route marker, but it is not a drop-in replacement. The
current renderer expects named parts and a text anchor; its vertex-color
conversion would discard the candidate's atlas UVs and texture. An adapter
must preserve the texture, localized two-sided labels, local +X direction,
placement, collider and camera collision behavior.

The candidate cannot preserve the current above-head board and camera-height
contract by a single uniform scaling of the whole mesh. A shorter post puts
part of the board below player head height; a taller post exceeds the current
camera collision height. No change has been made or visually approved. Verify
both faces, all berths and graphics tiers, character clearance and label
readability in a complete candidate before selecting a compromise. This is
planning only and does not remove the restricted original from distribution.

### Environment dependencies requiring clearance

The Eastbrook surface normal and roughness maps are generated from the color
atlas, not independent assets. Their bake is specified in
`scripts/assets/specs/eastbrook_town_surface_pbr.json`; the town renderer uses
the normal map. The Realm Builder distance impostor is baked from the monument
sculpt and has a renderer load path. `CREDITS.md` marks the atlas and monument
`With the project only`, and states that assets with that designation may be
used within a fork under its stated conditions. Their source lineage, derivative
terms and the owner's preference for original art still matter; these rows do
not classify the assets as `No, permission required`.

The active `palmreach_day`, `evergarden_day`, `galecrest_day`, and
`farshore_day` sky variants have a traceable PNG → HDR → KTX2 file pipeline,
but their source-image creator, inputs and terms are not established by the
credits records inspected. Obtain that evidence or use independently cleared
skies; merely adding an attribution would not establish permission. The four
sky families are not counted in the 56-file GLB inventory below.

### Encounter model provenance

The character manifest maps the Ignivar boss to
`public/models/creatures/ignivar_herald.glb` and Heart of the End to
`public/models/creatures/ignivar_ashcaller.glb`. `CREDITS.md` separately records
both contributor-provided models as `With the project only`. The raid automata
`crucible_warden.glb`, `ember_sentinel.glb`, and `cinder_artificer.glb` in the
same directory have their own contributor-handoff row with the same category.
These are not classified as permission-required by the separate restricted
concept-art or voice-line credits.

#### Ignivar replacement compatibility

The character manifest normalizes the posed body to height 2.65, with the mob
template applying scale 3.4, for a nominal 9.01-unit visual. Preserve the
game's +Z facing, grounded feet, and coherent posed bounds. The loader derives
the presentation click capsule from normalized footprint with a 0.5 to 2.2
radius clamp; check targeting and access to nearby targets with the new shape.
This selection proxy is separate from simulation collision, scale-based melee
reach, and encounter geometry, which remain authoritative.

The current mapping uses `Idle`, `Walk`, `Run`, `Attack`, `Death`, `Channel`,
and `FistSpin360` clips. Preserve their behavior or update the mapping and retune
the walk/run references for the new rig. The renderer attaches model VFX through
`src/render/ignivar_model_vfx.ts`: the authored path expects `vfx_core`,
`vfx_vent.l`, and `vfx_vent.r` nodes, with vent emission along local +Y. Its
fallback needs all three `Socket_ChestCore`, `Socket_ShoulderLeft`, and
`Socket_ShoulderRight` nodes; it can add them to a named `chest` only when the
chest-core socket is absent. Check complete anchor placement and orientation,
graphics-tier behavior, and encounter cast/release state timing with the new
animations. Do not infer physical collider behavior from mesh or click bounds.
Replacement fit and in-game behavior have not been verified.

Varkhul maps to `public/models/creatures/varkhul_forgefather.glb`.
`scripts/assets/specs/varkhul_forgefather.json` identifies a maintainer-local
source and processing, but the inspected credit register does not establish
that model's owner or terms. The Varkhul voice, concept, and
`varkhul_grand_forge` prop records concern different assets. Resolve this
model's provenance before selecting a disposition; do not assign a license by
association.

#### Varkhul replacement compatibility

The character manifest normalizes the posed body to height 3 and the mob
template applies scale 3.2, for a nominal 9.6-unit visual. The loader derives
normalization and ground offset from posed bounds; preserve orientation, feet,
and coherent bounds. The current death offset and walk/run reference speeds
are measurements of the existing model and need recalibration for a new rig.

Preserve the mapped idle, walk, run, slash, forging, power-up, casting, slam,
jump, and death semantics. Casting holds at 0.72 seconds; frontal slam and
forging have ability-specific rates, and forging is aligned with the two-second
strike cadence. `src/render/varkhul_forge_hammer.ts` derives spark timing and
height from the old hammer's measured contact and body dimensions. Re-measure
contact, delay, height, and anvil alignment for the replacement and keep the
visual strike synchronized with encounter events.

The model has no explicit click-radius override: its presentation click capsule
is computed from normalized footprint, with a 0.5 to 2.2 radius clamp. Verify
selection and nearby-target access with the new silhouette. This is separate
from simulation geometry and the boss's scale-based melee reach and 4.5-unit
desired range; retain gameplay geometry and check visual contact and room
clearance against the authoritative encounter. No replacement fit or in-game
behavior has been verified.

Nythraxis maps to `skel_golem`, which uses
`public/models/chars/enemies/skeleton_golem.glb` and the separate
`public/models/chars/enemies/skeleton_golem_anims.glb` donor. The credits list KayKit
skeleton models and animations as CC0. `scripts/build_skeleton_golem_anims.mjs`
documents that the donor blends poses from the shipped golem itself, but the
exact shipped source identity and derivative terms still need verification.
The separately credited Nythraxis bone spike is a
project-only prop, not the boss body. The Ignivar, Ashcaller, and Varkhul GLBs
were present in the reference checkout and absent from the partial art worktree;
that absence does not establish downstream package contents. These observations
do not add confirmed permission-required models to the counts below.

## What must be resolved

The current credits register marks the following 16 named, tracked GLB files
**No, permission required**. Each must be cleared, excluded, or replaced before
the relevant distribution. An excluded inactive asset does not necessarily need
a replacement; several assets may be covered by one suitable cleared substitute.

| Group | Tracked paths under `public/models/` | Fit or animation concern |
| --- | --- | --- |
| Vegetation | `props/reeds.glb` | Placement and visual density |
| Held items | `weapons/tome_silverleaf.glb`, `tome_goldleaf.glb`, `tome_sunpetal.glb`, `tome_voidbound.glb` | Grip, scale and attachment |
| Mounts | `mounts/terrorspark_groundshaker.glb`, `goblin_rocket_sled.glb`, `lanternback_troll.glb`, `chimeglass_tortoise.glb` | Rider position and movement; troll and tortoise credits explicitly describe rigged animations |
| Ferry and signage | `props/eastbrook_ferry.glb`, `harbor_route_marker.glb` | Route placement; ferry credits mention LODs and an idle clip |
| NPC gear | `chars/npc_gear/harbormaster_tricorne.glb`, `harbormaster_spyglass.glb` | Bone attachment and bind-frame fit |
| Harbors | `props/wyrmwatch_harbor.glb`, `wickharbor_wharf.glb`, `wickharbor_harbor.glb` | Walkable layout, collision, stairs, docks and interaction positions |

The register also marks **legacy Claudium prototype** and **Season 1 Armory**
weapon collections restricted. The following 40 additional tracked files were
identified by the collection definitions in `src/sim/content/weapon_skins.ts`,
the retired placeholder list in `docs/claudium-store.md`, and registrations in
`src/render/characters/assets.ts`. Names below are GLB stems under
`public/models/weapons/`; cosmetic IDs sometimes differ from model stems.

| Collection | Tracked model stems |
| --- | --- |
| Legacy prototypes (11) | `emberfang_sword`; `redskull_dagger`, `redskull_hammer`, `redskull_staff`, `redskull_sword`, `redskull_wand`; `purple_axe`, `purple_dagger`, `purple_staff`, `purple_sword`, `purple_wand` |
| Guildmark (7) | `guildmark_arming_sword`, `brasscap_hatchet`, `tempered_flanged_mace`, `guildmark_dirk`, `brasscrown_walking_staff`, `lacquered_rod`, `fletcher_s_guild_bow` |
| Emberwrought (7) | `cinderbrand`, `emberbite`, `smoulderfall`, `ashspark_shiv`, `forgeheart_stave`, `emberwrought_wand`, `cinderlatch` |
| Hoarfrost (7) | `ice_fang`, `glaciersplit`, `rimecrusher`, `frostbite`, `hoarfrost_vigil`, `shard_of_everwinter`, `winterbite` |
| Fallen Star (8) | `solheim_last_light_of_the_dawn`, `skyrender_the_firmament_s_wound`, `starfall_judgment_of_the_heavens`, `astravyr_fang_of_the_fallen_star`, `cosmarch_spire_of_the_endless_void`, `emberwish_mote_of_the_dying_sun`, `encore_the_second_falling_star`, `meteorlatch_the_sky_s_last_judgment` |

### Known gameplay consumers of legacy models

At the 2026-10-29 snapshot, `src/ui/weapon_variants.ts` mapped these five base equipment items to four of
the restricted legacy models. The held-model resolver in
`src/render/characters/manifest.ts` also inherits a base mapping through an
item's `heroicOf` field; `heroic_duskwhisper` is a documented example.

| Held model | Base item IDs | Source evidence |
| --- | --- | --- |
| `redskull_dagger` | `marrowpoint` | Drakelands loot in `src/sim/content/drakelands.ts` |
| `purple_dagger` | `duskwhisper`, `courtiers_bonefang` | Wildheart and Nythraxis loot in `src/sim/content/wildheart.ts` and `nythraxis_loot.ts` |
| `purple_sword` | `thornpeak_wardblade` | Nythraxis loot in `src/sim/content/nythraxis_loot.ts` |
| `purple_axe` | `gravecourt_hewer` | Nythraxis loot in `src/sim/content/nythraxis_loot.ts` |

Individual items can share a model. Replace or remap their held models while retaining the items and their combat
behavior. Match weapon family, grip origin, orientation and handling; the
repository's `scripts/asset_pipeline/CLAUDE.md` describes the normalized weapon
contract and a zero-generation path for existing licensed GLBs. Do not run the
pipeline or change those mappings merely from this plan.

The Season 1 registry is referenced by `src/sim/content/reliquary.ts`,
`weapon_skin_rules.ts`, the cosmetic UI and renderer as well as store-related
code. The handoff says commerce is switched off, but that alone does not prove
these cosmetics are inaccessible or safe to remove. Check actual ownership and
non-store acquisition paths, item and UI references, editor references and
generated manifests before exclusion or substitution. References prove a code
path exists; they do not by themselves prove availability in a running build.

The 16 named files plus these 40 weapons give **56 specifically identified
tracked restricted GLBs**, not 56 necessarily required new models. Other
unclassified assets, embedded textures, release output and native packages are
not covered by this count. Replacement choices and any further restricted
files remain to be audited.

### Named world and mount consumers

| Assets | Consumer evidence in the inspected checkout | Planning implication |
| --- | --- | --- |
| `lanternback_troll` | `src/sim/clue_casket.ts` and `src/sim/rift/hoard_reward_roll.ts` both provide reward paths; the renderer registers the model. | Preserve the existing reward key and ownership, and rider/animation behavior if substituting its visual. |
| `terrorspark_groundshaker` | `src/sim/content/items.ts` describes its reins as developer-only with no ordinary acquisition; `mounts.ts` lists it as a developer mount. | Review developer and saved-state handling separately; do not assume a player-facing replacement is needed. |
| `chimeglass_tortoise`, `goblin_rocket_sled` | `mount_skins.ts` registers both as cosmetic skins; their legacy reins are inert junk in `items.ts`. | Audit actual entitlement, acquisition and saved ownership before removing or replacing the skins. |

| Four inscription tomes | `src/render/characters/manifest.ts` maps `silverleaf_primer`, `goldleaf_folio`, `sunpetal_grimoire` and `voidbound_grimoire` to the corresponding held models. | Preserve item-to-hand attachment and grip when remapping. |
| Ferry, Wyrmwatch harbor, Wickharbor wharf and harbor | The transport and harbor content modules describe ferry routes, walkable decks, collision and the harbormaster house as coordinated with the rendered models. | Preserve pier surfaces, routes, collisions, interactions and visual alignment; a generic static mesh is not automatically a substitute. |
| Harbormaster gear | `src/render/characters/manifest.ts` attaches the tricorne to `head` and spyglass to `hips`. | Fit replacements to those attachment frames and validate on the body. |
| Harbor route marker | `src/sim/content/harbor_route_markers.ts` describes shared markers at ferry locations. | Preserve destinations and marker readability. |
| `reeds.glb` | `src/render/props.ts` maps `marshReeds` to this GLB and instantiates the active world's placements. `src/sim/content/zone2.ts` supplies the preserved Fenbridge placements from `src/sim/fenbridge_layout.ts`. | This active model is already in the 16-file inventory. It is distinct from `fen_reeds.glb`, used by other foliage systems; do not count it twice. Check placement and visual density when substituting. |

The Lanternback renderer uses idle, walk, run and death clips, an animated
chair-bone rider attachment with a fixed-seat fallback, and two lantern-bone
attachments. Any candidate needs its own measured seat position and gait,
including rider stability through transitions and LODs; silently falling back
from a missing chair bone does not prove a good fit. Free animated monster
packs are possible sources to investigate, but no specific replacement's
license, model, animation coverage, seating, or proportions has been verified.

These are source-level findings, not evidence that every route or asset was
observed in a running game. Recheck against the actual release candidate.

The register identifies KayKit character models and animations as CC0; it
also lists some Quaternius animated creatures as CC0. Retain a specific model
only after confirming its exact file, derivative textures, animation sources
and notice against the register and pack license. Do not assume every character
or every component has the same permission. Some assets marked `With the
project only` can remain in the fork under the register's stated conditions;
they are not automatically mandatory replacement candidates.

### Player rig and animation evidence (2026-10-30)

The active class mappings in `src/render/characters/manifest.ts` point to
`public/models/chars/players/` bodies: knight, paladin, ranger, rogue, mage,
barbarian and druid. `scripts/assets/specs/characters_v2.json` identifies their
sources as the paid full KayKit Adventurers 2.0 pack, with the paladin from a
separate `KayKit/Paladin` source. It merges clips from six Character Animations
1.1 Rig_Medium libraries into those bodies. These are the exact versions and
sources that need terms checked, rather than an assumption based on the pack name.

`CREDITS.md` broadly asserts that KayKit packs are CC0 and separately labels
the Rig_Medium animation library CC0. Its character-specific row links the
[KayKit Adventurers 1.0 repository](https://github.com/KayKit-Game-Assets/KayKit-Character-Pack-Adventures-1.0),
which independently states CC0 for that repository. That 1.0 statement does
not establish the exact archive terms of Adventurers 2.0, Character Animations
1.1, or the separately sourced paladin. The creator's product pages could not
be fetched during this check. Obtain and retain the relevant archive license or
other version-specific source evidence before treating those files as cleared;
this gap does not establish that they are prohibited.

The checked-in `third_party/licenses/kaykit-cc0.txt` is additional evidence: it
identifies The Complete KayKit Collection v5, dated 2026-04-28, and states CC0
with personal, educational and commercial use permitted. It does not list the
exact collection contents or prove that the files used by the v2 manifest match
that collection. The original archive licenses and source-file match therefore
remain to be verified. The asset-source folders named in the manifest were not
present in the project checkouts inspected.

Additional player clips also need a source-by-source inventory. For example,
`scripts/build_kaykit_hit_variety_anims.mjs` synthesizes hit reactions from
poses in the shipping rigs, while `scripts/build_swim_anims.mjs` retargets
Blender-authored swim clips. Their individual provenance is not established by
the 1.0 pack link alone. The Druid bear and cat form model and animation rows in
`CREDITS.md` are separately marked `With the project only`; that register states
the fork may use such assets within the project, subject to its stated conditions.

### Creature sample for provenance follow-up

These active paths are a prioritized sample, not additional entries in the
56-file permission-required count:

- `public/models/creatures/wolf_basic.glb` is the `mob_wolf` visual and beast
  fallback in `src/render/characters/manifest.ts`; `greyjaw.glb` is the separate
  Old Greyjaw visual. The manifest describes both as custom Tripo wolf rigs.
  The scoped credit search found no exact row for either file, so their precise
  source terms and animation lineage remain unresolved.
- `public/models/creatures/wild_boar.glb` is the active `mob_boar` visual for
  wild and thicket boars. Its manifest describes a custom rig; the scoped search
  found no exact credit or source-manifest row, so its terms remain unresolved.
- `public/models/creatures/spider.glb` is the active spider-family visual.
  `scripts/assets/specs/characters.json` identifies Quaternius's Spider source,
  and `CREDITS.md` lists that spider family as CC0. The same spec identifies
  Quaternius `wolf.glb`, also covered by the wolf family credit, and
  `src/render/ability_vfx/spirits.ts` uses it. It is distinct from the active
  `wolf_basic.glb` body. Verify each shipped derivative and embedded texture
  against its source rather than extending the family credit by name alone.
- The active Druid `bear_form.glb` and `druid_cat_form.glb` have individual
  `With the project only` credit rows. The active `skeleton_minion.glb` is also
  distinct from `skeleton_minion_free.glb`, whose free-tier rebuild has an
  explicit CC0 row; that row alone does not establish the original minion's
  exact merged source tier and animation terms.

## Character and equipment fit

Keep an approved character body as the scale and pose reference when authoring
new equipment. Measure its neutral pose, body bounds, bone names, bind pose,
attachment transforms and animation clips. A generated mesh does not reliably
match those proportions automatically: fit and adjust it in a 3D editor, then
attach rigid gear to the correct bone or skin deforming clothing to the
existing skeleton. Test idle, locomotion and combat animations for clipping,
pose, hand alignment and silhouette. For creature or mount replacements, check
rig type, weight paint, animations, rider socket and scale; auto-rigging is a
starting point, not proof of compatibility. For harbors, preserve navigable
layout and collisions rather than treating one generated mesh as a complete
drop-in replacement.

### Weapon grip and rig compatibility

Player attachments use `handslot.r` and `handslot.l`; drawn bows move to the
left hand, while crossbow handling keeps the authored right-hand attachment
(`src/render/characters/manifest.ts`, `assets.ts`, and `skin_attack.ts` in that
directory). The `assets.ts` single-child flattening clears the child's position
and rotation, so bake required mesh transforms into the geometry before export.
For a variant weapon, put the origin at the handle grip and orient the shaft
along +Y. Register the model basename with the appropriate grip family in
`assets.ts`; a missing registration falls back to the raw bone transform.
`weapon_grip.ts` adds optional per-model adjustments, including offhand fit.

Inspect each candidate in both relevant hands and in idle, locomotion and
combat poses, including drawn bow and crossbow handling where applicable. Also
inspect the stowed position: `assets.ts` reparents held props to the chest and
uses the family transforms in `back_grips.ts`. Check clipping, scale and the
weapon enhancement effects. These code contracts do not establish a candidate's
visual fit or its mesh, texture, skeleton and animation provenance; both remain
to be verified for each proposed replacement.

### Equipped shield example

Varkhul Emberward currently resolves through `itemOffhandModelUrl` to
`public/models/weapons/shield_round.glb`; the live resolver, weapon-skin, heroic
inheritance, and preload expectations are pinned in
`tests/whetstorm_emberward_held_model.test.ts`. The asset specification maps
that GLB to a KayKit Adventurers 1.0 `shield_round.gltf` source, and
`CREDITS.md` credits that pack's weapons and shields as CC0. This is recorded
source evidence, not a byte-identity proof for the shipped GLB.

The `shield_round` accessory maps to `Round_Shield` in
`src/render/characters/held_item_grips.ts`; its left-hand grip has position
`[0, 0.017, 0.1771]`, quaternion `[0, 0, 0, 1]`, and scale `0.4413`, on the
`handslot.l` attachment. Check back-sheathing separately through
`back_grips.ts`. The nearby `Varkhul_Bulwark` grip entry is not evidence that
the old named model is currently selected: the current Emberward resolver
chooses `shield_round`. A proposed replacement needs actual hand and back fit,
origin and clipping checks across supported bodies and animations, preview
tiers, and the resolver/preload tests; no candidate fit has been verified.

### Equipped starter sword example

The Warrior starts with `worn_sword` (Pitted Shortsword). The item variant
registry maps it to `sword_a`, and `itemWeaponModelUrl` resolves
`public/models/weapons/sword_a.glb` when an applicable weapon skin does not
override it. The model exists in the reference checkout. Its addition and later
texture-conversion commits establish history, but the inspected credits and
asset specifications do not identify an exact source or license for this GLB.
Its terms are unresolved; that is not a finding that it is explicitly
permission-required, and the KayKit weapons credit cannot be applied by name
alone.

The attachment registry assigns `sword_a` to `VAR_SWORD`: its grip-origin fit
uses a 0.04 hand-local lift and a 2.0 height cap that only shrinks oversized
models. The Warrior's drawn attachment uses `handslot.r`; when stowed, the
holder reparents to the chest with the `VAR_SWORD` transform in `back_grips.ts`.
A replacement needs hand-origin and handedness checks, drawn and stowed fit,
clipping across supported bodies and animations, and skin override, heroic
inheritance, and preload verification. This is visual attachment rather than a
simulation collider. No replacement has been verified in game.

## Illustrative Tripo costs, not a purchasing plan

Tripo [Studio pricing](https://www.tripo3d.ai/product-doc/getting-started/pricing-credits)
on 2026-10-29 lists 15 credits for one HD model and 20 credits per rig; its free
plan offers 200 credits per month, limited exports and attribution with Tripo
retaining the output IP. Paid-plan private models have different ownership
terms. Studio pricing and credit bundles must be checked at checkout.

For comparison only, generating 16 HD models once and rigging two would be
`16 × 15 + 2 × 20 = 280` Studio credits. This is not a cost to replace the
project's models: it assumes every identified file needs its own generated
model, exactly two need rigs, and every first result is usable. It excludes
image generation, retopology, UVs, textures, animations, revisions and labor.
The actual workload can be smaller or much larger.

The separate [Tripo API price list](https://developers.tripo3d.ai/en/pricing)
lists $0.01 per API credit, image-to-3D at 20 credits without texture or 30
with standard texture, and auto-rigging at 25 credits. The same hypothetical
16 images plus two rigs would cost 370 API credits ($3.70) without textures,
or 530 credits ($5.30) with standard textures, before all other operations,
retries, taxes, minimums and integration work. API and Studio credits are
separate; the API figures are not a conversion of Studio credits into dollars.
Check current terms, privacy, availability and actual task pricing before use.

## Next evidence needed

1. Reconcile all consumers of the listed restricted weapon collections.
2. Inventory every shipping model, embedded texture and animation against its
   actual source license; classify unverified assets separately.
3. Decide per asset whether exclusion, a verified reusable substitute, or new
   work preserves gameplay. Record body and animation compatibility for each.
4. Estimate model attempts, rigging and animation only after that disposition;
   inspect the final candidate build and distribution, not just tracked files.
