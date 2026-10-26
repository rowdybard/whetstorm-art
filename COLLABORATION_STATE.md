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
