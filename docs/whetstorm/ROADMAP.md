# Whetstorm roadmap: agent-ready briefs

Each workstream below is written so one agent can take it cold: goal, where the work lands
(the seams that already exist), what done looks like, and what it collides with. Read the
root `CLAUDE.md` first, especially "Whetstorm: what this fork is", "Default task workflow"
and the environment notes. Paths and symbols here were checked against the tree at the
Whetstorm rebrand; confirm them with a quick grep before relying on one.

Difficulty: S (a day or less of agent work), M (a few focused sessions), L (a multi-session
project). "Hot files" are the monoliths several briefs touch; two agents must never edit the
same hot file at once.

## How to run these in parallel
- One worktree and branch per brief, cut from `main`, ending in a PR on
  `rowdybard/whetstorm` (see the root workflow).
- The hot files: `src/sim/sim.ts`, `server/game.ts`, `src/net/online.ts`, `src/main.ts`,
  `src/ui/hud.ts`, `src/render/renderer.ts`, `src/sim/types.ts`. Most briefs touch at most one
  or two of them through thin delegates; the orchestrator serializes briefs that share one.
- Wave 1 (independent, start together): W1a, W2, W5, C1.
- Wave 2 (after W1a merges): W1b. After W2 merges: W3, then W4 (both touch damage resolution).
- Anytime, no code conflicts: A1 (art style sheet and asset list), C3 (doc and tooling debrand).
- Blocked on the owner: C2 (legal text) and I1 (Docker).

## W1a. Weapon enhancement +1 to +15, the sim and wire half (M)
Goal: a weapon copy carries an enhancement level from 0 to 15. A forge interaction attempts
the next level for a gold and material cost; success odds fall as the level rises; a failure
costs the materials and gold only, never the level or the weapon (owner default, ask before
changing it). Each level adds weapon damage.
Where:
- Per-copy state: `ItemInstancePayload` in `src/sim/types.ts`. Rift gear already has a per-copy
  `upgradeLevel` plus forge ops in `src/sim/rift/progression.ts` (and `rift/upgrade.ts`); copy
  that shape, not its numbers.
- The attempt is a new sim system module behind `SimContext` (see `src/sim/CLAUDE.md`). All
  odds go through the seeded `Rng`, never `Math.random`.
- Derived stats: `recalcPlayerStats` in `src/sim/entity.ts` is the one place gear becomes stats.
- The command: the `COMMAND_NAMES` table in `src/world_api.ts`, a `dispatchMessage` case in
  `server/game.ts`, the matching facet in `src/world_api/`, both worlds, and the pins in
  `tests/world_api_parity.test.ts` and `tests/command_facets.test.ts`.
- Other players must SEE the glow, so the equipped main-hand level rides the entity wire the
  way the weapon skin does (`server/game.ts` entity encoding, `src/net/online.ts` decode).
- Persistence: the payload saves as JSONB; old saves load at level 0. Bound the field on load.
- Player text: tooltip line and forge messages through `t()` and the sim matcher
  (`docs/design/tooltip-writing.md`, the S3 guard).
Done: a vitest drives a seeded forge sequence (deterministic results, cost charged, level
capped at 15, a failure keeps the level), the stat recalc reflects the level, the wire round
trip carries it, the parity pins are updated, and `tests/architecture.test.ts` stays green.
Hot files: `src/sim/types.ts`, `server/game.ts`, `src/net/online.ts`.

## W1b. The +15 glow and lightning, the render half (M, after W1a)
Goal: the held weapon shows the enhancement. Rough ladder: no effect to +6, a faint glow from
+7, stronger from +10, brighter with sparks from +12, and at +15 lightning arcing along the
blade with a flickering light. +15 must read instantly across a town square.
Where:
- `src/render/weapon_vfx.ts` already has a tiered rig (`rare`, `epic`, `legendary` presets with
  emissive, shell, particles and a light), but `src/render/characters/visual.ts`
  (`buildWeaponVfx`, `weaponSkinVfxSpec`) only builds it for cosmetic weapon SKINS. Key it on
  the enhancement level as well, and add a new lightning tier for +15.
- Read `src/render/CLAUDE.md` "GPU work: every new producer is a client of the scheduler"
  before adding a material: the lightning needs a prewarm home (`weapon_vfx_prewarm.ts`) and
  its point light must ride the point-light budget, never a free scene light.
- Distance fading follows `weapon_vfx_shed_core.ts`; keep it gameplay-neutral.
Done: offline, a dev-granted weapon at +0, +7, +10, +12 and +15 shows the ladder (screenshots
under `docs/screenshots`), no `live-program` events in `?perf` when the first +15 appears, and
the render tests for the touched cores pass.
Hot files: `src/render/characters/visual.ts`.

## W2. Action camera and soft-target auto-attack (M)
Goal: an action mode where the camera sits over the shoulder, the character faces where the
camera looks, a crosshair shows the aim, and auto-attack plus skills go to the enemy nearest
the crosshair without pressing Tab. Tab and click targeting keep working.
Where: the `actionCam` and `actionCamShoulder` settings already exist (`src/game/settings.ts`,
`src/game/camera_view_settings.ts`), pointer lock in `src/game/pointer_lock.ts`, input in
`src/game/input.ts`, player targeting in `src/sim/targeting.ts`. The soft target is a CLIENT
choice sent as an ordinary target command; the server stays authoritative. Put the pure
"which enemy is under the crosshair" math in a tested core.
Done: the core is unit-tested (cone, range, line of sight, ties), the mode toggles from the
options, and an offline session can fight a wolf without Tab. Mobile and gamepad keep working.

