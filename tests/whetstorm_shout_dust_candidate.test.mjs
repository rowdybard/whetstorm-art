import { readFile } from 'node:fs/promises';
import sharp from 'sharp';
import { expect, it } from 'vitest';
import { CELL, SIZE, encodeShoutDustCandidate } from '../scripts/assets/vfx_production/whetstorm_shout_dust_candidate.mjs';

it('reproduces a chronological dust burst with blank endpoints and transparent gutters', async () => {
  const source = await readFile('docs/design/whetstorm-art/vfx/shout_dust_candidate_source.png');
  expect(source.equals(await encodeShoutDustCandidate())).toBe(true);
  const { data, info } = await sharp(source).raw().toBuffer({ resolveWithObject: true });
  expect([info.width, info.height, info.channels]).toEqual([1024, 1024, 4]);
  const sums = [];
  const widths = [];
  for (let f = 0; f < 64; f++) {
    let sum = 0;
    let gutter = 0;
    let minX = CELL;
    let maxX = -1;
    for (let y = 0; y < CELL; y++) for (let x = 0; x < CELL; x++) {
      const i = ((Math.floor(f / 8) * CELL + y) * SIZE + (f % 8) * CELL + x) * 4;
      const alpha = data[i + 3];
      if (x < 8 || x >= CELL - 8 || y < 8 || y >= CELL - 8) gutter += alpha;
      if (alpha > 3) {
        minX = Math.min(minX, x);
        maxX = Math.max(maxX, x);
      }
      sum += alpha;
    }
    expect(gutter).toBe(0);
    sums.push(sum);
    widths.push(maxX - minX);
  }
  expect(sums[0]).toBe(0);
  expect(sums[63]).toBe(0);
  expect(sums.slice(1, 63).every((sum) => sum > 0)).toBe(true);
  expect(sums[15]).toBeGreaterThan(sums[2]);
  expect(sums[15]).toBeGreaterThan(sums[55]);
  expect(widths[32]).toBeGreaterThan(widths[2] * 2);
}, 30000);
