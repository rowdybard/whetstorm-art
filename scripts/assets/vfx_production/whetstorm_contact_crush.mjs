// Original analytical Whetstorm blunt contact. No source images or random state.
// Regenerate: node scripts/assets/vfx_production/whetstorm_contact_crush.mjs
// Rows run chronologically from top-left. KTX2 encoding must bake a vertical flip.
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname } from 'node:path';
import { pathToFileURL } from 'node:url';
import sharp from 'sharp';

export const CELL = 256;
export const SIZE = CELL * 8;
const clamp = (v) => Math.max(0, Math.min(1, v));

export function makeCrushPixels() {
  const pixels = Buffer.alloc(SIZE * SIZE * 4);
  for (let frame = 1; frame < 63; frame++) {
    const t = frame / 63;
    const fade = clamp(t / 0.075) * (1 - t) ** 1.45;
    const expansion = 0.08 + 0.83 * (1 - Math.exp(-3.2 * t));
    const cx = (frame % 8) * CELL;
    const cy = Math.floor(frame / 8) * CELL;
    for (let y = 16; y < 240; y++) {
      for (let x = 16; x < 240; x++) {
        const px = (x - 128) / 105;
        const py = (y - 128) / 105;
        const r = Math.hypot(px, py);
        const angle = Math.atan2(py, px);
        // The tiny hot center recedes while separated arcs push outward.
        const core = Math.exp(-r * r / 0.014) * Math.exp(-8 * t);
        const shape = expansion * (0.72 + 0.055 * Math.sin(5 * angle + 0.4));
        const gap = clamp((Math.sin(7 * angle + 0.4) + 0.35 * Math.sin(11 * angle - 1) - 0.1) * 2.5);
        const rim = Math.exp(-(((r - shape) / 0.035) ** 2)) * gap;
        const rays = Math.exp(-((Math.sin(6 * angle + 0.7) / 0.12) ** 2))
          * clamp((expansion * 0.85 - r) * 8) * clamp((r - 0.10) * 8) * Math.exp(-4 * t);
        let chips = 0;
        for (let k = 0; k < 9; k++) {
          const a = k * 2.399 + 0.2;
          const d = expansion * (0.68 + (k % 3) * 0.14);
          const dx = px - Math.cos(a) * d;
          const dy = py - Math.sin(a) * d - 0.13 * t * t;
          const along = dx * Math.cos(a) + dy * Math.sin(a);
          const across = -dx * Math.sin(a) + dy * Math.cos(a);
          const diamond = Math.abs(along) / (0.10 + 0.025 * (k % 2)) + Math.abs(across) / 0.045;
          chips = Math.max(chips, clamp((1 - diamond) * 5));
        }
        const strength = fade * clamp(core + rim * 0.72 + chips * 0.75 + rays * 0.48);
        const alpha = Math.round(255 * strength);
        if (!alpha) continue;
        const i = ((cy + y) * SIZE + cx + x) * 4;
        const light = clamp(core * 1.1 + rim * 0.65 + chips * 0.8 + rays * 0.55);
        pixels[i] = Math.round(102 + 130 * light);
        pixels[i + 1] = Math.round(139 + 105 * light);
        pixels[i + 2] = Math.round(171 + 84 * light);
        pixels[i + 3] = alpha;
      }
    }
  }
  return pixels;
}
export async function encodeCrush() {
  return sharp(makeCrushPixels(), { raw: { width: SIZE, height: SIZE, channels: 4 } }).png().toBuffer();
}
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const output = process.argv[2] ?? 'docs/design/whetstorm-art/vfx/contact_crush_source.png';
  await mkdir(dirname(output), { recursive: true });
  await writeFile(output, await encodeCrush());
  console.log(`Wrote ${output}`);
}

