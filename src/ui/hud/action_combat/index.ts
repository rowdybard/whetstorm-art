// Public surface of the Action Combat HUD domain: the crosshair's pure state
// core (with the Sidestep pips and the Brace meter) and its painter. The Hud
// composes the painter on its shared writers; the Action Combat wiring
// (src/game/action_combat_wiring.ts) drives it.

export {
  ActionCrosshairPainter,
  type ActionCrosshairPainterDeps,
  mountActionCrosshair,
} from './crosshair_painter';
export {
  type ActionCrosshairInput,
  type ActionCrosshairState,
  BRACE_FILL_STEPS,
  createActionCrosshairState,
  resolveActionCrosshair,
  SIDESTEP_FILL_STEPS,
} from './crosshair_view';