## W3. Dodge with invulnerability frames (M, after W2)
Goal: a dodge that dashes a short distance in the input direction with a brief window where
incoming hits resolve as evaded, on a short cooldown or charges.
Where: the exclusive movement modes in `src/sim/player_movement_modes.ts` (Charge, Heroic Leap
and the ledge climb in `src/sim/climb.ts` are templates), damage in `src/sim/combat/damage.ts`
(`evade` is already a `DamageEventKind`), a new module such as `src/sim/combat/dodge.ts`, plus
the command plumbing as in W1a. The dodge must work online at 20 Hz: judge it at the server
tick and give it a small grace window.
Done: tests prove the dash distance and collision, the invulnerability window (a hit inside it
is evaded, one after it lands), the cooldown, and determinism; `tests/parity` goldens are
unchanged because nothing existing calls the dodge.

## W4. Block stance (M, after W3)
Goal: a held stance that slows movement and blocks hits from the front, draining a resource.
Where: frontal arc math already exists for mob cleaves and breath (`arcDeg` in
`src/sim/types.ts`), and `block` is already a `DamageEventKind`. Same command plumbing.
Done: tests for the frontal arc (front blocked, back not), the drain, and the speed penalty.

## W5. A big open-world boss with telegraphed attacks (M)
Goal: one TERA-style big monster in an early zone: lots of health, slow heavy swings, and two
or three attacks with readable ground warnings that a player can step out of.
Where: the boss kit already exists. `breathCone` (a telegraphed frontal cone with a cast bar)
and the stomp and pulse wind-ups are on the mob template (`src/sim/types.ts`), with the boss
support module `src/sim/mob/boss_mechanics.ts` and the telegraph window seam
`src/sim/mob/rift_escape_window.ts`. Content lands in `src/sim/content/` and carries every
same-change obligation in the root `CLAUDE.md` (wiki regen, deeds, entity names, an IP check
of the boss name). Telegraphs draw in the `encounter` floor layer (`src/render/floor_vfx_layer_core.ts`).
Reuse an existing creature model scaled up until art lands.
Done: content tests and `tests/guide.test.ts` pass, an offline fight shows the warnings, and the
boss is beatable by stepping out of them.

## C1. Finish the cleanup of upstream leftovers (S)
- The login screen offers "Continue with Discord", which needs a Discord app of our own: hide
  it unless the server reports a configured Discord client.
- The site footer links to upstream marketing pages ("Games like WoW", "Best MMORPGs" and the
  rest) and `public/links.html`, `public/press.html` and `public/merch.html` are upstream
  marketing pages: remove them and their aliases (`STATIC_PAGE_ALIASES` in BOTH
  `server/main.ts` and `vite.config.ts`).
- `server/` and `src/` still carry the switched-off commerce code (the `woc_*`, `claudium*`,
  `daily_rewards*`, `wallet*` and `seeker_*` modules). Deleting it is a separate, larger brief
  (L): do it module by module with the tests, never in one sweep.
Done: the shell tests updated to pin the removals, and no upstream link left on any page.

## C2. Our own legal and support pages (S, blocked on the owner)
`public/terms.html`, `public/privacy.html`, `public/support.html` and
`public/data-deletion.html` are the upstream company's legal documents and still list their
support email. They need the owner's real terms, privacy policy and contact before anyone
else plays. An agent can draft plain templates, but the owner signs off on the text.

## C3. Debrand the docs and tooling (S)
`docs/`, `README.md`, the subdirectory `CLAUDE.md` files, `.agents/`, `.codex/` and the GitHub
workflows still say World of ClaudeCraft and describe upstream infrastructure (their deploys,
their merge queue, their release process). Rewrite or delete them for the fork. Keep
`LICENSE` and the MIT notice as they are: the license requires them.

## A1. Art style sheet and asset list (S, then ongoing)
Write `docs/whetstorm/ART.md`: proportions, palette, oversized weapons, how glow and lightning
look, and how the UI frames look. Then a prioritized asset list: weapons first (they carry
the +15 glow), player characters, the first big bosses, common creatures, props and towns,
then icons and sounds. The title screen's village painting and portal frame are still
upstream art and are the first visible replacements. The repo's `image-to-glb` and
`asset-pipeline` skills cover model production; the Tripo API needs a key from the owner.

## I1. Online play locally (S, blocked on the owner)
Online play needs Postgres, which the repo runs through Docker (`npm run db:up`, then
`npm run server` beside `npm run dev`). Docker is not installed on this machine yet.

## Later: original action classes (L each)
Original-named classes with TERA-like roles (a shield tank who blocks, a greatsword bruiser,
a dual-blade dodger, a ranged caster, a healer), built on W2 to W4. Each needs a kit, talents,
tooltips and attack animations with readable wind-ups; the procedural clip pattern is
`src/render/characters/paladin_bastion_sweep_clip.ts`.