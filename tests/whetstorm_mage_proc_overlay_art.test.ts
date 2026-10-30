import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { JSDOM } from 'jsdom';
import sharp from 'sharp';
import { describe, expect, it } from 'vitest';
import { buildProcOverlay } from '../src/ui/proc_overlay_dom';

const assets = [
  ['fire', '1db392b229587928e5b1debf773769e5bda20d4a97d3f30f781f8a0c021d4272', 4],
  ['chrono', '695cb5fc4f3f0275fd2a9ba75a2ebd6399438412a843dba0088e0cd6b2f0d63a', 4],
  ['frost', '195a175e806445bc523527ab2749115f78cec28d055fdc46c51afb4078b9dca8', 5],
] as const;

describe('original mage proc overlays', () => {
  it('routes every layered image to the original transparent asset', async () => {
    const document = new JSDOM('').window.document;
    const overlay = buildProcOverlay('Soul fragments', document);
    for (const [name, hash, count] of assets) {
      const path = `public/ui/whetstorm/procs/${name}.svg`;
      const images = overlay.querySelectorAll(`.${name}-part`);
      expect(images).toHaveLength(count);
      for (const image of images) expect(image.getAttribute('src')).toBe(`/${path.slice(7)}`);
      const data = readFileSync(path);
      expect(createHash('sha256').update(data).digest('hex')).toBe(hash);
      const { data: pixels, info } = await sharp(data)
        .resize(256, 256)
        .ensureAlpha()
        .raw()
        .toBuffer({ resolveWithObject: true });
      expect(info.channels).toBe(4);
      expect(pixels[3]).toBe(0);
      expect(pixels[(128 * 256 + 128) * 4 + 3]).toBeGreaterThan(0);
    }
  });
});
