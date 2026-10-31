// Original paintings for Ignivar cloth healing waist and feet.
const IGNIVAR_SPRING_CLOTH_ART = new Map<string, string>([
  ['springbinder_sash', '/ui/whetstorm/items/springbinder_sash.webp'],
  ['steps_of_quiet_water', '/ui/whetstorm/items/steps_of_quiet_water.webp'],
]);

export function ignivarSpringClothItemImageUrl(id: string): string | null {
  return IGNIVAR_SPRING_CLOTH_ART.get(id) ?? null;
}
