// Weapon enhancement (+1 to +15): the declarative ladder and the pure reads
// both hosts and the tooltip share. A pure leaf (no SimContext, no rng, no
// clock), so a Vitest, the system module (weapon_enhance.ts), the one stat
// pass (entity.ts recalcPlayerStats) and the item tooltip all read the same
// numbers and cannot drift.
//
// Per-copy state is ItemInstancePayload.enhanceLevel: an integer in
// [1, WEAPON_ENHANCE_MAX_LEVEL], absent = +0 (the perfecting rank idiom, so a
// plain weapon never grows an inert payload key and old saves load at +0).
// The shape copies the Rift gear forge (rift/progression.ts upgradeLevel plus
// its cost ladder), never its numbers.

import type { ItemInstancePayload, WeaponInfo } from './types';

/** The top of the ladder. An attempt at a copy already here is refused. */
export const WEAPON_ENHANCE_MAX_LEVEL = 15;

/** The material every attempt consumes beside the gold: the existing
 *  node-gathered Iron Ore (content/items.ts iron_ore), a weaponsmithing
 *  staple, so the forge adds a sink for an existing faucet instead of a new
 *  item. */
export const WEAPON_ENHANCE_MATERIAL_ID = 'iron_ore';

/** One rung: the attempt that takes a copy from `level - 1` to `level`. */
export interface WeaponEnhanceStep {
  /** The level this attempt reaches on success. */
  level: number;
  /** Success odds of the attempt, 0..1 (one seeded draw per attempt). */
  successChance: number;
  /** CUMULATIVE weapon damage bonus at this level, in percent points of the
   *  copy's own min and max damage. */
  damagePct: number;
  /** Copper charged per attempt, success or failure. */
  copper: number;
  /** WEAPON_ENHANCE_MATERIAL_ID units charged per attempt, success or failure. */
  materialCount: number;
}

// STARTING VALUES FOR THE OWNER TO TUNE. Classic-era formulas supply none of
// these, so every number below is a placeholder chosen for shape, not
// balance: odds fall as the level rises, the damage curve steepens past +5
// and +10, and the cost climbs so the last rungs are a long-term gold and ore
// sink (about 300 gold in expectation from +0 to +15 at these odds). A
// failure charges the same cost and never lowers the level (owner default).
// Index i is the attempt that reaches +(i + 1).
export const WEAPON_ENHANCE_STEPS: readonly WeaponEnhanceStep[] = Object.freeze([
  { level: 1, successChance: 1.0, damagePct: 1, copper: 1_000, materialCount: 1 },
  { level: 2, successChance: 0.95, damagePct: 2, copper: 2_000, materialCount: 1 },
  { level: 3, successChance: 0.9, damagePct: 3, copper: 4_000, materialCount: 2 },
  { level: 4, successChance: 0.85, damagePct: 4, copper: 6_000, materialCount: 2 },
  { level: 5, successChance: 0.8, damagePct: 5, copper: 8_000, materialCount: 3 },
  { level: 6, successChance: 0.7, damagePct: 7, copper: 10_000, materialCount: 3 },
  { level: 7, successChance: 0.6, damagePct: 9, copper: 15_000, materialCount: 4 },
  { level: 8, successChance: 0.5, damagePct: 11, copper: 20_000, materialCount: 4 },
  { level: 9, successChance: 0.45, damagePct: 13, copper: 30_000, materialCount: 5 },
  { level: 10, successChance: 0.4, damagePct: 15, copper: 40_000, materialCount: 5 },
  { level: 11, successChance: 0.3, damagePct: 18, copper: 50_000, materialCount: 6 },
  { level: 12, successChance: 0.25, damagePct: 21, copper: 65_000, materialCount: 7 },
  { level: 13, successChance: 0.2, damagePct: 24, copper: 80_000, materialCount: 8 },
  { level: 14, successChance: 0.15, damagePct: 27, copper: 100_000, materialCount: 9 },
  { level: 15, successChance: 0.1, damagePct: 30, copper: 120_000, materialCount: 10 },
]);

/** True for a value a legal writer could have stored: an integer in
 *  [1, WEAPON_ENHANCE_MAX_LEVEL]. */
export function isStoredWeaponEnhanceLevel(value: unknown): value is number {
  return (
    typeof value === 'number' &&
    Number.isInteger(value) &&
    value >= 1 &&
    value <= WEAPON_ENHANCE_MAX_LEVEL
  );
}

/** The copy's enhancement level, 0 for a plain copy or for any value no
 *  legal writer could have stored (read-side defense; the load bound in
 *  item_instance_load.ts already clamps persisted values). */
export function weaponEnhanceLevelOf(instance: ItemInstancePayload | undefined): number {
  const value = instance?.enhanceLevel;
  return isStoredWeaponEnhanceLevel(value) ? value : 0;
}

/** The attempt that reaches `level`, or undefined off the ladder. */
export function weaponEnhanceStep(level: number): WeaponEnhanceStep | undefined {
  return Number.isInteger(level) ? WEAPON_ENHANCE_STEPS[level - 1] : undefined;
}

/** The cumulative damage bonus in percent points at `level` (0 at +0). */
export function weaponEnhanceDamagePct(level: number): number {
  return weaponEnhanceStep(level)?.damagePct ?? 0;
}

/** The flat damage a copy's level adds to its own min and max, rounded half
 *  up per bound, in integer percent math so every host computes the same
 *  value. */
export function weaponEnhanceBonus(
  weapon: Pick<WeaponInfo, 'min' | 'max'>,
  level: number,
): { min: number; max: number } {
  const pct = weaponEnhanceDamagePct(level);
  return {
    min: Math.round((weapon.min * pct) / 100),
    max: Math.round((weapon.max * pct) / 100),
  };
}

/** The weapon line with the level's bonus applied. A +0 copy returns the
 *  INPUT object unchanged (it may be the shared ItemDef.weapon, so a bonus is
 *  always a fresh object, never a mutation). */
export function enhancedWeapon<T extends WeaponInfo>(weapon: T, level: number): T {
  if (weaponEnhanceDamagePct(level) === 0) return weapon;
  const bonus = weaponEnhanceBonus(weapon, level);
  return { ...weapon, min: weapon.min + bonus.min, max: weapon.max + bonus.max };
}

/**
 * The load-side bound for a persisted `enhanceLevel` (item_instance_load.ts
 * calls this for every container). Returns the value to KEEP, or undefined to
 * drop the key (absent = +0). An integer in range is kept as stored. An
 * integer above WEAPON_ENHANCE_MAX_LEVEL is CLAMPED down to it (the one
 * lower-only rewrite: a copy forged under a longer ladder keeps as much
 * progress as the current top allows, and a value can only ever fall on
 * load, never rise). Anything else (not a number, not an integer, below 1)
 * no legal writer stores, so it drops, the module's drop-only doctrine.
 */
export function clampWeaponEnhanceLevelOnLoad(value: unknown): number | undefined {
  if (typeof value !== 'number' || !Number.isInteger(value) || value < 1) return undefined;
  return Math.min(WEAPON_ENHANCE_MAX_LEVEL, value);
}
