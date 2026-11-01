// Original paintings for retained Fiesta feats, no longer newly earnable.
const ART = new Map<string, string>([
  ['pvp_fiesta_first_bout', '/ui/whetstorm/deeds/pvp_fiesta_first_bout.webp'],
  ['pvp_fiesta_first_win', '/ui/whetstorm/deeds/pvp_fiesta_first_win.webp'],
  ['pvp_fiesta_double', '/ui/whetstorm/deeds/pvp_fiesta_double.webp'],
  ['pvp_fiesta_shutdown', '/ui/whetstorm/deeds/pvp_fiesta_shutdown.webp'],
  ['pvp_fiesta_full_build', '/ui/whetstorm/deeds/pvp_fiesta_full_build.webp'],
  ['pvp_fiesta_powerups', '/ui/whetstorm/deeds/pvp_fiesta_powerups.webp'],
  ['pvp_fiesta_five_kills', '/ui/whetstorm/deeds/pvp_fiesta_five_kills.webp'],
]);

export function fiestaDeedOriginalImageUrl(id: string): string | null {
  return ART.get(id) ?? null;
}
