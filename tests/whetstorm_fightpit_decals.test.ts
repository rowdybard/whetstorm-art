import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { describe, expect, it } from 'vitest';

describe('Whetstorm Fightpit decals', () => {
  it.each(['blood_pool', 'blood_splatter'])('%s is a transparent ground texture', async (name) => {
    const file = `public/textures/battleground/decals/${name}.webp`;
    const { data, info } = await sharp(readFileSync(file))
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });
    expect([info.width, info.height, info.channels]).toEqual([512, 512, 4]);
    const alpha = Array.from({ length: 512 * 512 }, (_, i) => data[i * 4 + 3]);
    expect(alpha[0]).toBe(0);
    expect(alpha[511]).toBe(0);
    expect(alpha[511 * 512]).toBe(0);
    expect(alpha[512 * 512 - 1]).toBe(0);
    expect(alpha.filter((value) => value > 100).length).toBeGreaterThan(5000);
    expect(alpha.filter((value) => value === 0).length).toBeGreaterThan(100000);
  });
});
