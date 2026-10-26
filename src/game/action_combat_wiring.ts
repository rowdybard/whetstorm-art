// Action Combat wiring: the one place the mode meets the client systems. Each
// frame it decides whether the mode is live (device gating in
// action_combat_core.ts), hands the camera the shoulder framing, tells the
// input layer whether to hold the pointer, runs the soft-target controller on
// the crosshair ray while the pointer is held, and paints the crosshair. The
// two captured clicks land here too: left starts the attack on the current
// target, right is the ordinary right-click pick at the crosshair.
//
// The soft target is only a client choice: it goes out through the ordinary
// target command (world.targetEntity, the call a click makes), only when it
// changes, and the server validates it like any other target. The reach and
// the body radius it picks with come from the server's own reach table
// (soft_target_reach.ts), so it never names something the server would refuse
// the player's attack on.
//
// Interaction with Tab and click targeting, stated once: a target the
// controller did not pick (Tab, Shift+Tab, a click with the cursor out, a party
// frame, the pad) holds until it dies, leaves the 40 yd range or leaves the
// wide view cone; then the crosshair picks again. An empty crosshair never
// clears a target. See soft_target_controller.ts for the pinned rules.
//
// The frame also carries the two action defenses that work in both camera
// modes: the Sidestep pips and the Brace meter on the crosshair, and the held
// Brace bind's edges out to the world (brace_input.ts).
//
// main.ts holds one handle (mountActionCombat) and calls frame() once per
// frame; nothing else in the mode lives there.

import { createBraceStatus } from '../sim/combat/brace_meter';
import { rangedAutoProfile } from '../sim/combat/form_swing';
import { createSidestepStatus } from '../sim/combat/sidestep';
import { entityLineOfSightClear } from '../sim/line_of_sight_elevation';
import type { Entity } from '../sim/types';
import type { ActionCrosshairInput } from '../ui/hud/action_combat';
import type { IWorld } from '../world_api';
import {
  ACTION_COMBAT_UI_POLL_MS,
  type ActionCombatDevice,
  actionCombatActive,
  actionCombatFraming,
  actionCombatWantsCapture,
} from './action_combat_core';
import { BraceKeySync } from './brace_input';
import { currentInputHintMode } from './input_hint_mode';
import { activePvpOpponentIds, isAttackableEntity } from './interactions';
import { SoftTargetController, type SoftTargetWorldView } from './soft_target_controller';
import type { SoftTargetAim } from './soft_target_core';
import {
  type SoftTargetRangedReach,
  softTargetBodyRadius,
  softTargetInReach,
} from './soft_target_reach';

export type ActionCombatWorld = Pick<
  IWorld,
  | 'player'
  | 'playerId'
  | 'entities'
  | 'cfg'
  | 'talentSpec'
  | 'riftCollisionToken'
  | 'targetEntity'
  | 'startAutoAttack'
  | 'duelInfo'
  | 'arenaInfo'
  | 'bgInfo'
  | 'sidestepStatus'
  | 'setBrace'
  | 'braceStatus'
>;

/** The camera, read structurally (a THREE.PerspectiveCamera satisfies it):
 *  its ground position and its forward axis (minus the matrix's third column). */
export interface ActionCombatCamera {
  readonly position: { readonly x: number; readonly z: number };
  readonly matrixWorld: { readonly elements: ArrayLike<number> };
}

export interface ActionCombatDeps {
  world: ActionCombatWorld;
  input: {
    readonly camYaw: number;
    setActionLook(active: boolean, captureWanted: boolean): void;
    isActionLookCaptured(): boolean;
    isActionLookPending(): boolean;
    /** The Brace bind is held (Input.isBraceHeld). */
    isBraceHeld(): boolean;
  };
  /** The `actionCombat` setting. */
  enabled: () => boolean;
  /** The device in use (input_hint_mode.ts currentInputHintMode). */
  device: () => ActionCombatDevice;
  /** A window, menu, chat, prompt or modal wants the cursor. Polled every
   *  ACTION_COMBAT_UI_POLL_MS while the mode is live, never per frame. */
  uiWantsCursor: () => boolean;
  camera: ActionCombatCamera;
  /** The shoulder framing request (ActionCamRig.setCombatFraming). */
  framing: (on: boolean) => void;
  crosshair: { paint(input: ActionCrosshairInput): void };
  /** The ordinary click pick (main.ts handlePick). */
  pick: (x: number, y: number, button: number) => void;
  /** A ground-targeted spell is waiting for its point. */
  groundAimActive: () => boolean;
  /** The sight rule (defaults to the sim's own entity line of sight). */
  hasLineOfSight?: (from: Entity, to: Entity) => boolean;
}

export interface ActionCombatHandle {
  frame(nowMs: number): void;
  click(kind: 'attack' | 'interact', x: number, y: number): void;
}

