// Original Buried Hoard cocoon aura, keyed by exact runtime identity.
export function hoardCocoonAuraImageUrl(id: string): string | null {
  return id === 'hoard_cocooned' ? '/ui/whetstorm/auras/hoard_cocooned.webp' : null;
}
