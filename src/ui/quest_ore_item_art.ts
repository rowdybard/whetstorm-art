// Original painting for the legacy quest item retained in older saves.
export function questOreItemImageUrl(id: string): string | null {
  return id === 'chunk_of_ore' ? '/ui/whetstorm/items/chunk_of_ore.webp' : null;
}
