# Whetstorm handoff

The living state of the project for the next agent or person. Keep it short and true: update it
when a PR opens or merges, and never list something as working unless a test or a manual check
showed it. The backlog with full briefs is `docs/whetstorm/ROADMAP.md`; the rules are the root
`CLAUDE.md`.

Last updated: 2026-10-25 (#9 Brace, #11 online test, #12 boss visual polish and #13 upstream
leftovers merged; art audit with Codex).

## Goal and owner direction
- An original, commercially viable action-combat MMORPG inspired by the feel of classic TERA.
  Not a clone: no TERA names, models, textures, sounds, animations or copied designs. Inherited
  World of ClaudeCraft assets and licenses must be audited before any commercial release
  (`CREDITS.md`).
- First milestone: one complete, genuinely fun multiplayer boss encounter on a responsive
  action-combat layer. Combat comes first; integration beats feature count. The owner wants to
  play it in the week of 2026-10-22.
- Server-authoritative damage and hit validation, with responsive input; design for latency at
  the 20 Hz tick.
- Working rules: every change is a PR on `rowdybard/whetstorm` against `main`; nothing merges
  without the owner's OK; at most three agents at once (two in practice, for usage); never two
  agents on the same hot file; a wave starts only after the PR it depends on merges; conserve AI
  usage (no speculative rewrites or features).

## Architecture in five lines
- One deterministic sim (`src/sim/`, 20 Hz, seeded `Rng`) runs offline, on the server and in
  the RL env. The server is authoritative; clients send intent and commands.
- `src/render/` and `src/ui/` read the world only through `IWorld` (`src/world_api/` facets),
  implemented by the offline `Sim` and the online `ClientWorld`.
- Combat is classic auto-attack plus abilities with hit tables. Action combat layers on top:
  W2 adds an opt-in Action Combat mode (free look, crosshair, soft target) that only sends the
  ordinary target command; W3 adds a dodge (Sidestep) and W4 a held frontal block (Brace).
- The hot files (`src/sim/sim.ts`, `src/sim/types.ts`, `server/game.ts`, `src/net/online.ts`,
  `src/main.ts`, `src/ui/hud.ts`, `src/render/renderer.ts`) are monoliths behind a line-count
  ratchet; new logic goes in sibling modules.
- Content is data in `src/sim/content/` with same-change obligations (wiki regen, deeds, entity
  names, IP check of every new proper noun).

## How to play the boss encounter (solo, offline)
Everything below is on `main`. On the owner's machine:
1. `git pull` on `main`, `pnpm install --frozen-lockfile`, then `npm run dev`, open `http://localhost:5173` and pick
   Play Offline. `npm run dev` is a dev build, so the `/dev` chat commands work offline.
2. Options, Camera card: turn on Action Combat. Click the world to take aim; hold Alt for the
   cursor.
3. In chat: `/dev level 12`, then `/dev tp 138 371` (Old Peatfire sleeps in a hollow on the
   Mirefen moor at about x 137.7, z 385.7; that spot is about 15 yd south of him, outside his
   13 yd aggro). `/dev spawn old_peatfire` puts a copy next to you anywhere instead.
4. Press Y to Sidestep: a 6 yd dash with a 0.5 s evade window and 2 charges
   (pips under the crosshair). Time it on a telegraph to take no damage. Hold Mouse4 to
   Brace: hits from the front are blocked while the meter lasts, at half run speed.
5. He is tuned for five level 12 players, so solo you will die fast. For a feel test use
   `/dev immortal`. Watch for: the Fire Breath cast bar and its ground cone (he keeps facing
   his target until it lands, so the target Sidesteps as the bar ends or holds Brace facing
   him; other players can step out of the cone), the rune ring of Shuddering Stomp (step out
   past 8 yd within 1.2 s), and the Peat Blaze ring (leave 12 yd within 2 s, four pulses).

