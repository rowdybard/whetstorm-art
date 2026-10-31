// Original Whetstorm paintings for epic and Tarnished bone legion hoard armor.
const ART: ReadonlyMap<string, string> = new Map([
  ['bone_studded_pauldrons', '/ui/whetstorm/items/bone_studded_pauldrons.webp'],
  ['legguards_of_the_ossuary', '/ui/whetstorm/items/legguards_of_the_ossuary.webp'],
  ['ossuary_bone_crown', '/ui/whetstorm/items/ossuary_bone_crown.webp'],
  ['rare_bone_studded_pauldrons', '/ui/whetstorm/items/rare_bone_studded_pauldrons.webp'],
  ['rare_legguards_of_the_ossuary', '/ui/whetstorm/items/rare_legguards_of_the_ossuary.webp'],
  ['rare_ossuary_bone_crown', '/ui/whetstorm/items/rare_ossuary_bone_crown.webp'],
]);
export function boneLegionEpicItemImageUrl(id: string): string | null {
  return ART.get(id) ?? null;
}
