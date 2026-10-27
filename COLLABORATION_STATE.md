# Collaboration checkpoint

Branch: feature/original-ui-and-icons.

Implemented checkpoint: original Whetstorm mark and entry/creation chrome using
fixed-dark evergreen surfaces, pale-gold details, 16px inputs, touch target floors
and visible focus. Existing controls, class IDs, form behavior and simulation
are preserved. This is an incremental implementation checkpoint, not a completed
UI overhaul or an approved public-release build.

Validation: git diff --check and HTML control/ID preservation checks are run
before saving. Full game tests and browser verification are not claimed.

Next: original spell/item renderer, remaining entry and HUD art, then integration
checks. The supplied source omits tests/media/generated files. The separate
private GitHub write credential is unavailable in the current runtime; save a
portable Git checkpoint before any further work. Never publish or alter the live
site as part of this task.

## Original icon checkpoint

The spell/item/aura image and synchronous Canvas/worker paths now use original
polygon artwork from `src/ui/original_icon_art.ts`. Existing recipes retain
semantic subject metadata; inherited raster lookups are bypassed for these
three kinds. Direct Paladin talent bitmap routing is replaced too. Quality
colors, ability/item IDs, gameplay and existing cache APIs are unchanged.

Passed a native Node 24 smoke: deterministic SVG output and cached URLs,
prototype/markup-like identity handling, finite canvas coordinates, non-finite
size fallback and 14 representative subjects at 32px (772 drawing operations).
`git diff --check` is also required before checkpointing. These are focused
checks, not a full game gate or browser verification. Chrome/native TypeScript
limitations from the previous attempt are not claimed resolved.

Remaining: entry painting, complete chrome/class/currency bypasses, HUD polish,
full-checkout contract test migration and browser integration verification.

## Static artwork checkpoint

Added 78 original SVG assets: nine current class emblems and seven separate
launch-class marks, 20 primary launchers, 27 specializations, ten currency marks,
combat/boss marks, a boss frame, the project mark and a 32px intrinsic cursor.
Class/spec/chrome/currency registries and direct window routes use the originals.
The shared game cursor resolver is updated as well as stylesheet cursor tokens.

Validation: all 78 SVGs parsed as XML with no scripts, embedded images or external
art references. Bundled icon, talent, class, spec, currency and cursor modules
with esbuild. No sim IDs, combat mechanics, database or live deployment changes.
Full legacy-art contract test migration and browser verification remain pending.

## Entry landscape checkpoint

The original 407 KB WebP landscape is committed and wired into both game entries
and the common backdrop. Inherited cinematic scene and portal decoration layers
are hidden; the inherited home video source is removed. Existing entry/auth DOM
IDs and controls remain. The live website is not changed by this work.

The canonical online/offline creation IDs (`charselect-panel`, `charcreate-panel`,
`offline-select`) are used for the creation surface rules. Browser verification
and the complete game's pre-merge gate remain outstanding.

## Verified implementation checkpoint

Focused Vitest suite: `tests/whetstorm_original_art.test.ts`, 8 tests passed
with one worker and a minimal Node-only configuration. It covers the full live
411-ability and 1626-item catalogs, 26 originating trinket/aura pairs, closed
class identities, hostile paths, deliberate Paladin modifiers, determinism and
finite Canvas-host drawing. The worker API was exercised with an injected host;
this is not a real browser PNG or gameplay proof.

Other checks: the original art module passes standalone strict TypeScript 5.9
checking. This is a focused fallback, not the project's native TypeScript 7
full check. Icon/talent/class/spec/currency/cursor modules and the complete CSS
barrel bundle with esbuild. HTML comparison preserves all IDs, controls and
class choices (index: 593 IDs/285 controls; play: 491 IDs/203 controls).
Gameplay, server, world API, network and dependency files remain unchanged.
Biome checked the touched TypeScript files with no errors; an existing BASE_URL
Turborepo warning remains. `git diff --check` passes.

The complete game's legacy raster-art tests need migration to this original
native-art contract. Full game build/gate and desktop/mobile real-browser review
are not claimed complete. All work is committed on the feature branch and
backed up as a portable Git bundle. Do not merge or deploy based on these focused
checks alone. Leave the live site unchanged, per the owner's instruction.

## Palette review checkpoint

A bounded read-only frontend review found that both original icon painters used
the background palette for foreground shapes. They now inherit recipe.pal, while
per-primitive palettes retain precedence. The regression test failed before the
fix and the focused suite now contains nine tests.

The resumed pre-merge command `node scripts/gate_select.mjs` exits before running
its checks because the partial checkout lacks the ffmpeg-static dependency. This
is a blocked gate, not a pass. Desktop/mobile browser verification remains open.
The GitHub device authorization is pending; no feature push or deployment is
claimed. All implementation changes remain saved on the feature branch.

## Navigation and creature crest replacement batch

Added 44 original vector masters: 29 map/minimap markers, 13 creature-family
crests, and NPC/dead status marks. Updated the shared catalogs and five atlas
legend CSS routes. Existing semantic state resolution, raster sizes, cooldowns,
locks, rank, reward and palette treatment remain in the unchanged loader.
Source geometry, historical paths, subjects and SHA-256 hashes are committed.
See docs/whetstorm/NAVIGATION_ART.md for the inventory and integration boundary.

