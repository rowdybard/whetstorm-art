export type HoverCursorKind = 'default' | 'attack' | 'friendly';

const BASE = import.meta.env.BASE_URL;

/** Original 32px Whetstorm cursors. Keep hotspots in sync with tokens.css. */
export const CURSOR_HAND = `url("${BASE}ui/whetstorm/hud/cursors/arrow.png") 4 4, default`;
export const CURSOR_GRAB = `url("${BASE}ui/whetstorm/hud/cursors/hand-grab.png") 16 16, grabbing`;
export const CURSOR_ATTACK = `url("${BASE}ui/whetstorm/hud/cursors/gauntlet.png") 4 3, pointer`;
export const CURSOR_FRIENDLY = CURSOR_ATTACK;

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
