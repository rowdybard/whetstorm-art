// Original Whetstorm blood film. No input artwork: the field is built from
// periodic analytic waves and a deterministic integer hash. Run from repo root.
import { mkdir, writeFile } from 'node:fs/promises';
import sharp from 'sharp';

const width = 2048, height = 1024;
const pixels = Buffer.alloc(width * height * 3);
const tau = Math.PI * 2;
const hash = (x, y) => {
  let n = Math.imul(x + 37, 374761393) + Math.imul(y + 91, 668265263);
  n = Math.imul(n ^ (n >>> 13), 1274126177);
  return ((n ^ (n >>> 16)) >>> 0) / 4294967295;
};
const smooth = t => t * t * (3 - 2 * t);
function noise(x, y, period) {
  const ix = Math.floor(x), iy = Math.floor(y), fx = smooth(x - ix), fy = smooth(y - iy);
  const a = hash((ix + period) % period, iy), b = hash((ix + 1 + period) % period, iy);
  const c = hash((ix + period) % period, iy + 1), d = hash((ix + 1 + period) % period, iy + 1);
  return (a + (b - a) * fx) * (1 - fy) + (c + (d - c) * fx) * fy;
}
for (let y = 0; y < height; y++) {
  const v = y / height;
  for (let x = 0; x < width; x++) {
    const u = x / width;
    const broad = noise(u * 8, v * 12, 8);
    const fine = noise(u * 32, v * 44, 32);
    const flow = Math.sin(tau * (v * 19 + 0.22 * Math.sin(tau * u * 3) + broad * 0.6));
    const fibres = Math.pow(Math.max(0, flow), 5);
    const rag = Math.max(0, Math.min(1, (broad * 0.7 + fine * 0.3 - 0.36) * 4));
    const strength = rag * (0.24 + broad * 0.42 + fibres * 0.34);
    const i = (y * width + x) * 3;
    pixels[i] = Math.round(220 * strength);
    pixels[i + 1] = Math.round((10 + 32 * fibres) * strength);
    pixels[i + 2] = Math.round((14 + 18 * fine) * strength);
  }
}
const out = 'public/textures/vfx/whetstorm/blood_film.webp';
await mkdir('public/textures/vfx/whetstorm', { recursive: true });
await writeFile(out, await sharp(pixels, { raw: { width, height, channels: 3 } }).webp({ quality: 94, effort: 6 }).toBuffer());
console.log(`Wrote ${out}`);
