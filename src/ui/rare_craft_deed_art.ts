// Original Whetstorm paintings for five first rare-craft milestones.
const ART: ReadonlyMap<string, string> = new Map([
  ['prog_engineering_rare', '/ui/whetstorm/deeds/prog_engineering_rare.webp'],
  ['prog_leatherworking_rare', '/ui/whetstorm/deeds/prog_leatherworking_rare.webp'],
  ['prog_tailoring_rare', '/ui/whetstorm/deeds/prog_tailoring_rare.webp'],
  ['prog_jewelcrafting_rare', '/ui/whetstorm/deeds/prog_jewelcrafting_rare.webp'],
  ['prog_inscription_rare', '/ui/whetstorm/deeds/prog_inscription_rare.webp'],
]);
export function rareCraftDeedImageUrl(id: string): string | null {
  return ART.get(id) ?? null;
}