The new focused suite covers original paths, safe distinct SVG masters, hashes,
closed identities, semantic states and all supported raster-cache sizes. It
also rejects the exact retired files under public/, since unreferenced files
still ship. They were absent in this partial source snapshot; full-checkout
integration must remove them. Historical upstream attribution is retained.

All 44 assets parsed and rasterized with CairoSVG; the final small-size contact
sheet is committed. This is asset inspection, not in-game browser verification.
The bounded frontend review found no runtime regression. No deployment changes.

Verification: 14 focused Vitest tests pass across the original-art and new
navigation suites. The marker catalog, crest resolver and existing loader
bundle with esbuild. Biome checks the touched script/TypeScript files with no
errors. Generator reproduction is byte-stable; git diff --check passes.
The GitHub device authorization has expired, so this batch is saved locally
and as a complete portable backup; no remote push is claimed.

## Owner brief and title/loading integration

Read the owner's 2026-10-26 DOCX in full; preserved its text and source hash in
docs/whetstorm/OWNER_ART_BRIEF.txt. Follow its priority order and new Whirlblade/
Skybinder art names. Do not continue illustrating the retired nine-class skills
or Deeds ahead of the launch kit. Gameplay class migration remains Claude's work.

Four title paintings and an original transparent frame are created and saved.
The client uses optimized WebPs for title, loading, weekly-track and wiki
backdrops, preserving the requested PNG masters. The loading catalog replaces
all eleven old choices with the four new paintings. The rejected valley is
removed from the shipping tree. Existing scene CSS preserves reduced-motion
and backdrop-static behavior. A review found a native-shell containing-block
issue in the frame; the panel now establishes position and isolation, with the
decorative frame behind its controls and no pointer events or center fill.

Focused tests: 18 pass across three files; full CSS barrel bundles. Frame is
1024x1536 RGBA, with transparent center/corners. The actual runtime slice is
400/280/320/280, without fill, to exclude its bottom inner-edge artwork. This
is not a claim of full-browser verification or completed release gates.

## Seven launch paintings and first Bulwark kit

All seven owner-brief class paintings and all eight Bulwark skill paintings are
saved, with 1024px PNG masters and compact WebP delivery copies. Skill PNG
masters live under docs/design/whetstorm-art/skills/bulwark/; the requested ZIP
maps them to public/ui/skills/bulwark/*.png for the owner's handoff. Only WebP
skills live in the shipping folder. Source prompts and hashes are preserved;
accepted-launch-art.json pins all 20 title/frame/class/skill assets.

The launchClassIconUrl seam is ready for Claude's seven-class picker migration.
The current nine-class picker is NOT silently renamed or replaced. Eight
Bulwark image identities resolve through abilityImageUrl, hasAbilityIconIdentity
and iconDataUrl for ability/aura. No ability mechanics or simulation IDs are
added. Synchronous Canvas/worker fallbacks remain procedural as before.

The final runtime contact sheet checks 96/48/32px, grayscale and circular crops.
A bounded follow-up review found no concrete runtime regression and confirmed
the earlier frame positioning fix. Full-game/browser checks remain open.
ART_CHANGES.md is the handoff inventory and records what remains in brief order.

Final batch verification: 22 focused Vitest tests pass across four files.
Biome checks the touched TypeScript with no errors, the full CSS barrel and
icon/launch/loading modules bundle, and both entries preserve every prior
DOM ID and control. git diff --check passes. This does not replace the full
game gate or real-browser checks. No remote push or deployment is claimed.

## Essential HUD paintings checkpoint

Created and wired 20 original HUD paintings: eight primary chrome destinations,
six quest/service markers, three coins and three cursors. Source masters and
prompts were committed in small batches before runtime conversion. The source
PNGs stay outside public; compact WebPs and 32px cursor PNGs are shipped.
Shared catalogs plus direct window headers, coin CSS and the mailbox atlas
route are updated. Existing marker cache/state handling is unchanged.

The exporter caught an incomplete image during validation. It now encodes and
fully decodes in memory, then writes/compares bytes before atomically publishing.
All 20 source/runtime pairs decode and match their recorded hashes. Cursor
hotspots agree between CSS and TS; the grabbing gesture retains the existing
camera-drag state, not new pickup-hover logic. See HUD_CHANGES.md.

27 focused Vitest tests pass across five files. Biome reports no errors and
one existing BASE_URL/Turborepo warning. A bounded read-only frontend review
found no runtime regression. Real-browser/full-game verification remains open.


## Original concept art checkpoint

The earlier UI and HUD work through ee873cc was pushed and verified on the
private rowdybard/whetstorm-art feature/original-ui-and-icons branch. This
checkpoint adds original Old Peatfire and starter weapon concepts under
docs/design/whetstorm-concepts, with prompts and SHA-256 in
docs/whetstorm/concept-art-generation.json. These are review concepts, not
runtime assets or 3D models; no Tripo credits were used.

The full first set now has one Old Peatfire concept and nine starter weapon
concepts, all single PNGs. They are model references awaiting review, not
approved 3D assets. The arena brief waits for the arena look to be settled;
starter item icons and class bodies remain next in the owner's priority list.

Nine square starter item paintings match the new weapon concepts and are saved
under docs/design/whetstorm-art/items. These are unassigned source art, not
wired replacements: launch-class inventory IDs are not yet specified. Six
or so additional starting gear pictures remain to reach the owner's rough
target once their items are defined. See starter-item-art-generation.json.
