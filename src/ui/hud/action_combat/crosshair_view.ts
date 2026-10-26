// The Action Combat crosshair's state: whether it shows, whether the pointer
// still has to be taken (the "Click to aim" line), whether it is lit because an
// enemy is targeted, and the Sidestep pips under it (Whetstorm W3: one per
// charge, lit when ready, the next one filling while it recharges). Pure and
// DOM-free; crosshair_painter.ts paints it through the shared PainterHost
// writers.
//
// The pips show with the reticle in Action Combat. With the mode off (the
// classic camera) they show alone, and only while a charge is recharging, so
// a player who never dodges never sees them.
//
// The Brace meter (Whetstorm W4) is a thin bar under the pips: the meter left,
// lit while the stance is raised, marked after a break until it has refilled
// enough to raise again. It follows the pips' rule: with the reticle in Action
// Combat, alone in the classic mode only while braced or refilling.
//
// Gameplay-neutral by construction: nothing here reads a graphics preset or
// the FPS governor. The aim point is information the player acts on, so every
// tier shows the same crosshair (docs/design/graphics-settings-fairness.md).

export interface ActionCrosshairInput {
  /** The mode drives input this frame (game/action_combat_core.ts). */
  active: boolean;
  /** The pointer is held for free look. */
  captured: boolean;
  /** Free look wants the pointer but does not hold it: a click takes aim. */
  pending: boolean;
  /** The current target is an enemy the player may attack. */
  hostileTarget: boolean;
  /** Sidestep charges ready now (IWorld.sidestepStatus). */
  sidestepCharges: number;
  /** Charges the bank holds when full (0 hides the pips). */
  sidestepMax: number;
  /** 0 to 1: how far the next charge has come back, 0 with a full bank. */
  sidestepRecharge: number;
  /** The Brace stance is raised (IWorld.braceStatus). */
  braceUp: boolean;
  /** 0 to 1: the Brace meter left. */
  braceMeter: number;
  /** The meter broke and has not refilled to the raise threshold yet. */
  braceBroken: boolean;
}

/** The recharge fill is painted in this many steps, so a recharge writes the
 *  DOM a bounded number of times rather than every frame. */
export const SIDESTEP_FILL_STEPS = 20;

/** The Brace meter is painted in this many steps, for the same reason. */
export const BRACE_FILL_STEPS = 20;

export interface ActionCrosshairState {
  /** Anything shows (the reticle, the pips, or both). */
  visible: boolean;
  /** The reticle itself shows. */
  reticle: boolean;
  pending: boolean;
  engaged: boolean;
  /** The Sidestep pip row shows. */
  pips: boolean;
  /** Pips lit as ready. */
  ready: number;
  /** The recharging pip's fill, 0 to 1 in SIDESTEP_FILL_STEPS steps. */
  fill: number;
  /** The Brace meter bar shows. */
  brace: boolean;
  /** Lit: the stance is raised. */
  braceUp: boolean;
  /** Marked: broken and still refilling. */
  braceBroken: boolean;
  /** The bar's fill, 0 to 1 in BRACE_FILL_STEPS steps (rounded up, so only an
   *  empty meter paints empty). */
  braceFill: number;
}

export function createActionCrosshairState(): ActionCrosshairState {
  return {
    visible: false,
    reticle: false,
    pending: false,
    engaged: false,
    pips: false,
    ready: 0,
    fill: 0,
    brace: false,
    braceUp: false,
    braceBroken: false,
    braceFill: 1,
  };
}

/** Resolve one frame into `out` (caller-owned, so a frame allocates nothing).
 *  Hidden while the cursor is out on purpose (held Alt, an open window): the
 *  player is pointing at the interface then, not aiming. */
export function resolveActionCrosshair(
  input: ActionCrosshairInput,
  out: ActionCrosshairState,
): ActionCrosshairState {
  out.reticle = input.active && (input.captured || input.pending);
  out.pending = out.reticle && !input.captured;
  out.engaged = out.reticle && input.captured && input.hostileTarget;
  const max = Math.max(0, Math.floor(input.sidestepMax));
  const ready = Math.min(max, Math.max(0, Math.floor(input.sidestepCharges)));
  out.pips = max > 0 && (out.reticle || ready < max);
  out.ready = out.pips ? ready : 0;
  const recharge = Math.min(1, Math.max(0, input.sidestepRecharge));
  out.fill =
    out.pips && ready < max ? Math.floor(recharge * SIDESTEP_FILL_STEPS) / SIDESTEP_FILL_STEPS : 0;
  const meter = Number.isFinite(input.braceMeter) ? Math.min(1, Math.max(0, input.braceMeter)) : 1;
  out.brace = out.reticle || input.braceUp || meter < 1;
  out.braceUp = out.brace && input.braceUp;
  out.braceBroken = out.brace && input.braceBroken;
  out.braceFill = out.brace ? Math.ceil(meter * BRACE_FILL_STEPS) / BRACE_FILL_STEPS : 1;
  out.visible = out.reticle || out.pips || out.brace;
  return out;
}
