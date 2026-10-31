# Asset Credits and Asset Licenses

**This file is the operative licence record for the project's media assets.**

The `LICENSE` file at the repository root is the MIT License, and it covers the
project's **source code**. It does not cover art, audio, fonts, or other media
assets. Every asset listed below is governed by the licence recorded against it
in these tables, and **that recorded licence controls over the project's MIT
license**.

**Media assets that are not listed here are not licensed to you by the MIT
License.** This register is still being completed, so an asset missing from it
means we have not recorded its terms yet, not that it is free to take. If you
want to use or redistribute something that is not listed, ask first
(tony@levystreet.com). Source code is the other way around: everything not
carved out here is MIT. Bundled third-party runtime dependencies carry their own
notices in [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).

The **Redistribution** column tells you what you may do if you fork this
repository or redistribute a build of it:

| Value | What it means |
|---|---|
| `Yes` | Public domain or MIT-equivalent. Redistribute freely, commercially or not. |
| `Yes, attribution required` | Redistribute freely, but you must keep the credit and the licence notice. |
| `Yes, under SIL OFL 1.1` | Redistribute under the Open Font License. You may not sell the fonts on their own. |
| `With the project only` | Project-owned art you may keep and ship **as part of World of ClaudeCraft or a fork of it**, so your fork works out of the box. You may not extract these assets and redistribute, sell, or publish them on their own or as part of an asset pack. |
| `Non-commercial only, with attribution` | CC BY-NC 4.0. Share and adapt non-commercially with credit. **Commercial use requires the author's permission.** |
| **`No, permission required`** | **Do not redistribute.** Rights reserved, or licensed to Levy Street only. See below. |

## Original Whetstorm UI replacements

The original SVG collection under `public/ui/whetstorm/` (catalogued in its
`mapping.json`) and the native icon artwork
in `src/ui/original_icon_art.ts` were authored for this fork. The icon renderer
uses original polygon silhouettes and enamel palettes. Existing recipe metadata
supplies semantic subjects, placement and school, not external bitmap content.
The older asset records below retain their historical owners and restrictions.
The earlier Whetstorm entry landscape was rejected and removed from the
shipping tree; its generation record remains in Git history. The four original
`public/website-hero-{arena,road,smokewatch,peatfire}.png` paintings and
`public/website-portal-frame.png` were made with OpenAI built-in image generation
from text only. Prompts, PNG masters and optimized WebP copies are recorded in
`docs/whetstorm/title-art-generation.json`.
This replacement does not relicense or declare all remaining game media cleared.

The 29 map/minimap markers, 13 creature-family crests and two additional status
marks under `public/ui/whetstorm/{map-markers,families,status}/` are original
hand-authored vector geometry, with no image inputs or third-party artwork.
Their editable masters are in `scripts/generate_whetstorm_navigation_art.mjs`.
The replacement mapping records subjects, SHA-256 hashes and the exact retired
upstream paths. Historical credits below remain authoritative for those retired
assets; they are not reclassified as Whetstorm artwork.

The podium medals under `public/ui/whetstorm/leaderboard/` are original
hand-authored SVG geometry made for Whetstorm, without image inputs or
third-party artwork. Both leaderboard podiums use this shared gold, silver
and bronze family. The historical medal records below retain their restrictions.

The world-quest leaderboard illustrations under
`public/ui/whetstorm/world-quest-leaderboard/` are original hand-authored SVGs
without image references. Their provenance and hashes are recorded in
`docs/whetstorm/world-quest-leaderboard-art.json`; its earned medals reuse the
original podium family above. Earlier art retains its existing attribution.

The six active Delve affix icons under `public/ui/whetstorm/delve-affixes/`
are original hand-authored SVGs based on the gameplay mechanics. Their paths
and hashes are recorded in `docs/whetstorm/delve-affix-original-art.json`;
the historical Delve art records below retain their restrictions.

The Reliquary Perfect Specimen icon at
`public/ui/whetstorm/reliquary/perfect_specimen.svg` is original hand-authored
art. Its hash and provenance are recorded in
`docs/whetstorm/reliquary-specimen-original-art.json`; the historical specimen
art record below retains its restrictions.

The three weekly vault door SVGs under `public/ui/weekly-vault/` are original
hand-authored art for this fork, described in `docs/whetstorm/weekly-vault-art.md`.
The historical weekly vault bitmap record below retains its restriction.

The mage proc overlays under `public/ui/whetstorm/procs/` are original
hand-authored SVG geometry, with no image references. Their provenance and
hashes are recorded in `docs/whetstorm/mage-proc-overlay-original-art.json`.
This does not establish the rights for the earlier proc artwork.

The News and High Scores heading SVGs under `public/ui/whetstorm/` are original
hand-authored artwork made for this fork without image references. The historical
website feature image records below retain their restrictions.

The thirteen emote SVGs under `public/ui/emotes/` are original hand-authored
pictograms based on emote names, without image references. Their provenance is
described in `docs/whetstorm/emote-icon-provenance.md`; this does not establish
the rights for the earlier emote bitmaps.

The Confection Cascade candy atlas under `public/ui/whetstorm/minigames/` is
original vector artwork made for this fork without image references. Its source,
processing and hashes are recorded in `docs/whetstorm/confection-candy-atlas.md`.
The earlier atlas retains its historical attribution.

The seven Guildmark thumbnail paintings under `public/ui/whetstorm/armory/`
were generated for this fork without image references. Their source prompts and
hashes are recorded in `docs/whetstorm/armory-guildmark-original-generation.json`.
These 2D replacements do not relicense the separate historical skin models.

Seven Emberwrought thumbnail paintings in the same directory were generated for
this fork without image references. Their source prompts and hashes are recorded
in `docs/whetstorm/armory-emberwrought-original-generation.json`. Their separate
historical held models retain their restrictions.

The fel meteor impact sprite at `public/vfx/fel_meteor_impact.png` is original
vector-derived art made for this fork without image references. Its source and
processing are recorded in `docs/whetstorm/fel-meteor-impact-provenance.md`; the
historical impact art retains its existing attribution.

The procedural flame intensity atlas at
`public/textures/vfx/whetstorm_flame_6x6.webp` was authored for this fork
without image inputs. Its generator, encoding and hashes are recorded in
`docs/whetstorm/flame-atlas-provenance.md`; historical atlas rights remain
unchanged.

The silver-, gold-, and prismatic-tier Fiesta augment icons under
`public/ui/whetstorm/fiesta/augments/` are original hand-authored SVGs based on
the live augment mechanics. Paths and hashes are recorded in the
`docs/whetstorm/fiesta-silver-original-art.json` and
`docs/whetstorm/fiesta-gold-original-art.json` and
`docs/whetstorm/fiesta-prismatic-original-art.json` manifests. The historical
Fiesta art records below retain their restrictions.

`public/map_art/whetstorm_continent.webp` is original procedural map art based
on the simulation's terrain and biome data. Its generator and source lineage
are described in `docs/whetstorm/CONTINENT_ART.md`; no upstream map image was
used. The historical map-art records below retain their restrictions.

The seven launch-class paintings (`bulwark`, `brute`, `whirlblade`, `ranger`,
`skybinder`, `cleric`, `warden`) and eight Bulwark skill paintings are original
Whetstorm art made with OpenAI built-in image generation from the owner's
text brief, without third-party image references. PNG source masters, source
hashes, prompts, numerical resizing and delivery hashes are recorded under
`docs/whetstorm/launch-art-generation.json` and `accepted-launch-art.json`.
The skill PNG masters are retained outside public; the shipped versions use
WebP under `public/ui/skills/bulwark/`. These records do not change any older
asset's attribution or licence.

The item and deed paintings recorded in the Whetstorm generation manifests
under `docs/whetstorm/` were created for this fork. Each manifest identifies
its artwork, generation prompts, image inputs where applicable, master files,
shipping files, and hashes. Consult the individual record for provenance; a
Whetstorm path alone does not establish the lineage of other assets. These
records do not alter the restrictions on the historical art listed below.

## Do not redistribute these

If you fork this project, or redistribute the repository or a build of it, the
following assets are **not** yours to pass on. Remove or replace them first, or
get written permission.

- **The CraftPix class ability icons** (`public/ui/skills/<class>/*.webp` entries whose
  per-class `mapping.json` record names a CraftPix source pack and does not carry an overriding
  project-generated or owner-provided licence). These were **purchased by the Levy Street account**
  (callum@levystreet.com) under a CraftPix premium royalty-free licence. That
  licence permits Levy Street to use them in this game. It does **not** permit
  you to redistribute, resell, sub-license, or otherwise pass them to a third
  party, and it does not transfer to forks. Treat CraftPix's own terms at
  https://craftpix.net/file-licenses/ as controlling, and buy your own licence
  if you want to ship these icons.
- **Commercial and prestige art owned by the project.** The v0.29 Hunter, Shaman,
  and Priest class rework icons, the Season 1 Armory
  weapon models and storefront renders, the Claudium visual asset set, the
  legacy Claudium prototype weapons, the Book of Deeds achievement icons, the
  Professions 2.0 art set, the v0.36 placeholder-art completion paintings, the
  item-art consistency replacement paintings, the map and minimap marker paintings,
  and the elite dragon rank emblem. These are
  commissioned or commercially produced
  art tied to the game, store, or player prestige, and **rights in them are
  reserved**. They are not covered by the MIT licence. Ask if you want to use
  them.
- **Artwork and recordings used with permission.** The Collective Reversal and
  Hourglass of Suspension mage icons, the `fireball_form` and `counterspell`
  mage artwork, and the `temporal_clock` sound effect. These are used in World
  of ClaudeCraft under a permission granted to Levy Street, which does not
  extend to third parties. **Redistribution requires permission, and must be
  arranged through Levy Street** (tony@levystreet.com).

The **@jamiecypher** sound effects are a separate case: they are CC BY-NC 4.0,
so you *may* redistribute them non-commercially with attribution, but you may
**not** use them commercially. The perpetual commercial grant covering them runs
to World of ClaudeCraft (Levy Street) only and does not transfer to forks. See
the Audio section.

The **brand marks** (Twitch, X, Kick, YouTube, Discord, Steam, Solana, USDC) are
trademarks and are not licensed to anyone by this file. See Brand marks.

## Can I still fork and host my own world?

Yes. That is the point, and nothing above stops it.

The code is MIT, and the overwhelming majority of the world is CC0 public
domain: every KayKit, Quaternius, Kenney, ambientCG and Poly Haven pack, which
is most of the models, terrain and skies. You can do whatever you like with it.

The project's own generated props, creatures, backdrops and interface sounds are
marked `With the project only`: **keep them, ship them, run your world with
them.** They are there so a fork works out of the box. What you may not do is
lift them out and republish or sell them as standalone art.

The only assets you need to actually remove or replace are the ones marked
`No, permission required` above, plus the CC BY-NC audio if your fork is
commercial. Anything not listed in this register at all is unrecorded rather
than free, so ask before you rely on it.

## Models, textures, icons, and art

