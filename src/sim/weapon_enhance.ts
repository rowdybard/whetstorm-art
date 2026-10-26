// Weapon enhancement (Whetstorm W1a): one attempt at the forge to raise a
// WORN weapon's per-copy level by one, +0 to +15.
//
// A sim SYSTEM module behind the SimContext seam (src/sim/CLAUDE.md): it holds
// functions only; the state it touches stays where it already lives (the
// copper purse and bags on PlayerMeta, the per-copy level on
// PlayerMeta.equipmentInstance[slot].enhanceLevel). Sim.enhanceWeapon is the
// thin delegate every host calls (offline IWorld, the server's enhance_weapon
// dispatch, the headless env), so all three resolve the same attempt on the
// same tick with the same draw.
//
// The rules, all from the brief and the owner's defaults:
//   - the attempt targets a worn weapon by HAND (`{ slot }`), the one copy the
//     player is holding; a bag copy is a follow-up, not this module's job;
//   - it needs the player at a forge station (professions/stations.ts, the
//     same static anchors weapon and armor crafting use);
//   - every attempt costs the rung's copper and Iron Ore, success or failure;
//   - success odds fall as the level rises (weapon_enhance_table.ts, the
//     owner-tunable ladder), drawn with EXACTLY ONE ctx.rng.next() per
//     resolved attempt, never on a refusal;
//   - a failure NEVER lowers the level and never destroys the weapon;
//   - the ladder caps at WEAPON_ENHANCE_MAX_LEVEL and refuses above it;
//   - the damage itself is baked by recalcPlayerStats (entity.ts) from the
//     source payload, so a success re-runs it here like every worn-payload
//     mutation does (professions/enchanting.ts, professions/perfecting.ts).
//
// Player text: every refusal is a single-line English ctx.error literal and
// the two outcome lines are ctx.notice templates; src/ui/sim_i18n.ts carries a
// matcher row for each (the language-agnostic sim rule), and the S3 drift
// guard (tests/localization_fixes.test.ts) scans this file.

import { ITEMS } from './data';
import { refusedWhileDead } from './dead_gate';
import { recalcPlayerStats } from './entity';
import { countRawInSlots, countUnlockedInSlots, removeUnlockedFromSlots } from './item_lock';
import { isAtStation } from './professions/stations';
import type { SimContext } from './sim_context';
import {
  WEAPON_ENHANCE_MATERIAL_ID,
  WEAPON_ENHANCE_MAX_LEVEL,
  weaponEnhanceLevelOf,
  weaponEnhanceStep,
} from './weapon_enhance_table';

/** The two hands a worn weapon can sit in. */
export type WeaponEnhanceSlot = 'mainhand' | 'offhand';

/** Which copy an attempt targets: the weapon worn in that hand. */
export interface WeaponEnhanceRef {
  slot: WeaponEnhanceSlot;
}

/** True for a legal hand token (the server dispatch's shape check reads it). */
export function isWeaponEnhanceSlot(value: unknown): value is WeaponEnhanceSlot {
  return value === 'mainhand' || value === 'offhand';
}

/** Why an attempt was refused before anything was spent. */
export type WeaponEnhanceRefusal =
  | 'no_player'
  | 'dead'
  | 'not_at_forge'
  | 'no_weapon'
  | 'max_level'
  | 'insufficient_copper'
  | 'material_locked'
  | 'insufficient_materials';

/** The attempt's verdict. `ok` means the attempt RESOLVED (cost charged, one
 *  draw made); `success` then says whether the level rose. */
export type WeaponEnhanceResult =
  | { ok: false; reason: WeaponEnhanceRefusal }
  | {
      ok: true;
      success: boolean;
      slot: WeaponEnhanceSlot;
      itemId: string;
      levelBefore: number;
      levelAfter: number;
      copperSpent: number;
      materialItemId: string;
      materialSpent: number;
    };

/**
 * Resolve one enhancement attempt for `pid` (the primary player when
 * undefined). DENY LADDER, in order, first match wins; every refusal draws
 * ZERO rng, charges nothing, and emits its one error line (none for an
 * unresolvable player):
 *   1. dead (the shared dead_gate line)
 *   2. not standing at a forge
 *   3. no weapon worn in the named hand (a malformed hand reads the same)
 *   4. already at WEAPON_ENHANCE_MAX_LEVEL
 *   5. copper short (the shared "Not enough money." line)
 *   6. Iron Ore short only because some of it is locked (the locked line)
 *   7. Iron Ore genuinely short
 * Resolution order (the documented rng position): charge the copper, remove
 * the ore through the lock-aware walk, draw EXACTLY ONE ctx.rng.next();
 * roll < successChance raises the level by one (creating the payload on a
 * plain copy) and re-bakes the worn stats; either way the outcome notice and
 * the personal weaponEnhanceResult event fire and wireRev bumps (the bags
 * changed on both outcomes).
 */
