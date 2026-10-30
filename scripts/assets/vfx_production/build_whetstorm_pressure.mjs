// Original Whetstorm pressure map. This source draws every strand analytically;
// it uses no imported artwork. Rebuild with:
// node scripts/assets/vfx_production/build_whetstorm_pressure.mjs
import { mkdir, writeFile } from 'node:fs/promises';
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const SIZE = 1024;
const OUTPUT = 'public/textures/vfx/whetstorm/warrior_pressure.webp';
export async function buildPressureMap() {
let seed = 0x57a921d3;
function random() {
  seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
  return seed / 0x100000000;
}
const strands = [];
// Three loosely braided air currents. Each strand has its own direction,
// phase, length and width; the black background is the shader's zero field.
for (let branch = -1; branch <= 1; branch++) {
  for (let i = 0; i < 410; i++) {
    const start = random() * 0.35;
    const end = Math.min(1, start + 0.18 + random() * 0.78);
    const spread = (random() + random() - 1) * 0.12;
    const wave = 0.008 + random() * 0.032;
    const phase = random() * Math.PI * 2;
    const frequency = 2 + random() * 5;
    const width = 0.35 + random() * 2.3;
    const opacity = 0.025 + random() * 0.075;
    const points = [];
    for (let step = 0; step <= 32; step++) {
      const x = start + (end - start) * step / 32;
      const envelope = Math.sin(Math.PI * x) ** 0.7;
      const center = 0.5 + branch * 0.28 * x;
      const y = center + envelope * (spread + wave * Math.sin(x * frequency * Math.PI + phase));
      points.push(`${(x * SIZE).toFixed(1)},${(y * SIZE).toFixed(1)}`);
    }
    strands.push(`<polyline points="${points.join(' ')}" fill="none" stroke="white" stroke-width="${width.toFixed(2)}" stroke-opacity="${opacity.toFixed(3)}"/>`);
  }
}
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${SIZE}" height="${SIZE}"><defs><linearGradient id="edge"><stop offset="0" stop-color="black"/><stop offset="0.04" stop-color="white"/><stop offset="0.96" stop-color="white"/><stop offset="1" stop-color="black"/></linearGradient><mask id="wrap"><rect width="100%" height="100%" fill="url(#edge)"/></mask></defs><rect width="100%" height="100%" fill="black"/><g mask="url(#wrap)">${strands.join('')}</g></svg>`;
return sharp(Buffer.from(svg)).removeAlpha().webp({ quality: 94, effort: 6 }).toBuffer();
}

if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  await mkdir('public/textures/vfx/whetstorm', { recursive: true });
  await writeFile(OUTPUT, await buildPressureMap());
  console.log(`Wrote ${OUTPUT}`);
}
