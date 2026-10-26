// The Sidestep key (Whetstorm W3): turns the movement the player is holding
// into the dodge's relative direction and asks the world for it. Shared by the
// keyboard and the pad through pad_shared_edge_action.ts, so a stick and WASD
// read the same way, in Action Combat and in the classic mode alike.
//
// Left counts a strafe OR a turn key (in classic mode A and D turn rather than
// strafe, and "A + Sidestep" should still dodge left); opposite keys cancel.
// With nothing held the dodge goes straight back, away from what the player
// faces. The world call is the whole client role: the server checks the state,
// spends the charge and opens the window, and the client predicts none of it.

import type { SidestepDirection } from '../sim/combat/sidestep';
import type { MoveInput } from '../sim/types';
import type { IWorld } from '../world_api';

export const SIDESTEP_ACTION_ID = 'sidestep';

/** The relative direction a held movement maps to. */
export function sidestepDirectionFor(
  input: Pick<
    MoveInput,
    'forward' | 'back' | 'strafeLeft' | 'strafeRight' | 'turnLeft' | 'turnRight'
  >,
): SidestepDirection {
  const fore = input.forward !== input.back ? (input.forward ? 1 : -1) : 0;
  const left = input.strafeLeft || input.turnLeft;
  const right = input.strafeRight || input.turnRight;
  const side = left !== right ? (left ? -1 : 1) : 0;
  if (fore > 0) return side < 0 ? 'forwardLeft' : side > 0 ? 'forwardRight' : 'forward';
  if (fore < 0) return side < 0 ? 'backLeft' : side > 0 ? 'backRight' : 'back';
  return side < 0 ? 'left' : side > 0 ? 'right' : 'back';
}

export type SidestepWorld = Pick<IWorld, 'moveInput' | 'sidestep'>;

/** The edge-action arm: true when `action` was the Sidestep key. */
export function dispatchSidestepAction(action: string, world: SidestepWorld): boolean {
  if (action !== SIDESTEP_ACTION_ID) return false;
  world.sidestep(sidestepDirectionFor(world.moveInput));
  return true;
}
