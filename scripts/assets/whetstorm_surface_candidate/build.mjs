import sharp from 'sharp';
import { readFile, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '../../..');
const dir = path.join(root, 'docs/design/whetstorm-art/eastbrook');
// This explicit list is the renderer's row-major semantic contract.
export const cells = [
  ['dark-block-stone', 2.2, 2.2, .8], ['light-block-stone', 2.2, 2.2, .8],
  ['plaster', 1, 1, .92], ['vertical-timber', 1.6, .8, .85],
  ['shingles', 2, 2, .7], ['forged-metal', .9, .9, .5],
  ['gold-metal', .9, .9, .5], ['horizontal-timber', .8, 1.6, .85],
  ['blue-cream-striped-canvas', 1, 1, .9], ['red-cream-striped-canvas', 1, 1, .9],
  ['leather', 1.2, 1.2, .85], ['irregular-stone', 2.2, 2.2, .8],
  ['crystal', .7, .7, .4], ['painted-planks', 1.4, 1.4, .78],
  ['light-stone', 2.2, 2.2, .8], ['medium-stone', 2.2, 2.2, .8],
];
const size = 128, width = 512;
const hash = bytes => createHash('sha256').update(bytes).digest('hex');
const clamp = n => Math.max(0, Math.min(1, n));
const quant = n => Math.min(255, Math.round(n / 6) * 6);
const offset = (index, x, y) => (((Math.floor(index / 4) * size + y) * width) + (index % 4) * size + x) * 3;
const sample = (data, x, y) => data[((y + size) % size) * size + ((x + size) % size)];

export async function build() {
  const albedo = Buffer.alloc(width * width * 3), normal = Buffer.alloc(albedo.length), rough = Buffer.alloc(albedo.length);
  const inputs = [];
  for (let i = 0; i < cells.length; i++) {
    const [name, sx, sy, base] = cells[i];
    const filename = `row${Math.floor(i / 4)}-${name}.png`;
    const bytes = await readFile(path.join(dir, filename));
    inputs.push({ file: filename, sha256: hash(bytes) });
    const rgb = await sharp(bytes).resize(size, size, { fit: 'cover', kernel: 'lanczos3' }).removeAlpha().toColourspace('srgb').raw().toBuffer();
    const luma = new Uint8Array(size * size), hist = new Uint32Array(256);
    for (let p = 0; p < luma.length; p++) {
      const v = Math.floor((54 * rgb[p * 3] + 183 * rgb[p * 3 + 1] + 19 * rgb[p * 3 + 2] + 128) / 256);
      luma[p] = v; hist[v]++;
    }
    const percentile = q => { let count = 0; for (let v = 0; v < 256; v++) { count += hist[v]; if (count >= Math.ceil(luma.length * q)) return v; } return 255; };
    const low = percentile(.02), high = percentile(.98);
    if (high <= low) throw new Error(`${filename} has insufficient luminance variation`);
    const height = new Float64Array(luma.length), blurred = new Float64Array(luma.length);
    for (let p = 0; p < luma.length; p++) height[p] = Math.round(63 * (Math.min(high, Math.max(low, luma[p])) - low) / (high - low)) / 63;
    for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) {
      let sum = 0;
      for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) sum += sample(height, x + dx, y + dy) * (dx === 0 ? 2 : 1) * (dy === 0 ? 2 : 1);
      blurred[y * size + x] = sum / 16;
    }
    for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) {
      const h = height[y * size + x], o = offset(i, x, y);
      const grey = 192 + Math.round(h * 63), fade = Math.min(1, Math.min(x, y, size - 1 - x, size - 1 - y) / 4);
      const nx = -(sample(blurred, x + 1, y) - sample(blurred, x - 1, y)) * .5 * sx * fade;
      const ny = (sample(blurred, x, y + 1) - sample(blurred, x, y - 1)) * .5 * sy * fade;
      const inv = 1 / Math.sqrt(nx * nx + ny * ny + 1);
      albedo.fill(grey, o, o + 3);
      normal[o] = quant(clamp(.5 + .5 * nx * inv) * 255); normal[o + 1] = quant(clamp(.5 + .5 * ny * inv) * 255); normal[o + 2] = 255;
      rough.fill(Math.round(clamp(base + (.5 - h) * .16) * 255), o, o + 3);
    }
  }
  const raw = { width, height: width, channels: 3 };
  const encode = data => sharp(data, { raw }).webp({ lossless: true, effort: 6 }).toBuffer();
  return { maps: await Promise.all([albedo, normal, rough].map(encode)), inputs };
}

async function main() {
  const mode = process.argv[2];
  if (!['--write', '--check'].includes(mode)) throw new Error('Pass --write or --check');
  const { maps, inputs } = await build();
  const names = ['whetstorm-surface-candidate.webp', 'whetstorm-normal-candidate.webp', 'whetstorm-rough-candidate.webp'];
  for (let i = 0; i < names.length; i++) {
    const target = path.join(dir, names[i]);
    if (mode === '--write') await writeFile(target, maps[i], { flag: 'wx' });
    else if (!(await readFile(target)).equals(maps[i])) throw new Error(`${names[i]} differs from regenerated output`);
    console.log(`${names[i]} ${maps[i].length} bytes sha256 ${hash(maps[i])}`);
  }
  console.log(JSON.stringify(inputs, null, 2));
}
if (process.argv[1] && path.resolve(process.argv[1]) === path.resolve(import.meta.filename)) main().catch(e => { console.error(e); process.exitCode = 1; });


