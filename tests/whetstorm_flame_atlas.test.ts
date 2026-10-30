import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { describe, expect, it } from 'vitest';
import {
  FLAME_ATLAS_FRAMES,
  FLAME_ATLAS_GLSL,
  FLAME_ATLAS_URL,
  getFlameTex,
} from '../src/render/ignivar_fire_vfx';

describe('original flame intensity atlas', () => {
  it('has 36 distinct grayscale frames with black gutters and usable heat', async () => {
    const { data, info } = await sharp(`public${FLAME_ATLAS_URL}`)
      .removeAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });
    expect([info.width, info.height, info.channels, FLAME_ATLAS_FRAMES]).toEqual([768, 768, 3, 36]);
    const frames = new Set<string>();
    for (let frame = 0; frame < 36; frame++) {
      const bytes: number[] = [];
      let hot = 0;
      let grayscale = true;
      let blackApron = true;
      for (let y = 0; y < 128; y++)
        for (let x = 0; x < 128; x++) {
          const at = ((Math.floor(frame / 6) * 128 + y) * 768 + (frame % 6) * 128 + x) * 3;
          const r = data[at];
          grayscale &&= data[at + 1] === r && data[at + 2] === r;
          if (x < 5 || y < 5 || x >= 123 || y >= 123) blackApron &&= r === 0;
          if (r > 180) hot++;
          bytes.push(r);
        }
      expect(grayscale).toBe(true);
      expect(blackApron).toBe(true);
      expect(hot).toBeGreaterThan(100);
      frames.add(Buffer.from(bytes).toString('base64'));
    }
    expect(frames.size).toBe(36);
  });

  it('shares the default atlas across fire consumers and keeps frame interpolation', () => {
    expect(getFlameTex()).toBe(getFlameTex(FLAME_ATLAS_URL));
    expect(FLAME_ATLAS_GLSL).toContain('5.0 - row + corner.y');
    const fire = readFileSync('src/render/ignivar_fire_vfx.ts', 'utf8');
    const soft = readFileSync('src/render/nythraxis_soft_fire.ts', 'utf8');
    expect(fire.match(/opts\.flameTexUrl \?\? FLAME_ATLAS_URL/g)).toHaveLength(2);
    for (const shader of [fire, soft])
      expect(shader).toContain('mix(texture2D(uTex, vUvA).r, texture2D(uTex, vUvB).r, vBlend)');
    for (const path of [
      'src/render/ignivar_model_vfx.ts',
      'src/render/mage_ground_fx.ts',
      'src/render/nythraxis_soft_fire.ts',
    ]) {
      expect(readFileSync(path, 'utf8')).not.toContain('ignivar_flame_6x6.webp');
    }
  });
});
