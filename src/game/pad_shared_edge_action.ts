import type { InterfaceVisibility } from '../ui/interface_visibility_core';
import { dispatchInterfaceVisibilityAction } from '../ui/interface_visibility_core';
import type { Input } from './input';
import { dispatchPetAction, type PetCommandWorld } from './pet_commands';
import { dispatchSidestepAction, type SidestepWorld } from './sidestep_input';
import { zoomStepForAction } from './wheel_binds';

export interface PadSharedEdgeActionDeps {
  input: Pick<Input, 'zoomBy'>;
  interfaceVisibility: InterfaceVisibility;
  world: PetCommandWorld & SidestepWorld;
}

/** Shared keyboard and controller routing for edge binds handled outside the
 *  switches: pet commands, hide-interface, camera zoom and the Sidestep. */
export function dispatchPadSharedEdgeAction(
  action: string,
  deps: PadSharedEdgeActionDeps,
): boolean {
  if (dispatchPetAction(action, deps.world)) return true;
  if (dispatchInterfaceVisibilityAction(action, deps.interfaceVisibility)) return true;
  if (dispatchSidestepAction(action, deps.world)) return true;
  const zoomStep = zoomStepForAction(action);
  if (zoomStep === null) return false;
  deps.input.zoomBy(zoomStep);
  return true;
}
