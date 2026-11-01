# Full-game art integration notes

Snapshot: art branch `ea59da4118`, full-game task checkout `16796615be`,
2026-10-30. Recheck both revisions and working trees before using these notes.
The art repository is an independent, partial source snapshot based on full-game
commit `64dcb3e84`; its root `e79fbec070` is not an ancestor in the full game's
Git history. It omits many game assets, tests, translations and generated files.
Do not interpret those omissions as requested deletions or merge the unrelated
histories wholesale.

At the snapshot the art delta had 4,289 changed paths: 4,251 additions and 38
modifications. None of the additions was tracked at the inspected full-game
HEAD at that snapshot. Later work deliberately adds a replacement at
`public/vfx/fel_meteor_impact.png`, a path already present in the full checkout;
review it as a replacement rather than assuming all additions are collision-free.
These counts are historical, not a current inventory. Preserve unrelated
uncommitted and untracked work in both repositories, including the independent
temporal-clock audio worktree.

For a future integration, start with a separate full-game candidate at the
appropriate current fork revision. Review and apply the intentional art delta
relative to the snapshot root, including deliberate deletions only after checking
their full-game consumers and rights. Reconcile source changes instead of
replacing full-game files with older snapshot copies. In particular:

- `src/guide/pages/deeds.ts`: preserve the newer removal of Steam/Epic copy and
  the art branch's deed-image routing and fallback.
- `src/guide/styles.css`: preserve the original hero-art substitution alongside
  newer responsive navigation, search and layout changes.
- `src/styles/components.css`: preserve art URL changes alongside newer
  dev-command and grid sizing changes.
- Reconcile `CREDITS.md` by individual provenance record; never relabel the
  historical restricted art as cleared.

Full-game tests may intentionally pin old art. In particular, inspect currency,
quest-dialog, guide/deed, held-weapon, map-marker, podium and world-quest ladder
tests against actual consumers before updating assertions. A read-only search
found 53 full-game test files mentioning legacy art paths; this is a review
queue, not a count of proven failures. Retain current guide navigation and
responsive tests. `tests/guide.test.ts`, `tests/release_v034_additional_art.test.ts`
and `tests/release_art_audit_v036_reliquary_deeds.test.ts` specifically assert
the old generated deed `crest` field; the guide generator no longer emits it.
Reconcile those tests and regenerate the guide content in the full candidate,
while preserving spoiler filtering and live deed fallback coverage. Run the
applicable full gate, a fresh candidate build, and
desktop/mobile in-game checks, including missing-state art and held-model grips.

The restricted originals and possible packed or cached copies remain a separate
release task. Compare physical files and hashes across each actual distribution,
reconcile attribution, regenerate owning manifests, and verify no restricted or
unclassified media ships. The art branch's focused checks do not establish those
conditions, authorize deployment, or verify subjective visual fit.

The fel meteor work produced an untracked partial
`src/render/assets/manifest.generated.ts` in the art worktree. It reflects only
the media present in that incomplete snapshot and must not be transplanted as a
full-game manifest. Regenerate the owning media manifest in the complete
candidate and verify the new texture there.
The later `whetstorm_flame_6x6.webp` atlas was also added after that partial
manifest was generated. The complete candidate must regenerate the manifest for
both textures and verify all VFX consumers in the built package.
The later Warrior pressure, blood-film and steel textures likewise require a
fresh full-candidate media manifest and in-game review; see
`docs/whetstorm/warrior-material-textures-provenance.md`. Do not use the
partial worktree's generated manifest for those replacements.

Later art-branch changes also replace direct UI art paths. The weekly quest
scenes, medals and emissary portrait require the updated
`src/ui/weekly_quests_view.ts` and the `ui/whetstorm/weekly` assets together;
the same view's cache icon now uses the item icon resolver. The Ley and
Confection puzzle replacements require their updated window modules and all
referenced `ui/whetstorm/minigames` images, including the separately authored
candy atlas. The weekly vault changes require both
`src/ui/weekly_rewards_window.ts` and
`src/ui/weekly_reward_claim_controller.ts`, plus their replacement SVGs.
Reconcile the world-quest and generic leaderboard CSS medal URLs and their
view modules as a unit. These changes span multiple art commits; applying only
the latest commit will not carry the complete dependency set.

