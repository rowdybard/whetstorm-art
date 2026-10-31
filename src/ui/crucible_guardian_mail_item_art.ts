// Original paintings for the crafted Crucible Guardian's Mail collection.
const ART = new Map<string, string>([
  ['crucible_tank_mail_chest', '/ui/whetstorm/items/crucible_tank_mail_chest.webp'],
  ['crucible_tank_mail_waist', '/ui/whetstorm/items/crucible_tank_mail_waist.webp'],
  ['crucible_tank_mail_feet', '/ui/whetstorm/items/crucible_tank_mail_feet.webp'],
]);

export function crucibleGuardianMailItemImageUrl(id: string): string | null {
  return ART.get(id) ?? null;
}