export function attemptWeaponEnhance(
  ctx: SimContext,
  ref: WeaponEnhanceRef,
  pid?: number,
): WeaponEnhanceResult {
  if (refusedWhileDead(ctx, pid)) return { ok: false, reason: 'dead' };
  const r = ctx.resolve(pid);
  if (!r) return { ok: false, reason: 'no_player' };
  const { meta, e } = r;
  if (!isAtStation(ctx.stationPlacements, e.pos, 'forge')) {
    ctx.error(meta.entityId, 'You must stand at a forge to enhance a weapon.');
    return { ok: false, reason: 'not_at_forge' };
  }
  const slot = ref?.slot;
  const itemId = isWeaponEnhanceSlot(slot) ? meta.equipment[slot] : undefined;
  const def = itemId ? ITEMS[itemId] : undefined;
  if (!isWeaponEnhanceSlot(slot) || !itemId || def?.kind !== 'weapon') {
    ctx.error(meta.entityId, 'You have no weapon in that hand to enhance.');
    return { ok: false, reason: 'no_weapon' };
  }
  const levelBefore = weaponEnhanceLevelOf(meta.equipmentInstance[slot]);
  const step = weaponEnhanceStep(levelBefore + 1);
  if (levelBefore >= WEAPON_ENHANCE_MAX_LEVEL || !step) {
    ctx.error(meta.entityId, 'That weapon is already fully enhanced.');
    return { ok: false, reason: 'max_level' };
  }
  if (meta.copper < step.copper) {
    ctx.error(meta.entityId, 'Not enough money.');
    return { ok: false, reason: 'insufficient_copper' };
  }
  if (countUnlockedInSlots(meta.inventory, WEAPON_ENHANCE_MATERIAL_ID) < step.materialCount) {
    // The perfecting precedent: raw counts that would cover the need mean the
    // shortfall is the player's own lock, which gets its own line.
    if (countRawInSlots(meta.inventory, WEAPON_ENHANCE_MATERIAL_ID) >= step.materialCount) {
      ctx.error(meta.entityId, 'A material needed for enhancement is locked.');
      return { ok: false, reason: 'material_locked' };
    }
    ctx.error(meta.entityId, 'You lack the materials to enhance that weapon.');
    return { ok: false, reason: 'insufficient_materials' };
  }

  meta.copper -= step.copper;
  removeUnlockedFromSlots(meta.inventory, WEAPON_ENHANCE_MATERIAL_ID, step.materialCount);
  ctx.onInventoryChangedForQuests?.(meta);
  const success = ctx.rng.next() < step.successChance;
  const levelAfter = success ? levelBefore + 1 : levelBefore;
  if (success) {
    // In place on the worn payload (the enchanting/perfecting worn-mutation
    // recipe); a plain copy gains its first payload here, which equip and
    // unequip already carry to and from the bags (items.ts).
    const payload = meta.equipmentInstance[slot] ?? {};
    payload.enhanceLevel = levelAfter;
    meta.equipmentInstance[slot] = payload;
    recalcPlayerStats(e, meta.cls, meta.equipment, ctx.playerMods(meta), meta.equipmentInstance);
    ctx.notice(meta.entityId, `Enhancement succeeded: ${def.name} rises to +${levelAfter}.`);
  } else {
    ctx.notice(
      meta.entityId,
      `Enhancement failed: ${def.name} stays at +${levelBefore}; the gold and materials are spent.`,
    );
  }
  const outcome = {
    success,
    slot,
    itemId,
    levelBefore,
    levelAfter,
    copperSpent: step.copper,
    materialItemId: WEAPON_ENHANCE_MATERIAL_ID,
    materialSpent: step.materialCount,
  };
  ctx.emit({ type: 'weaponEnhanceResult', pid: meta.entityId, ...outcome });
  // The rift forge ops' wire bump on an in-place payload mutation: the
  // owner's heavy self mirrors (inv, einst) re-diff on the next snapshot.
  meta.wireRev++;
  return { ok: true, ...outcome };
}
