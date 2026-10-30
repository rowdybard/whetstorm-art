import { readFile } from 'node:fs/promises';
import sharp from 'sharp';
import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { buildPressureMap } from '../scripts/assets/vfx_production/build_whetstorm_pressure.mjs';

const file = 'public/textures/vfx/whetstorm/warrior_pressure.webp';

describe('original Whetstorm Warrior pressure map', () => {
  it('rebuilds from the authored source and has the linear data-map contract', async () => {
    const bytes = await readFile(file);
    assert.deepEqual(await buildPressureMap(), bytes);
    const metadata = await sharp(bytes).metadata();
    assert.deepEqual([metadata.format, metadata.width, metadata.height, metadata.channels, metadata.hasAlpha], [
      'webp', 1024, 1024, 3, false,
    ]);
    const { data, info } = await sharp(bytes).raw().toBuffer({ resolveWithObject: true });
    let min = 255;
    let max = 0;
    let centerTotal = 0;
    let colorDifference = 0;
    let seamDifference = 0;
    for (let y = 0; y < info.height; y++) {
      for (let x = 0; x < info.width; x++) {
        const offset = (y * info.width + x) * info.channels;
        const red = data[offset];
        min = Math.min(min, red);
        max = Math.max(max, red);
        colorDifference = Math.max(colorDifference, Math.abs(red - data[offset + 1]), Math.abs(red - data[offset + 2]));
        if (y >= 471 && y < 604) centerTotal += red;
      }
    }
    for (let y = 0; y < info.height; y++) {
      const left = data[(y * info.width) * info.channels];
      const right = data[(y * info.width + info.width - 1) * info.channels];
      seamDifference = Math.max(seamDifference, Math.abs(left - right));
    }
    assert.ok(seamDifference <= 5, `pressure wrap seam differs by ${seamDifference}`);
    assert.ok(colorDifference <= 2);
    assert.equal(min, 0);
    assert.ok(max > 140);
    // The moving storm shader samples this middle strip; it must not be blank.
    assert.ok(centerTotal / (1024 * 133) > 15);
  });
});
