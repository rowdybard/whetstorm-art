import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { emoteIconUrl } from '../src/ui/emote_icons';
import { OVERHEAD_EMOTES } from '../src/world_api/chat';

describe('original emote icons', () => {
  it('provides a self-contained static image for every emote', () => {
    for (const { id } of OVERHEAD_EMOTES) {
      const url = emoteIconUrl(id);
      expect(url).toBe(`/ui/emotes/emote-${id}.svg`);
      const svg = readFileSync(`public${url}`, 'utf8');
      expect(svg).toContain('viewBox="0 0 64 64"');
      expect(svg).not.toMatch(/<script|<animate|<image|(?:href|url)\s*[=(]/i);
    }
  });

  it('uses the same image rule for the wheel, editor and overhead bubble', () => {
    const hud = readFileSync('src/ui/hud.ts', 'utf8');
    const painter = readFileSync('src/render/nameplate_painter.ts', 'utf8');
    expect(hud).toContain('icon.src = emoteIconUrl(id)');
    expect(hud).toContain('icon.src = emoteIconUrl(def.id)');
    expect(hud).toContain("icon.alt = ''");
    expect(painter).toContain("import { emoteIconUrl } from '../ui/emote_icons'");
    expect(painter).toContain('state.emoteIconUrl = emoteIconUrl(emote.id)');
  });
});