| Assets | Author | Source | License | Redistribution |
|---|---|---|---|---|
| Character models + animations (knight, mage, rogue, barbarian, hooded rogue), weapons/shields | Kay Lousberg (KayKit) | https://github.com/KayKit-Game-Assets/KayKit-Character-Pack-Adventures-1.0 | CC0 1.0 | Yes |
| Skeleton character models + animations, bone weapons | Kay Lousberg (KayKit) | https://github.com/KayKit-Game-Assets/KayKit-Character-Pack-Skeletons-1.0 | CC0 1.0 | Yes |
| Skeleton minion rig + FREE-tier animations (rebuilt as skeleton_minion_free.glb, backing the Bonebound Rickshaw's skel_rickshaw_puller; see scripts/assets/rebuild_kaykit_skeletons_free.mjs) | Kay Lousberg (KayKit) | KayKit_Skeletons_1.1_FREE (kaylousberg.itch.io) | CC0 1.0 | Yes |
| Dungeon modular kit (walls, floors, pillars, torches, banners, chests, furniture; also the Drakelands castle structure set) | Kay Lousberg (KayKit) | https://github.com/KayKit-Game-Assets/KayKit-Dungeon-Remastered-1.0 | CC0 1.0 | Yes |
| Graveyard/crypt props, dead trees, lanterns | Kay Lousberg (KayKit) | https://github.com/KayKit-Game-Assets/KayKit-Halloween-Bits-1.0 | CC0 1.0 | Yes |
| Extra character animation library (Rig_Medium) | Kay Lousberg (KayKit) | https://kaylousberg.itch.io/kaykit-character-animations | CC0 1.0 | Yes |
| Animated creatures (wolf, bull, fox, stag, alpaca, spider, frog, goblin, orc, yeti, giant, demon, ghost, goleling, glub, tribal, velociraptor, dragon) | Quaternius | https://poly.pizza/u/Quaternius · https://quaternius.com | CC0 1.0 | Yes |
| Stylized Nature MegaKit (trees, rocks, bushes, mushrooms, grass) | Quaternius | https://quaternius.itch.io/stylized-nature-megakit | CC0 1.0 | Yes |
| Medieval Village Pack (houses, inn, blacksmith, well, market, cart) | Quaternius | https://quaternius.com/packs/medievalvillage.html | CC0 1.0 | Yes |
| Fantasy Props MegaKit (barrels, crates, lanterns, furniture, smithy) | Quaternius | https://quaternius.itch.io/fantasy-props-megakit | CC0 1.0 | Yes |
| Nature Kit (modular cliffs), Graveyard Kit, Pirate Kit (docks/boats), Fantasy Town Kit, Castle Kit, Particle Pack (VFX sprites) | Kenney | https://kenney.nl | CC0 1.0 | Yes |
| Pirate Kit (palm trees, docks, ship, chests, cannon, anchor, beach rocks, beach house) | Quaternius | https://quaternius.com/packs/piratekit.html | CC0 1.0 | Yes |
| LowPoly Animated Fish (dolphin, shark, manta ray, whale, clownfish, blue tang, puffer, swordfish, anglerfish, koi) | Quaternius | https://poly.pizza/u/Quaternius | CC0 1.0 | Yes |
| Modular Dungeons Pack (stone walls, arches, pillar, floor tile, wall banner, trap door, horse statue, cobweb, coin piles) | Quaternius | https://poly.pizza/u/Quaternius | CC0 1.0 | Yes |
| Medieval Village MegaKit (wagon, crate, fences, vines, arch, exterior stairs, castle bases, castle stairs) | Quaternius | https://quaternius.com/packs/medievalvillagemegakit.html | CC0 1.0 | Yes |
| Survival Kit (tents, bedrolls, campfires, signpost, sand rocks) | Kenney | https://kenney.nl/assets/survival-kit | CC0 1.0 | Yes |
| Watercraft Kit (sail boats, fishing boat, rowboat, buoys) | Kenney | https://kenney.nl/assets/watercraft-kit | CC0 1.0 | Yes |
| Modular Dungeon Kit (corridor and room tiles, stairs, gates) | Kenney | https://kenney.nl/assets/modular-dungeon-kit | CC0 1.0 | Yes |
| Mini Dungeon (trap, wood structure, supports, column, banner) | Kenney | https://kenney.nl/assets/mini-dungeon | CC0 1.0 | Yes |
| Medieval Hexagon Pack (hex buildings, hex tiles, walls, bridge) | Kay Lousberg (KayKit) | https://github.com/KayKit-Game-Assets/KayKit-Medieval-Hexagon-Pack-1.0 | CC0 1.0 | Yes |
| Canyon Terrain Asset (cacti, desert tree, canyon rock formations, boulders, mesas) | loafbrr | https://loafbrr.itch.io/canyon-terrain-asset | CC0 1.0 | Yes |
| Mines and Cave Modular Set (mine carts, rails, ladder, cave rocks, entrances, supports, platforms) | loafbrr | https://loafbrr.itch.io/mines-and-cave-set | CC0 1.0 | Yes |
| Terrain PBR textures (Grass001, Ground023, Rock026, Rock051, Rock060, Ground071, Ground080, PavingStones046, Snow010A) | ambientCG | https://ambientcg.com | CC0 1.0 | Yes |
| Terrain PBR textures, biome set (Ground054, Ground095A, Ground093A, Rock029, Lava004, Gravel024, Rock035) | ambientCG | https://ambientcg.com | CC0 1.0 | Yes |
| Thornhollow battleground terrain textures (`public/textures/battleground/*.jpg`) | ambientCG | https://ambientcg.com | CC0 1.0 | Yes |
| Thornhollow wall tower (`public/models/city/wall_tower.glb`) | World of ClaudeCraft | Project-generated deterministic geometry (generator script not checked into this repository) | Project asset | With the project only |
| Thornhollow ground decals (`public/textures/battleground/decals/*.webp`) | World of ClaudeCraft | Project-generated deterministic shape and noise synthesis (generator script not checked into this repository) | Project asset | With the project only |
| Thornhollow Fields rune pad bodies (`public/models/battleground/rune_damage.glb`, `rune_defense.glb`, `rune_sprint.glb`) | World of ClaudeCraft | Project-generated via Tripo AI (text-to-3D), owned under the Tripo paid-plan license, then optimized to KTX2 with glTF-Transform. These three predate their generator being checked in, so no exporter script or pipeline spec is committed for them; the shipped binaries are pinned by sha256 and parsed shape in `tests/battleground_rune_models.test.ts` instead | Project asset | With the project only |
| Surface-detail PBR textures for the triplanar material families (Bark012, Bricks076A/B, Fabric030, Metal013 incl. Metalness, Plaster007; Color/NormalGL/AmbientOcclusion/Roughness/Displacement under `public/textures/structures/`) | ambientCG | https://ambientcg.com | CC0 1.0 | Yes |
| Ignivar perimeter lava (`public/textures/encounters/ignivar/ignivar_lava_original.webp`) | World of ClaudeCraft | Original project art generated with OpenAI image generation using the owner's `Lava76_10` Drive asset as material/mood reference only; the Yoge/Fab source image is not distributed and its crack/rock layout was not copied | Project asset | With the project only |
| Canopy clump-detail textures (Moss002; NormalGL/AmbientOcclusion under `public/textures/foliage/`) | ambientCG | https://ambientcg.com | CC0 1.0 | Yes |
| Worn-metal surface-detail PBR texture (RustCoarse01, from rust_coarse_01; NormalGL/AmbientOcclusion/Roughness/Displacement under `public/textures/structures/`) | Poly Haven | https://polyhaven.com/a/rust_coarse_01 | CC0 1.0 | Yes |
| Medieval wood surface-detail PBR texture (MedievalWood, from medieval_wood; Color/NormalGL/AmbientOcclusion/Roughness/Displacement under `public/textures/structures/`) | Poly Haven | https://polyhaven.com/a/medieval_wood | CC0 1.0 | Yes |
| HDRI environment maps (kloofendal_48d_partly_cloudy_puresky, belfast_open_field, kiara_1_dawn, dikhololo_night) | Poly Haven | https://polyhaven.com | CC0 1.0 | Yes |
| Vale Cup practice-pitch skybox (env/space_galaxy.jpg, the 360 degree Milky Way panorama) | ESO / S. Brunier | https://www.eso.org/public/images/eso0932a/ | CC BY 4.0 | Yes, attribution required |
| Water normal maps (waternormals.jpg, Water_1/2_M_Normal.jpg) | three.js authors | https://github.com/mrdoob/three.js (r165, examples/textures) | MIT | Yes, attribution required |
| Basis Universal KTX2 transcoder (`public/basis/basis_transcoder.js`/`.wasm`, copied from three r165 `examples/jsm/libs/basis/`) | Binomial LLC | https://github.com/BinomialLLC/basis_universal | Apache-2.0 | Yes, attribution required |
| Biome backdrop panoramas (vale_backdrop.webp, marsh_backdrop.webp, peaks_backdrop.webp and 4K variants) | World of ClaudeCraft | Project-generated procedural painterly sky panorama art | Project asset | With the project only |
| Fel meteor POWERFUL VFX sprite (`public/vfx/fel_meteor_impact.png`) | World of ClaudeCraft | Original project art generated with OpenAI image generation from a text-only prompt, converted to a grayscale additive 512px runtime texture and tinted in-engine | Project asset | With the project only |
| Loading-screen artwork (`public/textures/loading/*.webp`) | World of ClaudeCraft | Project-generated with OpenAI image generation from World of ClaudeCraft gameplay captures and project-owned character and creature references, maintainer-selected and optimized locally | Project asset | With the project only |
| Website fractured portal (`public/website-fractured-portal-v1.svg`, `public/website-fractured-portal-v2.svg`, `public/website-fractured-portal-v3.svg`, `public/website-fractured-portal-v4.webp`, `public/website-fractured-portal-v5.webp`) | World of ClaudeCraft | OpenAI built-in image generation; v1 to v3 use authored SVG transparency masks; v4 is a native-alpha hollow frame; v5 contains a dark magical interior with transparent exterior and displays the original project logo separately; prompts in `docs/design/website-fractured-portal.md` | Project asset, rights reserved | **No, permission required** |
| Website feature icons (`public/website-feature-classes-v1.webp`, `public/website-feature-open-v1.webp`) | World of ClaudeCraft | OpenAI built-in image generation; transparent artwork optimized to WebP; prompts in `docs/design/website-feature-icons.md` | Project asset, rights reserved | **No, permission required** |
| Website stone gateway (`public/website-stone-gateway-v2.svg`) | World of ClaudeCraft | OpenAI built-in image generation referencing the project logo and Eastbrook loading artwork; optimized WebP embedded in an authored SVG silhouette; prompt in `docs/design/website-stone-gateway.md` | Project asset, rights reserved | **No, permission required** |
| Website parchment scroll (`public/website-parchment-scroll-v1.svg`, `public/website-parchment-scroll-v2.svg`) | World of ClaudeCraft | OpenAI built-in image generation; v2 references first-party Eastbrook loading artwork; optimized locally to WebP and embedded in an authored SVG silhouette; prompts in `docs/design/website-parchment-scroll.md` | Project asset, rights reserved | **No, permission required** |
| Eastbrook website hero (`public/website-hero-eastbrook-v1.webp`) | World of ClaudeCraft | OpenAI built-in image generation using first-party Eastbrook loading art and an in-game town screenshot, preserving the blue-roofed town square, hall, well and market motifs; optimized locally to WebP | Project asset, rights reserved | **No, permission required** |
| Galecrest website hero (`public/website-hero-galecrest-v1.webp`) | World of ClaudeCraft | OpenAI built-in image generation using first-party loading art style and the canonical Galecrest zone description: Wickharbor, sheltered fishing cove, grey sea cliffs and the Old Beacon; optimized locally to WebP | Project asset, rights reserved | **No, permission required** |
| Drakelands website hero (`public/website-hero-drakelands-v1.webp`) | World of ClaudeCraft | OpenAI built-in image generation using first-party Drakemaw Caldera loading art and canonical Bloodglass Fields/Drakemaw zone motifs; optimized locally to WebP | Project asset, rights reserved | **No, permission required** |
| Thornpeak website hero (`public/website-hero-thornpeak-v1.webp`) | World of ClaudeCraft | OpenAI built-in image generation using first-party Thornpeak loading art and canonical Highwatch mountain-zone motifs; optimized locally to WebP | Project asset, rights reserved | **No, permission required** |
| Elite dragon rank emblem (`public/ui/ranks/elite-dragon-frame.webp`) | World of ClaudeCraft | Project-generated with OpenAI image generation and optimized locally | Project asset, rights reserved | **No, permission required** |
| Leaderboard podium medals (`public/ui/leaderboard/medal_{gold,silver,bronze}.webp`) | World of ClaudeCraft | Project-generated with OpenAI image generation (ChatGPT) from a text-only prompt, downscaled to 256px WebP locally; the bronze disc is the generated gold disc with only its rim and laurel recolored to copper | Project asset, rights reserved | **No, permission required** |
| Eastbrook Vale rebuild master concept, nine turnaround sheets, full-color surface-atlas source, and comparison evidence (`docs/screenshots/eastbrook-vale-rebuild/concepts/`, `turnarounds/`, and `materials/`) | World of ClaudeCraft | Original project art generated with OpenAI image generation using only World of ClaudeCraft captures and project-generated style/scale anchors; the full-color atlas source and any comparison containing it are provenance evidence, not the redistributable shipping texture; prompts and provenance are committed under `docs/design/eastbrook-vale-rebuild/` | Project asset, rights reserved | **No, permission required** |
| Eastbrook finishing-pass master concept and Ravenpost mailbox / noticeboard turnaround sheets (`docs/screenshots/eastbrook-vale-rebuild/polish/concepts/` and `polish/turnarounds/`) | World of ClaudeCraft | Original project art generated with OpenAI image generation using only accepted World of ClaudeCraft concepts, turnarounds, and in-game captures; no proprietary-game screenshots or third-party art entered the lineage; exact prompts, hashes, and provenance are committed under `docs/design/eastbrook-vale-rebuild/` | Project asset, rights reserved | **No, permission required** |
| Ignivar raid expansion automata, Forgefather, warhammer, and grand-forge concepts (`docs/screenshots/ignivar-raid-expansion/concepts/`) | World of ClaudeCraft | Original project art generated with OpenAI built-in image generation using only the first-party Ignivar turnaround as a style reference; the six exact prompts, hashes, acceptance decision, and paid-generation stop state are committed beside the concepts | Project asset, rights reserved | **No, permission required** |
| Eastbrook shared surface atlas (`public/textures/eastbrook_surface_atlas.webp`; accepted source and comparison under `docs/screenshots/eastbrook-vale-rebuild/materials/`) | World of ClaudeCraft | Original project art generated with OpenAI image generation from first-party World of ClaudeCraft references, then deterministically converted to a high-key grayscale detail multiplier via `scripts/assets/eastbrook_town`; exact prompt and provenance are committed under `docs/design/eastbrook-vale-rebuild/` | Project asset | With the project only |
| Fenbridge rebuild master concept and fourteen isolated turnaround sheets (`docs/design/fenbridge-rebuild/references/`) | World of ClaudeCraft | Original project art generated with OpenAI image generation from a user-supplied mood reference, with explicit non-copying constraints; the source attachment is not redistributed, and exact prompts, hashes, admission results, and provenance are committed under `docs/design/fenbridge-rebuild/` | Project asset, rights reserved | **No, permission required** |
| Fenbridge shared surface maps (`public/textures/fenbridge_surface_atlas.webp`, `fenbridge_surface_normal.webp`, `fenbridge_surface_roughness.webp`; source board under `docs/design/fenbridge-rebuild/materials/`) | World of ClaudeCraft | Concept-authored 4x4 material board generated with OpenAI image generation from the Fenbridge master concept and Eastbrook atlas layout, then deterministically baked into albedo/normal/roughness WebP maps by `scripts/assets/fenbridge_town`; shipping hashes are pinned in the asset contract | Project asset | With the project only |
| Meshy creature models (tolling_bell, spider_egg_sac from the Drowned Litany, yumi_cat from Protect Yumi, in `public/models/creatures/`) | World of ClaudeCraft | Project-generated via Meshy AI (text-to-3D; the humanoids and yumi_cat rigged and animated), owned under the Meshy paid-plan license | Project asset | With the project only |
| Legacy Claudium prototype weapon models and source images (emberfang, Red Skull, and Purple sets, in `public/models/weapons/` and `public/ui/weapons/`) | World of ClaudeCraft | Project-generated and normalized through the PR 1405 asset pipeline | Project asset, rights reserved | **No, permission required** |
| Bag icons (`public/ui/items/{backpack,linen_pouch,travelers_knapsack,wolfhide_satchel,gravewoven_bag,mistcallers_duffel}.webp`, encoded to 128px WebP via `scripts/convert_item_icons_webp.mjs`) | World of ClaudeCraft | Project art created for this game; provenance per icon in `public/ui/items/mapping.json` | Project asset | With the project only |
| Historical CraftPix item identity references for the item-art consistency replacements (255 pre-task icons, no longer current shipping assets) | CraftPix | https://craftpix.net; exact pre-task pack mapping, owner, hash, and byte count are retained in the [item-art consistency lineage](docs/achievements/item-art-consistency-2026-08-09/) | CraftPix premium (royalty-free commercial), purchased by Levy Street account (callum@levystreet.com); historical reference lineage retained | **No, permission required** |
| Professions 2.0 commissioned art set (`public/ui/professions/*.webp` except `gather_farming.webp`, and the `woc_professions_art` material icons recorded in `public/ui/items/mapping.json`) | World of ClaudeCraft | Maintainer-commissioned original art created for this game and normalized through the profession/item pipelines; provenance per raster in the corresponding mapping file. The previously commissioned inline maker's-mark glyph was superseded by the Whetstorm glyph below. | Project asset, rights reserved | **No, permission required** |
| Whetstorm maker's-mark glyph (`src/ui/ui_icons.ts`) | Whetstorm | Independently drawn pen-nib and signature-stroke SVG for crafted-item provenance, replacing the earlier commissioned glyph. | Original Whetstorm art; redistribution terms not yet recorded | Not yet determined |
| Masterwrought art-completion wave (181 painted assets across `public/ui/items/`, `public/ui/deeds/`, `public/ui/professions/gather_farming.webp`, `public/ui/auras/well_fed.webp`, `public/ui/map-markers/farm_patch.webp`, and `public/ui/chrome/{perfecting,harvest-journal}.webp`) | World of ClaudeCraft | Original project art generated with OpenAI built-in image generation from exact World of ClaudeCraft identity and style references, locally reviewed at shipping and tiny display sizes, normalized through the repository asset pipelines, and hash-pinned in the [Masterwrought art-completion evidence](docs/achievements/masterwrought-art-completion-2026-09-02/). The evidence also preserves the ownership and byte lineage for all 84 superseded placeholder assets | Project asset, rights reserved | **No, permission required** |
| Bank-storage painted bag catalog (`public/ui/items/{wayfarers_backpack,burlap_reagent_pouch,necromancers_reagent_satchel,duskweave_bag,resonant_weave_bag,foragers_haversack,loombound_reagent_satchel}.webp`, batch `bank-storage-painted-bags-2026-08-25` in `public/ui/items/mapping.json`) | World of ClaudeCraft | Seven distinct paintings generated with OpenAI built-in image generation from the exact project-owned placeholder identity inputs and ordered World of ClaudeCraft style references recorded in the [accepted-art lineage](docs/achievements/bank-storage-painted-bags-2026-08-25/accepted-art.json); exact prompts, source and shipping hashes, processing, review evidence, and the superseded `woc_original_svg` placeholder owners and byte pins are retained without rewriting the historical evidence | Project asset, rights reserved | **No, permission required** |
| Field Kit gathering-tool icon (`public/ui/items/field_kit.webp`, batch `intentional-gathering-field-kit-2026-09-06` in `public/ui/items/mapping.json`) | World of ClaudeCraft | One original painting generated with OpenAI built-in image generation from a text-only prompt describing three existing house-style icons as style anchors (viewed by the reviewing parent, not supplied as image inputs); exact prompt, source/master/shipping hashes, processing, and review evidence are retained in the [accepted-art lineage](docs/achievements/intentional-gathering-field-kit-2026-09-06/accepted-art.json). No prior icon is replaced | Project asset, rights reserved | **No, permission required** |
| Generated item icon rebrand (`public/ui/items/*.webp`, exact IDs under `generatedBatches` in `public/ui/items/mapping.json`, including `silkspun_satchel`, `last_keep_signet`, `firebottle`, `sharp_claw`, `curved_tusk`, and `pristine_claw`) | World of ClaudeCraft | Project-generated with OpenAI built-in image generation, reviewed and optimized locally; licensed CraftPix Premium references retain their third-party lineage in the mapping and linked provenance records, the release v0.34.0 additions are prompt-and-hash pinned in `docs/achievements/release-v034-additional-art.json`, the text-only `quest-objective-dedupe-zone-quest-items-2026-08-04` batch has no external image lineage, and the four v0.36 replacements retain exact prompts, ordered reference roles, hashes, and processing in the [v0.36 placeholder-art completion lineage](docs/achievements/placeholder-art-completion-2026-08-09/), and the Crucible raid batches retain per-item prompts and hashes in the [crucible set-icon lineage](docs/achievements/crucible-set-icons-2026-08-29/) (the crucible-raid-weapons-2026-08-28 and ignivar-varkhul-drop-renders-2026-08-28 batches record their provenance inline in the mapping) | Project asset, rights reserved | **No, permission required** |
| Item-art consistency replacement paintings (`public/ui/items/*.webp`, exact IDs in the `item-art-consistency-2026-08-09` generated batch in `public/ui/items/mapping.json`) | World of ClaudeCraft | Original replacement paintings generated with OpenAI built-in image generation from 255 licensed CraftPix icons, nine project-owned mount renders, and ten prior project-generated paintings as subject-identity references, plus approved World of ClaudeCraft house-style references, then reviewed and optimized locally; exact prompts, ordered reference roles, old and new hashes and owners, processing, retries, and visual-review evidence are retained in the [item-art consistency lineage](docs/achievements/item-art-consistency-2026-08-09/). Every repository reference retains its separately recorded authorship and license, mount model credits remain in their existing rows, and reference use does not transfer or reclassify authorship | Project asset, rights reserved | **No, permission required** |
| Class ability icons (`public/ui/skills/<class>/*.webp`, excluding entries with an explicit project-generated or owner-provided licence in the per-class mapping; re-encoded from the source-pack PNGs to WebP via `scripts/convert_skill_icons_webp.mjs`; all 9 classes: paladin, hunter, priest, warlock, rogue, warrior, mage, druid, shaman; source packs paladin/archer/priest/warlock/thief/warrior/berserker/demon/druid/pyromancer/cryomancer/aeromancer/lightning-mage/earth-magician/100-rpg-skill-icons/100-skill-icons-pack-for-rpg + per-ability fill sets) | CraftPix | https://craftpix.net | CraftPix premium (royalty-free commercial), purchased by Levy Street account (callum@levystreet.com) | **No, permission required** |
| v0.29 Hunter, Shaman, and Priest class rework ability icons (31 files recorded as project-generated in the corresponding `public/ui/skills/<class>/mapping.json`; 12 further rework ids ship the accepted release art recorded in the generated-additions row below) | World of ClaudeCraft | Project-generated with OpenAI image generation through Codex, matched against existing class art, and normalized locally to 128px WebP | Project asset, rights reserved | **No, permission required** |
| Generated class ability additions (`public/ui/skills/<class>/*.webp`, exact `woc_openai_missing_painted_icons_2026_08_01` and `woc_openai_release_v034_audit_2026_08_02` entries in each class's `mapping.json`) | World of ClaudeCraft | Project-generated with OpenAI built-in image generation from the exact repository references recorded per ability; reviewed, normalized, and optimized locally; prompt, reference-role, source-hash, and shipping-hash records in `docs/achievements/missing-painted-icons-accepted-art.json` and `docs/achievements/release-v034-additional-art.json` | Project asset, rights reserved | **No, permission required** |
| v0.29 Hunter, Shaman, and Priest class rework ability icons (31 files recorded as project-generated in the corresponding `public/ui/skills/<class>/mapping.json`; 12 further rework ids ship the accepted release art recorded in the generated-additions row below) | World of ClaudeCraft | Project-generated with OpenAI image generation through Codex, matched against existing class art, and normalized locally to 128px WebP | Project asset, rights reserved | **No, permission required** |
| Paladin overhaul and talent ability icons (entries marked as OpenAI-generated original project artwork in `public/ui/skills/paladin/mapping.json`) | World of ClaudeCraft | Original project art generated with OpenAI image generation and optimized locally | Project asset, rights reserved | **No, permission required** |
| Generated Warlock spell and talent icons (exact IDs under `generatedBatches` in `public/ui/skills/warlock/mapping.json`) | World of ClaudeCraft | Project-generated with OpenAI image generation from the authored spell and talent descriptions, then reviewed and optimized locally | Project asset, rights reserved | **No, permission required** |
| Warlock pet signature action icons (`emberkin_felbolt`, `gloomshade_abyssal_chain`) | World of ClaudeCraft | Original project art generated with OpenAI built-in image generation from the exact subject and style references, prompts, and ownership records in `public/ui/skills/warlock/mapping.json`, then reviewed at 128px, 40px, 28px, and 28px grayscale and optimized locally | Project asset, rights reserved | **No, permission required** |
| Shared pet action-bar command icons (`public/ui/skills/pet/*.webp`) | World of ClaudeCraft | Eight original command paintings generated with OpenAI built-in image generation from the exact mechanics and repository references recorded in `public/ui/skills/pet/mapping.json`, then reviewed at 128px and the 32px to 48px action-bar sizes and optimized locally; exact prompts and hashes are retained in the [v0.39 first-pass icon lineage](docs/achievements/release-v039-icon-art-first-pass-2026-08-16/accepted-art.json) | Project asset, rights reserved | **No, permission required** |
| Exact runtime aura paintings (`public/ui/auras/*.webp`) | World of ClaudeCraft | Original aura art generated with OpenAI built-in image generation from the exact runtime meaning and repository references recorded in `public/ui/auras/mapping.json`, then reviewed at 13px to 40px aura-display sizes and optimized locally; exact prompts and hashes are retained in the [v0.39 first-pass icon lineage](docs/achievements/release-v039-icon-art-first-pass-2026-08-16/accepted-art.json), [v0.39 second-pass icon lineage](docs/achievements/release-v039-icon-art-second-pass-2026-08-16/accepted-art.json), and [Masterwrought Well Fed lineage](docs/achievements/masterwrought-art-completion-2026-09-02/accepted-aura-art.json) | Project asset, rights reserved | **No, permission required** |
| v0.39 second-pass legacy class-icon replacements (58 exact entries in the Druid, Hunter, Mage, Priest, Rogue, Shaman, Warlock, and Warrior `public/ui/skills/<class>/mapping.json` files) | World of ClaudeCraft | Original replacement paintings generated with OpenAI built-in image generation from the live mechanics and approved repository references, reviewed at 128px, 48px, 32px, 16px, grayscale, and circular crops where used, then optimized locally; the exact superseded owners and hashes, prompts, references, source hashes, accepted hashes, retry history, and review decisions are sealed by the [v0.39 second-pass icon lineage](docs/achievements/release-v039-icon-art-second-pass-2026-08-16/accepted-art.json) | Project asset, rights reserved | **No, permission required** |
| v0.39 second-pass gameplay UI paintings (`public/ui/currency/*.webp`, `public/ui/delve-affixes/*.webp`, `public/ui/fiesta/**/*.webp`, and `public/ui/reliquary/perfect_specimen.webp`) | World of ClaudeCraft | Original currency, Delve-affix, Fiesta, and Reliquary paintings generated with OpenAI built-in image generation from the exact mechanic and repository references recorded in each family mapping, reviewed at the relevant 11px to 128px runtime sizes with grayscale and circular-crop checks where applicable, and optimized locally; exact catalog hashes and the generation outcome are sealed by the [v0.39 second-pass icon lineage](docs/achievements/release-v039-icon-art-second-pass-2026-08-16/accepted-art.json) | Project asset, rights reserved | **No, permission required** |
| Collective Reversal and Hourglass of Suspension ability icons (`public/ui/skills/mage/collective_reversal.webp`, `public/ui/skills/mage/temporal_hourglass.webp`) | World of ClaudeCraft project owner | Owner-provided original artwork | Used with permission (Levy Street) | **No, permission required** |
| Season 1 Armory weapon models, source images, generated store thumbnails, and promotional card (Guildmark, Emberwrought, Hoarfrost, and Fallen Star collections, in `public/models/weapons/`, `public/ui/weapons/`, and `public/ui/store/`) | World of ClaudeCraft | Project-generated via `scripts/asset_pipeline` (Tripo AI 3D); storefront renders composited locally, with the text-free promo background derived through OpenAI image editing | Project asset, rights reserved | **No, permission required** |
| Tripo3d vegetation prop models (`public/models/props/reeds.glb`) | World of ClaudeCraft | Project-generated via Tripo3d (text-to-3D), owned under the Tripo3d paid-plan license | Project asset, rights reserved | **No, permission required** |
| Claudium visual asset set (`public/claudium/`: coin, UI icons, and denomination stacks; excludes the two payment-rail brand icons noted under Brand marks) | World of ClaudeCraft | Project-generated via the Higgsfield MCP connector (Recraft V4.1 stills), composited and web-optimized locally; owned under the Higgsfield paid-plan license | Project asset, rights reserved | **No, permission required** |
| Sampled interface and event sound effects (`public/audio/sfx/ui_*.mp3`, except `ui_level_up.mp3` and `ui_achievement.mp3`, credited under Audio below) | World of ClaudeCraft | Project-generated deterministic FFmpeg synthesis via `scripts/gen_ui_sfx.mjs` | Project asset | With the project only |
| Book of Deeds achievement icons (`public/ui/deeds/*.webp`, excluding the project-generated additions credited below; downscaled from reviewed 512px sources to 128px WebP via `scripts/convert_deed_icons_webp.mjs`) | World of ClaudeCraft | Maintainer-commissioned bespoke art, owned by the project | Project asset, rights reserved | **No, permission required** |
| Generated Book of Deeds additions (`chr_peaks_gatherer`, `chr_marsh_rares_ii`, `chr_peaks_rares_ii`, `chr_gleamstag`, `chr_hollow_rares`, `dgn_wildheart_basin`, `dgn_wildheart_basin_heroic`, `pvp_card_duel_first_win`, `chr_willowfen_gatherer`, `chr_willowfen_first_cast`, `chr_galecrest_gatherer`, `chr_galecrest_first_cast`, `chr_farshore_gatherer`, and `chr_farshore_first_cast` under `public/ui/deeds/`) | World of ClaudeCraft | Project-generated with OpenAI built-in image generation from the exact project-owned, project-generated, commissioned, and licensed CraftPix Premium repository references recorded for each crest; the earlier five used the licensed `grubjaw_tusk` and `old_cragmaws_pelt` references and retain their lineage record in `docs/achievements/professions-tuning-art-provenance.md`, the wave three are prompt-and-hash pinned in `docs/achievements/missing-painted-icons-accepted-art.json`, and the six phase 20 crests are prompt-and-hash pinned in `docs/achievements/release-v034-additional-art.json`; all were reviewed, keyed, centered, and optimized locally | Project asset, rights reserved | **No, permission required** |
| v0.36 placeholder-art completion Book of Deeds additions (`chr_amberfall_first_cast`, `chr_amberfall_gatherer`, `chr_drakemaw_broodlord`, `chr_evergarden_first_cast`, `chr_evergarden_gatherer`, `chr_frostveil_first_cast`, `chr_frostveil_gatherer`, `chr_maw_matriarch`, `chr_nightbloom_first_cast`, `chr_nightbloom_gatherer`, `chr_palmreach_first_cast`, `chr_palmreach_gatherer`, `chr_wraithwood_first_cast`, `chr_wraithwood_gatherer`, `dgn_rift`, `dgn_rift_s_rank`, `prog_alchemy_rare`, `prog_armorcrafting_rare`, `prog_cooking_rare`, `prog_engineering_rare`, `prog_leatherworking_rare`, `prog_tailoring_rare`, `prog_weaponcrafting_rare`, `pvp_bg_captures_100`, `pvp_bg_first_capture`, `pvp_bg_first_win`, `pvp_bg_wins_25`, `pvp_honor_field_marshal`, `pvp_honor_knight_lieutenant`, and `pvp_honor_sergeant` under `public/ui/deeds/`) | World of ClaudeCraft | Thirty original crests generated with OpenAI built-in image generation and normalized locally; exact prompts, reference roles, accepted output hashes, processing, and visual-review evidence are retained in the [v0.36 placeholder-art completion lineage](docs/achievements/placeholder-art-completion-2026-08-09/). Repository references retain their separately recorded authorship and licenses and are not reclassified by this generation record | Project asset, rights reserved | **No, permission required** |
| v0.36 release-audit Reliquary Book of Deeds additions (`col_reliquary_rank_2`, `col_reliquary_rank_3`, `col_reliquary_rank_4`, `col_reliquary_rank_5`, `col_reliquary_complete`, `col_reliquary_conquerors`, `col_reliquary_illum_nythraxis_heroic`, `col_reliquary_illum_thunzharr`, and `col_reliquary_illum_gravewyrm_heroic` under `public/ui/deeds/`) | World of ClaudeCraft | Nine original crests generated with OpenAI built-in image generation from the exact existing World of ClaudeCraft deed references recorded per crest, then keyed, centered, reviewed at source and small shipping sizes, and optimized locally; exact prompts, ordered references, generated-output paths, hashes, geometry, processing, and review evidence are retained in the [v0.36 Reliquary deed art lineage](docs/achievements/release-art-audit-v036-2026-08-10/reliquary-deed-art.md). Repository references retain their existing authorship and licenses | Project asset, rights reserved | **No, permission required** |
| Masterwrought jewelcrafting Book of Deeds addition (`prog_jewelcrafting_rare` under `public/ui/deeds/`) | World of ClaudeCraft | One original crest authored in-repo as a hand-written SVG composition in the established deed-medallion style (an ornate gold ring-and-gem jewelcrafting emblem), rasterized at 512px and downscaled to the shipping 128px WebP via `scripts/convert_deed_icons_webp.mjs`; no external image generation or third-party references were used | Project asset, rights reserved | **No, permission required** |
| Masterwrought jewelcrafting milestone crests (`prog_jewelcrafting_50`, `prog_grandmaster_jewelcrafting` under `public/ui/deeds/`) | World of ClaudeCraft | Two original crests authored in-repo as hand-written SVG compositions in the established deed-medallion families (a faceted topaz over filigree scrollwork for the 50-skill milestone; the grandmaster laurel wreath around a radiant brilliant for the 125-cap milestone), rasterized at 512px and downscaled to the shipping 128px WebP via `scripts/convert_deed_icons_webp.mjs`; no external image generation or third-party references were used | Project asset, rights reserved | **No, permission required** |
| Masterwrought inscription milestone crests (`prog_inscription_rare`, `prog_inscription_50`, `prog_grandmaster_inscription` under `public/ui/deeds/`) | World of ClaudeCraft | Three original crests authored in-repo as hand-written SVG compositions in the established deed-medallion families (an ink quill over an open scroll for the rare-tier milestone, crossed quill and pigment brush for the 50-skill milestone, the grandmaster laurel wreath around an illuminated tome for the 125-cap milestone), rasterized and downscaled to the shipping 128px WebP; accepted hashes are retained in `docs/achievements/masterwrought-phase06-art/`; the superseded SVG masters remain recoverable from the recorded commits; no external image generation or third-party references were used | Project asset, rights reserved | **No, permission required** |
| Masterwrought farming, fishing, and promotion deed crests (`col_deepest_cast`, `prog_first_planting`, `chr_vale_first_harvest`, `chr_marsh_first_harvest`, `chr_peaks_first_harvest`, `chr_evergarden_first_harvest`, `col_golden_harvest`, `col_farm_roster`, `prog_field_to_feast`, `prog_legendmaker`, and repainted `prog_farming_100` under `public/ui/deeds/`) | World of ClaudeCraft | Eleven original project crests generated with OpenAI built-in image generation from exact World of ClaudeCraft references, chroma-keyed, centered, reviewed at deed-card size and grayscale, and optimized locally; exact prompts, source hashes, supersession, and shipping pins are retained in the [Masterwrought art-completion evidence](docs/achievements/masterwrought-art-completion-2026-09-02/) | Project asset, rights reserved | **No, permission required** |
| Historical v0.36 painted per-item weapon inventory wave (119 base-weapon paintings recorded by `placeholder-art-completion-weapons-2026-08-09`; Heroic items intentionally reuse their base item painting) | World of ClaudeCraft | Original weapon paintings generated with OpenAI built-in image generation and optimized locally; the historical 119-item inventory, prompts, ordered reference roles, hashes, and review evidence remain unchanged in the [v0.36 placeholder-art completion lineage](docs/achievements/placeholder-art-completion-2026-08-09/). Current paintings for `craghorn_staff`, `drovers_staff`, `hollow_vigil_staff`, and `widowfang_dirk` are superseded by the item-art consistency batch above; repository references retain their existing authorship and licenses | Project asset, rights reserved | **No, permission required** |
| v0.36 generated specialization emblems (`public/ui/specs/{paladin,hunter,rogue,priest,shaman,warlock,druid}/*.webp`, three for each listed class) | World of ClaudeCraft | Twenty-one original square emblems generated with OpenAI built-in image generation and optimized locally; exact prompts, references, retry history, and hashes are retained in the [v0.36 placeholder-art completion lineage](docs/achievements/placeholder-art-completion-2026-08-09/). The Mage WebPs are lossless shipping-format conversions of three pre-existing paintings, and the three Warrior paintings were already shipped, so neither class is included in this generated-art scope | Project asset, rights reserved | **No, permission required** |
| v0.36 generated creature-family and status crests (`public/ui/crests/families/*.webp` and `public/ui/crests/status/*.webp`) | World of ClaudeCraft | Thirteen original family crests and four original status crests generated with OpenAI built-in image generation and optimized locally; exact prompts, reference roles, hashes, and review evidence are retained in the [v0.36 placeholder-art completion lineage](docs/achievements/placeholder-art-completion-2026-08-09/). Referenced repository art retains its existing recorded authorship and license | Project asset, rights reserved | **No, permission required** |
| Deterministically corrected mob target portraits (`public/ui/mobs/{bogtoad,breach_wretch,castaway_navigator,cindraleth_maw_matriarch,downs_bandit,drowsy_croaker,fen_sprite,fisher_bram,gravedigger_mosley,grubjaw,harvest_sprite,hedge_gnome,mere_lurker,the_meredark,the_wreck_warden,training_dummy,willow_sprite,wreck_thief}.webp`) | World of ClaudeCraft render; underlying model authors credited above | Rerendered locally from the canonical shipped model and visual manifests with `scripts/render_finder_portraits.mjs`; the correction replaces eighteen stale portraits without reclassifying the underlying KayKit, Quaternius, or project model licenses. Exact model keys, deterministic renderer inputs, and before/after hashes are retained in the [v0.36 placeholder-art completion lineage](docs/achievements/placeholder-art-completion-2026-08-09/) | Project render; underlying source licenses retained | With the project only |
| Ignivar raid target portraits (`public/ui/mobs/{ignivar_cinder_artificer,ignivar_crucible_warden,ignivar_ember_sentinel,ignivar_heart_of_the_end,ignivar_herald_of_the_last_flame,varkhul_forgefather_of_the_last_flame}.webp`) | World of ClaudeCraft render; underlying model authors credited above | Rendered locally from the canonical shipped model and visual manifests with `scripts/render_finder_portraits.mjs`; exact model keys, deterministic renderer inputs, and accepted hashes are retained in the [mob portrait source manifest](docs/achievements/placeholder-art-completion-2026-08-09/mob-portrait-source-manifest.json) without reclassifying the underlying model licenses | Project render; underlying source licenses retained | With the project only |
| HUD chrome launcher icons (`public/ui/chrome/*.webp`, one per primary destination in the side rail and mobile bar, keyed to alpha and normalized to 128px WebP via `scripts/convert_chrome_icons_webp.mjs`) | World of ClaudeCraft | Historical launcher art was project-generated with Google Gemini image generation to one authored direction (the Reliquary crown is authored in-repo as layered SVG under `scripts/assets/chrome_crown/`); `perfecting` and `harvest-journal` were added with OpenAI built-in image generation for the Masterwrought completion wave. All icons were keyed and optimized locally; provenance per icon is in `public/ui/chrome/mapping.json` and the completion evidence | Project asset, rights reserved | **No, permission required** |
| Map and minimap marker paintings (`public/ui/map-markers/*.webp`) | World of ClaudeCraft | Twenty-nine original micro-icons generated with OpenAI built-in image generation from the exact World of ClaudeCraft references and prompts recorded in `public/ui/map-markers/mapping.json`; the [V1 map-marker lineage](docs/achievements/map-marker-art-2026-08-12.md) preserves the first accepted batch, the [V2 map-marker lineage](docs/achievements/map-marker-art-v2-2026-08-12.md) records the responsive redesigns and expanded families, and the [Masterwrought completion lineage](docs/achievements/masterwrought-art-completion-2026-09-02/) records `farm-patch`; all were chroma-keyed, reviewed at actual runtime sizes, and optimized locally | Project asset, rights reserved | **No, permission required** |
| World-map continent overview plate (`public/map_art/world_overview.webp`, the painted backdrop of the interactive world map's continent level) | World of ClaudeCraft | Project-generated with Google Gemini image generation (terrain-only top-down key art, no baked text), cropped to the continent's land bounds so the plate rect equals the world bounds, and optimized to WebP locally | Project asset, rights reserved | **No, permission required** |
| Guide webfonts (`public/fonts/*.woff2`: Cinzel by Natanael Gama; Alegreya and Alegreya Sans by Juan Pablo del Peral, Huerta Tipografica; woff2 subsets latin/latin-ext/cyrillic/vietnamese as served by Google Fonts, self-hosted for the /wiki guide) | Natanael Gama; Huerta Tipografica | https://fonts.google.com/specimen/Cinzel , https://fonts.google.com/specimen/Alegreya , https://fonts.google.com/specimen/Alegreya+Sans | SIL OFL 1.1 | Yes, under SIL OFL 1.1 |
| Owner-provided Mage artwork (`fireball_form.webp`, `counterspell.webp`) | Levy Street account | Owner-provided artwork | Used with permission (Levy Street) | **No, permission required** |
| Owner-provided Druid artwork (`public/ui/skills/druid/cat_form.webp`, the Cat Form lynx head) | Levy Street account | Owner-provided artwork, re-encoded to 128px WebP via `scripts/convert_skill_icons_webp.mjs` | Used with permission (Levy Street) | **No, permission required** |
| Temporal clock sound effect (`public/audio/sfx/temporal_clock.mp3`) | World of ClaudeCraft | User-provided source recording | Used with permission (Levy Street) | **No, permission required** |
| Remastered streamed soundtrack (`public/audio/music/*.mp3`: town, overworld, dungeon, and battle themes) | World of ClaudeCraft | Existing themes were rendered from the project's procedural score (`scripts/render_music.mjs`) and remastered; the new-world remasters are owner-provided Suno Studio exports | Project asset | With the project only |
| Original Ignivar raid ambient suite retained for authoring (`ignivar_forge_approach`, `ignivar_raid_arena`, `ignivar_inner_crucible`) | World of ClaudeCraft | Original project-authored procedural score, rendered with `scripts/render_music.mjs` and remastered locally | Project asset | With the project only |
| Crucible floor soundtrack (final assets listed in the [floor soundtrack source record](docs/music/crucible-floor-soundtrack.md)) | World of ClaudeCraft | Owner-provided final Suno exports (2026-09-05), imported unchanged with cleaned filenames | Project asset | With the project only |
| Proving Shore candidate cues (`docs/music/proving-shore-candidates/*.mp3`, the audition decision record) | World of ClaudeCraft | Composed in the project's procedural score (`src/game/music_themes_proving_shore.ts`), rendered via `scripts/render_music.mjs`, mastered locally with ffmpeg/sox | Project asset | With the project only |
| Proving Shore island cue (`public/audio/music/proving_shore.mp3`, "Welcome to Adventure") | World of ClaudeCraft | Owner-supplied render (2026-08), replacing the audition candidate above as the shipped island cue | Project asset | With the project only |

| Rideable mount models (valorsteed, grag_bear, stalkglider_snail, aether_hover_cycle, shadowjump_toad, stormfeather_griffin, thunderstrut_gobbler, and drakemaw_raptor in `public/models/mounts/`) | World of ClaudeCraft | Project-generated via the Tripo API asset pipeline; rigs and gait clips are either retained from the generated source models or normalized and baked locally via `scripts/bake_mount_gaits.mjs`; owned under the Tripo paid-plan license | Project asset | With the project only |
| Dreadspark Groundshaker rideable mount model (`public/models/mounts/terrorspark_groundshaker.glb`) | World of ClaudeCraft | Original project art procedurally reconstructed from a user-supplied concept without redistributing source pixels; deterministic source, design boundary, and provenance are committed under `scripts/assets/terrorspark_groundshaker/` and `docs/design/terrorspark-groundshaker/`. Its current item painting is credited in the item-art consistency row above | Project asset, rights reserved | **No, permission required** |
| Masterwrought inscription tome held models (`public/models/weapons/{tome_silverleaf,tome_goldleaf,tome_sunpetal,tome_voidbound}.glb`) | World of ClaudeCraft | Original project art authored procedurally from the committed inscription item-icon SVG sources (`docs/achievements/masterwrought-phase06-art/` and `docs/achievements/masterwrought-phase09-art/voidbound_grimoire.svg`); deterministic factory, exporter, and fingerprint pins under `scripts/assets/inscription_tomes/`, contract test `tests/inscription_tome_assets.test.ts` | Project asset, rights reserved | **No, permission required** |
| Goblin Rocket Sled mount (`public/models/mounts/goblin_rocket_sled.glb`) and item painting (`public/ui/items/reins_goblin_rocket_sled.webp`) | World of ClaudeCraft | Original project mount procedurally reconstructed from user-supplied concept art; deterministic source and design boundary are committed under `scripts/assets/goblin_rocket_sled/` and `docs/design/goblin_rocket_sled/`. The item painting is a user-supplied, user-approved OpenAI-generated result reviewed and normalized under `woc-item-icon-v1`; exact source and shipping hashes, processing, and the explicitly unavailable source prompt are recorded in `docs/design/goblin_rocket_sled/icon-provenance.json` | Project asset, rights reserved | **No, permission required** |
| Lanternback Troll rideable mount model (`public/models/mounts/lanternback_troll.glb`) | World of ClaudeCraft | Project-supplied base sculpt; the deform skeleton, skin weights, the emissive lamp-glass material, and all four animation clips (Idle, Walk, Run, Death) were authored for this game in Blender | Project asset, rights reserved | **No, permission required** |
| Lanternback Troll reins icon (`public/ui/items/reins_lanternback_troll.webp`) | World of ClaudeCraft | Owner-supplied painted master, downscaled to the 128px opaque woc-item-icon-v1 shipping format | Project asset, rights reserved | **No, permission required** |
| Chimeglass Tortoise rideable mount model (`public/models/mounts/chimeglass_tortoise.glb`) | World of ClaudeCraft | Project-supplied base sculpt and base-colour texture (shipped unmodified); the deform skeleton, region-masked skin weights, the brass and blue-emissive lens materials and all seven animation clips (Idle, three idle-breakers, Walk, Run, Death) were authored for this game in Blender | Project asset, rights reserved | **No, permission required** |
| Chimeglass Tortoise reins icon (`public/ui/items/reins_chimeglass_tortoise.webp`) | World of ClaudeCraft | Three-quarter head render of the shipped mount model, background keyed and downscaled to the 128px woc-item-icon-v1 shipping format | Project asset, rights reserved | **No, permission required** |
| Rift dimensional gate model (`public/models/props/rift_portal.glb`) | World of ClaudeCraft | Project-generated via Meshy AI (text-to-3D), owned under the Meshy paid-plan license | Project asset | With the project only |
| Rift arcane flame + rune monolith props (`public/models/props/rift_flame.glb`, `rift_rune.glb`) | World of ClaudeCraft | Project-generated via Tripo AI (text-to-3D), owned under the Tripo paid-plan license | Project asset | With the project only |
| Eastbrook ferry transport ship (`public/models/props/eastbrook_ferry.glb`: hull, sails, sea-serpent figurehead, compass emblem, its LODs and idle clip) | World of ClaudeCraft | Original project art built procedurally in Blender for this game; no third-party mesh, texture or reference image entered the build. Deterministic source, builder and fingerprint under `scripts/assets/eastbrook_ferry/`, contract test `tests/eastbrook_ferry_asset.test.ts` | Project asset, rights reserved | **No, permission required** |
| Harbor route marker signpost (`public/models/props/harbor_route_marker.glb`: post, arrow board, anchor roundel, metal trim, lantern, chain and rope; the destination name is drawn at runtime) | World of ClaudeCraft | Original project art built procedurally in Blender for this game, in the Eastbrook ferry's palette; no third-party mesh, texture or reference image entered the build. Deterministic source, builder and fingerprint under `scripts/assets/harbor_route_marker/`, contract test `tests/harbor_route_marker_asset.test.ts` | Project asset, rights reserved | **No, permission required** |
| Harbormaster Tamsin's sea gear (`public/models/chars/npc_gear/harbormaster_tricorne.glb`: navy tricorne with brass lace and an anchor cockade, and a briar pipe; `public/models/chars/npc_gear/harbormaster_spyglass.glb`: brass spyglass in a leather frog) | World of ClaudeCraft | Original project art built procedurally in Blender for this game, in the Eastbrook ferry's palette, fitted to the modular body in each bone's bind frame; no third-party mesh, texture or reference image entered the build. Deterministic source, builder and fingerprint under `scripts/assets/harbormaster_gear/`, contract test `tests/harbormaster_gear_asset.test.ts` | Project asset, rights reserved | **No, permission required** |
| Wyrmwatch cliff harbor (`public/models/props/wyrmwatch_harbor.glb`: the Drakelands ferry berth's quays, switchback stair, landings, railings, harbor gate, the walk-in Harbormaster's House with its furnishings and wall map of the ferry routes, lanterns, cargo, dressing and path flagstones) | World of ClaudeCraft | Original project art built procedurally in Blender for this game from the sim's own layout, in the Eastbrook ferry's palette; no third-party mesh, texture or reference image entered the build. Deterministic source, builder and fingerprint under `scripts/assets/wyrmwatch_harbor/`, contract test `tests/wyrmwatch_harbor_asset.test.ts` | Project asset, rights reserved | **No, permission required** |
| Wickharbor ferry wharf (`public/models/props/wickharbor_wharf.glb`: the Wickharbor ferry berth's plank wharf, its pier, berth head, arm and flight, frame and piles, railings, lanterns, cargo, trim and dressing) | World of ClaudeCraft | Original project art built procedurally in Blender for this game from the sim's own layout, in the Wyrmwatch cliff harbor's recipe and palette; no third-party mesh, texture or reference image entered the build. Deterministic source, builder and fingerprint under `scripts/assets/wickharbor_wharf/`, contract test `tests/wickharbor_wharf_asset.test.ts` | Project asset, rights reserved | **No, permission required** |
| Wickharbor harbor (`public/models/props/wickharbor_harbor.glb`: Wickharbor's shore boardwalk, the great quay with its crane and cargo shelter, its two piers, the two stairs up the bluff and the Old Beacon's dock and stair, plank fields, frame and piles, stone footings, railings, lanterns, cargo, trim and dressing) | World of ClaudeCraft | Original project art built procedurally in Blender for this game from the sim's own layout, in the Wickharbor ferry wharf's and the Wyrmwatch cliff harbor's recipe and palette; no third-party mesh, texture or reference image entered the build. Deterministic source, builder and fingerprint under `scripts/assets/wickharbor_harbor/`, contract test `tests/wickharbor_harbor_asset.test.ts` | Project asset, rights reserved | **No, permission required** |
| Ignivar raid forge-mech dressing props (`public/models/dungeon/ignivar_prop_*.glb`: beams, pillars, the rusty gear wall, vault door, reactor, lava face, forge, anvil, chains, lava and steam machinery) | World of ClaudeCraft | Project-generated via Tripo AI (text-to-3D) from the maintainer's environment drop, owned under the Tripo paid-plan license, optimized to KTX2/meshopt via `scripts/assets/build_ignivar_props.mjs` | Project asset | With the project only |
| Drakelands rebuild kit props (`public/models/drakelands_kit/*.glb`: town buildings and bases, church, barracks, stables, castle door, fence, gravestones, signpost, tavern sign, horse-head sign, notice board, shield and weapon racks, training dummy, well pump, dragon statue) | World of ClaudeCraft | Project-generated via Tripo AI (text-to-3D) from the maintainer's environment drop, owned under the Tripo paid-plan license, optimized to KTX2/meshopt via `scripts/assets/build_drakelands_kit.mjs` (the full-quality drop stays with the maintainer outside the repo; `grain_drakelands_kit_textures.mjs` re-bakes from it) | Project asset | With the project only |
| Realm sky HDRIs (hollow_dusk, ember_storm, frost_twilight, amber_sunset, fen_day, nightbloom_dream, wraithwood_gloom; 2k and 1k) | World of ClaudeCraft | Project-generated equirect sky panoramas, converted to RGBE with HDR sun re-injection | Project asset | With the project only |
| Zone map overlays (`public/map_art/*.png`) | World of ClaudeCraft | Project-generated painterly map overlay art derived from local zone reference plates | Project asset | With the project only |
| Infernal Citadel props (`public/models/props/infernal_brazier.glb`, `infernal_altar.glb`, `demon_idol.glb`, `hell_forge.glb`, `hanging_cage.glb`, `bone_pile.glb`, `obsidian_fang.glb`, `infernal_statue.glb`, `slag_cauldron.glb`, `bone_throne.glb`) | World of ClaudeCraft | Project-generated via `scripts/asset_pipeline` (Tripo AI text-to-3D), owned under the Tripo paid-plan license | Project asset | With the project only |
| Generated class skin-suit set "Prismatic Vanguard" (suit_prismatic, all classes, `public/textures/skins/<class>/alt_suit_prismatic.png`) | World of ClaudeCraft | Project-generated via scripts/asset_pipeline (procedural gradient-map atlas) | Project asset | With the project only |
| Generated class skin-suit set "Liquid Chrome" (suit_chrome, all classes, `public/textures/skins/<class>/alt_suit_chrome.png`) | World of ClaudeCraft | Project-generated via scripts/asset_pipeline (procedural gradient-map atlas) | Project asset | With the project only |
## Brand marks

The four streamer-platform marks inlined as SVG paths in `src/ui/ui_icons.ts`
(Twitch, X, Kick, YouTube) are the trademarks of their respective platforms,
reproduced monochrome and unmodified in shape solely to identify a link that
points at that platform. They are not project assets, and no endorsement or
affiliation is implied. The Discord (Clyde) mark in the same file is used the
same way, as is the Steam mark, which identifies the links to the game's Steam
store page (the wishlist reminder, `src/ui/steam_wishlist.ts`).

The Solana and USDC logos shipped as `public/claudium/icons/solana-icon.webp`
and `public/claudium/icons/usdc-icon.webp` are trademarks of their respective
owners, reproduced unmodified solely to identify the corresponding payment
rail in the Claudium buy window (`src/ui/claudium_window.ts`). They are not
project assets, and no endorsement or affiliation is implied.

None of these marks are licensed to you by this file or by the project's MIT
license. Trademark law, not copyright licensing, governs their use. The same
applies to the "World of ClaudeCraft" and "Levy Street" names, logos, and
branding.

## Audio

All sampled sound effects credited to @jamiecypher below (`public/audio/sfx/`)
are original recordings and sound design, reworked using original sounds and
licensed source material from EastWest Composer Cloud, Epic Stock Media, and
Freesound.org (CC0). @jamiecypher retains copyright and publishes this work
under CC BY-NC 4.0 (Creative Commons Attribution-NonCommercial 4.0
International): free to use and share non-commercially with attribution.
@jamiecypher separately grants World of ClaudeCraft (Levy Street) a
perpetual, royalty-free license to use these assets commercially, including
in official releases and the Claudium store.

**That commercial grant is to Levy Street and does not transfer with a fork.**
If you redistribute these sounds you must credit @jamiecypher and keep the use
non-commercial. For commercial use, arrange your own licence with the author.

| Assets | Author | Source | License | Redistribution |
|---|---|---|---|---|
| Remaining generated world, interface, event, and ambience sound effects not attributed below (`public/audio/sfx/*.mp3`, excluding `quest_*.mp3` and `mount_*.mp3`) | World of ClaudeCraft | Project-generated with the ElevenLabs Sound Effects API from `scripts/sfx/sfx_prompts.mjs` or deterministic FFmpeg synthesis via `scripts/gen_ui_sfx.mjs` | Project asset | With the project only |
| Ignivar encounter voice lines (`public/audio/voice/ignivar/*.mp3`) | World of ClaudeCraft | Project-generated with ElevenLabs Voice Design and text-to-speech, then locally post-processed | Project asset, rights reserved | **No, permission required** |
| Varkhul encounter voice lines (`public/audio/voice/varkhul/*.mp3`) | World of ClaudeCraft | Project-generated with ElevenLabs Voice Design, then locally post-processed | Project asset, rights reserved | **No, permission required** |
| Valorsteed gallop layer (`mount_run_valorsteed.mp3`) | D4XX, adapted by congusbongus | [Horse gallop on different surfaces](https://opengameart.org/content/horse-gallop-on-different-surfaces), individual `ground.mp3` source identified as CC0 in the included credits | CC0 1.0 | Yes |
| Mount footfall layers (`mount_run_grag_bear.mp3`, `mount_run_shadowjump_toad.mp3`, `mount_run_stormfeather_griffin.mp3`, `mount_run_thunderstrut_gobbler.mp3`) | Fantozzi, extracted by qubodup | [Fantozzi's Footsteps](https://opengameart.org/content/fantozzis-footsteps-grasssand-stone) | CC0 1.0 | Yes |
| Stalk-Glider slime layer (`mount_run_stalkglider_snail.mp3`) | RandomUser | [Slime ultimate the best](https://opengameart.org/content/slime-ultimate-the-best) | CC0 1.0 | Yes |
| Shadow-Jump Toad slime layer (`mount_run_shadowjump_toad.mp3`) | KobatoGames | [Slime jump effect](https://opengameart.org/content/slime-jump-effect) | CC0 1.0 | Yes |
| Hover-Cycle movement layer (`mount_run_aether_hover_cycle.mp3`) | Umplix | [Hovermobile SFX](https://opengameart.org/content/hovermobile-sfx) | CC0 1.0 | Yes |
| Stormfeather and Grand Gobbler wing layers (`mount_run_stormfeather_griffin.mp3`, `mount_run_thunderstrut_gobbler.mp3`) | AntumDeluge, derived from dave.des | [Large Wings Flap](https://opengameart.org/content/large-wings-flap) | CC0 1.0 | Yes |
| Dreadspark Groundshaker movement layer (`mount_run_terrorspark_groundshaker.mp3`) | World of ClaudeCraft | Original deterministic FFmpeg synthesis via `scripts/gen_terrorspark_groundshaker_sfx.mjs` | Project asset | With the project only |
| Cluckwork Mech Bird take set (`mount_run_mech_bird.mp3`, `mount_idle_mech_bird.mp3`, `mount_jump_mech_bird.mp3`, `mount_land_mech_bird.mp3`) | World of ClaudeCraft | Hand-authored project recordings, assembled deterministically via `scripts/gen_mech_bird_sfx.mjs` | Project asset | With the project only |
| Bonebound Rickshaw rolling loop (`mount_loop_rickshaw_mount.mp3`) | @jamiecypher | Original recording | CC BY-NC 4.0 (+ perpetual commercial grant to World of ClaudeCraft) | Non-commercial only, with attribution |
| Quest event sounds (`quest_accept`, `quest_ready`, `quest_complete`) | @jamiecypher | Original work | CC BY-NC 4.0 (+ perpetual commercial grant to World of ClaudeCraft) | Non-commercial only, with attribution |
| Lockpick minigame sounds (`lockpick_*`) | @jamiecypher | Original work | CC BY-NC 4.0 (+ perpetual commercial grant to World of ClaudeCraft) | Non-commercial only, with attribution |
| Wand auto-attack sounds (`wand_*`) | @jamiecypher | Original work | CC BY-NC 4.0 (+ perpetual commercial grant to World of ClaudeCraft) | Non-commercial only, with attribution |
| Level-up and Book of Deeds achievement chimes (`ui_level_up`, `ui_achievement`) | @jamiecypher | Original work | CC BY-NC 4.0 (+ perpetual commercial grant to World of ClaudeCraft) | Non-commercial only, with attribution |
| Magic-school impact and casting-support one-shots (`impact_*`, `heal_impact`, `buff_apply`, `debuff_apply`, `spell_nova`) | @jamiecypher | Original work | CC BY-NC 4.0 (+ perpetual commercial grant to World of ClaudeCraft) | Non-commercial only, with attribution |
| Magic-school projectile launches (`proj_*`) | @jamiecypher | Original work | CC BY-NC 4.0 (+ perpetual commercial grant to World of ClaudeCraft) | Non-commercial only, with attribution |
| Melee, footstep, movement, combat-reaction, and player-state sounds (`melee_*`, `foot_*`, `move_*`, `combat_*`, `player_death*`, `player_hurt*`) | @jamiecypher | Original work | CC BY-NC 4.0 (+ perpetual commercial grant to World of ClaudeCraft) | Non-commercial only, with attribution |
| Creature vocalizations, every mob family (`mob_*`) | @jamiecypher | Original work | CC BY-NC 4.0 (+ perpetual commercial grant to World of ClaudeCraft) | Non-commercial only, with attribution |

## Generated prop and creature models

| Assets | Author | Source | License | Redistribution |
|---|---|---|---|---|
| Generated prop model (marsh_plank_bridge) | World of ClaudeCraft | Project-generated via scripts/asset_pipeline (Tripo AI 3D) | Project asset | With the project only |
| Generated prop model (marsh_shrine_fragment) | World of ClaudeCraft | Project-generated via scripts/asset_pipeline (Tripo AI 3D) | Project asset | With the project only |
| Generated prop model (marsh_corpse_candle) | World of ClaudeCraft | Project-generated via scripts/asset_pipeline (Tripo AI 3D) | Project asset | With the project only |
| Generated prop model (marsh_bell_gallows) | World of ClaudeCraft | Project-generated via scripts/asset_pipeline (Tripo AI 3D) | Project asset | With the project only |
| Generated prop model (marsh_sluice_post) | World of ClaudeCraft | Project-generated via scripts/asset_pipeline (Tripo AI 3D) | Project asset | With the project only |
| Generated prop model (marsh_dead_tree) | World of ClaudeCraft | Project-generated via scripts/asset_pipeline (Tripo AI 3D) | Project asset | With the project only |
| Generated prop model (marsh_reed_cluster) | World of ClaudeCraft | Project-generated via scripts/asset_pipeline (Tripo AI 3D) | Project asset | With the project only |
| Generated prop model (yumi_brazier_stand) | World of ClaudeCraft | Project-generated via scripts/asset_pipeline (Tripo AI 3D) | Project asset | With the project only |
| Generated prop model (yumi_torch_handle) | World of ClaudeCraft | Project-generated via scripts/asset_pipeline (Tripo AI 3D) | Project asset | With the project only |
| Generated prop model (dungeon_door_arch) | World of ClaudeCraft | Project-generated via scripts/asset_pipeline (Tripo AI 3D) | Project asset | With the project only |
| Generated prop model (crypt_ritual_circle) | World of ClaudeCraft | Project-generated via scripts/asset_pipeline (Tripo AI 3D) | Project asset | With the project only |
| Generated prop model (delve_module_exit) | World of ClaudeCraft | Project-generated via scripts/asset_pipeline (Tripo AI 3D) | Project asset | With the project only |
| Generated prop model (delve_surface_exit) | World of ClaudeCraft | Project-generated via scripts/asset_pipeline (Tripo AI 3D) | Project asset | With the project only |
| Generated prop model (delve_rite_shrine_bell) | World of ClaudeCraft | Project-generated via scripts/asset_pipeline (Tripo AI 3D) | Project asset | With the project only |
| Generated prop model (delve_rite_shrine_candle) | World of ClaudeCraft | Project-generated via scripts/asset_pipeline (Tripo AI 3D) | Project asset | With the project only |
| Generated prop model (delve_rite_shrine_reed) | World of ClaudeCraft | Project-generated via scripts/asset_pipeline (Tripo AI 3D) | Project asset | With the project only |
| Generated prop model (delve_rite_shrine_skull) | World of ClaudeCraft | Project-generated via scripts/asset_pipeline (Tripo AI 3D) | Project asset | With the project only |
| Generated prop model (delve_pressure_plate) | World of ClaudeCraft | Project-generated via scripts/asset_pipeline (Tripo AI 3D) | Project asset | With the project only |
| Generated prop model (marsh_root_wall) | World of ClaudeCraft | Project-generated via scripts/asset_pipeline (Tripo AI 3D) | Project asset | With the project only |
| Generated creature model + animations (training_dummy) | World of ClaudeCraft | Project-generated via scripts/asset_pipeline (Tripo AI 3D, auto-rig + preset retargets) | Project asset | With the project only |
| Generated creature model + animations (gravewing) | World of ClaudeCraft | Project-generated via scripts/asset_pipeline (Tripo AI 3D, auto-rig + preset retargets) | Project asset | With the project only |
| Generated character form + animations (lich_form) | World of ClaudeCraft | Project-generated via scripts/asset_pipeline (Tripo AI 3D, auto-rig + preset retargets) | Project asset | With the project only |
| Contributor-provided animated raid boss model and fire VFX (ignivar_herald) | World of ClaudeCraft contributor | Colossus GLB, 12 authored clips, VFX sockets, 6x6 flame atlas, and authored Ignivar fire shaders delivered in `ignivar_fire_vfx.zip` (SHA-256 `a942d097629f2c1303ef142808697fc131e383448e173647b5f46e4e5e90195b`); locally finalized with meshopt and KTX2/Basis | Project asset | With the project only |
| Contributor-provided animated raid add models (cinder_artificer, crucible_warden, ember_sentinel) | World of ClaudeCraft contributor | Replacement rigged GLBs and authored combat/channel clips delivered in `Automa_Mobs.zip` (SHA-256 `855c92bbd4995515e711e6e59d8220a9918698fb4cc3625f8c6db6c2c16e903d`); supplied files were already finalized with meshopt and 1024px KTX2/Basis UASTC textures, so geometry and animation data were preserved | Project asset | With the project only |
| Generated prop model (engineering_workbench) | World of ClaudeCraft | Project-generated via scripts/asset_pipeline (Tripo AI 3D) | Project asset | With the project only |
| Generated prop model (alchemy_cauldron) | World of ClaudeCraft | Project-generated via scripts/asset_pipeline (Tripo AI 3D) | Project asset | With the project only |
| Generated prop model (cooking_spit) | World of ClaudeCraft | Project-generated via scripts/asset_pipeline (Tripo AI 3D) | Project asset | With the project only |
| Generated prop model (leatherworking_rack) | World of ClaudeCraft | Project-generated via scripts/asset_pipeline (Tripo AI 3D) | Project asset | With the project only |
| Generated prop model (tailoring_loom) | World of ClaudeCraft | Project-generated via scripts/asset_pipeline (Tripo AI 3D) | Project asset | With the project only |
| Generated prop model (inscription_lectern) | World of ClaudeCraft | Project-generated via scripts/asset_pipeline (Tripo AI 3D) | Project asset | With the project only |
| Generated prop model (enchanting_altar) | World of ClaudeCraft | Project-generated via scripts/asset_pipeline (Tripo AI 3D) | Project asset | With the project only |
| Generated prop model (jewelcrafting_bench) | World of ClaudeCraft | Project-generated via scripts/asset_pipeline (Tripo AI 3D) | Project asset | With the project only |
| Great Maze prop models (`public/models/props/maze_hedge_wall.glb`, `maze_hedge_arch.glb`, `leafy_fox_statue.glb`) | World of ClaudeCraft | Maintainer-authored generated models, optimized via `scripts/assets/specs/evergarden_maze.json` | Project asset | With the project only |
| Evergarden flower bed models (`public/models/props/flower_bed_square_a.glb`, `flower_bed_square_b.glb`, `flower_bed_round.glb`) | World of ClaudeCraft | Maintainer-authored generated models, optimized via `scripts/assets/specs/evergarden_beds.json` | Project asset | With the project only |
| Galecrest monument models (`public/models/props/ship_monument.glb`, `golden_horse_statue.glb`) | World of ClaudeCraft | Maintainer-authored generated models, optimized via `scripts/assets/specs/gale_statues.json` | Project asset | With the project only |
| Generated prop model (mining_ore_cart) | World of ClaudeCraft | Project-generated via scripts/asset_pipeline (Tripo AI 3D) | Project asset | With the project only |
| Generated prop model (herbalism_drying_rack) | World of ClaudeCraft | Project-generated via scripts/asset_pipeline (Tripo AI 3D) | Project asset | With the project only |
| Generated prop model (banker_chest) | World of ClaudeCraft | Project-generated via the img2threejs workflow and `scripts/assets/banker_chest` from a user-provided concept reference; reference not redistributed | Project asset | With the project only |
| Generated landmark model (eastbrook_grand_armoury) | World of ClaudeCraft | Original procedural Three.js model produced via the img2threejs workflow and `scripts/assets/eastbrook_grand_armoury`, inspired by a user-provided scene reference; reference not redistributed | Project asset | With the project only |
| Generated Eastbrook town kit (`eastbrook_bank`, `eastbrook_smithy`, `eastbrook_inn`, `eastbrook_chapel`, `eastbrook_weaving_workshop`, `eastbrook_toolworks`, `eastbrook_civic_well_beacon`, `eastbrook_market_stall`, `eastbrook_wall_wing`) | World of ClaudeCraft | Original deterministic procedural Three.js models produced via the img2threejs workflow and `scripts/assets/eastbrook_town` from the project-generated Eastbrook turnaround sheets | Project asset | With the project only |
| Generated Eastbrook Realm Builder monument (`eastbrook_realm_builder_monument`, plus its 8-view impostor atlas) | World of ClaudeCraft | Project-generated sculpt (Tripo AI 3D) finished and exported via `scripts/assets/realm_builder_monument.py` (vertex-tinted plates, KTX2 albedo, socket extras); the impostor atlas is baked from the same sculpt. Replaces the civic well beacon as the square's centrepiece; the beacon model still ships for the editor and the frozen polish captures | Project asset | With the project only |
| Generated Eastbrook Ravenpost mailbox (`mailbox_pillar`) | World of ClaudeCraft | Original deterministic procedural Three.js model produced via the img2threejs workflow and `scripts/assets/eastbrook_mailbox` from the project-generated finishing-pass turnaround; replaces the historical Tripo mailbox while preserving its stable runtime path and gameplay contract | Project asset | With the project only |
| Generated Eastbrook public noticeboard (`eastbrook_noticeboard`) | World of ClaudeCraft | Original deterministic procedural Three.js model produced via the img2threejs workflow and `scripts/assets/eastbrook_noticeboard` from the project-generated finishing-pass turnaround; blank notice shapes contain no readable or proprietary text | Project asset | With the project only |
| Generated farming prop set (`public/models/props/farm_bed.glb`, `farm_sprout.glb`, `farm_grain_stage2.glb`, `farm_grain_stage3.glb`, `farm_grain_stage4.glb`, `farm_rootleaf_stage2.glb`, `farm_rootleaf_stage3.glb`, `farm_rootleaf_stage4.glb`, `farm_gourd_stage2.glb`, `farm_gourd_stage3.glb`, `farm_gourd_stage4.glb`, `farm_grain_withered.glb`, `farm_rootleaf_withered.glb`, `farm_gourd_withered.glb`, `farm_compost_bin.glb`, `farm_feast.glb`, `farm_feast_apex.glb`) | World of ClaudeCraft | Original deterministic procedural Three.js models produced via `scripts/assets/farm_props` and optimized via `scripts/assets/specs/farm_props.json`; texture-free vertex-colored set authored in-repo with no external reference | Project asset | With the project only |
| Generated prop model (maledict_eye) | World of ClaudeCraft | Project-generated via scripts/asset_pipeline (Tripo AI 3D) | Project asset | With the project only |
| Generated creature model + animations (emberkin) | World of ClaudeCraft | Project-generated via scripts/asset_pipeline (Tripo AI 3D, auto-rig + preset retargets) | Project asset | With the project only |
| Generated creature model + animations (pyre_colossus) | World of ClaudeCraft | Project-generated via scripts/asset_pipeline (Tripo AI 3D, auto-rig + preset retargets) | Project asset | With the project only |
| Generated creature model + animations (gloomshade_abyssal_guardian) | World of ClaudeCraft | Project-generated via scripts/asset_pipeline (Tripo AI 3D, auto-rig + preset retargets) | Project asset | With the project only |
| Generated creature models + animations (hoard_abyssal_maw, hoard_hoarfrost_warden) | World of ClaudeCraft | Models project-generated via scripts/asset_pipeline (Tripo AI 3D). The Maw is rigged and animated by the project in Blender (`scripts/assets/hoard_bosses/maw_rig.py`); the Warden rides the Tripo auto-rig with its preset retargets repaired and an authored attack (`scripts/assets/hoard_bosses/frost_fix.py`) | Project asset | With the project only |
| Generated creature models (hoard_emberforge_tyrant, hoard_archon_nyxaris, hoard_tempest_vharok) | World of ClaudeCraft | Project-generated via scripts/asset_pipeline (Tripo AI 3D), edited in Blender (`scripts/assets/hoard_bosses/`: Nyxaris legs removed so he floats; Emberforge two generated textures mixed and the generated hands replaced by project-modelled forge gauntlets; Vharok arms lengthened), then rigged locally onto the KayKit skeleton with `rig-manual`, carrying the KayKit (Kay Lousberg, CC0) clips | Project asset | With the project only |
| Generated hoard room creatures (hoard_tide_thrall, hoard_frost_revenant, hoard_ember_fiend, hoard_magma_brute, hoard_void_acolyte, hoard_storm_caller, hoard_boneclad_warrior; hoard_deep_lurker, hoard_dread_stalker, hoard_stormscale_drake, hoard_thornback_stalker, hoard_venom_weaver, hoard_rime_elemental, hoard_coinsack_scurrier) | World of ClaudeCraft | Models project-generated via scripts/asset_pipeline (Tripo AI 3D) from project concept images (the last four concepts are Tripo text-to-image). The eight humanoids are rigged locally onto the KayKit skeleton with `rig-manual` (the Coinsack Scurrier's sack and face made rigid by `scripts/assets/hoard_mobs/rigid_pack.mjs`), carrying the KayKit (Kay Lousberg, CC0) clips; the six creatures are rigged and animated by the project in Blender (`scripts/assets/hoard_mobs/quadruped_rig.py`, the spider's legs found by `spider_spec.py`) | Project asset | With the project only |
| Generated cave boss models (hoard_boss_mushroom, hoard_bloat_cap) | World of ClaudeCraft | Project-generated via scripts/asset_pipeline (Tripo AI 3D): the Mother of Mushrooms from a project concept image, rigged locally onto a long-armed copy of the KayKit skeleton (`scripts/assets/hoard_mobs/stretch_arms.mjs`, then `rig-manual`, her cap and growths made rigid by `rigid_pack.mjs` and `rigid_islands.mjs`), carrying the KayKit (Kay Lousberg, CC0) clips; her Bloated Cap a Tripo text-to-model static prop | Project asset | With the project only |
| Generated cave boss models (hoard_boss_mole, hoard_boss_bat, hoard_boss_mimic) | World of ClaudeCraft | Models project-generated via scripts/asset_pipeline (Tripo AI 3D) from project concept images, rigged and animated by the project in Blender: Deeprake with `scripts/assets/hoard_mobs/quadruped_rig.py` (claw, rear-up and burrow clips), the Colossal Bat with `bat_rig.py` (wing chains, flying clips), the Voracious Chest with `mimic_rig.py` (lid cut free along the teeth and hinged as a jaw) | Project asset | With the project only |
| Generated Fenbridge town kit (`fenbridge_warden_gatehouse`, `fenbridge_crooked_reed_inn`, `fenbridge_lantern_chapel`, `fenbridge_moonwort_apothecary`, `fenbridge_gilded_strongbox`, `fenbridge_hesk_tannery`, `fenbridge_scout_lodge`, `fenbridge_mirelight_cistern`, `fenbridge_provision_stall`, `fenbridge_palisade_wing`, `fenbridge_gate_arch`, `fenbridge_boardwalk`, `fenbridge_muster_board`, and quest pickup `fenbridge_muster_order`) | World of ClaudeCraft | Original deterministic procedural Three.js models produced through the img2threejs workflow and `scripts/assets/fenbridge_town` from the project-generated Fenbridge turnaround sheets; exterior-only building shells preserve the canonical gameplay and collision contracts | Project asset | With the project only |

| Generated prop model (wildheart_jaguar_gate) | World of ClaudeCraft | Project-generated via scripts/asset_pipeline (Tripo AI 3D) | Project asset | With the project only |
| Generated prop model (wildheart_ritual_pyramid) | World of ClaudeCraft | Project-generated via scripts/asset_pipeline (Tripo AI 3D) | Project asset | With the project only |
| Generated prop model (wildheart_canopy_platform) | World of ClaudeCraft | Project-generated via scripts/asset_pipeline (Tripo AI 3D) | Project asset | With the project only |
| Generated prop model (wildheart_rope_bridge) | World of ClaudeCraft | Project-generated via scripts/asset_pipeline (Tripo AI 3D) | Project asset | With the project only |
| Generated prop model (wildheart_beast_den) | World of ClaudeCraft | Project-generated via scripts/asset_pipeline (Tripo AI 3D) | Project asset | With the project only |
| Generated prop model (wildheart_mask_totem) | World of ClaudeCraft | Project-generated via scripts/asset_pipeline (Tripo AI 3D) | Project asset | With the project only |
| Generated creature model + animations (wildheart_ravager) | World of ClaudeCraft | Project-generated via scripts/asset_pipeline (Tripo AI 3D, auto-rig + preset retargets) | Project asset | With the project only |
| Generated creature model + animations (wildheart_hexcaller) | World of ClaudeCraft | Project-generated via scripts/asset_pipeline (Tripo AI 3D, auto-rig + preset retargets) | Project asset | With the project only |
| Generated creature model + animations (wildheart_beastmaster) | World of ClaudeCraft | Project-generated via scripts/asset_pipeline (Tripo AI 3D, auto-rig + preset retargets) | Project asset | With the project only |
| Generated creature model + animations (wildheart_high_priest) | World of ClaudeCraft | Project-generated via scripts/asset_pipeline (Tripo AI 3D, auto-rig + preset retargets) | Project asset | With the project only |
| Generated prop model (wildheart_limestone_cliff) | World of ClaudeCraft | Project-generated via scripts/asset_pipeline (Tripo AI 3D) | Project asset | With the project only |
| Generated creature model + animations (wildheart_stalker) | World of ClaudeCraft | Project-generated via scripts/asset_pipeline (Tripo AI 3D, auto-rig + preset retargets) | Project asset | With the project only |
| Generated prop model (wildheart_giant_fern) | World of ClaudeCraft | Project-generated via scripts/asset_pipeline (Tripo AI 3D) | Project asset | With the project only |
| Generated prop model (wildheart_ancestor_ruin) | World of ClaudeCraft | Project-generated via scripts/asset_pipeline (Tripo AI 3D) | Project asset | With the project only |
| Generated prop model (wildheart_jungle_canopy_tree) | World of ClaudeCraft | Project-generated via scripts/asset_pipeline (Tripo AI 3D) | Project asset | With the project only |
| Generated prop model (streetlamp_eastbrook_civic) | World of ClaudeCraft | Project-generated via scripts/asset_pipeline (Tripo AI 3D) | Project asset | With the project only |
| Generated prop model (streetlamp_mirefen_witchflame) | World of ClaudeCraft | Project-generated via scripts/asset_pipeline (Tripo AI 3D) | Project asset | With the project only |
| Generated prop model (streetlamp_thornpeak_beacon) | World of ClaudeCraft | Project-generated via scripts/asset_pipeline (Tripo AI 3D) | Project asset | With the project only |
| Generated prop model (streetlamp_veiled_crystal) | World of ClaudeCraft | Project-generated via scripts/asset_pipeline (Tripo AI 3D) | Project asset | With the project only |
| Generated prop model (streetlamp_drakelands_brazier) | World of ClaudeCraft | Project-generated via scripts/asset_pipeline (Tripo AI 3D) | Project asset | With the project only |
| Generated prop model (streetlamp_frostveil_icicle) | World of ClaudeCraft | Project-generated via scripts/asset_pipeline (Tripo AI 3D) | Project asset | With the project only |
| Generated prop model (streetlamp_amberfall_crystal) | World of ClaudeCraft | Project-generated via scripts/asset_pipeline (Tripo AI 3D) | Project asset | With the project only |
| Generated prop model (streetlamp_willowfen_reed) | World of ClaudeCraft | Project-generated via scripts/asset_pipeline (Tripo AI 3D) | Project asset | With the project only |
| Generated prop model (streetlamp_nightbloom_moonflower) | World of ClaudeCraft | Project-generated via scripts/asset_pipeline (Tripo AI 3D) | Project asset | With the project only |
| Generated prop model (streetlamp_wraithwood_ghost) | World of ClaudeCraft | Project-generated via scripts/asset_pipeline (Tripo AI 3D) | Project asset | With the project only |
| Generated prop model (streetlamp_palmreach_totem) | World of ClaudeCraft | Project-generated via scripts/asset_pipeline (Tripo AI 3D) | Project asset | With the project only |
| Generated prop model (streetlamp_evergarden_flower) | World of ClaudeCraft | Project-generated via scripts/asset_pipeline (Tripo AI 3D) | Project asset | With the project only |
| Generated prop model (frostveil_ice_spire) | World of ClaudeCraft | Project-generated via scripts/asset_pipeline (Tripo AI 3D) | Project asset | With the project only |
| Generated prop model (streetlamp_galecrest_mast) | World of ClaudeCraft | Project-generated via scripts/asset_pipeline (Tripo AI 3D) | Project asset | With the project only |
| Generated prop model (streetlamp_farshore_coral) | World of ClaudeCraft | Project-generated via scripts/asset_pipeline (Tripo AI 3D) | Project asset | With the project only |
| Generated creature model + animations (bear_form, the druid Bear Form quadruped) | World of ClaudeCraft | Project-generated Tripo AI 3D sculpt, owned under the Tripo paid-plan license; rigged and animated locally rather than auto-rigged (29 bone deform rig fitted to the sculpt by measurement, distance-solver skinning, and nine IK-authored clips), then KTX2-compressed via glTF-Transform | Project asset | With the project only |
| Druid cat form model and animations (`public/models/creatures/druid_cat_form.glb`) | World of ClaudeCraft maintainer handoff | Maintainer-provided cat mesh and packed Tripo texture; animal Rigify controls, proxy-transferred skin weights and 26 clips authored locally in Blender through `scripts/assets/druid_cat/` (17 ship in the compact set), then baked and optimized with meshopt and ETC1S KTX2 | Project asset | With the project only |
| Ignivar Ashcaller creature model + animations (`public/models/creatures/ignivar_ashcaller.glb`) | World of ClaudeCraft contributor handoff | Contributor-provided `Ignivar_Ashcaller.zip` (SHA-256 `aa7aac6ddd2eedefdaec7e0c645558701236e60081f74f45a1e4cf088711eda9`), optimized locally with meshopt and KTX2 for shipping | Project asset | With the project only |
| Generated prop model (varkhul_grand_forge) | World of ClaudeCraft | Project-generated via scripts/asset_pipeline (Tripo AI 3D) | Project asset | With the project only |
| Generated prop model (wreckage_broken_planks) | World of ClaudeCraft | Project-generated via scripts/asset_pipeline (Tripo AI 3D) | Project asset | With the project only |
| Generated prop model (wreckage_waterlogged_barrel) | World of ClaudeCraft | Project-generated via scripts/asset_pipeline (Tripo AI 3D) | Project asset | With the project only |
| Generated prop model (wreckage_damaged_crate) | World of ClaudeCraft | Project-generated via scripts/asset_pipeline (Tripo AI 3D) | Project asset | With the project only |
| Generated prop model (wreckage_fallen_anchor) | World of ClaudeCraft | Project-generated via scripts/asset_pipeline (Tripo AI 3D) | Project asset | With the project only |
| Generated prop model (wreckage_hull_fragment) | World of ClaudeCraft | Project-generated via scripts/asset_pipeline (Tripo AI 3D) | Project asset | With the project only |
| Generated prop model (wreckage_capsized_rowboat) | World of ClaudeCraft | Project-generated via scripts/asset_pipeline (Tripo AI 3D) | Project asset | With the project only |
| World Quests shipwreck placement kit (`public/models/world_quests/shipwreck/`) | World of ClaudeCraft contributor handoff | Owner-provided `shipwreck-quest` GLBs, identified as Tripo exports in their source metadata; optimized using `scripts/assets/specs/world_quest_shipwreck.json` and the meshopt/KTX2 pipeline | Project asset | With the project only |
| Confection Cascade candy atlas (`public/ui/minigames/confection-candies.webp`) | World of ClaudeCraft | Project-generated with OpenAI built-in image generation; [provenance and prompts](docs/screenshots/confection-cascade/README.md) | Project asset | With the project only |
| Confection Cascade walnut coffer material (`public/ui/minigames/confection-walnut.webp`) | World of ClaudeCraft | Original project art generated with OpenAI built-in image generation from a text-only prompt, optimized to WebP; [provenance and exact prompt](docs/screenshots/confection-cascade-v3/material-provenance.md) | Project asset | With the project only |
| Confection Cascade artisan frame, brass hardware and result seals (`public/ui/minigames/*-v4.webp`) | World of ClaudeCraft | Original project art generated and background-edited with OpenAI built-in image generation, optimized to WebP; [frame prompts](docs/screenshots/confection-cascade-v4/frame-provenance.md), [hardware prompts](docs/screenshots/confection-cascade-v4/hardware-provenance.md), [seal prompts](docs/screenshots/confection-cascade-v4/seals-provenance.md) | Project asset | With the project only |
| Confection Cascade symmetrical emerald ornament (`public/ui/minigames/confection-jewels-v5.webp`) | World of ClaudeCraft | Original project art generated with OpenAI built-in image generation using the existing project crest as a style reference, optimized to WebP; [provenance and exact prompt](docs/screenshots/confection-cascade-v5/jewel-provenance.md) | Project asset | With the project only |
| Confection Cascade solid emerald and winged lock hardware (`public/ui/minigames/*-v6.webp`) | World of ClaudeCraft | Original project art generated and background-edited with OpenAI built-in image generation, optimized to WebP; [provenance and exact prompts](docs/screenshots/confection-cascade-v6/hardware-provenance.md) | Project asset | With the project only |
| Confection Cascade polished gold hardware mounts (`public/ui/minigames/*-v7.webp`) | World of ClaudeCraft | Project art edited with OpenAI built-in image generation using the v6 hardware, optimized to WebP; [provenance and exact prompts](docs/screenshots/confection-cascade-v7/hardware-provenance.md) | Project asset | With the project only |
| Generated prop model (nythraxis_bone_spike) | World of ClaudeCraft | Project-generated via scripts/asset_pipeline (Tripo AI 3D) | Project asset | With the project only |
| Generated prop model (nythraxis_binding_cage) | World of ClaudeCraft | Project-generated via scripts/asset_pipeline (Tripo AI 3D) | Project asset | With the project only |
| Generated prop model (windrider_glider_flight) | World of ClaudeCraft | Project-generated via scripts/asset_pipeline (Tripo AI 3D) | Project asset | With the project only |

Crucible profession collection equipment, manuals, and enchant formula paintings are project-generated art, made with OpenAI's built-in image generation for World of ClaudeCraft. Provenance: `docs/achievements/crucible-professions-2026-09-05/`. Project asset, with the project only.

The Forgefather's Ember quest item painting is project-generated art, made with OpenAI's built-in image generation for World of ClaudeCraft. Provenance: `docs/achievements/crucible-professions-2026-09-05/`. Project asset, with the project only.
Assets were optimized for shipping (animation clip pruning, meshopt compression,
texture resizing) via `scripts/assets/build_assets.mjs`; raw packs are not
committed.

License texts: https://creativecommons.org/publicdomain/zero/1.0/ (CC0 1.0) ,
https://creativecommons.org/licenses/by/4.0/ (CC BY 4.0) ,
https://creativecommons.org/licenses/by-nc/4.0/ (CC BY-NC 4.0) ,
https://openfontlicense.org/ (SIL OFL 1.1) ,
https://github.com/mrdoob/three.js/blob/r165/LICENSE (three.js MIT) , and
https://craftpix.net/file-licenses/ (CraftPix).

The KayKit packs ship their own CC0 readme, kept at
`third_party/licenses/kaykit-cc0.txt`. It is an asset pack notice, not a project
licence; the only licence file at the repository root is `LICENSE`, which is the
MIT License covering the source code.

If you are unsure whether you may use an asset, or you want permission for
something this file marks as restricted, ask first: tony@levystreet.com.
| Ley Beam Alignment celestial frame and crystal heart (`public/ui/minigames/ley-*-v1.webp`) | World of ClaudeCraft | Project art generated with OpenAI built-in image generation, optimized to WebP; [provenance and prompts](docs/screenshots/ley-beam-v1/art-provenance.md) | Project asset | With the project only |

### Orbital Lightning

- `public/vfx/orbital-lightning/{orb,impact}.glb`: original procedural Blender art
  authored for World of ClaudeCraft from the user's Orbital Lightning brief.
  No third-party models or textures. Project asset, with the project only.
  Source and provenance: `docs/design/orbital-lightning/shipping-assets.md`.

### Bone Reaper (Wandering Scythe and Soul Harvest)

- `public/vfx/bone-reaper/{scythe,soul}.glb`: original procedural Blender art
  authored for World of ClaudeCraft from the owner's Bonelord Xarreth briefs. No
  third-party mesh, texture or reference image is used.
  Source and provenance: `docs/design/bone-reaper/README.md`.

### Ice Age (Hoarfrost's fallen icicles)

- `public/vfx/ice-age/pillars.glb`: original procedural Blender art authored for
  World of ClaudeCraft from the owner's Ice Age brief. No third-party mesh,
  texture or reference image is used.
  Source and provenance: `docs/design/ice-age/README.md`.

### Bound Pulsars (Archon Nyxaris's orbs)

- `public/vfx/pulsars/{orb,core}.glb`: original procedural Blender art authored for
  World of ClaudeCraft from the owner's orb brief. No third-party mesh, texture or
  reference image is used, and the design copies no other game's orbs.
  Source and provenance: `docs/design/pulsars/README.md`.

### Hammer of the Forge (Emberforge's falling hammer)

- `public/vfx/forge-hammer/hammer.glb`: original procedural Blender art authored
  for World of ClaudeCraft from the owner's forge hammer brief. No third-party
  mesh, texture or reference image is used.
  Source and provenance: `docs/design/forge-hammer/README.md`.

### Tentacles of the Abyss (the Abyssal Maw's tentacles)

- `public/vfx/tentacles/tentacle.glb` and `public/models/creatures/hoard_tentacle_trunk.glb`: original procedural Blender art
  authored for this project (the Abyssal Maw's tentacle: one instanced segment, its
  tip, the heaved flagstones and pool, and the attackable mob's root collar). No
  third-party mesh, texture or reference image.
  Source and provenance: `docs/design/tentacles/README.md`.

### Rolling Boulder (Warlord Grask's boulder)

- `public/vfx/boulder/boulder.glb`: original procedural Blender art authored for
  this project (the iron-banded rock, its glowing fissures and the nine pieces it
  breaks into). No third-party mesh, texture or reference image.
  Source and provenance: `docs/design/boulder/README.md`.

### Emberforge room kit (the Emberforge Tyrant's hoard room)

- `public/models/props/hoard_forge_kit.glb`: original procedural Blender art authored
  for this project (the Great Forge, an anvil, a crucible, an ingot stack, a vent, a
  forge post, a chain and hook, an iron brace). No third-party mesh, texture or
  reference image. Source and provenance: `docs/design/forge-room/README.md`.
- `public/models/weapons/hoard_forge_maul.glb`: the held variant of the project's own
  Hammer of the Forge model (`scripts/assets/hoard_bosses/held_forge_maul.mjs`).

### Buried Hoard boss room kits

- `public/models/props/hoard_abyss_kit.glb`, `hoard_frost_kit.glb`, `hoard_void_kit.glb`,
  `hoard_storm_kit.glb`, `hoard_warcamp_kit.glb`, `hoard_nest_kit.glb` and
  `hoard_crypt_kit.glb`: original procedural Blender art authored for this project (the
  room dressing of the Abyssal Maw, Hoarfrost Warden, Archon Nyxaris, Tempest Vharok,
  Warlord Grask, Broodmother Vysska and Xarreth). No third-party mesh, texture or
  reference image. Source and provenance: `docs/design/boss-rooms/README.md`.

### Cocoon (Broodmother Vysska's cocoons)

- `public/models/creatures/hoard_{silk,brood}_cocoon.glb`: original procedural Blender art authored
  for this project (the silk cocoon a wrapped player stands inside, and the brood
  cocoon spun for a lone player). No third-party mesh, texture or reference image.
  Source and provenance: `docs/design/cocoon/README.md`.

### Buried Hoard reward chest

- `public/models/props/hoard_reward_chest.glb`: original procedural Blender art
  authored for World of ClaudeCraft from the owner's reward chest brief. No
  third-party mesh, texture or reference image is used.
  Source and provenance: `docs/design/reward-chest/README.md`.

### Season 2 feral staff icon

`public/ui/items/vanguard_feral_staff.webp` is original project art generated with
OpenAI built-in image generation, using existing project item art as style references.
Project asset, with the project only. Prompt, reference hashes, processing and review:
`docs/achievements/warfare-season2-feral-staff-2026-09-29/accepted-art.json`.

### Buried Hoard entrance

- `public/models/props/hoard_entrance.glb`: original procedural model authored for
  World of ClaudeCraft from the user design brief, 2026-09-19. No third-party model
  or image reference. Source and deterministic exporter: `scripts/assets/hoard_entrance/`.
  Provenance: `docs/design/buried-hoard-entrance/asset-provenance.md`.

Weekly Vault milestone illustrations (public/ui/weekly-vault/) are project-generated art made with OpenAI's built-in image generation for World of ClaudeCraft. Matching square front-face doors with antique-gold trim and corners, plus bronze empty, silver Normal, or gold Heroic center accents; completed doors remain closed with matching light glowing through their seams. Project asset, with the project only.

## Original Whetstorm essential HUD paintings

The eight primary buttons, six quest/service markers, three currency coins and
three interaction pointers under public/ui/whetstorm/hud/ are original Whetstorm
paintings made with OpenAI built-in image generation from text only. No external
image references were used. The source masters are retained outside public, in
docs/design/whetstorm-art/hud/. The generation record, raw/master/delivery
hashes and numerical export procedure are documented in
docs/whetstorm/hud-art-generation.json and HUD_CHANGES.md. These additions do
not alter the ownership or restrictions of any historical upstream art.


## Whetstorm starter ration paintings

The `baked_bread` and `spring_water` paintings in
`public/ui/whetstorm/items/` were generated for Whetstorm using OpenAI's
built-in image generation. Original masters, prompts, the earlier bread
revision, processing and hashes are recorded in
`docs/whetstorm/starter-item-art-generation.json`.

## Whetstorm current starter equipment paintings

The nine current starter equipment images under `public/ui/whetstorm/items/`
were generated for Whetstorm using OpenAI's built-in image generation. The
original masters, prompts, processing and hashes are recorded in
`docs/whetstorm/starter-item-art-generation.json`.

## Whetstorm early quest reward paintings

The six early quest reward images under `public/ui/whetstorm/items/` were
created for Whetstorm using OpenAI's built-in image generation. Their masters,
prompts, revision history, processing and hashes are recorded in
`docs/whetstorm/early-quest-item-art-generation.json`.

## Whetstorm early drops, armor and gathering tools

Twelve individual item paintings were created for Whetstorm using OpenAI's
built-in image generation. Source images, prompts, reference lineage,
processing and hashes are recorded in `docs/whetstorm/early-drop-item-art-generation.json`,
`docs/whetstorm/armor-batch-generation.json` and
`docs/whetstorm/tool-batch-generation.json`. Their style references are the
owner-provided screenshot and earlier original Whetstorm art.

Eight further quest-material and armor paintings use original Whetstorm
paintings as style references. Their source records and processing are in
`docs/whetstorm/early-quest-material-art-generation.json` and
`docs/whetstorm/armor-batch-two-generation.json`.

Four more armor and four profession-tool paintings were created for Whetstorm
using original Whetstorm style references. Prompts, source images and hashes
are in `docs/whetstorm/armor-batch-three-generation.json` and
`docs/whetstorm/tool-batch-three-generation.json`.

Twelve additional materials, armor and profession-tool paintings use original
Whetstorm art as a style reference. Source images, prompts and hashes are in
`docs/whetstorm/early-material-four-generation.json`,
`docs/whetstorm/armor-batch-four-generation.json` and
`docs/whetstorm/tool-batch-four-generation.json`.

Twelve further quest objects, armor and tools use original Whetstorm art as
their style reference. Their prompts, masters and hashes are recorded in
`docs/whetstorm/early-material-five-generation.json`,
`docs/whetstorm/armor-batch-five-generation.json` and
`docs/whetstorm/tool-batch-five-generation.json`.

Twelve more early items, armor and weapons use original Whetstorm art as a
style reference. Their prompts, masters, revision and hashes are documented in
`docs/whetstorm/early-material-six-generation.json`,
`docs/whetstorm/armor-batch-six-generation.json` and
`docs/whetstorm/weapon-batch-six-generation.json`.

Twelve further quest objects, armor and weapons use original Whetstorm art as
a style reference. Their prompts, masters and hashes are documented in
`docs/whetstorm/early-material-seven-generation.json`,
`docs/whetstorm/armor-batch-seven-generation.json` and
`docs/whetstorm/weapon-batch-seven-generation.json`.

Twelve early ingredients, armor and weapons use original Whetstorm art as
a style reference. Their prompts, masters and hashes are documented in
`docs/whetstorm/early-material-eight-generation.json`,
`docs/whetstorm/armor-batch-eight-generation.json` and
`docs/whetstorm/weapon-batch-eight-generation.json`.

Twelve early materials, armor and weapons use original Whetstorm art as a
style reference. Their prompts, masters and hashes are documented in
`docs/whetstorm/early-material-nine-generation.json`,
`docs/whetstorm/armor-batch-nine-generation.json` and
`docs/whetstorm/weapon-batch-nine-generation.json`.

Twelve fishing items, armor and weapons use original Whetstorm art as a
style reference. Their prompts, masters and hashes are documented in
`docs/whetstorm/early-material-ten-generation.json`,
`docs/whetstorm/armor-batch-ten-generation.json` and
`docs/whetstorm/weapon-batch-ten-generation.json`.

Twelve cooked foods, armor and weapons use original Whetstorm art as a
style reference. Their prompts, masters and hashes are documented in
`docs/whetstorm/early-material-eleven-generation.json`,
`docs/whetstorm/armor-batch-eleven-generation.json` and
`docs/whetstorm/weapon-batch-eleven-generation.json`.

Twelve early potions, armor and weapons use original Whetstorm art as a
style reference. Their prompts, masters and hashes are documented in
`docs/whetstorm/early-material-twelve-generation.json`,
`docs/whetstorm/armor-batch-twelve-generation.json` and
`docs/whetstorm/weapon-batch-twelve-generation.json`.

Twelve marsh quest objects, armor and weapons use original Whetstorm art as a
style reference. Their prompts, masters and hashes are documented in
`docs/whetstorm/early-material-thirteen-generation.json`,
`docs/whetstorm/armor-batch-thirteen-generation.json` and
`docs/whetstorm/weapon-batch-thirteen-generation.json`.

Twelve marsh materials, armor and weapons use original Whetstorm art as a
style reference. Their prompts, masters and hashes are documented in
`docs/whetstorm/early-material-fourteen-generation.json`,
`docs/whetstorm/armor-batch-fourteen-generation.json` and
`docs/whetstorm/weapon-batch-fourteen-generation.json`.

Four early marsh armor paintings use original Whetstorm art as a style
reference. Their prompts, masters and hashes are in
`docs/whetstorm/armor-batch-fifteen-generation.json`.

Four early marsh weapon paintings use original Whetstorm art as a style
reference. Their prompts, masters and hashes are in
`docs/whetstorm/weapon-batch-fifteen-generation.json`.

Four early marsh quest item paintings use original Whetstorm art as a style
reference. Their prompts, masters, revision and hashes are in
`docs/whetstorm/quest-batch-sixteen-generation.json`.

Four early marsh encounter reward paintings use original Whetstorm art as a
style reference. Their prompts, masters and hashes are in
`docs/whetstorm/marsh-batch-seventeen-generation.json`.

Four marsh quest armor paintings use original Whetstorm art as a style
reference. Their prompts, masters and hashes are in
`docs/whetstorm/armor-batch-seventeen-generation.json`.

Four early gathering, equipment and elixir paintings use original Whetstorm
art as a style reference. Their prompts, masters and hashes are in
`docs/whetstorm/marsh-batch-eighteen-generation.json`.

Eight early marsh armor and weapon paintings use original Whetstorm art as a
style reference. Their prompts, masters and hashes are in
`docs/whetstorm/armor-batch-nineteen-generation.json` and
`docs/whetstorm/weapon-batch-nineteen-generation.json`.

Eight armor and weapon paintings use original Whetstorm art as a style
reference. Their prompts, masters and hashes are in
`docs/whetstorm/armor-batch-twenty-generation.json` and
`docs/whetstorm/weapon-batch-twenty-generation.json`.

Eight dungeon armor and weapon paintings use original Whetstorm art as a
style reference. Their prompts, masters and hashes are in
`docs/whetstorm/armor-batch-twentyone-generation.json` and
`docs/whetstorm/weapon-batch-twentyone-generation.json`.

Four armor paintings use original Whetstorm art as a style reference. Their
prompts, masters and hashes are in
`docs/whetstorm/armor-batch-twentytwo-generation.json`.

Sixteen weapon, consumable, material and jewelry paintings use original
Whetstorm art as a style reference. Their prompts, masters and hashes are in
`docs/whetstorm/weapon-batch-twentythree-generation.json`,
`docs/whetstorm/consumable-batch-generation.json`,
`docs/whetstorm/early-material-fifteen-generation.json`, and
`docs/whetstorm/jewelry-batch-generation.json`.

Twenty-four weapon, cloth, leather, food, material and quest paintings are
recorded in `docs/whetstorm/weapon-batch-twentyfour-generation.json`,
`docs/whetstorm/cloth-batch-one-generation.json`,
`docs/whetstorm/leather-batch-original-generation.json`,
`docs/whetstorm/food-original-batch-generation.json`,
`docs/whetstorm/material-orewood-batch-generation.json`, and
`docs/whetstorm/quest-batch-highwatch-generation.json`.

Twenty-four mail, cloth, food, jewelry, material and quest paintings are
recorded in `docs/whetstorm/plate-roadward-batch-generation.json`,
`docs/whetstorm/cloth-batch-two-generation.json`,
`docs/whetstorm/food-early-second-generation.json`,
`docs/whetstorm/jewelry-batch-two-generation.json`,
`docs/whetstorm/material-herb-hide-batch-generation.json`, and
`docs/whetstorm/quest-batch-waterways-generation.json`.

Twenty-four mail, leather, food, jewelry, plant and quest paintings are
recorded in `docs/whetstorm/sanctum-mail-item-art-generation.json`,
`docs/whetstorm/leather-batch-crafted-generation.json`,
`docs/whetstorm/food-conjured-later-generation.json`,
`docs/whetstorm/jewelry-batch-next-generation.json`,
`docs/whetstorm/herb-plant-next-generation.json`, and
`docs/whetstorm/quest-highwatch-second-generation.json`.

Twenty-four mail, cloth, food, jewelry, reagent and quest paintings are
recorded in `docs/whetstorm/mail-reliquary-generation.json`,
`docs/whetstorm/cloth-batch-three-generation.json`,
`docs/whetstorm/food-cooking-later-generation.json`,
`docs/whetstorm/jewelry-faction-craft-generation.json`,
`docs/whetstorm/craft-reagent-original-batch-generation.json`, and
`docs/whetstorm/quest-batch-thornpeak-generation.json`.

Twenty-four mail, leather, food, faction jewelry, farming and quest paintings
are recorded in `docs/whetstorm/mail-highwatch-generation.json`,
`docs/whetstorm/leather-thornpeak-generation.json`,
`docs/whetstorm/food-zone-two-generation.json`,
`docs/whetstorm/jewelry-champions-generation.json`,
`docs/whetstorm/farm-materials-original-generation.json`, and
`docs/whetstorm/quest-shore-original-generation.json`.

Twenty-four mail, cloth, food, jewelry, material and quest paintings are
recorded in `docs/whetstorm/mail-boneward-generation.json`,
`docs/whetstorm/cloth-batch-four-generation.json`,
`docs/whetstorm/food-highwatch-supplies-generation.json`,
`docs/whetstorm/jewelry-batch-later-tier-generation.json`,
`docs/whetstorm/material-chime-cloth-generation.json`, and
`docs/whetstorm/quest-batch-clues-crypt-generation.json`.

Twenty-four mail, leather, food, jewelry, material and quest paintings are
recorded in `docs/whetstorm/mail-next-generation.json`,
`docs/whetstorm/leather-delve-next-generation.json`,
`docs/whetstorm/food-fen-highwatch-generation.json`,
`docs/whetstorm/jewelry-forge-generation.json`,
`docs/whetstorm/material-highpine-next-generation.json`, and
`docs/whetstorm/quest-batch-realm-drops-generation.json`.

Twenty-four mail, cloth, food, jewelry, harvest and quest paintings are
recorded in `docs/whetstorm/mail-delve-original-generation.json`,
`docs/whetstorm/cloth-batch-five-generation.json`,
`docs/whetstorm/food-highwatch-apex-generation.json`,
`docs/whetstorm/jewelry-batch-warfare-generation.json`,
`docs/whetstorm/material-harvest-next-generation.json`, and
`docs/whetstorm/quest-batch-relics-generation.json`.

Twenty original item paintings and four prepared Deeds paintings are recorded
in `docs/whetstorm/mail-osmium-generation.json`,
`docs/whetstorm/leather-peak-next-generation.json`,
`docs/whetstorm/food-later-fish-harvest-generation.json`,
`docs/whetstorm/material-component-batch-generation.json`,
`docs/whetstorm/quest-batch-treasure-maps-generation.json`, and
`docs/whetstorm/deed-batch-early-generation.json`.

Fifteen original mail, leather, food, farming and quest paintings are recorded
in `docs/whetstorm/mail-batch-grave-generation.json`,
`docs/whetstorm/leather-wyrm-original-generation.json`,
`docs/whetstorm/food-evergarden-greens-generation.json`,
`docs/whetstorm/material-advance-generation.json`, and
`docs/whetstorm/quest-batch-signet-brand-generation.json`.

Twenty original bag, fish, cloth, leather, material and alchemy paintings are
recorded in `docs/whetstorm/bags-fish-batch-generation.json`,
`docs/whetstorm/cloth-batch-six-generation.json`,
`docs/whetstorm/leather-litany-original-generation.json`,
`docs/whetstorm/material-provisioning-generation.json`, and
`docs/whetstorm/potion-alchemy-next-generation.json`.

Eighteen original alchemy, farming, heroic jewelry, mail and cloth paintings
and one well-fed aura painting are recorded in
`docs/whetstorm/alchemy-bottles-generation.json`,
`docs/whetstorm/farm-highland-material-generation.json`,
`docs/whetstorm/jewelry-heroic-quartermaster-generation.json`,
`docs/whetstorm/mail-dungeon-original-generation.json`,
`docs/whetstorm/armor-batch-shadowpulse-generation.json`, and
`docs/whetstorm/well-fed-aura-generation.json`.

Fifteen original mail, leather, alchemy and material paintings plus four mob
aura paintings are recorded in `docs/whetstorm/mail-thornpeak-generation.json`,
`docs/whetstorm/leather-thornpeak-third-generation.json`,
`docs/whetstorm/potion-later-generation.json`,
`docs/whetstorm/resonant-material-generation.json`, and
`docs/whetstorm/mob-aura-original-batch-generation.json`. The four mob aura
paintings deliberately cover nine exact effect identities as listed there.

Sixteen original cloth, farming, jewelry and mail paintings and eight mob aura
paintings are recorded in `docs/whetstorm/cloth-delve-amberfall-generation.json`,
`docs/whetstorm/farming-thornpeak-generation.json`,
`docs/whetstorm/jewelry-batch-apex-generation.json`,
`docs/whetstorm/mail-wildheart-apex-generation.json`,
`docs/whetstorm/mob-aura-status-generation.json`, and
`docs/whetstorm/mob-aura-debuffs-generation.json`. Each aura family deliberately
shares its painting across its listed exact runtime identities.

Four original cloth paintings and twelve mob aura paintings are recorded in
`docs/whetstorm/cloth-batch-brood-generation.json`,
`docs/whetstorm/mob-aura-control-generation.json`,
`docs/whetstorm/mob-aura-curses-generation.json`, and
`docs/whetstorm/mob-aura-drains-generation.json`. Related mob effects share
paintings only for the exact runtime identities listed in the records.

Four combat aura paintings are recorded in
`docs/whetstorm/mob-aura-combat-generation.json`. Their exact mob-effect
identities deliberately share artwork within the recorded families.

The original Fenbloom Breeches item painting is recorded in
`docs/whetstorm/fenbloom-breeches-generation.json`.

The original Barksong Handguards item painting is recorded in
`docs/whetstorm/barksong-handguards-generation.json`.

Three original vendor chest armor paintings are recorded in
`docs/whetstorm/vendor-chest-generation.json`.

Three original regional cloth reward paintings are recorded in
`docs/whetstorm/regional-cloth-rewards-generation.json`.

Three original regional footwear paintings are recorded in
`docs/whetstorm/regional-footwear-generation.json`.

Three original regional glove paintings are recorded in
`docs/whetstorm/regional-gloves-generation.json`.

Three original early progression deed paintings are recorded in
`docs/whetstorm/deed-progression-generation.json`.

Three original talent progression deed paintings are recorded in
`docs/whetstorm/deed-talents-generation.json`.

Ten original faction armor, crafting material and quest weapon paintings,
six deed crests and four mob aura paintings are recorded in
`docs/whetstorm/faction-armor-original-generation.json`,
`docs/whetstorm/thornpeak-trophy-material-generation.json`,
`docs/whetstorm/temple-quest-weapons-generation.json`,
`docs/whetstorm/deed-exploration-generation.json`,
`docs/whetstorm/deed-combat-generation.json`, and
`docs/whetstorm/mob-aura-impairments-generation.json`.

Ten original cloth, crafting component and quest weapon paintings, four deed
crests and four mob aura paintings are recorded in
`docs/whetstorm/church-cloth-original-generation.json`,
`docs/whetstorm/profession-intermediate-generation.json`,
`docs/whetstorm/realm-quest-weapons-generation.json`,
`docs/whetstorm/deed-chronicle-gathering-generation.json`, and
`docs/whetstorm/mob-aura-magic-generation.json`.

Ten original heroic leather, crafting component and quest weapon paintings,
four journey deed crests and four mob aura paintings are recorded in
`docs/whetstorm/heroic-leather-original-generation.json`,
`docs/whetstorm/profession-intermediate-second-generation.json`,
`docs/whetstorm/drogmar-quest-weapons-generation.json`,
`docs/whetstorm/deed-journey-generation.json`, and
`docs/whetstorm/mob-aura-afflictions-generation.json`.

Eight original heroic mail, farm crop and quest weapon paintings, four place
deed crests and four mob aura paintings are recorded in
`docs/whetstorm/heroic-mail-original-generation.json`,
`docs/whetstorm/farm-produce-original-generation.json`,
`docs/whetstorm/velkhar-quest-weapon-generation.json`,
`docs/whetstorm/deed-place-generation.json`, and
`docs/whetstorm/mob-aura-defense-generation.json`.

Ten original heroic leather, farm resource and jewelry paintings, four
discovery deed crests and four encounter aura paintings are recorded in
`docs/whetstorm/vael-leather-original-generation.json`,
`docs/whetstorm/farm-produce-fine-generation.json`,
`docs/whetstorm/hoard-jewelry-generation.json`,
`docs/whetstorm/deed-peaks-discovery-generation.json`, and
`docs/whetstorm/mob-aura-encounter-generation.json`.

Four original exploration activity deed paintings are recorded in
`docs/whetstorm/deed-activity-generation.json`.

Original Dawnweave armor, hoard jewelry, quest ore, and battleground deed
paintings were created for Whetstorm using OpenAI's built-in image generation.
Their prompts and hashes are recorded in
`docs/whetstorm/dawnweave-armor-generation.json`,
`docs/whetstorm/hoard-jewelry-second-generation.json`,
`docs/whetstorm/quest-ore-generation.json`, and
`docs/whetstorm/deed-battleground-generation.json`.

The original procedural Fightpit decals and their generator are documented in
`docs/whetstorm/fightpit-decals-provenance.md`.

Three original Warrior signature ability paintings were created for Whetstorm
using OpenAI's built-in image generation; their prompts and hashes are recorded
in `public/ui/whetstorm/abilities/warrior-signatures-provenance.json`.

Original Mage, Priest, and Ranger ability paintings, rare gathering deed
paintings, and Varkhul aura paintings were created for Whetstorm using OpenAI's
built-in image generation. Prompts and hashes are recorded in
`public/ui/whetstorm/abilities/mage-signatures-provenance.json`,
`public/ui/whetstorm/abilities/priest-signatures-provenance.json`,
`public/ui/whetstorm/abilities/ranger-signatures-provenance.json`,
`docs/whetstorm/deed-rare-gathering-generation.json`, and
`docs/whetstorm/varkhul-aura-generation.json`.

Four additional Mage utility paintings and four Hunter core-shot paintings
were generated from text prompts using OpenAI's built-in image generation.
Their prompts and hashes are recorded in
`public/ui/whetstorm/abilities/mage-utilities-provenance.json` and
`docs/design/whetstorm-art/skills/hunter-core/provenance.md`.

Four Priest core ability paintings were generated with OpenAI's built-in
image generation; prompts and hashes are recorded in
`public/ui/whetstorm/abilities/priest-core-provenance.json`.

Four Warrior utility paintings were generated with OpenAI's built-in image
generation; prompts and hashes are recorded in
`public/ui/whetstorm/abilities/warrior-utilities-provenance.json`.

Three flask aura paintings were generated with OpenAI's built-in image
generation; prompts and hashes are recorded in
`docs/design/whetstorm-art/auras/flask/provenance.json`.

Four Paladin utility and four Shaman core ability paintings were generated
with OpenAI's built-in image generation. Their prompts and hashes are recorded
in `docs/design/whetstorm-art/skills/paladin-utility/provenance.md` and
`public/ui/whetstorm/abilities/shaman-core-provenance.json`.

Four Rogue utility paintings were generated with OpenAI's built-in image
generation; prompts and hashes are recorded in
`public/ui/whetstorm/abilities/rogue-utilities-provenance.json`.

Four powerup aura paintings were generated with OpenAI's built-in image
generation; prompts and hashes are recorded in
`docs/design/whetstorm-art/auras/powerups/provenance.json`.

Four Druid nature and four Warlock utility paintings were generated with
OpenAI's built-in image generation. Prompts and hashes are recorded in
`docs/design/whetstorm-art/skills/druid-nature/provenance.md` and
`public/ui/whetstorm/abilities/warlock-utility-provenance.json`.

Four faction-standing and four activity deed paintings were generated with
OpenAI's built-in image generation. Prompts and hashes are recorded in
`docs/whetstorm/deed-faction-standing-generation.json` and
`docs/whetstorm/deed-activity-finish-generation.json`.

Five rare-crafting deed paintings were generated with OpenAI's built-in
image generation; prompts and hashes are recorded in
`docs/design/whetstorm-art/deeds/rare-craft/provenance.json`.

Three faction Champion deed paintings were generated with OpenAI's built-in
image generation; prompts and hashes are recorded in
`docs/whetstorm/deed-faction-champion-generation.json`.

Four Grandmaster crafting deed paintings were generated with OpenAI's built-in
image generation; prompts and hashes are recorded in
`docs/design/whetstorm-art/deeds/grandmaster-craft/provenance.json`.

Four combat chronicle deed paintings were generated with OpenAI's built-in
image generation; prompts and hashes are recorded in
`docs/whetstorm/deed-combat-chronicles-generation.json`.

Four heroic trinket paintings were generated with OpenAI's built-in image
generation; prompts and hashes are recorded in
`docs/whetstorm/heroic-trinket-generation.json`.

Four pet-command and four additional Grandmaster crafting paintings were
generated with OpenAI's built-in image generation. Prompts and hashes are in
`docs/design/whetstorm-art/skills/pet-commands/provenance.json` and
`docs/design/whetstorm-art/deeds/grandmaster-craft-second/provenance.md`.

Three pet feed and stance paintings and two Grandmaster smithing paintings
were generated with OpenAI's built-in image generation. Prompts and hashes
are in `docs/design/whetstorm-art/skills/pet-stances/provenance.json` and
`docs/design/whetstorm-art/deeds/grandmaster-smithing/provenance.md`.

Four additional heroic trinket and four Farshore/Frostveil deed paintings
were generated with OpenAI's built-in image generation. Prompts and hashes
are recorded in `docs/whetstorm/heroic-trinket-second-generation.json` and
`docs/whetstorm/deed-farshore-frostveil-generation.json`.

Four Crucible trinket paintings were generated with OpenAI's built-in image
generation; prompts and hashes are recorded in
`docs/whetstorm/crucible-trinket-generation.json`.

Four Palmreach and fishing milestone paintings were generated with OpenAI's
built-in image generation; prompts and hashes are recorded in
`docs/design/whetstorm-art/deeds/palmreach-fishing/provenance.md`.

Three pet special-command paintings were generated with OpenAI's built-in
image generation; prompts and hashes are recorded in
`docs/design/whetstorm-art/skills/pet-specials/provenance.json`.

Four journey deed paintings were generated with OpenAI's built-in image
generation; prompts and hashes are recorded in
`docs/whetstorm/deed-journey-four-generation.json`.

Four utility trinket paintings were generated with OpenAI's built-in image
generation; prompts and hashes are recorded in
`docs/whetstorm/utility-trinket-generation.json`.

Two additional trinket paintings and three farming milestone paintings were
generated with OpenAI's built-in image generation. Prompts and hashes are
recorded in `docs/whetstorm/final-trinket-generation.json` and
`docs/design/whetstorm-art/deeds/farming-milestones/provenance.md`.

Four Crucible helm and shoulder sigil paintings were generated with OpenAI's
built-in image generation; prompts and hashes are recorded in
`docs/whetstorm/crucible-sigil-helm-shoulder-generation.json`.

Five Crucible encounter deed paintings were generated with OpenAI's built-in
image generation; prompts and hashes are recorded in
`docs/whetstorm/deed-crucible-five-generation.json`.

Three apex feast recipe paintings were generated with OpenAI's built-in
image generation; prompts and hashes are recorded in
`docs/design/whetstorm-art/items/apex-feast-recipes/provenance.md`.

Four Reliquary curator-rank deed paintings were generated with OpenAI's
built-in image generation; prompts and hashes are recorded in
`docs/design/whetstorm-art/deeds/curator-ranks/provenance.json`.

Four more Crucible sigils, four PvP deeds, four collection deeds, and three
Rift gems were generated with OpenAI's built-in image generation. Prompts and
hashes are recorded in `docs/whetstorm/crucible-sigil-chest-gloves-generation.json`,
`docs/whetstorm/deed-pvp-honor-cards-generation.json`,
`docs/design/whetstorm-art/deeds/collection-milestones/provenance.md`, and
`docs/design/whetstorm-art/items/rift-gems/provenance.json`.

The Reliquary Conquerors deed painting was generated with OpenAI's built-in
image generation; its prompt and hashes are recorded in
`docs/design/whetstorm-art/deeds/collection-milestones/conquerors-provenance.md`.

Two Crucible leg sigils and three epic Hoarfrost armor paintings were generated
with OpenAI's built-in image generation. Prompts and hashes are recorded in
`docs/whetstorm/crucible-sigil-legs-generation.json` and
`docs/design/whetstorm-art/items/hoarfrost-epic/provenance.json`.

Five World PvP time deed paintings were generated with OpenAI's built-in
image generation; prompts and hashes are recorded in
`docs/whetstorm/deed-pvp-flag-time-generation.json`.

Three Tarnished Hoarfrost armor paintings and three Nythraxis apex pattern
paintings were generated with OpenAI's built-in image generation. Prompts and
hashes are recorded in `docs/design/whetstorm-art/items/hoarfrost-rare/provenance.json`
and `docs/design/whetstorm-art/items/nythraxis-apex-patterns/provenance.md`.

Four Crucible mail pattern paintings and four social deed paintings were
generated with OpenAI's built-in image generation. Prompts and hashes are
recorded in `docs/whetstorm/crucible-mail-pattern-generation.json` and
`docs/whetstorm/deed-social-hidden-four-generation.json`.

Three Nythraxis jewel recipe paintings and three Sovereign Hoarfrost armor
paintings were generated with OpenAI's built-in image generation. Prompts and
hashes are recorded in `docs/design/whetstorm-art/items/nythraxis-jewel-patterns/provenance.md`
and `docs/design/whetstorm-art/items/hoarfrost-sovereign/provenance.json`.

Four Crucible leather pattern paintings were generated with OpenAI's built-in
image generation; prompts and hashes are recorded in
`docs/whetstorm/crucible-leather-pattern-generation.json`.

Two era and collection deed paintings were generated with OpenAI's built-in
image generation; prompts and hashes are recorded in
`docs/whetstorm/deed-era-bramble-generation.json`.

Three epic Grask armor paintings were generated with OpenAI's built-in image
generation; prompts and hashes are recorded in
`docs/design/whetstorm-art/items/grask-epic/provenance.json`.

Four abstract hidden-deed paintings were generated with OpenAI's built-in
image generation; prompts and hashes are recorded in
`docs/whetstorm/deed-hidden-abstract-four-generation.json`.

Four additional abstract hidden-deed paintings were generated with OpenAI's
built-in image generation; prompts and hashes are recorded in
`docs/whetstorm/deed-hidden-abstract-next-generation.json`.

Three Tarnished Grask armor paintings were generated with OpenAI's built-in
image generation; prompts and hashes are recorded in
`docs/design/whetstorm-art/items/grask-tarnished/provenance.json`.

Three Sovereign Grask armor paintings were generated with OpenAI's built-in
image generation; prompts and hashes are recorded in
`docs/design/whetstorm-art/items/grask-sovereign/provenance.json`.

Three Emberscreed armor paintings were generated with OpenAI's built-in image
generation; prompts and hashes are recorded in
`docs/design/whetstorm-art/items/emberscreed/provenance.md`.

Four epic armor, five Springmender armor, and three progression reward
paintings were generated with OpenAI's built-in image generation. Prompts and
hashes are recorded in `docs/design/whetstorm-art/items/vysska-epic/provenance.json`,
`docs/design/whetstorm-art/items/springmender/provenance.md`, and
`docs/whetstorm/progression-rewards-generation.json`.

Four Tarnished armor paintings were generated with OpenAI's built-in image
generation; prompts and hashes are recorded in
`docs/design/whetstorm-art/items/vysska-tarnished/provenance.json`.

Four Sovereign armor paintings were generated with OpenAI's built-in image
generation; prompts and hashes are recorded in
`docs/design/whetstorm-art/items/vysska-sovereign/provenance.json`.

Three epic Tempest armor paintings, two raid-set leg paintings and a daily
reward chest were generated with OpenAI's built-in image generation. Prompts
and hashes are recorded in `docs/design/whetstorm-art/items/tempest-epic/provenance.json`,
`docs/design/whetstorm-art/items/dawnweave-legs/provenance.md`,
`docs/design/whetstorm-art/items/emberscreed-legs/provenance.md`, and
`docs/whetstorm/daily-reward-chest-generation.json`.

Three Tarnished Tempest armor paintings were generated with OpenAI's built-in
image generation; prompts and hashes are recorded in
`docs/design/whetstorm-art/items/tempest-tarnished/provenance.json`.

Three Sovereign Tempest armor paintings were generated with OpenAI's built-in
image generation; prompts and hashes are recorded in
`docs/design/whetstorm-art/items/tempest-sovereign/provenance.json`.

Two Storm-Tuned Buckler variants and three Crucible caster leather items were
generated with OpenAI's built-in image generation. Prompts and hashes are in
`docs/design/whetstorm-art/items/storm-buckler-tiers/provenance.json` and
`docs/design/whetstorm-art/items/crucible-caster-leather-equipment/equipment-provenance.md`.

Three Furyforged and three Crucible Striker's Mail paintings were generated
with OpenAI's built-in image generation. Prompts and hashes are recorded in
`docs/design/whetstorm-art/items/furyforged-s1-original/provenance.json` and
`docs/whetstorm/crucible-striker-mail-original-generation.json`.

Three epic bone armor paintings were generated with OpenAI's built-in image
generation; prompts and hashes are recorded in
`docs/design/whetstorm-art/items/bone-legion-epic/provenance.json`.

Four additional Furyforged armor paintings were generated with OpenAI's
built-in image generation; prompts and hashes are recorded in
`docs/design/whetstorm-art/items/furyforged-s1-second-original/furyforged-second-provenance.json`.

Three Guardian Mail and three healer leather paintings were generated with
OpenAI's built-in image generation. Prompts and hashes are recorded in
`docs/whetstorm/crucible-guardian-mail-original-generation.json` and
`docs/design/whetstorm-art/items/crucible-healer-leather-equipment/equipment-provenance.md`.

Three Spellcaster Mail, three caster cloth and three Stormbound armor paintings
were generated with OpenAI's built-in image generation. Prompts and hashes are
recorded in `docs/whetstorm/crucible-spellcaster-mail-original-generation.json`,
`docs/design/whetstorm-art/items/crucible-caster-cloth-equipment/equipment-provenance.md`,
and `docs/design/whetstorm-art/items/stormbound-s1-original/stormbound-provenance.json`.

Four additional Stormbound, three Healer Mail and three Guardian leather
paintings were generated with OpenAI's built-in image generation. Prompts and
hashes are recorded in `docs/design/whetstorm-art/items/stormbound-s1-second-original/stormbound-second-provenance.json`,
`docs/whetstorm/crucible-healer-mail-original-generation.json`, and
`docs/design/whetstorm-art/items/crucible-guardian-leather-equipment/equipment-provenance.md`.

Three Skirmisher, three Prowler, and three Ashstalker item paintings were
generated with OpenAI's built-in image generation. Prompts and hashes are in
`docs/design/whetstorm-art/items/crucible-skirmisher-leather-equipment/equipment-provenance.md`,
`docs/whetstorm/crucible-prowler-leather-original-generation.json`, and
`docs/design/whetstorm-art/items/ashstalker-s1-original/ashstalker-provenance.json`.

Four additional Ashstalker armor paintings were generated with OpenAI's built-in
image generation; prompts and hashes are recorded in
`docs/design/whetstorm-art/items/ashstalker-s1-second-original/ashstalker-second-provenance.json`.

The Cinder of the First Design painting was generated with OpenAI's built-in
image generation; its prompt and hashes are recorded in
`docs/whetstorm/cinder-first-design-original-generation.json`.

Four Void and Tides hoard offhand tier paintings were generated with OpenAI's
built-in image generation; prompts and hashes are recorded in
`docs/design/whetstorm-art/items/void-tides-hoard-tiers/tier-provenance.md`.

Three Tarnished Emberforge armor paintings were generated with OpenAI's built-in
image generation; prompts and hashes are recorded in
`docs/design/whetstorm-art/items/emberforge-tarnished/provenance.json`.

Seven Cinderweave armor paintings and two Glacier-Hewn shield paintings were
generated with OpenAI's built-in image generation; prompts and hashes are in
`docs/design/whetstorm-art/items/cinderweave-upper-equipment/upper-provenance.md`,
`docs/whetstorm/cinderweave-accessories-original-generation.json`, and
`docs/design/whetstorm-art/items/glacier-bulwark-tiers/provenance.json`.

Seven Thornhide armor paintings and three Vesperash armor paintings were
generated with OpenAI's built-in image generation; prompts and hashes are in
`docs/design/whetstorm-art/items/thornhide-upper-equipment/upper-provenance.md`,
`docs/design/whetstorm-art/items/thornhide-lower-original/thornhide-lower-provenance.json`, and
`docs/whetstorm/vesperash-upper-original-generation.json`.

Two further Vesperash armor paintings were generated with OpenAI's built-in
image generation; prompts and hashes are recorded in
`docs/whetstorm/vesperash-lower-original-generation.json`.

Three Coral-Encrusted Girdle tier paintings were generated with OpenAI's built-in
image generation; prompts and hashes are recorded in
`docs/design/whetstorm-art/items/tide-coral-girdle-tiers/provenance.json`.

Three Gracewing armor paintings were generated with OpenAI's built-in image
generation; prompts and hashes are recorded in
`docs/design/whetstorm-art/items/gracewing-upper-equipment/upper-provenance.md`.

Two additional Gracewing armor paintings were generated with OpenAI's built-in
image generation; prompts and hashes are recorded in
`docs/design/whetstorm-art/items/gracewing-lower-equipment/lower-provenance.md`.

Three Riptide Handwraps tier paintings were generated with OpenAI's built-in
image generation; prompts and hashes are recorded in
`docs/design/whetstorm-art/items/riptide-handwraps-original/riptide-handwraps-provenance.json`.

Three Stormkindled armor paintings were generated with OpenAI's built-in image
generation; prompts and hashes are recorded in
`docs/whetstorm/stormkindled-upper-original-generation.json`.

Two additional Stormkindled armor paintings were generated with OpenAI's built-in
image generation; prompts and hashes are recorded in
`docs/whetstorm/stormkindled-lower-original-generation.json`.

Three Event Horizon cowl tier paintings were generated with OpenAI's built-in
image generation; prompts and hashes are recorded in
`docs/design/whetstorm-art/items/event-horizon-cowl-tiers/provenance.json`.

Three Singularity mantle tier paintings were generated with OpenAI's built-in
image generation; prompts and hashes are recorded in
`docs/design/whetstorm-art/items/singularity-mantle-tiers/tier-provenance.md`.

Two Ignivar cinder cloth paintings were generated with OpenAI's built-in image
generation; prompts and hashes are recorded in
`docs/whetstorm/ignivar-cinder-cloth-generation.json`.

Two Ignivar spring cloth paintings were generated with OpenAI's built-in image
generation; prompts and hashes are recorded in
`docs/whetstorm/ignivar-spring-cloth-generation.json`.

Three Stonehearth armor paintings were generated with OpenAI's built-in image
generation; prompts and hashes are recorded in
`docs/whetstorm/stonehearth-upper-original-generation.json`.

Three Sovereign Emberforge armor paintings were generated with OpenAI's built-in
image generation; prompts and hashes are recorded in
`docs/design/whetstorm-art/items/sovereign-emberforge-original/sovereign-emberforge-provenance.json`.

Three Rimewarden armor paintings were generated with OpenAI's built-in image
generation; prompts and hashes are recorded in
`docs/design/whetstorm-art/items/rimewarden-upper-equipment/upper-provenance.md`.

Three epic Ember armor paintings were generated with OpenAI's built-in image
generation; prompts and hashes are recorded in
`docs/design/whetstorm-art/items/emberforge-epic/provenance.json`.

Three Tarnished bone armor paintings were generated with OpenAI's built-in
image generation; prompts and hashes are recorded in
`docs/design/whetstorm-art/items/bone-legion-tarnished/provenance.json`.

Three Sovereign bone armor paintings were generated with OpenAI's built-in
image generation; prompts and hashes are recorded in
`docs/design/whetstorm-art/items/bone-legion-sovereign/provenance.json`.

Three Crucible healer cloth item paintings were generated with OpenAI's built-in
image generation; prompts and hashes are recorded separately from the manuals in
`docs/design/whetstorm-art/items/crucible-healer-cloth/armor-provenance.md`.

Three Crucible healer and cloth pattern paintings were generated with OpenAI's
built-in image generation; prompts and hashes are recorded in
`docs/design/whetstorm-art/items/crucible-healer-cloth/provenance.md`.

Four Wildheart and rare-hunt deed paintings were generated with OpenAI's
built-in image generation; prompts and hashes are recorded in
`docs/whetstorm/deed-wildheart-rares-generation.json`.

Original Shaman, Rogue, and Paladin ability paintings, Willowfen and Galecrest
deed paintings, encounter aura paintings, and Ley and Confection puzzle art
were created for Whetstorm using OpenAI's built-in image generation. Prompts
and hashes are recorded in
`public/ui/whetstorm/abilities/shaman-signatures-provenance.json`,
`public/ui/whetstorm/abilities/rogue-signatures-provenance.json`,
`public/ui/whetstorm/abilities/paladin-signatures-provenance.json`,
`docs/whetstorm/deed-willowfen-galecrest-generation.json`,
`docs/whetstorm/aura-encounter-oct30-generation.json`,
`docs/whetstorm/ley-puzzle-art-generation.md`, and
`public/ui/whetstorm/minigames/confection-seals-provenance.json`.

The Confection Cascade clasp, jewel crest, and hinge were created for
Whetstorm using OpenAI's built-in image generation. The walnut texture and
frame are independently authored procedural and SVG artwork. Their sources
and hashes are recorded in the corresponding `confection-*-provenance.json`
files under `public/ui/whetstorm/minigames/`.

Original Rift and harvest deed paintings were created for Whetstorm using
OpenAI's built-in image generation; prompts and hashes are recorded in
`docs/whetstorm/deed-rift-harvest-generation.json`.

The weekly quest scenes, medals, and emissary portrait were created for
Whetstorm using OpenAI's built-in image generation. Prompts and hashes are in
`docs/whetstorm/weekly-scenes-generation.json` and
`docs/whetstorm/weekly-medals-emissary-art.json`.

Original Dungeon Finder encounter portraits and social, commerce, and rare
smithing deed paintings were created for Whetstorm using OpenAI's built-in
image generation. Prompts and hashes are recorded in
`docs/whetstorm/ignivar-finder-art-generation.json`,
`public/ui/whetstorm/encounters/finder-early-provenance.json`,
`docs/whetstorm/deed-social-commerce-generation.json`, and
`docs/whetstorm/deed-rare-smithing-generation.json`.

The additional Dungeon Finder encounter paintings were created for Whetstorm
using OpenAI's built-in image generation. Prompts and hashes are in the
`finder-miniboss-provenance.json`, `finder-gravewyrm-provenance.json`,
`finder-thornpeak-provenance.json`, `finder-wildheart-provenance.json`, and
`finder-raid-wildheart-provenance.json` records under
`public/ui/whetstorm/encounters/`.

Original Vale, Mirefen, and Thornpeak creature portraits and a Nythraxis
portrait were created for Whetstorm using OpenAI's built-in image generation.
Prompts and hashes are in `public/ui/whetstorm/mobs/vale-early-provenance.json`,
`public/ui/whetstorm/mobs/mirefen-overworld-provenance.json`,
`public/ui/whetstorm/mobs/thornpeak-overworld-provenance.json`, and
`docs/whetstorm/nythraxis-mob-portrait-generation.json`.

Additional Vale, Mirefen, Thornpeak, dungeon, raid, and hoard target portraits
were created for Whetstorm using OpenAI's built-in image generation. Prompts
and hashes are recorded in `public/ui/whetstorm/mobs/vale-camp-provenance.json`,
`public/ui/whetstorm/mobs/mirefen-bosses-provenance.json`,
`public/ui/whetstorm/mobs/thornpeak-overworld-second-provenance.json`,
`public/ui/whetstorm/mobs/early-dungeons-provenance.json`, and
`docs/whetstorm/raid-hoard-target-portraits-generation.json`. The corrected
Ridge Stalker painting is recorded in `thornpeak-overworld-provenance.json`.

The Wildheart, Drakelands, Evergarden, Drowned Temple, and Nythraxis-add
portraits were created for Whetstorm using OpenAI's built-in image generation.
Their prompts and hashes are recorded in the corresponding
`wildheart-targets-provenance.json`, `drakelands-brood-provenance.json`,
`evergarden-overworld-provenance.json`, `drowned-temple-provenance.json`, and
`nythraxis-adds-provenance.json` files under `public/ui/whetstorm/mobs/`.
The corrected Crypt Shambler painting is recorded in
`public/ui/whetstorm/mobs/early-dungeons-provenance.json`.

Additional Hollow Crypt, Bastion, Drakelands, Sanctum, Evergarden, Amberfall,
raid, and hoard portraits were created for Whetstorm using OpenAI's built-in
image generation. Prompts and hashes are recorded in
`docs/whetstorm/hollow-bastion-target-portraits-generation.json`,
`docs/whetstorm/cave-hoard-boss-portraits-generation.json`, and the
`drakelands-overworld-provenance.json`, `raid-sanctum-targets-provenance.json`,
and `evergarden-amberfall-additional-provenance.json` files in
`public/ui/whetstorm/mobs/`. The corrected topiary portraits are recorded in
`public/ui/whetstorm/mobs/evergarden-overworld-provenance.json`.

Additional Amberfall, Farshore, Rift, hoard, and Gravewyrm portraits were
created for Whetstorm using OpenAI's built-in image generation. Prompts and
hashes are recorded in `docs/whetstorm/infernal-citadel-portraits-generation.json`
and the `amberfall-remaining-provenance.json`, `farshore-overworld-provenance.json`,
`hoard-actors-provenance.json`, and `gravewyrm-bonewalker-provenance.json`
files in `public/ui/whetstorm/mobs/`. The corrected Sanctum Scaleguard
painting is recorded in `raid-sanctum-targets-provenance.json` there.

Original Nightbloom, Wraithwood, Collapsed Reliquary, Thornpeak, hoard, and
Varkas Boneguard portraits were created for Whetstorm using OpenAI's built-in
image generation. Prompts and hashes are recorded under
`public/ui/whetstorm/mobs/` in `nightbloom-wraithwood-provenance.json`,
`collapsed-reliquary-provenance.json`, `thornpeak-overworld-rares-provenance.json`,
`hoard-trash-provenance.json`, and `varkas-boneguard-provenance.json`.

Original Rift, cave-hoard, Drowned Litany, companion, and Mirefen portraits
were created for Whetstorm using OpenAI's built-in image generation. Prompts
and hashes are recorded in `docs/whetstorm/cave-hoard-adds-portraits-generation.json`
and the `rift-ember-bone-provenance.json`, `drowned-litany-first-provenance.json`,
`player-companions-provenance.json`, and `mirefen-gravecallers-bog-provenance.json`
files under `public/ui/whetstorm/mobs/`.

Original named overworld and Rift encounter portraits were created for
Whetstorm using OpenAI's built-in image generation. Prompts and hashes are
recorded in the `vale-shore-grave-provenance.json`,
`mirefen-named-provenance.json`, `thornpeak-named-three-provenance.json`,
`named-overworld-rares-provenance.json`, and `rift-storm-sunken-provenance.json`
files under `public/ui/whetstorm/mobs/`. The corrected corrupted sporeling is
recorded in `veiled-hollow-fungal-provenance.json` there.

Original Mirefen, Nightbloom, Wraithwood, delve, Thornpeak, and Galecrest
portraits were created for Whetstorm using OpenAI's built-in image generation.
Prompts and hashes are recorded under `public/ui/whetstorm/mobs/` in
`mirefen-camp-remaining-provenance.json`,
`nightbloom-wraithwood-second-provenance.json`, `delve-final-four-provenance.json`,
`thornpeak-active-provenance.json`, and `galecrest-overworld-provenance.json`.
Corrections to Storm Caller, Deep Lurker, and Shardlord Kazzix are recorded in
their existing `rift-storm-sunken-provenance.json` and
`thornpeak-named-three-provenance.json` records.

Original Galecrest, Veiled Hollow, world-quest, and training-effigy portraits
were created for Whetstorm using OpenAI's built-in image generation. Prompts
and hashes are in `galecrest-remaining-provenance.json`,
`veiled-hollow-guardians-herd-provenance.json`, `world-quest-event-provenance.json`,
and `proving-shore-effigy-provenance.json` under `public/ui/whetstorm/mobs/`.
The corrected Ironvein and Thunzharr portraits are recorded in
`thornpeak-active-provenance.json` there.

Original Drowned Temple, Frostveil, realm, necromancy-summon, and Thornpeak
vision and stable portraits were created for Whetstorm using OpenAI's built-in
image generation. Prompts and hashes are recorded in
`drowned-temple-remaining-provenance.json`, `frostveil-quest-champions-provenance.json`,
`realm-camps-provenance.json`, `necromancy-summons-provenance.json`, and
`thornpeak-visions-stable-provenance.json` under `public/ui/whetstorm/mobs/`.

The original quest-escort and Yumi portraits were created for Whetstorm using
OpenAI's built-in image generation. Their prompts and hashes are recorded in
`docs/whetstorm/escort-yumi-portraits-generation.json`.

The original procedural Warrior pressure, blood-film and forged-steel
textures and their source generators are recorded in
`docs/whetstorm/warrior-material-textures-provenance.md`.

Independent procedural Warrior contact-sheet source candidates and their
generators are recorded in `docs/whetstorm/contact-vfx-candidates.md`. These
are unshipped candidates, not replacements for the currently loaded sheets.

Original Glimmermere, Frostveil, Willowfen, Palmreach, Mirefen, hoard, and
Gravewing portraits were created for Whetstorm using OpenAI's built-in image
generation. Prompts and hashes are recorded under `public/ui/whetstorm/mobs/`
in `glimmermere-frostveil-provenance.json`, `willowfen-palmreach-provenance.json`,
`palmreach-forge-wildheart-provenance.json`, `mirefen-encounter-adds-provenance.json`,
`hoard-cocoon-bonewalker-provenance.json`, and `necromancy-gravewing-provenance.json`.

The original practice-target, Pyre Colossus, and world-quest caravan portraits
were created for Whetstorm using OpenAI's built-in image generation. Prompts and
hashes are in `practice-dummies-provenance.json`, `pyre-colossus-provenance.json`,
and `world-quest-caravans-provenance.json` under `public/ui/whetstorm/mobs/`.

Original Veiled Hollow, Vale, Drowned Litany, cave, and epic hoard portraits
were created for Whetstorm using OpenAI's built-in image generation. Prompts
and hashes are recorded in `docs/whetstorm/cave-ember-portraits-generation.json`
and the `veiled-hollow-fungal-provenance.json`, `vale-rares-provenance.json`,
`drowned-litany-extra-provenance.json`, and `hoard-epic-bosses-provenance.json`
files under `public/ui/whetstorm/mobs/`.
