// Action Combat: when the mode is live, and what it implies. Pure, so the
// device gating (the reason touch and pad play stay exactly as they were) is
// pinned by a test rather than by reading main.ts.
//
// The mode is a NEW opt-in (the `actionCombat` setting), not an extension of
// the `actionCam` toggle. Action Cam stays what it was: a framing-only camera
// preference that changes no input. Action Combat implies that framing and
// adds the input half: free look on a held pointer, the character facing the
// camera, A and D strafing, the crosshair, and soft targeting. A player who
// only wanted the framing keeps it untouched; turning Action Combat off hands
// the framing back to their own Action Cam choice.
//
// Registered in UI_PURE_CORES (tests/architecture.test.ts).

/** The device the player is using right now (input_hint_mode.ts's union,
 *  restated so this core imports no game module). */
export type ActionCombatDevice = 'keyboard' | 'touch' | 'pad';

/**
 * Whether Action Combat drives input this frame. Only for keyboard and mouse
 * play: the touch interface replaces the control scheme outright, and while the
 * pad is the active device its own stick look and auto-target own the camera
 * and the target, so the mode stands aside until the mouse or keyboard is
 * touched again.
 */
export function actionCombatActive(enabled: boolean, device: ActionCombatDevice): boolean {
  return enabled && device === 'keyboard';
}

/**
 * Whether the setting implies the shoulder framing. Everywhere but the touch
 * interface: the framing is a camera preference with no input effect, so a pad
 * player who turned the mode on keeps a steady view rather than one that
 * re-frames every time they swap devices.
 */
export function actionCombatFraming(enabled: boolean, device: ActionCombatDevice): boolean {
  return enabled && device !== 'touch';
}

/**
 * Whether the pointer should be held for free look right now: the mode is live
 * and no window, menu, chat or prompt wants the cursor.
 */
export function actionCombatWantsCapture(active: boolean, uiWantsCursor: boolean): boolean {
  return active && !uiWantsCursor;
}

/** How often (ms) the frame loop re-reads the "does the UI want the cursor"
 *  question: it walks the open windows, so not every frame. */
export const ACTION_COMBAT_UI_POLL_MS = 100;
