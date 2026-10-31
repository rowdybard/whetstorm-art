// Original paintings for Ignivar cloth damage waist and feet.
const IGNIVAR_CINDER_CLOTH_ART = new Map<string, string>([
  ['cord_of_the_last_flame', '/ui/whetstorm/items/cord_of_the_last_flame.webp'],
  ['cindersoaked_slippers', '/ui/whetstorm/items/cindersoaked_slippers.webp'],
]);

export function ignivarCinderClothItemImageUrl(id: string): string | null {
  return IGNIVAR_CINDER_CLOTH_ART.get(id) ?? null;
}
