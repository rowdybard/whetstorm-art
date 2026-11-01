// The bag bar's implicit backpack is a UI-only item icon.
export function implicitBackpackItemImageUrl(id: string): string | null {
  return id === 'backpack' ? '/ui/whetstorm/items/backpack.webp' : null;
}
