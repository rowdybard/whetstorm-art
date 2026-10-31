// Original paintings for the crafted Crucible Spellcaster's Mail collection.
const ART = new Map<string, string>([
  ['crucible_caster_mail_chest', '/ui/whetstorm/items/crucible_caster_mail_chest.webp'],
  ['crucible_caster_mail_waist', '/ui/whetstorm/items/crucible_caster_mail_waist.webp'],
  ['crucible_caster_mail_feet', '/ui/whetstorm/items/crucible_caster_mail_feet.webp'],
]);

export function crucibleSpellcasterMailItemImageUrl(id: string): string | null {
  return ART.get(id) ?? null;
}
