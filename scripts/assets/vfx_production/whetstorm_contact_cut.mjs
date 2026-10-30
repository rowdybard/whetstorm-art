// Original Whetstorm cut contact, drawn analytically with no image inputs.
// Regenerate: node scripts/assets/vfx_production/whetstorm_contact_cut.mjs
// PNG rows are chronological from top-left; KTX2 requires a vertical bake at encode.
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname } from 'node:path';
import { pathToFileURL } from 'node:url';
import sharp from 'sharp';

export const CELL = 256;
export const SIZE = CELL * 8;
export function makeCutPixels() {
  const pixels = Buffer.alloc(SIZE * SIZE * 4);
  for (let frame = 1; frame < 63; frame++) {
    const t = frame / 63;
    const fade = Math.min(1, t / 0.07) * Math.max(0, 1 - t) ** 1.2;
    const head = -1.12 + 2.24 * Math.min(1, t / 0.38);
    const cx = (frame % 8) * CELL, cy = Math.floor(frame / 8) * CELL;
    for (let y = 16; y < 240; y++) for (let x = 16; x < 240; x++) {
      // Coordinates follow the blade, so its curved layers stay aligned.
      const u = ((x - 128) * 0.86 - (y - 128) * 0.51) / 105;
      const v = ((x - 128) * 0.51 + (y - 128) * 0.86) / 105;
      const taper = Math.max(0, 1 - Math.abs(u) ** 2);
      const reveal = Math.max(0, Math.min(1, (head - u) * 12));
      const curve = 0.16 * (u * u - 0.4);
      const d = v - curve;
      const streak = Math.exp(-((d / (0.012 + 0.018 * taper)) ** 2));
      const wake = Math.exp(-(((d + 0.065 + 0.025 * t) / (0.045 + 0.045 * taper)) ** 2));
      const filament = Math.exp(-(((d - 0.105 * taper - 0.012) / 0.009) ** 2));
      const headGlow = Math.exp(-(((u - head + 0.06) / 0.15) ** 2 + (d / 0.09) ** 2));
      const breakup = 0.72 + 0.28 * Math.sin(u * 31 + t * 7) ** 2;
      const blade = reveal * taper * (0.78 * streak + 0.22 * wake * breakup + 0.3 * filament);
      // Three small shards peel away from the cut and fade before the wake.
      let fragments = 0;
      for (let n = 0; n < 3; n++) {
        const su = -0.28 + n * 0.33 + t * (0.3 + n * 0.08);
        const sv = 0.09 + n * 0.07 + t * (0.24 + n * 0.05);
        const du = (u - su) / (0.075 - n * 0.012);
        const dv = (v - sv) / 0.014;
        fragments += Math.exp(-(du * du + dv * dv)) * Math.max(0, 1 - t * 2.2);
      }
      const strength = fade * (blade + 0.6 * headGlow * taper + 0.45 * fragments);
      const alpha = Math.round(255 * Math.min(1, strength));
      if (!alpha) continue;
      const i = ((cy + y) * SIZE + cx + x) * 4;
      const hot = Math.min(1, streak * reveal + headGlow);
      pixels[i] = Math.round(151 + 104 * hot);
      pixels[i + 1] = Math.round(190 + 65 * hot);
      pixels[i + 2] = 255;
      pixels[i + 3] = alpha;
    }
  }
  return pixels;
}
export async function encodeCut() {
  return sharp(makeCutPixels(), { raw: { width: SIZE, height: SIZE, channels: 4 } }).png().toBuffer();
}
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const output = process.argv[2] ?? 'docs/design/whetstorm-art/vfx/contact_cut_source.png';
  await mkdir(dirname(output), { recursive: true });
  await writeFile(output, await encodeCut());
  console.log(`Wrote ${output}`);
}
