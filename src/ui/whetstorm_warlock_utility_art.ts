// Original paintings for Warlock utility abilities.
const ART = new Map<string, string>([
  ['evil_eye', '/ui/whetstorm/abilities/warlock_utility_evil_eye.webp'],
  ['cursed_accomplice', '/ui/whetstorm/abilities/warlock_utility_cursed_accomplice.webp'],
  ['cruel_pact', '/ui/whetstorm/abilities/warlock_utility_cruel_pact.webp'],
  ['vicarious_suffering', '/ui/whetstorm/abilities/warlock_utility_vicarious_suffering.webp'],
]);

export function whetstormWarlockUtilityImageUrl(id: string): string | null {
  return ART.get(id) ?? null;
}
