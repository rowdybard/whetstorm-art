// The entity wire's Paladin Ascension seal count (`pasc`), moved verbatim out
// of the GameServer coordinator's dynamicFields (monolith ratchet; the
// entity_presence_wire.ts convention). Written only while non-zero, so an
// idle paladin's record stays byte-identical to before the key existed.
import type { Entity } from '../src/sim/types';

export function writePaladinAscensionWire(out: Record<string, unknown>, e: Entity): void {
  // Remote Paladins need the compact active-charge count so every client can
  // render Ascension's orbiting seals. Self snapshots additionally carry pdev
  // with the exact Devotion value and remaining duration for the local HUD.
  if (e.kind === 'player' && e.templateId === 'paladin') {
    // Omit-when-default like the fields above (review 3050): the idle 0 was
    // serialized into every snapshot for every remote paladin.
    const ascensionCharges = e.paladinDevotion?.ascensionCharges ?? 0;
    if (ascensionCharges > 0) out.pasc = ascensionCharges;
  }
}