Online multiplayer needs Postgres (`npm run db:up` uses Docker, which the owner's machine does
not have yet). #11 ran the fight online in the cloud container with scripted wire bots
(`scripts/peatfire_online.mjs`, no real players yet); its PR body has the setup.

## Briefs and PRs
| Brief | PR | Branch | State |
|---|---|---|---|
| W2 action camera and soft target | #2 | `feature/action-camera-soft-target` | merged 2026-10-22 |
| W5 open-world boss with telegraphs | #3 | `feature/open-world-boss` | merged 2026-10-23 |
| W1a weapon enhancement | #4 | `feature/weapon-enhancement` | merged 2026-10-23, not played yet |
| W3 dodge with invulnerability frames ("Sidestep") | #6 | `feature/dodge-iframes` | merged 2026-10-23 |
| W4 block stance ("Brace") | #9 | `feature/block-stance` | merged 2026-10-25 |
| Boss visual polish (Fire Breath ground warning, a readable boss body) | #12 | `claude/project-thread-rxonbh` | merged 2026-10-25 (render only) |
| Online boss multiplayer test (local server, Postgres, wire bots) | #11 | `claude/project-thread-r4qilf` | merged 2026-10-25 |
| C1 upstream leftovers | #13 | `fix/upstream-leftovers` | merged 2026-10-25 |
| W1b +15 glow and lightning | none | not cut | unblocked; #12 left the weapon glow out, so Claude takes it next |
| Art audit and replacement pipeline | none | not cut | handed to Codex 2026-10-23, see "Art audit and replacement pipeline" below |

Each merge was brought into the next branch first; the only conflict was the generated
`src/ui/i18n.resolved.generated/pending.ts`, resolved by rerunning `npm run i18n:gen`. The
merged `main` matches the verified Wave 1 integration tree apart from W5's terrain fixture
re-mint, which passes. On 2026-10-25 #9, #12, #11 and #13 were merged in that order after a
local tree with all of them (and this file) showed no conflicts, no change from regenerating
i18n and wiki content, a clean type-check, and the 46 test files they touch plus the guard and
parity tests passing.

## Verified on 2026-10-22 (and how)
- A local tree with W2, W5 and W1a merged on `main` (now the real `main`) (i18n and wiki regenerated): the full vitest
  suite in three shards (4972 files) found no failures beyond the 30 files that already fail on
  `main`.
  On the same tree the browser regression suite passed (65 files, 524 tests) and the type-check
  and every build passed.
- W2 and W5 together in the offline client (headless Chromium, software renderer): the
  crosshair soft-targets Old Peatfire with no Tab, auto-attacks land from 5.45 yd (beyond the
  default 5 yd melee reach, inside his 7 yd body reach), the stomp ring appears 24 ticks
  (1.2 s) before the slam and stun, Fire Breath lands about 40 ticks after its cast starts, and
  the Peat Blaze ring leads the first pulse by 41 ticks with 2 s escalating pulses after.
- W2 alone: Shore Scuttler soft-targeted and killed in the offline client.
- W3 on its branch before merge (2026-10-23): the full suite in six shards (only main's 30 failures plus two
  load timeouts that pass alone), the browser suite and every build; in the offline client, Y
  dashed the player 6.0 yd and a Sidestep timed on a forced Shuddering Stomp evaded it (0
  damage, no stun).
- W4 on its branch before the PR (2026-10-25): the full suite in six shards (only main's 30
  failures plus three load timeouts that pass alone), the browser suite and every build; in the
  offline client, Mouse4 held halved run speed (7.0 to 3.5 yd/s), a braced player facing Old
  Peatfire blocked his Fire Breath and a melee swing (0 damage, meter drained), and holding on
  broke the stance when the meter emptied.
- C1 on its branch before the PR (2026-10-25): the full suite in six shards (only main's 30
  failures plus load timeouts; the four that time out alone time out the same way on a clean
  `main`), the browser suite, the type-check, and in a real browser the Discord entries stay
  hidden with no Discord server and appear when `/api/status` adverts one. Both builds pass.
