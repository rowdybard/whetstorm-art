# Action Combat HUD domain

The crosshair for the opt-in Action Combat mode (the `actionCombat` setting):
a fixed mark at the screen centre, the point the camera aims through.

- `crosshair_view.ts` is the pure state core (shown, pending "Click to aim",
  lit on an enemy target), plus the two action defenses under the reticle: the
  Sidestep pips (W3) and the Brace meter bar (W4), both painted in bounded
  steps and shown alone in the classic mode only while they have something to
  say. Registered in `UI_PURE_CORES`.
- `crosshair_painter.ts` builds the node on first show and writes only through
  the shared `PainterHost` writers. Registered in `HOT_PAINTERS`
  (`tests/hud_perf_budget.test.ts`).
- The Hud composes the painter (`hud.actionCrosshair`); the frame loop drives it
  through `src/game/action_combat_wiring.ts`. The domain never imports `Hud`.
- Gameplay-neutral: no preset or tier knob may hide or delay the crosshair. Its
  motion is a short CSS transition that `prefers-reduced-motion` and the
  in-game reduce-motion switch both drop (`src/styles/hud.css`, section
  "action combat crosshair").
- The only player text is `hudChrome.actionCombat.clickToAim`.
