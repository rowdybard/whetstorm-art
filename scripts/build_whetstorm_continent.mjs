// Original Whetstorm overview, derived only from simulation terrain and biomes.
// Run from the repository root: node scripts/build_whetstorm_continent.mjs

import { mkdir } from 'node:fs/promises';
import * as esbuild from 'esbuild';
import sharp from 'sharp';

const width = 543;
const height = 1100;
const bundle = await esbuild.build({
  stdin: {
    contents: `export { WORLD_MIN_X, WORLD_MAX_X, WORLD_MIN_Z, WORLD_MAX_Z } from './src/sim/data.ts';
      export { terrainHeight, zoneBiomeAt, WATER_LEVEL } from './src/sim/world.ts';
      export { WORLD_SEED } from './src/sim/world_seed.ts';`,
    resolveDir: process.cwd(),
    loader: 'ts',
  },
  bundle: true,
  platform: 'node',
  format: 'esm',
  write: false,
  logLevel: 'silent',
});
const sim = await import(
  `data:text/javascript;base64,${Buffer.from(bundle.outputFiles[0].text).toString('base64')}`
);
const palette = {
  vale: [115, 143, 82],
  marsh: [105, 124, 77],
  peaks: [147, 139, 113],
  beach: [204, 185, 133],
  desert: [190, 155, 100],
  volcano: [121, 93, 80],
  cave: [123, 117, 101],
  dusk: [136, 111, 122],
  ember: [151, 119, 87],
  frost: [215, 221, 210],
  amber: [190, 155, 83],
  fen: [112, 131, 86],
  night: [132, 115, 125],
  haunt: [91, 111, 79],
  jungle: [77, 130, 70],
  garden: [120, 157, 88],
  gale: [142, 162, 105],
};
const elevations = new Float32Array(width * height);
const colors = new Uint8Array(width * height * 3);
const coords = (ix, iy) => [
  sim.WORLD_MAX_X - ((ix + 0.5) / width) * (sim.WORLD_MAX_X - sim.WORLD_MIN_X),
  sim.WORLD_MAX_Z - ((iy + 0.5) / height) * (sim.WORLD_MAX_Z - sim.WORLD_MIN_Z),
];
for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    const i = y * width + x;
    const [wx, wz] = coords(x, y);
    elevations[i] = sim.terrainHeight(wx, wz, sim.WORLD_SEED);
    // Warp only the color lookup, never terrain or coastline geometry. This
    // breaks up the sim's straight zone seams into gradual organic transitions.
    const colorX = wx + 28 * Math.sin(wz * 0.018) + 12 * Math.sin(wx * 0.021 + wz * 0.04);
    const colorZ = wz + 35 * Math.sin(wx * 0.016) + 14 * Math.sin(wz * 0.023 + wx * 0.03);
    const base = palette[sim.zoneBiomeAt(colorX, colorZ)];
    if (!base) throw new Error(`Unknown biome at ${wx}, ${wz}`);
    colors.set(base, i * 3);
  }
}
// Biome IDs are deliberately discrete in the sim. Blur their colors before
// painting, so administrative boundaries are not visible as straight seams.
// Geometry and the water test remain unsmoothed.
const blended = await sharp(Buffer.from(colors), { raw: { width, height, channels: 3 } })
  .blur(18)
  .raw()
  .toBuffer();
const pixels = Buffer.alloc(width * height * 3);
const heightAt = (x, y) =>
  elevations[Math.max(0, Math.min(height - 1, y)) * width + Math.max(0, Math.min(width - 1, x))];
const grain = (x, y) => {
  const n = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453;
  return n - Math.floor(n) - 0.5;
};
for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    const i = y * width + x;
    const h = elevations[i];
    const neighbors = [
      heightAt(x - 1, y),
      heightAt(x + 1, y),
      heightAt(x, y - 1),
      heightAt(x, y + 1),
    ];
    const isWater = h < sim.WATER_LEVEL;
    const coastline = neighbors.some((value) => value < sim.WATER_LEVEL !== isWater);
    if (isWater) {
      // A narrow shallow rim stays blue enough for the land mask. The deep
      // ocean matches the surrounding UI token exactly.
      pixels.set(coastline ? [22, 91, 138] : [10, 77, 123], i * 3);
      continue;
    }
    const left = heightAt(x - 1, y);
    const above = heightAt(x, y - 1);
    const relief = Math.max(-30, Math.min(30, (left + above - 2 * h) * 2.5));
    const texture =
      3 * Math.sin(x * 0.11 + Math.sin(y * 0.05)) * Math.sin(y * 0.08) + grain(x, y) * 3;
    const contour = h > 1 && Math.abs(h / 8 - Math.round(h / 8)) < 0.035 ? -4 : 0;
    const ink = coastline ? -14 : 0;
    for (let c = 0; c < 3; c++)
      pixels[i * 3 + c] = Math.max(
        0,
        Math.min(255, blended[i * 3 + c] + relief + texture + contour + ink),
      );
  }
}
await mkdir('public/map_art', { recursive: true });
await sharp(pixels, { raw: { width, height, channels: 3 } })
  .webp({ lossless: true })
  .toFile('public/map_art/whetstorm_continent.webp');
console.log(`Wrote original continent plate ${width}x${height}`);