- #11 and #12 carry their own verification in their PR bodies (not re-run by the orchestrator).
- The boss's one-tick-early escapes, W1a's enhancement rules and its GameServer round trip are
  pinned by unit tests.

## Untested
- Online play with two or more real players (soft target echo, `enhance_weapon` through
  `ClientWorld`, Brace online, and how the dodge feels at real latency). #11 covers server
  authority, telegraph sync, hp agreement, hits against the server position and Sidestep
  timing (0 and 150 ms round trip) with wire bots; its browser run was too slow to judge feel.
- W1a in a client (the forge master row, the tooltip line); no screenshots.
- Pointer-lock re-lock on Firefox and Safari; real GPU rendering (every screenshot so far is
  SwiftShader).

## Known bugs
- 30 test files fail on `main` from the rebrand commit `d17187fba`. It rewrote art owner strings
  to "Whetstorm" in tests, art generators and `public/ui/*/mapping.json` while `CREDITS.md` and
  several manifests still truthfully say "World of ClaudeCraft", and it renamed domain and
  platform strings inside tests (for example `tests/electron_update_guard.test.ts`). Groups:
  art provenance (`item_icons`, `item_art_consistency`, `chrome_icons`, `map_marker_icon_art`,
  `placeholder_art_completion`, `masterwrought_art_completion`, `missing_painted_icons_wave`,
  `release_v034_additional_art`, `release_v039_icon_art`, `warlock_pet_action_art`,
  `streetlamp_asset_wave`, the `eastbrook_*` and `fenbridge_town_assets` asset tests), platform
  and config (`woc_store_window_contract`, `native_immersive_mode`, `native_discord`,
  `android_seeker_distribution`, `apple_auth`, `discord_bot_config`, `discord_bot_discord_api`,
  `electron_update_guard`, `totp`),
  and others (`server/http/characterization` two files, `parse_shipper`,
  `mediawiki_seed_freshness`, `guide_key_coverage`). Provenance must stay truthful: the fix is
  to restore the upstream attribution where the asset came from upstream.
- Old Peatfire reads near black (per #12: the atlas is painted dark and the model halves it,
  worst on the low and medium tiers). #12 lifts the shared matriarch def with
  `VisualDef.albedoGain`, which also brightens Cindraleth; portraits, guide stills and the
  Drakemaw broodlords (their own def) stay dark.
