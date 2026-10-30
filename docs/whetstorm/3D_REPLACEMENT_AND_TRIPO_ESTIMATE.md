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

The Lanternback renderer uses idle, walk, run and death clips, an animated
chair-bone rider attachment with a fixed-seat fallback, and two lantern-bone
attachments. Any candidate needs its own measured seat position and gait,
including rider stability through transitions and LODs; silently falling back
from a missing chair bone does not prove a good fit. Free animated monster
packs are possible sources to investigate, but no specific replacement's
license, model, animation coverage, seating, or proportions has been verified.
| Four inscription tomes | `src/render/characters/manifest.ts` maps `silverleaf_primer`, `goldleaf_folio`, `sunpetal_grimoire` and `voidbound_grimoire` to the corresponding held models. | Preserve item-to-hand attachment and grip when remapping. |
| Ferry, Wyrmwatch harbor, Wickharbor wharf and harbor | The transport and harbor content modules describe ferry routes, walkable decks, collision and the harbormaster house as coordinated with the rendered models. | Preserve pier surfaces, routes, collisions, interactions and visual alignment; a generic static mesh is not automatically a substitute. |
| Harbormaster gear | `src/render/characters/manifest.ts` attaches the tricorne to `head` and spyglass to `hips`. | Fit replacements to those attachment frames and validate on the body. |
| Harbor route marker | `src/sim/content/harbor_route_markers.ts` describes shared markers at ferry locations. | Preserve destinations and marker readability. |
| `reeds.glb` | The credits register identifies it as restricted; this focused search did not establish its runtime consumer. | Trace placements and bundled/editor references before selecting a substitute or removal. |

These are source-level findings, not evidence that every route or asset was
observed in a running game. Recheck against the actual release candidate.

The register identifies KayKit character models and animations as CC0; it
also lists some Quaternius animated creatures as CC0. Retain a specific model
only after confirming its exact file, derivative textures, animation sources
and notice against the register and pack license. Do not assume every character
or every component has the same permission. Some assets marked `With the
project only` can remain in the fork under the register's stated conditions;
they are not automatically mandatory replacement candidates.

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
