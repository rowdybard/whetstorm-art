// Brace (Whetstorm W4): the held action-combat block stance. Holding the key
// raises a guard that slows the player and blocks enemy hits from the front,
// paid for out of a meter. It layers on top of auto-attack and classic
// targeting; the classic shield block (the hit-table block roll, blockChance
// and blockValue) is untouched and separate.
//
// The rules, stated once:
//   - Server authoritative and held: the client sends `brace` with up true on
//     key down and false on key up (IWorld.setBrace). The stance takes effect
//     when the command is processed and covers the next tick on.
//   - Raising is refused, and spends nothing, in every state that refuses a
//     Sidestep (sidestep.ts sidestepBlocked: dead, stunned, rooted, feared,
//     polymorphed, mounted or mount-casting, swimming, another exclusive
//     movement mode, mid-dash, an uninterruptible channel), and while the
//     meter is broken or short of the raise cost. Raising cancels a cast or
//     channel in progress and stands a sitting player up. Lowering is free.
//   - The stance lowers on its own, at the brace tick (tickBrace, the
//     per-player loop in Sim.tick), whenever one of those refusal states
//     starts (a stun from behind, a mount, deep water), when a cast starts by
//     another path (an item's cast), and when the meter empties (a break,
//     with an error toast). Death lowers it in handleDeath, a Sidestep lowers
//     it as the dash starts, and a dropped connection lowers it in
//     server/disconnected_player_input.ts. A lost key-up is bounded by the
//     meter: a stuck hold drains it to a break in meterMax / drainPerSec
//     seconds (10 s with the starting values).
//   - While braced, auto-attack swings are suspended (the toggle stays on and
//     the swing timer keeps running, as during a cast) and every ability cast
//     is refused. Items still work.
//   - The block: a hit from an enemy (the Sidestep's enemy rule) whose origin
//     sits inside the frontal arc about the player's server-side facing
//     resolves as a 'block' event marked braced, for no damage, and drains the
//     meter by the incoming amount. The three funnels every hostile effect
//     passes through ask the one predicate (braceBlocksHit): dealDamage,
//     right after the Sidestep evade (evade first, then block), Sim.applyAura
//     (actionDefenseRefusesAura, the Sidestep check then this one) and
//     knockback.ts, right after the Sidestep check. So a blocked hit applies
//     no rider: no stun, no debuff, no knockback, no DoT.
//   - The origin is the attacker's position at resolution time. An area
//     mechanic that resolves from somewhere else (a telegraphed stomp or pulse
//     ring, a ground zone) notes its own origin first (brace_meter.ts
//     beginBraceAreaHit), and a mechanic authored `unblockable` lands from any
//     side. A harmful aura whose source is already gone has no position to
//     judge, so it lands.
//   - Not covered, like the Sidestep: sourceless environmental damage, self
//     damage, and unbreakable encounter control.
//   - A blocked hit that empties the meter is still blocked in full, and so
//     is anything else that lands in the same tick; the stance breaks at the
//     next brace tick.
//
// Latency: online the stance starts on the server tick that processes the
// raise and the server never rewinds a resolved hit. A telegraph reaches the
// client one way late and the press travels one way back, so the raise must
// leave at least one round trip plus one tick of command quantization before
// the impact the client sees: 200 ms at 150 ms RTT. Worked margins for Old
// Peatfire's Fire Breath: tests/brace.test.ts.
//
// Player text: the three refusals and the break are single-line English
// ctx.error literals with matcher rows in src/ui/sim_i18n.ts.

import { isDebuffAura } from '../aura_classify';
import { refusedWhileDead } from '../dead_gate';
import type { PlayerMeta } from '../sim';
import type { SimContext } from '../sim_context';
import type { Aura, Entity } from '../types';
import {
  BRACE_TUNING,
  type BraceStatus,
  braceArcCovers,
  braceBrokenAt,
  braceMeterAt,
  createBraceStatus,
  drainBraceForBlock,
  fillBraceStatus,
  lowerBrace,
  raiseBraceAt,
} from './brace_meter';
import { isUnbreakableControlAura } from './cc';
import { isEnemySource, sidestepBlocked, sidestepRefusesAura } from './sidestep';