export function createActionCombat(deps: ActionCombatDeps): ActionCombatHandle {
  const { world } = deps;
  const pvp = new Set<number>();
  const actor = { cls: world.cfg.playerClass, spec: world.talentSpec as string | null };
  let ranged: SoftTargetRangedReach | undefined;
  const attackable = (e: Entity | undefined): boolean => isAttackableEntity(e, world.playerId, pvp);
  const view: SoftTargetWorldView<Entity> & { targetId: number | null } = {
    entities: world.entities,
    targetId: null,
    entity: (id) => world.entities.get(id),
    bodyRadius: (e) => softTargetBodyRadius(e),
    inReach: (e, d) => softTargetInReach(e, d, actor, ranged),
    isAttackable: (e) => attackable(e),
    hasLineOfSight: (e) =>
      deps.hasLineOfSight
        ? deps.hasLineOfSight(world.player, e)
        : entityLineOfSightClear(
            world.cfg.seed,
            world.player,
            e,
            0.05,
            undefined,
            world.riftCollisionToken,
          ),
  };
  const controller = new SoftTargetController<Entity>((id) => world.targetEntity(id));
  const aim: SoftTargetAim = { x: 0, z: 0, yaw: 0 };
  const cross: ActionCrosshairInput = {
    active: false,
    captured: false,
    pending: false,
    hostileTarget: false,
    sidestepCharges: 0,
    sidestepMax: 0,
    sidestepRecharge: 0,
    braceUp: false,
    braceMeter: 1,
    braceBroken: false,
  };
  const sidestep = createSidestepStatus();
  const brace = createBraceStatus();
  const braceKey = new BraceKeySync();
  let uiWants = false;
  let nextUiPoll = Number.NEGATIVE_INFINITY;
  let wasCaptured = false;

  function readAim(): void {
    const m = deps.camera.matrixWorld.elements;
    const fx = -m[8];
    const fz = -m[10];
    aim.x = deps.camera.position.x;
    aim.z = deps.camera.position.z;
    // Straight down has no ground heading: fall back to the orbit yaw.
    aim.yaw = Math.hypot(fx, fz) > 1e-6 ? Math.atan2(fx, fz) : deps.input.camYaw;
  }

  return {
    frame(nowMs: number): void {
      const enabled = deps.enabled();
      const device = deps.device();
      const active = actionCombatActive(enabled, device);
      deps.framing(actionCombatFraming(enabled, device));
      if (!active) {
        uiWants = false;
        nextUiPoll = Number.NEGATIVE_INFINITY;
      } else if (nowMs >= nextUiPoll) {
        uiWants = deps.uiWantsCursor();
        nextUiPoll = nowMs + ACTION_COMBAT_UI_POLL_MS;
      }
      deps.input.setActionLook(active, actionCombatWantsCapture(active, uiWants));
      const captured = active && deps.input.isActionLookCaptured();
      const p = world.player;
      if (active) activePvpOpponentIds(world, pvp);
      if (captured && !p.dead) {
        actor.cls = world.cfg.playerClass;
        actor.spec = world.talentSpec;
        ranged = rangedAutoProfile(p, world.cfg.playerClass);
        view.targetId = p.targetId;
        readAim();
        controller.step(view, aim, p.pos, nowMs);
      } else if (wasCaptured) {
        controller.reset();
      }
      wasCaptured = captured;
      cross.active = active;
      cross.captured = captured;
      cross.pending = active && deps.input.isActionLookPending();
      cross.hostileTarget =
        active && p.targetId !== null && attackable(world.entities.get(p.targetId));
      // The Sidestep pips ride the crosshair in both modes (crosshair_view.ts).
      world.sidestepStatus(sidestep);
      cross.sidestepCharges = sidestep.charges;
      cross.sidestepMax = sidestep.maxCharges;
      cross.sidestepRecharge =
        sidestep.rechargeTotal > 0 && sidestep.rechargeRemaining > 0
          ? 1 - sidestep.rechargeRemaining / sidestep.rechargeTotal
          : 0;
      braceKey.sync(world, deps.input.isBraceHeld());
      world.braceStatus(brace);
      cross.braceUp = brace.up;
      cross.braceMeter = brace.meterMax > 0 ? brace.meter / brace.meterMax : 1;
      cross.braceBroken = brace.broken;
      deps.crosshair.paint(cross);
    },

    click(kind: 'attack' | 'interact', x: number, y: number): void {
      if (kind === 'interact') {
        deps.pick(x, y, 2);
        return;
      }
      // A ground-targeted spell takes its point from the crosshair, as a left
      // click on the ground would.
      if (deps.groundAimActive()) {
        deps.pick(x, y, 0);
        return;
      }
      const p = world.player;
      if (p.dead || p.autoAttack || p.targetId === null) return;
      if (!attackable(world.entities.get(p.targetId))) return;
      world.startAutoAttack();
    },
  };
}

/** What main.ts already holds, read structurally. */
export interface ActionCombatHost {
  world: ActionCombatWorld;
  input: ActionCombatDeps['input'];
  settings: { get(key: 'actionCombat'): boolean };
  renderer: {
    readonly camera: ActionCombatCamera;
    readonly actionCam: { setCombatFraming(on: boolean): void };
  };
  hud: {
    readonly actionCrosshair: ActionCombatDeps['crosshair'];
    isWindowOpen(): boolean;
    isGroundAimActive(): boolean;
  };
  /** main.ts gameplayInputBlocked: a modal, prompt or focused chat. */
  gameplayInputBlocked: () => boolean;
}

/** The one call main.ts makes: build the mode from the systems it holds. */
export function mountActionCombat(
  host: ActionCombatHost,
  pick: ActionCombatDeps['pick'],
): ActionCombatHandle {
  const { hud, renderer } = host;
  return createActionCombat({
    world: host.world,
    input: host.input,
    enabled: () => host.settings.get('actionCombat'),
    device: currentInputHintMode,
    uiWantsCursor: () => hud.isWindowOpen() || host.gameplayInputBlocked(),
    camera: renderer.camera,
    framing: (on) => renderer.actionCam.setCombatFraming(on),
    crosshair: hud.actionCrosshair,
    pick,
    groundAimActive: () => hud.isGroundAimActive(),
  });
}
