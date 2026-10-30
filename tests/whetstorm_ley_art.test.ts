import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { describe, expect, it } from 'vitest';

describe('original ley puzzle artwork', () => {
  it.each([
    ['ley-circuit-frame.webp', 1024],
    ['ley-crystal-heart.webp', 512],
  ])('ships the referenced opaque square %s', async (name, size) => {
    const source = readFileSync('src/ui/world_quest_ley_window.ts', 'utf8');
    expect(source).toContain(`/ui/whetstorm/minigames/${name}`);
    const metadata = await sharp(`public/ui/whetstorm/minigames/${name}`).metadata();
    expect(metadata).toMatchObject({ format: 'webp', width: size, height: size, hasAlpha: false });
  });

  it('keeps the frame as an unfilled quarter-slice border', () => {
    const css = readFileSync('src/styles/components.css', 'utf8');
    expect(css).toContain('border-image: var(--wql-frame-art) 25% / 1 / 0 stretch;');
  });
});
