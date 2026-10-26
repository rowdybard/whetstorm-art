// The Brace bind (Whetstorm W4): the client half of the held block stance.
// The stance itself is the server's (src/sim/combat/brace.ts): this only turns
// "the bind is held" into the two world calls, IWorld.setBrace(true) on the
// frame the hold starts and setBrace(false) on the frame it ends, so a held
// key costs one command each way and nothing per frame. It runs from the
// Action Combat frame (action_combat_wiring.ts) in both camera modes.
//
// Sent on edges only, never re-sent while held: a stance the server lowered
// on its own (a break, a stun, a Sidestep) stays down until the player lets go
// and presses again, which is the rule a meter break needs to mean anything.
// The safety of the hold, stated once: Input.isBraceHeld reads false while a
// modal or transition suspends input and after a lost window focus (the held
// keys clear), the pad releases on its own (PadBraceHold below), and the
// server lowers the stance on death, on a dropped connection and when the
// meter empties, so a lost key-up can never hold it forever.

import type { IWorld } from '../world_api';

export const BRACE_ACTION_ID = 'brace';

export type BraceWorld = Pick<IWorld, 'setBrace'>;

/** Edge sync from the held bind to the world. One per client. */
export class BraceKeySync {
  private sent = false;

  /** Call once per frame with whether the bind is held now. */
  sync(world: BraceWorld, held: boolean): void {
    if (held === this.sent) return;
    this.sent = held;
    world.setBrace(held);
  }
}

/** The pad's Brace hold: the buttons bound to Brace that are down. A press
 *  raises it; it lowers when the last of them comes up, or at once when the
 *  pad releases every hold (an unfocused window, a vehicle, a window taking
 *  the pad, the pad going away). */
export class PadBraceHold {
  private readonly buttons = new Set<number>();

  constructor(private readonly set: (held: boolean) => void) {}

  /** A button bound to Brace went down (gamepad.ts dispatch). */
  press(button: number): void {
    const was = this.buttons.size > 0;
    this.buttons.add(button);
    if (!was) this.set(true);
  }

  /** Drop the buttons this poll no longer reports down. */
  sync(pressed: readonly boolean[]): void {
    if (this.buttons.size === 0) return;
    for (const b of this.buttons) if (!pressed[b]) this.buttons.delete(b);
    if (this.buttons.size === 0) this.set(false);
  }

  /** Let go of the hold whatever the buttons say. */
  release(): void {
    if (this.buttons.size === 0) return;
    this.buttons.clear();
    this.set(false);
  }
}
