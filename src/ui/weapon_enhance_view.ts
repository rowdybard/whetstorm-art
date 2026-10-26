// Weapon enhancement (Whetstorm W1a): the pure, DOM-free reads the HUD shows
// for the forge attempt in src/sim/weapon_enhance.ts. Three surfaces, one
// source of numbers (src/sim/weapon_enhance_table.ts), so the tooltip, the
// forge quote and the sim can never disagree:
//   - weaponEnhanceTooltipHtml: the item tooltip's level line for an enhanced
//     copy (item_combat_tooltip_view.ts), and enhancedTooltipWeapon, the
//     copy's real damage line with the level's bonus applied;
//   - isWeaponEnhanceNpc: whether an NPC is the master of a forge station,
//     the gate for the gossip row (quest_dialog_controller.ts);
//   - weaponEnhanceQuoteHtml: that row's hover quote for the worn main hand,
//     read live at hover time (the next rung's odds and cost, the cap, the
//     no-weapon case).

import { ITEMS } from '../sim/data';
import { lootQualityWeapon } from '../sim/loot_quality';
import type { EquipSlot, ItemDef, ItemInstancePayload, StationDef, WeaponInfo } from '../sim/types';
import {
  enhancedWeapon,
  WEAPON_ENHANCE_MATERIAL_ID,
  WEAPON_ENHANCE_MAX_LEVEL,
  weaponEnhanceDamagePct,
  weaponEnhanceLevelOf,
  weaponEnhanceStep,
} from '../sim/weapon_enhance_table';
import { itemDisplayName } from './entity_i18n';
import { esc } from './esc';
import { formatMoney, formatNumber, t } from './i18n';

/** The copy's damage line with its enhancement applied: the same composition
 *  recalcPlayerStats uses (loot quality first, then the level), so the
 *  tooltip shows the damage the copy really deals. */
export function enhancedTooltipWeapon(
  item: ItemDef,
  instance: ItemInstancePayload | undefined,
): WeaponInfo | undefined {
  const weapon = lootQualityWeapon(item, instance);
  return weapon ? enhancedWeapon(weapon, weaponEnhanceLevelOf(instance)) : undefined;
}

/** The item tooltip's enhancement line, '' for a plain (+0) copy. */
export function weaponEnhanceTooltipHtml(
  item: ItemDef,
  instance: ItemInstancePayload | undefined,
): string {
  const level = weaponEnhanceLevelOf(instance);
  if (level === 0 || item.kind !== 'weapon') return '';
  const key =
    level >= WEAPON_ENHANCE_MAX_LEVEL
      ? 'hudChrome.weaponEnhance.tooltipLevelMax'
      : 'hudChrome.weaponEnhance.tooltipLevel';
  const text = t(key, {
    level: formatNumber(level),
    pct: formatNumber(weaponEnhanceDamagePct(level)),
  });
  return `<div class="tt-green">${esc(text)}</div>`;
}

/** True when the NPC is the resident master of a forge station: the forge
 *  attempt itself is gated on standing at the station (the sim's rule), and
 *  the master is who stands beside it. */
export function isWeaponEnhanceNpc(templateId: string, stations: readonly StationDef[]): boolean {
  return stations.some((s) => s.type === 'forge' && s.masterNpcId === templateId);
}

/** What the quote reads off the world (an IWorldInventory slice). */
export interface WeaponEnhanceQuoteInputs {
  equipment: Partial<Record<EquipSlot, string>>;
  equipmentInstances: Partial<Record<EquipSlot, ItemInstancePayload>>;
}

/** The forge row's hover quote for the worn main hand. */
export function weaponEnhanceQuoteHtml(world: WeaponEnhanceQuoteInputs): string {
  const itemId = world.equipment.mainhand;
  const item = itemId ? ITEMS[itemId] : undefined;
  if (!item || item.kind !== 'weapon') {
    return `<div class="tt-sub">${esc(t('hudChrome.weaponEnhance.quoteNoWeapon'))}</div>`;
  }
  const name = itemDisplayName(item);
  const level = weaponEnhanceLevelOf(world.equipmentInstances.mainhand);
  const step = weaponEnhanceStep(level + 1);
  const title = `<div class="tt-title">${esc(name)}</div>`;
  if (!step) {
    return `${title}<div class="tt-sub">${esc(
      t('hudChrome.weaponEnhance.quoteMax', { item: name, level: formatNumber(level) }),
    )}</div>`;
  }
  const next = t('hudChrome.weaponEnhance.quoteNext', {
    item: name,
    from: formatNumber(level),
    to: formatNumber(step.level),
    pct: formatNumber(Math.round(step.successChance * 100)),
  });
  const cost = t('hudChrome.weaponEnhance.quoteCost', {
    money: formatMoney(step.copper),
    count: formatNumber(step.materialCount),
    material: itemDisplayName(ITEMS[WEAPON_ENHANCE_MATERIAL_ID]),
  });
  return `${title}<div class="tt-stat">${esc(next)}</div><div class="tt-sub">${esc(cost)}</div>`;
}
