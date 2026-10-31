// Original paintings for the crafted Crucible Striker's Mail collection.
const ART = new Map<string, string>([
  ['crucible_str_mail_chest', '/ui/whetstorm/items/crucible_str_mail_chest.webp'],
  ['crucible_str_mail_waist', '/ui/whetstorm/items/crucible_str_mail_waist.webp'],
  ['crucible_str_mail_feet', '/ui/whetstorm/items/crucible_str_mail_feet.webp'],
]);

export function crucibleStrikerMailItemImageUrl(id: string): string | null {
  return ART.get(id) ?? null;
}
