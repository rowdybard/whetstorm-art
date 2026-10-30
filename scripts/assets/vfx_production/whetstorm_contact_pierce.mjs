// Original Whetstorm piercing contact, created analytically without image inputs.
// Regenerate: node scripts/assets/vfx_production/whetstorm_contact_pierce.mjs
// Chronological PNG rows start at the top left. Bake the vertical orientation
// appropriate for the KTX2 encoder before connecting this source to the runtime.
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname } from 'node:path';
import { pathToFileURL } from 'node:url';
import sharp from 'sharp';

export const CELL = 256;
export const SIZE = CELL * 8;
export function makePiercePixels() {
  const pixels = Buffer.alloc(SIZE * SIZE * 4);
  for (let frame = 1; frame < 63; frame++) {
    const t = frame / 63;
    const fade = Math.min(1, t / 0.075) * (1 - t) ** 1.1;
    const reach = Math.min(1, t / 0.16);
    const cx = (frame % 8) * CELL;
    const cy = Math.floor(frame / 8) * CELL;
    for (let y = 16; y < 240; y++) {
      for (let x = 16; x < 240; x++) {
        const u = (x - 128) / 104;
        const v = (y - 128) / 104;
        // A fast asymmetric thrust: its pointed front advances, then the
        // trailing streak contracts into the impact as the flash dies away.
        const front = -0.12 + 1.08 * reach;
        const back = -0.78 + 0.46 * t;
        const along = (u - back) / (front - back);
        const envelope = Math.max(0, Math.min(1, along * 5)) *
          Math.max(0, Math.min(1, (1 - along) * 7));
        const wave = 0.018 * Math.sin(u * 10 + t * 9) * (1 - t);
        const width = (0.025 + 0.08 * Math.sin(Math.PI * Math.max(0, Math.min(1, along)))) *
          (1 - 0.55 * t);
        const d = Math.abs(v - wave) / Math.max(width, 0.01);
        const core = Math.exp(-d * d * 3.2) * envelope;
        const glow = Math.exp(-d * d * 0.42) * envelope * 0.32;
        const flareWidth = 0.07 + 0.15 * Math.sin(Math.PI * Math.min(1, t / 0.28));
        const flare = Math.exp(-(((u + 0.09) / 0.085) ** 2) - (v / flareWidth) ** 2 * 2) *
          Math.max(0, 1 - t / 0.48);
        let sparks = 0;
        for (let k = 0; k < 9; k++) {
          const angle = k * Math.PI * 2 / 9 + 0.18;
          const travel = Math.max(0, t - 0.04);
          const distance = 0.12 + travel * (0.62 + (k % 3) * 0.13);
          const dx = u + 0.09 - Math.cos(angle) * distance;
          const dy = v - Math.sin(angle) * distance;
          const radial = dx * Math.cos(angle) + dy * Math.sin(angle);
          const transverse = -dx * Math.sin(angle) + dy * Math.cos(angle);
          const fragment = Math.exp(-((radial / 0.045) ** 2) - (transverse / 0.012) ** 2);
          sparks = Math.max(sparks, fragment * Math.max(0, 1 - travel / 0.5));
        }
        const light = Math.min(1, core + glow + flare * 0.9 + sparks * 0.8);
        const alpha = Math.round(255 * Math.min(1, fade * light));
        if (!alpha) continue;
        const i = ((cy + y) * SIZE + cx + x) * 4;
        const hot = Math.min(1, core + flare);
        pixels[i] = Math.round(150 + 105 * hot);
        pixels[i + 1] = Math.round(194 + 61 * hot);
        pixels[i + 2] = 255;
        pixels[i + 3] = alpha;
      }
    }
  }
  return pixels;
}
export async function encodePierce() {
  return sharp(makePiercePixels(), { raw: { width: SIZE, height: SIZE, channels: 4 } }).png().toBuffer();
}
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const output = process.argv[2] ?? 'docs/design/whetstorm-art/vfx/contact_pierce_source.png';
  await mkdir(dirname(output), { recursive: true });
  await writeFile(output, await encodePierce());
  console.log(`Wrote ${output}`);
}


