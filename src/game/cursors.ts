export type HoverCursorKind = 'default' | 'attack' | 'friendly';

const BASE = import.meta.env.BASE_URL;

/** Original Whetstorm cursor with ordinary platform feedback for interactions. */
export const CURSOR_HAND = `url("${BASE}ui/whetstorm/cursor.svg") 4 2, default`;
export const CURSOR_GRAB = 'grabbing';
export const CURSOR_ATTACK = 'pointer';
export const CURSOR_FRIENDLY = 'pointer';

export function cursorForHover(kind: HoverCursorKind, draggingCamera: boolean): string {
  if (draggingCamera) return CURSOR_GRAB;
  switch (kind) {
    case 'attack':
      return CURSOR_ATTACK;
    case 'friendly':
      return CURSOR_FRIENDLY;
    default:
      return CURSOR_HAND;
  }
}