/** Raise or lower the stance for the resolved player (IWorld.setBrace).
 *  Refusals spend nothing and say why; true when the stance is up after a
 *  raise, or was lowered. Draws no rng. */
export function setBraceStance(ctx: SimContext, up: boolean, pid?: number): boolean {
  const r = ctx.resolve(pid);
  if (!r || typeof up !== 'boolean') return false;
  const p = r.e;
  if (!up) return lowerBrace(p, ctx.tickCount);
  if (p.brace?.up) return true;
  if (refusedWhileDead(ctx, pid)) return false;
  if (sidestepBlocked(ctx, p, r.meta)) {
    ctx.error(p.id, 'You cannot brace right now.');
    return false;
  }
  const meter = braceMeterAt(p.brace, ctx.tickCount);
  if (braceBrokenAt(p.brace, ctx.tickCount) || meter < BRACE_TUNING.raiseCost) {
    ctx.error(p.id, 'Brace is not ready yet.');
    return false;
  }
  if (p.castingAbility !== null) ctx.cancelCast(p);
  if (p.sitting) p.sitting = false;
  raiseBraceAt(p, ctx.tickCount, meter);
  return true;
}

/** The brace tick (Sim.tick, every player, dead included): lower the stance
 *  when a refusal state has started or a cast is running, and break it when
 *  the meter is empty. A no-op for a player whose stance is down. */
export function tickBrace(ctx: SimContext, p: Entity, meta: PlayerMeta): void {
  const s = p.brace;
  if (!s?.up) return;
  if (p.dead || p.castingAbility !== null || sidestepBlocked(ctx, p, meta)) {
    lowerBrace(p, ctx.tickCount);
    return;
  }
  if (braceMeterAt(s, ctx.tickCount) > 0) return;
  lowerBrace(p, ctx.tickCount, true);
  ctx.error(p.id, 'Your Brace breaks!');
}

/** The one predicate: whether a raised stance blocks this enemy hit on a
 *  player, judged from the source (or its noted area origin). */
export function braceBlocksHit(ctx: SimContext, source: Entity, target: Entity): boolean {
  if (target.kind !== 'player' || source.id === target.id) return false;
  const s = target.brace;
  if (!s?.up || !isEnemySource(ctx, source, target)) return false;
  if (s.areaSourceId === source.id) {
    return !s.areaUnblockable && braceArcCovers(target, s.areaX, s.areaZ);
  }
  return braceArcCovers(target, source.pos.x, source.pos.z);
}

/** dealDamage: a blocked hit drains the meter by the incoming amount. */
export function drainBraceOnBlock(ctx: SimContext, target: Entity, amount: number): void {
  drainBraceForBlock(target, ctx.tickCount, amount);
}

/** Sim.applyAura: a harmful aura from an enemy inside the arc is refused.
 *  Helpful and self auras, non-harmful encounter state, unbreakable encounter
 *  control, and an aura whose source is already gone still land. */
export function braceRefusesAura(ctx: SimContext, target: Entity, aura: Aura): boolean {
  if (target.kind !== 'player' || !target.brace?.up || aura.sourceId === target.id) return false;
  if (isUnbreakableControlAura(aura) || !isDebuffAura(aura.kind, aura.value)) return false;
  const source = ctx.entities.get(aura.sourceId);
  return source !== undefined && braceBlocksHit(ctx, source, target);
}

/** knockback.ts: an enemy shove from inside the arc moves the player 0 yards. */
export function braceRefusesKnockback(ctx: SimContext, source: Entity, target: Entity): boolean {
  return braceBlocksHit(ctx, source, target);
}

/** Sim.applyAura's one line for both action defenses: the Sidestep's evade
 *  window first, then the Brace arc. */
export function actionDefenseRefusesAura(ctx: SimContext, target: Entity, aura: Aura): boolean {
  return sidestepRefusesAura(ctx, target, aura) || braceRefusesAura(ctx, target, aura);
}

/** The read-only status for a resolved player (Sim.braceStatus). */
export function braceStatusOf(
  ctx: SimContext,
  pid: number | undefined,
  out: BraceStatus = createBraceStatus(),
): BraceStatus {
  const r = ctx.resolve(pid);
  return fillBraceStatus(r?.e.brace, ctx.tickCount, out);
}
