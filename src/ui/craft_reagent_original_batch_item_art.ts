// Original vendor crafting reagent paintings in a closed map.
const ART = new Map<string, string>([
  ['smithing_flux', '/ui/whetstorm/items/smithing_flux.webp'],
  ['spool_of_thread', '/ui/whetstorm/items/spool_of_thread.webp'],
  ['tanning_agent', '/ui/whetstorm/items/tanning_agent.webp'],
  ['glass_vial', '/ui/whetstorm/items/glass_vial.webp'],
]);

export function craftReagentOriginalBatchItemImageUrl(id: string): string | null {
  return ART.get(id) ?? null;
}
