import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { expect, it } from 'vitest';

it('ships the original confection clasp and its intact master', async () => {
  const provenance = JSON.parse(
    readFileSync('public/ui/whetstorm/minigames/confection-clasp-provenance.json', 'utf8'),
  );
  expect(provenance.path).toBe('public/ui/whetstorm/minigames/confection-clasp.webp');
  for (const file of [provenance, provenance.master]) {
    const bytes = readFileSync(file.path);
    expect(bytes.length).toBe(file.bytes);
    expect(createHash('sha256').update(bytes).digest('hex')).toBe(file.sha256);
  }
  const image = sharp(provenance.path);
  expect(await image.metadata()).toMatchObject({ format: 'webp', width: 768, hasAlpha: false });
  await image.raw().toBuffer();
});

it('uses the clasp in the existing responsive mount', () => {
  const ui = readFileSync('src/ui/world_quest_confection_window.ts', 'utf8');
  const css = readFileSync('src/styles/components.css', 'utf8');
  expect(ui).toContain("'--wqm-clasp-art': '/ui/whetstorm/minigames/confection-clasp.webp'");
  expect(css).toContain('background: var(--wqm-clasp-art, none) center / 100% auto no-repeat');
});
