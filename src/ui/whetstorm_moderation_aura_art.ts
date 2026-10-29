// Original Whetstorm moderation status painting, keyed by exact aura identity.
export function whetstormModerationAuraImageUrl(id: string): string | null {
  return id === 'cheater_mark' ? '/ui/whetstorm/auras/cheater_mark.webp' : null;
}