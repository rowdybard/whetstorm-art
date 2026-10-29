// Original paintings for obtainable mail armor and the named warbelt.
const MAIL_DUNGEON_ORIGINAL_ART = new Map<string, string>([
  ['sister_nhalia_choir_plate', '/ui/whetstorm/items/sister_nhalia_choir_plate.webp'],
  ['skullsmasher_warbelt', '/ui/whetstorm/items/skullsmasher_warbelt.webp'],
  ['emberwing_legguards', '/ui/whetstorm/items/emberwing_legguards.webp'],
  ['gravewyrm_scale_hauberk', '/ui/whetstorm/items/gravewyrm_scale_hauberk.webp'],
]);
export function mailDungeonOriginalItemImageUrl(id: string): string | null {
  return MAIL_DUNGEON_ORIGINAL_ART.get(id) ?? null;
}
