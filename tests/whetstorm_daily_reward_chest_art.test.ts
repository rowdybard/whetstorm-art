import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { expect, it } from 'vitest';

it('ships the original transparent daily reward chest with recorded provenance', async () => {
  const record = JSON.parse(
    readFileSync('docs/whetstorm/daily-reward-chest-generation.json', 'utf8'),
  );
  expect(record.referenceImages).toEqual([]);
  expect(record.shipping).toBe('public/ui/whetstorm/hud/daily-reward-chest.webp');
  for (const [path, hash] of [
    [record.master, record.masterSha256],
    [record.shipping, record.shippingSha256],
  ]) {
    expect(createHash('sha256').update(readFileSync(path)).digest('hex')).toBe(hash);
  }
  const image = sharp(record.shipping);
  expect(await image.metadata()).toMatchObject({
    format: 'webp',
    width: 256,
    height: 256,
    hasAlpha: true,
  });
  const { data, info } = await image.ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  expect(data[3]).toBe(0);
  expect(
    data[(Math.floor(info.height / 2) * info.width + Math.floor(info.width / 2)) * 4 + 3],
  ).toBeGreaterThan(0);
});

it('uses the chest for both desktop and mobile daily reward launchers', () => {
  const url = '/ui/whetstorm/hud/daily-reward-chest.webp';
  const hud = readFileSync('src/ui/hud.ts', 'utf8');
  const mobile = readFileSync('src/styles/hud.mobile.css', 'utf8');
  expect(hud).toContain(`<img class="daily-rewards-icon" src="${url}"`);
  expect(mobile).toContain(`background: url("${url}") center / 48px 48px no-repeat`);
});
