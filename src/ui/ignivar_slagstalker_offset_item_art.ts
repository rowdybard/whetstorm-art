// Original paintings for Ignivar leather damage waist and feet.
const IGNIVAR_SLAGSTALKER_OFFSET_ART = new Map<string, string>([
  ['slagstalker_belt', '/ui/whetstorm/items/slagstalker_belt.webp'],
  ['ashrunner_boots', '/ui/whetstorm/items/ashrunner_boots.webp'],
]);

export function ignivarSlagstalkerOffsetItemImageUrl(id: string): string | null {
  return IGNIVAR_SLAGSTALKER_OFFSET_ART.get(id) ?? null;
}
