import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
import { build, cells } from './build.mjs';

const directory = path.resolve(import.meta.dirname, '../../../docs/design/whetstorm-art/eastbrook');
test('candidate maps regenerate and retain all 16 material cell contracts', async () => {
  assert.deepEqual(cells.map(c => c[0]), [
    'dark-block-stone', 'light-block-stone', 'plaster', 'vertical-timber',
    'shingles', 'forged-metal', 'gold-metal', 'horizontal-timber',
    'blue-cream-striped-canvas', 'red-cream-striped-canvas', 'leather', 'irregular-stone',
    'crystal', 'painted-planks', 'light-stone', 'medium-stone',
  ]);
  const { maps } = await build();
  const names = ['whetstorm-surface-candidate.webp', 'whetstorm-normal-candidate.webp', 'whetstorm-rough-candidate.webp'];
  for (let k = 0; k < 3; k++) {
    assert.deepEqual(maps[k], await readFile(path.join(directory, names[k])));
    const { data, info } = await sharp(maps[k]).removeAlpha().raw().toBuffer({ resolveWithObject: true });
    assert.equal(info.width, 512); assert.equal(info.height, 512); assert.equal(info.channels, 3);
    for (let cell = 0; cell < 16; cell++) {
      let min = 255, max = 0;
      for (let y = 0; y < 128; y++) for (let x = 0; x < 128; x++) {
        const o = (((Math.floor(cell / 4) * 128 + y) * 512) + (cell % 4) * 128 + x) * 3;
        if (k !== 1) { assert.equal(data[o], data[o + 1]); assert.equal(data[o], data[o + 2]); }
        if (k === 0) { assert.ok(data[o] >= 192); min = Math.min(min, data[o]); max = Math.max(max, data[o]); }
        if (k === 1) { assert.equal(data[o + 2], 255); if (x === 0 || y === 0 || x === 127 || y === 127) { assert.equal(data[o], 126); assert.equal(data[o + 1], 126); } }
      }
      if (k === 0) { assert.equal(min, 192); assert.equal(max, 255); }
    }
  }
});


