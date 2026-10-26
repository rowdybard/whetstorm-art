// Action Combat free look: the pure decisions behind holding the pointer.
// input.ts owns the DOM half (the pointer lock calls and the listeners) and
// asks these questions, so the rules are pinned by tests/action_look_core.test.ts
// rather than by reading event handlers.
//
// The pointer is held for free look while the mode is live, nothing in the UI
// wants the cursor, the player is not holding the cursor key, and the HUD is
// not in its arrange mode. Held, a mouse move turns the camera without a
// button, a left press starts the attack and a right press interacts with
// whatever is under the crosshair (the same pick a right click makes). Let go
// (Alt held, a window open, Escape, a focus loss), every mouse gesture is
// exactly the classic one again.
//
// Registered in UI_PURE_CORES (tests/architecture.test.ts).

/** The keys that hand the cursor back while held (either Alt). */
const CURSOR_KEYS: ReadonlySet<string> = new Set(['AltLeft', 'AltRight']);

/** True for a key that hands the cursor back while held. */
export function isActionLookCursorKey(code: string): boolean {
  return CURSOR_KEYS.has(code);
}

/** What a press means while the pointer is held for free look. */
export type ActionLookClick = 'attack' | 'interact' | null;

/** Left starts the attack, right interacts; any other button keeps its own
 *  binding (the window-level bindable mouse buttons) and means nothing here. */
export function actionLookClickFor(button: number): ActionLookClick {
  if (button === 0) return 'attack';
  if (button === 2) return 'interact';
  return null;
}

export interface ActionLookLockState {
  /** The mode drives input (action_combat_core.ts actionCombatActive). */
  active: boolean;
  /** No window, menu, chat or prompt wants the cursor. */
  captureWanted: boolean;
  /** The player is holding the cursor key. */
  cursorHeld: boolean;
  /** The HUD's arrange mode owns the mouse. */
  cameraLocked: boolean;
}

/** Whether the pointer should be held for free look right now. */
export function actionLookWantsLock(s: ActionLookLockState): boolean {
  return s.active && s.captureWanted && !s.cursorHeld && !s.cameraLocked;
}

/**
 * Whether to ask for the lock again without waiting for a click: after the
 * game itself let go (a window closed, the cursor key came up). Never after
 * the player left with Escape (that is a request to get out, and browsers
 * refuse an immediate re-lock then anyway), and never on a browser that only
 * grants the lock inside a click (Firefox, see pointerLockNeedsSyncGesture in
 * pointer_lock.ts). Either way the crosshair shows its "Click to aim" line and
 * the next click takes aim.
 */
export function actionLookMayRelock(s: {
  needsSyncGesture: boolean;
  userExited: boolean;
}): boolean {
  return !s.needsSyncGesture && !s.userExited;
}
