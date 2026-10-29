# 3D replacement and Tripo planning snapshot

Checked 2026-10-29 against the clean `D:/whetstorm-deploy` checkout at
`6c15e449a82ab5b7233b70416b8cd0d5abf97d21` and its `CREDITS.md`. This is a
planning inventory, not a release clearance or authorization to buy or generate
models. The private art branch is a separate partial checkout.

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

For example, `src/ui/weapon_variants.ts` maps the ordinary game items
`marrowpoint`, `duskwhisper`, `courtiers_bonefang`, `thornpeak_wardblade` and
`gravecourt_hewer` to legacy models. Retired storefront status therefore does
not prove all legacy assets have no gameplay consumers. Audit actual cosmetic
access, in-game mappings, editor references and generated manifests before
removal or substitution.

The 16 named files plus these 40 weapons give **56 specifically identified
tracked restricted GLBs**, not 56 necessarily required new models. Other
unclassified assets, embedded textures, release output and native packages are
not covered by this count. Replacement choices and any further restricted
files remain to be audited.

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