The media-manifest generator scans models, textures, environment and VFX,
not `public/ui`. UI art still needs to be copied and exercised in a full build,
but does not require an entry in that generated media manifest. A later map
bake created untracked map plates and `src/ui/map_bg_manifest.generated.ts`
in the partial art worktree; the full reference already tracks its own plates
and manifest. Do not transplant the partial bake without validating freshness
against the complete candidate's simulation and build.

Dungeon Finder now has its own original encounter portrait overrides. The
shared target-portrait resolver also overrides selected early creatures and
bosses, and is consumed by target frames, Reliquary slain cells, a hoard event
banner and raid-guide fallback posters. Many other mobs still use the separate
legacy `ui/mobs` paths. The older images are model-rendered portraits; the new
ones are independent illustrations. Review identity, circular cropping and the
larger guide poster in game, and audit remaining runtime and packaged assets.

One source inconsistency needs a design decision during visual review: Old
Cragmaw uses the `mob_bear` renderer mapping and the new portrait depicts a
bear, but a Thornpeak quest describes the creature as a cat. Verify which species
is intended before changing either the art or the gameplay content.

At art-branch commit `29b2619587`, a runtime census found 271 catalogued mob
IDs: 138 resolved to original portrait overrides and 133 to legacy `ui/mobs`
URLs. The overworld `CAMPS` subset contained 123 distinct IDs: 58 overridden
and 65 on legacy URLs. This is a historical snapshot; later batches change the
counts, and catalog membership does not prove spawn reachability. The partial
art checkout has no tracked `public/ui/mobs` directory, so missing legacy URLs
fall back to family crests there. This does not establish the state of another
deployment or distribution.

At art-branch commit `9b45d7eb0d`, the same runtime census found 207 of 271
catalogued mob IDs with original portrait overrides and 64 resolving to legacy
URLs. This includes pets and dummies; catalog membership alone still does not
prove a live spawn. Subsequent work changes these counts.

## Fiesta power-up source and replacement dependency

Read-only comparison on 2026-11-01: reference checkout `D:/whetstorm-deploy`
at `6c15e449a82ab5b7233b70416b8cd0d5abf97d21` tracks four files under
`public/ui/fiesta/powerups/`: `pow_berserker.webp`, `pow_colossus.webp`,
`pow_moon_boots.webp`, and `pow_speed_demon.webp`. Its `CREDITS.md` classifies
`public/ui/fiesta/**/*.webp` as requiring permission. In that reference revision,
`src/ui/icons.ts` resolves active aura aliases through `EXTERNAL_AURA_IMAGE_URLS`;
nameplate and icon consumers can reach those paths. The files' presence is an
inventory finding, not proof of what a later build or deployment contains.

At art-branch commit `f3af23192c`, `src/ui/icons.ts` instead gives `whetstormAuraImageUrl` priority; that resolver
includes `whetstorm_powerup_aura_art.ts`, and the four original paintings are
present. In the full candidate, integrate the resolver and all corresponding
images together, check every alias and nameplate consumer, and confirm any direct
uses of the legacy helper before removing the four restricted physical files.
Build and inspect the actual package and caches, and exercise the aura display.
These candidate steps remain unperformed; do not assume that mapping changes
alone remove the old assets from distribution.

## Navigation and chrome physical-file follow-up

On 2026-11-01, `public/ui/whetstorm/mapping.json` identified 44 superseded
navigation images: 29 map markers and 15 family/status crests. All 44 were
present in both `D:/action-mmo` at `20807967fcd145c348499e88205eb1357ebf6c67`
and `D:/whetstorm-deploy` at `6c15e449a82ab5b7233b70416b8cd0d5abf97d21`,
while absent from the partial art worktree. The focused navigation test checks
those exact historical paths for absence. Passing it in the partial worktree
therefore does not establish absence in a full candidate.

The same source checkouts also contained 20 `public/ui/chrome/*.webp` files
and `public/map_art/world_overview.webp`; the applicable credit rows classify
those historical families as permission required. These are source-presence
findings, not an inspection of a deployed package. Reconcile replacement SVGs,
HUD art, map imagery and their actual consumers in a separate full candidate;
audit any non-code consumers before removing or excluding historical files, then
inspect the fresh build and caches. Do not infer that those files disappeared
from the complete game merely because they are absent from this partial tree.

