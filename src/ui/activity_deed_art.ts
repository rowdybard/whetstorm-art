// Original paintings for exploration activities.
const ACTIVITY_DEED_ART = new Map<string, string>([
  ['exp_arcane_calligraphy', '/ui/whetstorm/deeds/exp_arcane_calligraphy.webp'],
  ['exp_forge_helper', '/ui/whetstorm/deeds/exp_forge_helper.webp'],
  ['exp_duskweave_dispatches', '/ui/whetstorm/deeds/exp_duskweave_dispatches.webp'],
  ['exp_wisp_maze', '/ui/whetstorm/deeds/exp_wisp_maze.webp'],
]);

export function activityDeedImageUrl(id: string): string | null {
  return ACTIVITY_DEED_ART.get(id) ?? null;
}
