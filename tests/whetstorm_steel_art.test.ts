import { execFileSync } from 'node:child_process';
import { mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import sharp from 'sharp';
import { expect, it } from 'vitest';

it('ships reproducible opaque 1024px original steel colour art', async () => {
  const asset = readFileSync('public/textures/vfx/whetstorm/forged_steel.webp');
  const image = sharp(asset);
  const metadata = await image.metadata();
  expect(metadata).toMatchObject({ format: 'webp', width: 1024, height: 1024, hasAlpha: false });
  const stats = await image.stats();
  expect(stats.channels[0].stdev).toBeGreaterThan(8);
  const dir = mkdtempSync(join(tmpdir(), 'whetstorm-steel-'));
  try {
    const output = join(dir, 'steel.webp');
    execFileSync(process.execPath, ['scripts/assets/vfx_production/whetstorm_steel.mjs', output]);
    expect(readFileSync(output)).toEqual(asset);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});
