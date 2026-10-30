import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { describe, expect, it } from 'vitest';
import { WORLD_MAX_X, WORLD_MAX_Z, WORLD_MIN_X, WORLD_MIN_Z } from '../src/sim/data';
import { terrainHeight, WATER_LEVEL } from '../src/sim/world';
import { WORLD_SEED } from '../src/sim/world_seed';
import { isOceanPixel } from '../src/ui/continent_land_mask_core';
import { CONTINENT_FALLBACK_ASPECT } from '../src/ui/continent_map_view';

describe('original continent plate', () => {
  it('uses the world projection and classifies water for the land mask', async () => {
    const { data, info } = await sharp(readFileSync('public/map_art/whetstorm_continent.webp'))
      .removeAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });
    expect(info.width / info.height).toBe(CONTINENT_FALLBACK_ASPECT);
    let land = 0;
    let water = 0;
    for (let y = 4; y < info.height; y += 31) {
      for (let x = 4; x < info.width; x += 23) {
        const wx = WORLD_MAX_X - ((x + 0.5) / info.width) * (WORLD_MAX_X - WORLD_MIN_X);
        const wz = WORLD_MAX_Z - ((y + 0.5) / info.height) * (WORLD_MAX_Z - WORLD_MIN_Z);
        const isWater = terrainHeight(wx, wz, WORLD_SEED) < WATER_LEVEL;
        const i = (y * info.width + x) * 3;
        expect(isOceanPixel(data[i], data[i + 1], data[i + 2])).toBe(isWater);
        if (isWater) water++;
        else land++;
      }
    }
    expect(land).toBeGreaterThan(100);
    expect(water).toBeGreaterThan(100);
  });
});
