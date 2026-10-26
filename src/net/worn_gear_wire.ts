// The worn-gear identity keys of a FULL entity wire record, decoded in one
// place (lifted out of src/net/online.ts applyWire, the monolith ratchet):
// the held weapons (mh, oh), the active weapon skin (wsk), the main hand's
// enhancement level (wen, Whetstorm W1a), the worn mount skin (msk), the full
// worn set (eq) and its per-slot payloads (eqi). All render-only mirrors.
//
// The server encodes them in server/game.ts identityFields (the weapon keys
// through server/worn_weapon.ts writeWornWeaponWire). Every key is SPARSE:
// an absent key on a full record means "none", so each field resets rather
// than keeping a stale value (a lite record never reaches this decoder, so it
// leaves every field as it was). Pure and DOM-free so a Vitest pins the
// server-to-client round trip directly.

import { cloneItemInstancePayload, type Entity, type ItemInstancePayload } from '../sim/types';
import { isStoredWeaponEnhanceLevel } from '../sim/weapon_enhance_table';

/** The Entity fields one full record's worn-gear keys set. */
export type WornGearView = Pick<
  Entity,
  | 'mainhandItemId'
  | 'offhandItemId'
  | 'weaponSkinId'
  | 'mainhandEnhanceLevel'
  | 'mountSkinId'
  | 'equippedItems'
  | 'equippedInstances'
>;

/** Decode the worn-gear keys of a full record (untrusted wire JSON). */
export function decodeWornGearWire(w: Record<string, unknown>): WornGearView {
  return {
    mainhandItemId: (w.mh ?? null) as string | null, // held weapon model
    offhandItemId: (w.oh ?? null) as string | null, // held weapon model
    weaponSkinId: (w.wsk ?? null) as string | null, // active weapon-skin cosmetic
    // A level no legal server could send reads as +0, so a hostile or newer
    // peer record can never push the glow past the ladder.
    mainhandEnhanceLevel: isStoredWeaponEnhanceLevel(w.wen) ? w.wen : 0,
    mountSkinId: (w.msk ?? null) as string | null, // worn mount skin, like wsk
    equippedItems: (w.eq ?? {}) as Entity['equippedItems'], // full worn set (inspect)
    // Deep-cloned per slot: a payload's own rolled.stats map must never alias
    // wire-parsed JSON a later message could mutate.
    equippedInstances: Object.fromEntries(
      Object.entries((w.eqi ?? {}) as Record<string, ItemInstancePayload>).map(([slot, inst]) => [
        slot,
        cloneItemInstancePayload(inst),
      ]),
    ),
  };
}