## Item batch and additional status crests

At full reference revision `6c15e449a82ab5b7233b70416b8cd0d5abf97d21`,
`public/ui/items/mapping.json` records 274 IDs in
`item-art-consistency-2026-08-09`; their 274 legacy WebPs were present under
`public/ui/items/`. The historical batch credit marks those images
permission-required. At art revision `8e68e7140c`, all 274 IDs resolve to
existing Whetstorm paintings. This describes one batch, not all old item art.

In the reference revision `iconDataUrl('item', id)` resolves those 274 to the
old URLs; four take the weapon-icon route ahead of the old item lookup:
`craghorn_staff`, `drovers_staff`, `hollow_vigil_staff`, and `widowfang_dirk`.
A full-candidate migration must exercise both routes, normal item views, guide
and Reliquary use, and item-derived aura handling before removing or excluding
legacy files. Source presence does not prove the contents of a deployed build;
inspect the resulting package separately and preserve historical attribution.

The 44 superseded navigation files above do not exhaust the reserved status
crest family. Both reference checkouts also have
`public/ui/crests/status/boss.webp` and `combat.webp`; the art branch routes
those status identities to Whetstorm SVGs. Audit all consumers before physical
disposition, then inspect the full build. Separately, zone overlay PNGs have a
different `With the project only` credit and must not be classified solely by
the unrelated world-overview row.

## Deed art integration dependency

At the full reference revision `6c15e449a82ab5b7233b70416b8cd0d5abf97d21`,
the `public/ui/deeds/` directory contained 289 legacy WebPs and the generated
legacy deed registry contained 289 IDs. The applicable credits classify that
family as permission-required. The art branch routes `deedImageUrl` through
Whetstorm deed paintings instead; it still uses legacy registry membership as
fallback-selection metadata. The guide shares the deed view and icon path, and
Reliquary presentation also depends on painted-art detection.

When integrating into a complete candidate, reconcile those consumers and the
generated registry, converter and guards as a unit. The full-reference
`tests/deed_icons.test.ts` pins the old registry/file relationship and legacy
URL behavior; assess and update its assertions against the intended new
behavior rather than deleting old files first. Inspect source, docs, generated
content and build output for old paths and bytes, and preserve historical
attribution. The 289 files are a source-checkout observation, not evidence of
what an uninspected deployment contains.

## Guide, profession and active portrait follow-up

The guide overview now preloads its Whetstorm road hero instead of the old
`/loading-screen.jpg`; browser reuse remains to be checked. A separate guide
header route still requests `/whetstorm-logo-guide.webp`. That file is absent
from the partial art worktree but exists in the full reference checkout; its
precise source and license were not established by the bounded credit search.
Owner rebrand commit `d17187fba8` describes the sword-and-lightning logo as
original Whetstorm art, which is evidence of project origin, not a full source
or license record. Preserve the full candidate's tracked guide image while
confirming its provenance and packaging, then check the 44-pixel header on
desktop and mobile. If that source cannot be established, evaluate a deliberate
replacement without losing the localized alt text.

The player-card canvas separately requests `/whetstorm-logo-hero.webp`, which
is absent from the partial art checkout but exists in both full reference
checkouts. Its loader catches failure and falls back to a translated text
wordmark. Preserve and validate the full candidate's intended brand asset and
its provenance; a partial-checkout 404 alone does not prove a full-game defect.

The current art-branch profession resolver has existing Whetstorm images for
all 26 registered profession identities checked. The full reference trees
still contain the corresponding historical profession WebPs, so confirm the
full-candidate resolver and all crafting, guide and tooltip consumers before
disposition and inspect the actual package afterward.

The art branch still attempts legacy mob portraits for active IDs including
`rift_boss_venom`, `rift_boss_necro`, `rift_boss_brute`, `rift_spawnling` and
`hoard_brood_egg`. The full reference contains the old WebPs; in the partial
art checkout missing legacy paths fall back to family crests. The owner's art
brief excludes new target-portrait illustration, so preserve that priority and
resolve source rights, runtime fallback and package contents in the full
candidate rather than assuming the old files are cleared or unused.
