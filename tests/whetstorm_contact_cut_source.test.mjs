import { readFile } from 'node:fs/promises';
import assert from 'node:assert/strict';
import { test } from 'node:test';
import sharp from 'sharp';
import { CELL, SIZE, encodeCut, makeCutPixels } from '../scripts/assets/vfx_production/whetstorm_contact_cut.mjs';

test('cut source rebuilds with chronological frames, blank endpoints and transparent gutters', async () => {
  const source = await readFile('docs/design/whetstorm-art/vfx/contact_cut_source.png');
  assert(source.equals(await encodeCut()));
  const { data, info } = await sharp(source).raw().toBuffer({ resolveWithObject: true });
  assert.deepEqual([info.width, info.height, info.channels], [2048, 2048, 4]);
  assert(data.equals(makeCutPixels()));
  const visible = [];
  for (let f = 0; f < 64; f++) {
    let sum = 0, gutter = 0;
    for (let y = 0; y < CELL; y++) for (let x = 0; x < CELL; x++) {
      const a = data[(((Math.floor(f / 8) * CELL + y) * SIZE + (f % 8) * CELL + x) * 4) + 3];
      if (x < 16 || x >= 240 || y < 16 || y >= 240) gutter += a;
      sum += a;
    }
    assert.equal(gutter, 0, `frame ${f} gutter`);
    visible.push(sum);
  }
  assert.equal(visible[0], 0);
  assert.equal(visible[63], 0);
  assert(visible.slice(1, 63).every((v) => v > 0));
  assert(visible[15] > visible[50]);
  assert(visible[15] > visible[2]);
});
