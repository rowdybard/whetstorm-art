// Original paintings for Thornhollow battleground milestones.
const BATTLEGROUND_DEED_ART = new Map<string, string>([
  ['pvp_bg_first_capture', '/ui/whetstorm/deeds/pvp_bg_first_capture.webp'],
  ['pvp_bg_first_win', '/ui/whetstorm/deeds/pvp_bg_first_win.webp'],
  ['pvp_bg_wins_25', '/ui/whetstorm/deeds/pvp_bg_wins_25.webp'],
  ['pvp_bg_captures_100', '/ui/whetstorm/deeds/pvp_bg_captures_100.webp'],
]);

export function battlegroundDeedImageUrl(id: string): string | null {
  return BATTLEGROUND_DEED_ART.get(id) ?? null;
}
