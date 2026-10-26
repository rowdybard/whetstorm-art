// The worn weapon's two server seams for Whetstorm weapon enhancement (W1a),
// lifted out of server/game.ts (the monolith ratchet) so each is a small,
// tested function the coordinator calls in one line:
//
//   - writeWornWeaponWire: the held-weapon identity keys (mh, oh, wsk) plus
//     the equipped main hand's enhancement level (wen). Identity fields ride
//     only in FULL records (first sight and on change: wireCacheFor diffs the
//     identity JSON every tick), so a successful attempt re-emits to every
//     nearby session automatically. Sparse like its siblings: `wen` is absent
//     at +0, and the client reads an absent key in a full record as +0
//     (src/net/worn_gear_wire.ts decodeWornGearWire). Render-only: the W1b
//     glow reads it; damage stays sim-side.
//   - dispatchWeaponEnhance: the enhance_weapon command arm. The frame's one
//     field is the hand (`slot`, 'mainhand' | 'offhand'); a malformed frame
//     returns null and gets no ack (the silence every malformed command
//     gets), a well-formed one always acks with the sim's verdict, refused or
//     not (server/rift_forge_dispatch.ts's contract). The sim re-validates
//     everything (the forge, the weapon, the cap, the cost), so nothing here
//     trusts client data.

import type { Sim } from '../src/sim/sim';
import type { Entity } from '../src/sim/types';
import { isWeaponEnhanceSlot, type WeaponEnhanceResult } from '../src/sim/weapon_enhance';

/** Write the held-weapon identity keys onto a wire record, in the wire's
 *  established order (mh, oh, wsk) with the enhancement level after them. */
export function writeWornWeaponWire(
  e: Pick<Entity, 'mainhandItemId' | 'offhandItemId' | 'weaponSkinId' | 'mainhandEnhanceLevel'>,
  out: Record<string, unknown>,
): void {
  if (e.mainhandItemId) out.mh = e.mainhandItemId; // equipped mainhand: held weapon model (render-only)
  if (e.offhandItemId) out.oh = e.offhandItemId; // equipped offhand: held weapon model (render-only)
  if (e.weaponSkinId) out.wsk = e.weaponSkinId; // active weapon-skin cosmetic (render-only, like mh)
  if (e.mainhandEnhanceLevel > 0) out.wen = e.mainhandEnhanceLevel; // main-hand +N (render-only)
}

type EnhanceMessage = Readonly<Record<string, unknown>>;

/** Run one enhance_weapon frame against the sim and answer the commandOutcome
 *  ack through `ack` with whether the attempt resolved. Returns the sim's
 *  result, or null (and no ack) for a malformed frame. */
export function dispatchWeaponEnhance(
  sim: Pick<Sim, 'enhanceWeapon'>,
  msg: EnhanceMessage,
  pid: number,
  ack: (ok: boolean) => void,
): WeaponEnhanceResult | null {
  if (!isWeaponEnhanceSlot(msg.slot)) return null;
  const result = sim.enhanceWeapon({ slot: msg.slot }, pid);
  ack(result.ok);
  return result;
}
