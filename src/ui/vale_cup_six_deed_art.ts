// Original paintings for six retained, retired Vale Cup feats.
const IDS = new Set(['chr_vale_cup_debut', 'pvp_vcup_first_match', 'pvp_vcup_first_win', 'pvp_vcup_wins_10', 'pvp_vcup_wins_25', 'pvp_vcup_first_goal']);

export function valeCupSixDeedImageUrl(id: string): string | null {
  return IDS.has(id) ? `/ui/whetstorm/deeds/${id}.webp` : null;
}
