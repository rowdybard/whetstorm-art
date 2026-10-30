// Original Whetstorm forged-metal colour map. No external image inputs.
// Regenerate: node scripts/assets/vfx_production/whetstorm_steel.mjs
import { mkdir, writeFile } from 'node:fs/promises';
import sharp from 'sharp';

const size = 1024;
const hash = (x, y) => {
  let n = Math.imul(x, 374761393) + Math.imul(y, 668265263);
  n = Math.imul(n ^ (n >>> 13), 1274126177);
  return ((n ^ (n >>> 16)) >>> 0) / 4294967295;
};
function noise(x, y, scale) {
  const u = x / scale, v = y / scale;
  const ix = Math.floor(u), iy = Math.floor(v);
  const sx = (u - ix) ** 2 * (3 - 2 * (u - ix));
  const sy = (v - iy) ** 2 * (3 - 2 * (v - iy));
  const a = hash(ix, iy) * (1 - sx) + hash(ix + 1, iy) * sx;
  const b = hash(ix, iy + 1) * (1 - sx) + hash(ix + 1, iy + 1) * sx;
  return a * (1 - sy) + b * sy;
}
const pixels = Buffer.alloc(size * size * 3);
for (let y = 0; y < size; y++) {
  for (let x = 0; x < size; x++) {
    // Smooth broad forging variation, fine grain, and short diagonal grind marks.
    const broad = noise(x, y, 92) - 0.5;
    const hammer = noise(x + y * 0.25, y - x * 0.2, 23) - 0.5;
    const grain = hash(x, y) - 0.5;
    const scratches = Math.max(0, noise(x + y * 1.7, y, 4) - 0.73);
    const value = Math.max(24, Math.min(170, 75 + 52 * broad + 45 * hammer + 18 * grain + 60 * scratches));
    const i = (y * size + x) * 3;
    pixels[i] = Math.round(value * 0.91);
    pixels[i + 1] = Math.round(value * 0.97);
    pixels[i + 2] = Math.round(value * 1.04);
  }
}
const output = process.argv[2] ?? 'public/textures/vfx/whetstorm/forged_steel.webp';
await mkdir((await import('node:path')).dirname(output), { recursive: true });
await writeFile(output, await sharp(pixels, { raw: { width: size, height: size, channels: 3 } })
  .webp({ quality: 94, effort: 6 }).toBuffer());