- Fire Breath, not fixed yet (sim side; unblocked now that Brace merged):
  - (#11) the cast only counts down in the melee attack state, so the bar freezes while the
    boss chases, and leaving his range only stalls it;
  - (#11) the cone resolves on his facing at cast end and he keeps facing his target, so the
    target cannot step out of it sideways (only Sidestep or Brace avoid it);
  - (#12) the evade branch in `src/sim/mob/targeting.ts` keeps a frozen cast, and #12's cone,
    when he loses his last target mid breath.
- Upstream leftovers C1 did not cover (listed in #13): the desktop Discord Rich Presence
  (`electron/discord_presence.cjs`) defaults to upstream's Discord app id and is on by default
  (its comment, rewritten by the rebrand, wrongly calls it Whetstorm's); the Tools menu still
  links "WoC Records", "WoC Scout" and "WoC Parse Service" to placeholder hosts; `bot/`
  defaults to upstream's URL and copy; `.env.example` suggests upstream's Discord invite; the
  legal pages list upstream's emails (C2).
- W1a: inspecting another player shows their weapon at +0 (the public instance allowlist was
  not widened); Iron Ore, the enhancement material, is not gathered in zone 1 where the forge
  is.
- Level 20 breath users (`broodlord_fire_breath`, `matriarch_fire_breath`) likely show the raw
  cast id on the target cast bar (pre-existing).

## Integration contracts
- W3 Sidestep evades through three funnels (`dealDamage`, `Sim.applyAura`, `applyKnockback`),
  all asking `sidestepEvadesHit` in `src/sim/combat/sidestep.ts`; any new way to hurt a player
  must pass one of them. W4 Brace asks `braceBlocksHit` (`src/sim/combat/brace.ts`) in
  the same funnels right after the Sidestep check: evade first, then block. An area mechanic
  that resolves away from its source notes its origin with `beginBraceAreaHit` /
  `endBraceAreaHit`, and a mob mechanic record can set `unblockable` (Old Peatfire's Shuddering
  Stomp and Peat Blaze are; Fire Breath is blockable from the front).
- W2 and W5 share one combat interface: the soft target's melee gate is the server's own
  `effectivePlayerAttackRange` (`src/sim/combat/player_attack_reach.ts`) and its crosshair test
  is size-aware, so a big boss is picked when aimed at its body. Big bodies are listed in
  `BIG_BODY_PLAYER_MELEE_RANGE` (W5).
- The soft target is a client choice sent as the ordinary target command; the server validates.
- The breath warning core `src/render/breath_cone_telegraph_core.ts` (#12) mirrors the sim's `breathCone` hit test in
  `src/sim/mob/locomotion.ts` (centre, range, half-arc, live facing, cast progress). Whoever
  changes the breath's aim or timing updates the core and `tests/breath_cone_telegraph.test.ts`
  in the same change.
- The Discord sign-in button and the Discord menu entries show only when `/api/status` says
  `discord.enabled` (`server/discord_configured.ts`, C1); a new Discord entry point joins
  `DISCORD_ENTRY_IDS` in `src/net/discord_login_advert.ts`.
- `MobTemplate.telegraphWindups` (W5) opts an open-world mob's `stomp` and `aoePulse` into the
  rift windup ring (`startRiftMechanicWindup` in `src/sim/mob/locomotion.ts`); rift mobs are
  unchanged.
- W1b (glow and lightning) reads `Entity.mainhandEnhanceLevel`, on the entity wire as `wen`.
- Regenerated i18n bundles conflict between PRs by design; resolve by regenerating.
- Any camp appended to `CAMPS` in `src/sim/data.ts` shifts every later entity id by one and
  re-mints the parity goldens (documented in `data.ts`).

## Known gaps (not bugs)
- Cindraleth shares Old Peatfire's body but has no `BIG_BODY_PLAYER_MELEE_RANGE` entry.
- Melee soft targets stop at melee reach, so gap closers such as Charge still need Tab.
- W3: online, the Sidestep dash shows one round trip after the press (the server drives it as a
  movement override; no local prediction yet). No mobile button, no pad default, no tooltip.
- W4: no marker yet for an unblockable mechanic, nothing draws another player's
  stance, no mobile button, no pad default, no tooltip. Its tuning table is `BRACE_TUNING` in
  `src/sim/combat/brace_meter.ts`.

## Art audit and replacement pipeline (Codex owns this from 2026-10-23)
The owner asked Codex to take over two jobs: audit the media inherited from World of
ClaudeCraft, and work out the pipeline that replaces what we cannot ship. Start with whatever
Astra can do or find: Astra is GPT 6 Astra, the OpenAI model the owner points Codex at. Use it
for the audit itself and for whatever replacement art or sources it can produce or find,
before spending Tripo credits. Tripo is still under consideration, not chosen. The Tripo
pipeline below already has an optional OpenAI image stage (`OPENAI_API_KEY`, gpt-image-2)
for concept images, which is one place an OpenAI model already plugs in.

Why it matters: a commercial release may ship only media we own or hold a commercial licence
for. `CREDITS.md` is the operative register, and the code's MIT licence does not cover media.
Several upstream grants were made to Levy Street only and do not transfer to a fork.

What the register says (read `CREDITS.md` in full; this is the shape, not a substitute):
- Must be replaced before a commercial release ("Do not redistribute these"):
  - the CraftPix class ability icons (`public/ui/skills/<class>/*.webp` whose per-class
    `mapping.json` names a CraftPix pack);
  - the project-owned commercial and prestige art listed there (class rework icons, Armory
    weapons and renders, the Claudium set, Book of Deeds icons, Professions 2.0 art, and the
    rest of that list);
  - art and sound used with permission granted to Levy Street;
  - the @jamiecypher CC BY-NC sounds (no commercial use);
  - every brand mark (Twitch, X, Kick, YouTube, Discord, Steam, Solana, USDC), plus the
    upstream name and branding.
- Can stay: the CC0 packs (KayKit, Quaternius, Kenney, ambientCG, Poly Haven), which are most
  models, terrain and skies.
- Needs a decision: assets marked `With the project only` may ship inside a fork, but the
  owner wants original art and a commercial product, so confirm each family or plan its
  replacement. Anything not listed in the register is unrecorded, not free: treat it as
  replace-or-ask.

Known trap, part of this job: the rebrand commit `d17187fba` rewrote art owner strings to
"Whetstorm" in tests, generators and `public/ui/*/mapping.json` for assets that came from
upstream. That is untruthful provenance, and it is why the art provenance group of the 30 failing
test files in "Known bugs" fails.
Restore the upstream attribution where the asset came from upstream. Name Whetstorm as the
owner only on an asset we actually made, and only once it lands.

Suggested first deliverable: `docs/whetstorm/ART_AUDIT.md`, one row per asset family
(path glob, source, licence, verdict keep, replace or ask, and the planned replacement route),
built from the per-family `mapping.json` records and manifests where they exist, and dated
because it is a snapshot. Then fix the provenance fallout so the gate is clean, then start
replacing the must-replace families, highest player visibility first (class ability icons,
then brand marks and branding).

Replacement routes already in the repo:
- `scripts/asset_pipeline/` (read its `CLAUDE.md` and `.claude/skills/asset-pipeline/`):
  Tripo API generation of weapons, props, rigged creatures and class skins, with an optional
  gpt-image-2 concept stage and a mandatory `qa --job <id>` step that also prices the job.
  - The key is `TRIPO_API_KEY` in the repo-root `.env` (gitignored, never committed or pasted).
    Check credits with `node scripts/asset_pipeline/pipeline.mjs balance`.
  - Credits cost $0.01 each. Rough costs: textured image-to-3D 30, a full pipeline run about
    40 to 50, an auto rig 25, a retarget 10 per animation.
  - The Claude cloud container's network blocks Tripo, so runs happen on the owner's machine.
- The image-to-GLB skill (`.claude/skills/image-to-glb/`, `$woc-image-to-glb` for Codex)
  owns the exporter, optimizer and fingerprint pins for world props and buildings.
- Roadmap brief A1 (`docs/whetstorm/ART.md`, the art style sheet) should come early, so every
  replacement shares one look.

Rules that apply to every replacement: original art only, never copied, converted or
imitated from TERA or any other game; IP-check every new proper noun; keep `CREDITS.md` and
the `mapping.json` provenance truthful; never hand-edit generated manifests (regenerate them);
a new material, light or GL context follows the GPU scheduler rules in `src/render/CLAUDE.md`;
every change is a PR on `rowdybard/whetstorm` against `main`, and the owner merges.

Coordination: Claude keeps working on combat (W1b next); the art work should not need the combat
hot files. Whoever opens or merges a PR updates this file.

## Next priorities
1. Owner plays the encounter offline (Sidestep, Brace, the breath warning) and tunes by feel;
   the tuning tables are in the PR bodies of #2, #3, #6 and #9.
2. Fix the Fire Breath cast bugs under "Known bugs" (the online test and polish threads),
   keeping the breath warning core in step.
3. Claude: W1b (+15 glow and lightning).
4. Codex: the art audit and the replacement pipeline above, starting with Astra.
5. Deploy (owner's choice, 2026-10-25): the client on Cloudflare Pages with git autodeploy and
   the game server ported to Cloudflare Durable Objects; starts when a thread slot frees.
