import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { expect, it } from 'vitest';

it('points the Warrior material loader at the shipped independent textures', async () => {
  const loader = readFileSync('src/render/ability_vfx/production_assets.ts', 'utf8');
  for (const [symbol, name] of [
    ['PRESSURE_URL', 'warrior_pressure.webp'],
    ['BLOOD_URL', 'blood_film.webp'],
    ['STEEL_URL', 'forged_steel.webp'],
  ]) {
    const url = `/textures/vfx/whetstorm/${name}`;
    expect(loader).toContain(`const ${symbol} = '${url}'`);
    expect((await sharp(`public${url}`).metadata()).format).toBe('webp');
  }
});
