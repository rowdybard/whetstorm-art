// Original analytical dust source candidate. No source images or random state.
// PNG frames run left to right, top to bottom. This does not write runtime art.
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname } from 'node:path';
import { pathToFileURL } from 'node:url';
import sharp from 'sharp';

export const CELL = 128;
export const SIZE = CELL * 8;
const clamp = (v) => Math.max(0, Math.min(1, v));

export function makeShoutDustPixels() {
  const pixels = Buffer.alloc(SIZE * SIZE * 4);
  for (let frame = 1; frame < 63; frame++) {
    const t = frame / 63;
    const opacity = clamp(t / 0.12) * (1 - t);
    const spread = 0.13 + 0.62 * (1 - Math.exp(-3 * t));
    const ox = (frame % 8) * CELL;
    const oy = Math.floor(frame / 8) * CELL;
    for (let y = 8; y < CELL - 8; y++) {
      for (let x = 8; x < CELL - 8; x++) {
        const px = (x - CELL / 2) / 54;
        const py = (y - CELL / 2) / 54;
        let density = 0;
        for (let puff = 0; puff < 13; puff++) {
          const angle = puff * 2.39996 + 0.32;
          const orbit = spread * (0.22 + 0.78 * ((puff * 7 % 13) / 12));
          const dx = px - Math.cos(angle) * orbit;
          const dy = py - (0.27 - 0.16 * t) - Math.sin(angle) * orbit * 0.42;
          const radius = (0.095 + 0.025 * (puff % 4)) * (1 + 0.60 * t);
          const localAngle = Math.atan2(dy, dx);
          const rag = 1 + 0.19 * Math.sin(localAngle * 3 + puff) + 0.10 * Math.sin(localAngle * 5 - puff * 1.7);
          const distance = Math.hypot(dx, dy * 1.22) / (radius * rag);
          const clump = clamp((1.18 - distance) * 2.2);
          density = Math.max(density, clump * (0.66 + 0.08 * (puff % 4)));
        }
        const grain = 0.82 + 0.18 * Math.sin(px * 29 + Math.sin(py * 21)) * Math.sin(py * 27 - px * 8);
        const alpha = Math.round(230 * opacity * clamp(density * grain));
        if (!alpha) continue;
        const i = ((oy + y) * SIZE + ox + x) * 4;
        const shade = clamp(0.52 - py * 0.24 + 0.13 * Math.sin(px * 12 + py * 9));
        pixels[i] = Math.round(132 + 71 * shade);
        pixels[i + 1] = Math.round(118 + 65 * shade);
        pixels[i + 2] = Math.round(99 + 57 * shade);
        pixels[i + 3] = alpha;
      }
    }
  }
  return pixels;
}

export async function encodeShoutDustCandidate() {
  return sharp(makeShoutDustPixels(), { raw: { width: SIZE, height: SIZE, channels: 4 } })
    .png().toBuffer();
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const output = process.argv[2] ?? 'docs/design/whetstorm-art/vfx/shout_dust_candidate_source.png';
  await mkdir(dirname(output), { recursive: true });
  await writeFile(output, await encodeShoutDustCandidate(), { flag: 'wx' });
  console.log(`Wrote ${output}`);
}
