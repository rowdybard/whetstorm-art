import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { describe, expect, it } from 'vitest';

const path = 'public/ui/whetstorm/minigames/confection-candies.webp';

describe('original confection candy atlas', () => {
  it('decodes as a 3 by 2 RGB grid with five occupied cells and a black sixth', async () => {
    const image = sharp(path);
    const metadata = await image.metadata();
    expect(metadata).toMatchObject({ format: 'webp', width: 1536, height: 1024, channels: 3 });
    const { data, info } = await image.raw().toBuffer({ resolveWithObject: true });
    const lit = Array<number>(6).fill(0);
    for (let y = 0; y < info.height; y++) {
      for (let x = 0; x < info.width; x++) {
        const offset = (y * info.width + x) * info.channels;
        if (data[offset] || data[offset + 1] || data[offset + 2]) {
          lit[Math.floor(y / 512) * 3 + Math.floor(x / 512)]++;
        }
      }
    }
    for (const count of lit.slice(0, 5)) expect(count).toBeGreaterThan(20000);
    expect(lit[5]).toBe(0);
  });

  it('uses the new atlas through the existing load and fallback path', () => {
    const ui = readFileSync('src/ui/world_quest_confection_window.ts', 'utf8');
    const css = readFileSync('src/styles/components.css', 'utf8');
    const view = readFileSync('src/ui/world_quest_match3_view.ts', 'utf8');
    expect(ui).toContain("apiUrl('/ui/whetstorm/minigames/confection-candies.webp')");
    expect(ui).toContain("nodes.button.setAttribute('aria-label', cell.ariaLabel)");
    expect(ui).toContain('nodes.symbol.textContent = cell.symbol');
    expect(ui).toContain('this.art.onerror');
    expect(css).toContain('background-size: 300% 200%');
    expect(css).toContain('mix-blend-mode: screen');
    expect(view).toContain("['berry', 'citrus', 'mint', 'grape', 'star']");
    expect(view).toContain("['\\u25c6', '\\u25cf', '\\u25b2', '\\u25a0', '\\u2605']");
  });
});
