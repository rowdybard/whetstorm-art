import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { test } from 'node:test';
import sharp from 'sharp';
import { CELL, SIZE, encodePierce, makePiercePixels } from '../scripts/assets/vfx_production/whetstorm_contact_pierce.mjs';

test('pierce source rebuilds as an ordered 64-frame straight-alpha thrust', async () => {
  const source = await readFile('docs/design/whetstorm-art/vfx/contact_pierce_source.png');
  assert(source.equals(await encodePierce()));
  const { data, info } = await sharp(source).raw().toBuffer({ resolveWithObject: true });
  assert.deepEqual([info.width, info.height, info.channels, info.depth], [2048, 2048, 4, 'uchar']);
  assert(data.equals(makePiercePixels()));
  const visible = [];
  for (let frame = 0; frame < 64; frame++) {
    let sum = 0;
    for (let y = 0; y < CELL; y++) for (let x = 0; x < CELL; x++) {
      const i = (((Math.floor(frame / 8) * CELL + y) * SIZE + (frame % 8) * CELL + x) * 4);
      const alpha = data[i + 3];
      if (x < 16 || x >= 240 || y < 16 || y >= 240) assert.equal(alpha, 0);
      if (alpha) {
        assert(data[i] >= 150 && data[i] <= 255);
        assert(data[i + 1] >= 194 && data[i + 1] <= 255);
        assert.equal(data[i + 2], 255);
      }
      sum += alpha;
    }
    visible.push(sum);
  }
  assert.equal(visible[0], 0);
  assert.equal(visible[63], 0);
  assert(visible.slice(1, 63).every((v) => v > 0));
  assert(visible[10] > visible[2]);
  assert(visible[10] > visible[45]);
});
