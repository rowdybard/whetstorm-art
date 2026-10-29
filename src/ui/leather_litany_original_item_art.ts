// Original paintings for Drowned Litany and temple leather armor.
const LEATHER_LITANY_ORIGINAL_ART = new Map<string, string>([
  ['siltstep_leggings', '/ui/whetstorm/items/siltstep_leggings.webp'],
  ['litany_gloves_rog', '/ui/whetstorm/items/litany_gloves_rog.webp'],
  ['litany_leather_chest', '/ui/whetstorm/items/litany_leather_chest.webp'],
  ['drownstep_treads', '/ui/whetstorm/items/drownstep_treads.webp'],
]);

export function leatherLitanyOriginalItemImageUrl(id: string): string | null {
  return LEATHER_LITANY_ORIGINAL_ART.get(id) ?? null;
}
