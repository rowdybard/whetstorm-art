// The self record's Paladin Devotion mirror (`pdev`), decoded onto the
// ClientWorld's local Entity mirror. Moved verbatim out of
// ClientWorld.applySnapshot (the monolith ratchet; the self_session_wire.ts
// convention) so online.ts stays a consumer. Delta-guarded: an absent key
// keeps the prior mirror, and null clears it.

import type { Entity } from '../sim/types';

// biome-ignore lint/suspicious/noExplicitAny: mirrors online.ts's own LooseJson wire-record idiom
export function applyPaladinDevotionWire(e: Entity, s: any): void {
  if (s.pdev !== undefined) {
    e.paladinDevotion = s.pdev
      ? {
          value: Number(s.pdev.value) || 0,
          ascensionCharges: Number(s.pdev.charges) || 0,
          ascensionRemaining: Number(s.pdev.remaining) || 0,
          outOfCombatTime: 0,
          decayProgress: 0,
          blockIcdRemaining: 0,
        }
      : undefined;
  }
}
