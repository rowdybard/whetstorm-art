// Original Ignivar necklace paintings in a closed map.
const ART = new Map<string, string>([
  ['pendant_of_the_first_tempering', '/ui/whetstorm/items/pendant_of_the_first_tempering.webp'],
  ['ignivars_ember_choker', '/ui/whetstorm/items/ignivars_ember_choker.webp'],
  ['locket_of_the_last_flame', '/ui/whetstorm/items/locket_of_the_last_flame.webp'],
  ['heartspring_amulet', '/ui/whetstorm/items/heartspring_amulet.webp'],
]);

export function jewelryIgnivarNecklacesItemImageUrl(id: string): string | null {
  return ART.get(id) ?? null;
}
