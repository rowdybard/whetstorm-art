// Original paintings for the crafted Crucible Healer's Mail collection.
const ART = new Map<string, string>([
  ['crucible_healer_mail_chest', '/ui/whetstorm/items/crucible_healer_mail_chest.webp'],
  ['crucible_healer_mail_waist', '/ui/whetstorm/items/crucible_healer_mail_waist.webp'],
  ['crucible_healer_mail_feet', '/ui/whetstorm/items/crucible_healer_mail_feet.webp'],
]);

export function crucibleHealerMailItemImageUrl(id: string): string | null {
  return ART.get(id) ?? null;
}
