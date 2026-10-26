// The self record's session mirrors: the eat / drink countdowns (`eat`, `drk`)
// and the craft-cast session (`ccast`), decoded onto the ClientWorld's local
// Entity mirror. Moved verbatim out of ClientWorld.applySnapshot (the monolith
// ratchet; the combat_scalar_wire.ts convention) so online.ts stays a consumer.
// All three ride every self record (selfWireJson, server/game.ts) and are null
// at rest, so an absent key decodes to the idle state.

import type { Entity } from '../sim/types';

// biome-ignore lint/suspicious/noExplicitAny: mirrors online.ts's own LooseJson wire-record idiom
export function applySelfSessionWire(e: Entity, s: any): void {
  // ticksElapsed is a sim-internal sfx-cadence counter (consume_sfx.ts):
  // the client never derives a sound decision from this local shadow (the
  // server's heal SimEvents already carry sfxTick), so 0 is an inert
  // placeholder here, like the other display-only zeros in these records.
  e.eating = s.eat
    ? {
        itemId: '',
        kind: 'food',
        hpPer2s: 0,
        manaPer2s: 0,
        remaining: s.eat.remaining,
        ticksElapsed: 0,
      }
    : null;
  e.drinking = s.drk
    ? {
        itemId: '',
        kind: 'drink',
        hpPer2s: 0,
        manaPer2s: 0,
        remaining: s.drk.remaining,
        ticksElapsed: 0,
      }
    : null;
  // Craft-cast session mirror (self-only `ccast`, the eat/drk shape): the
  // crafting window reads the SAME entity fields offline and online, so
  // the recipe highlight and batch counter survive a mid-cast window
  // close/reopen and always show the server's clamped batch numbers.
  e.craftCastRecipeId = s.ccast?.r ?? '';
  e.craftCastBatchRemaining = s.ccast?.rem ?? 0;
  e.craftCastBatchTotal = s.ccast?.tot ?? 0;
}
