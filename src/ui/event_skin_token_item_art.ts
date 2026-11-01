// Original Mysterious Cosmetic Cache inventory painting.
export function eventSkinTokenItemImageUrl(id: string): string | null {
  return id === 'event_skin_token' ? '/ui/whetstorm/items/event_skin_token.webp' : null;
}
