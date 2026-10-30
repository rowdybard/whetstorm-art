import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { expect, it } from 'vitest';

it('ships distinct original Confection result seals with intact masters', async () => {
  const provenance = JSON.parse(
    readFileSync('public/ui/whetstorm/minigames/confection-seals-provenance.json', 'utf8'),
  );
  expect(provenance.entries.map((entry: { id: string }) => entry.id)).toEqual([
    'victory',
    'defeat',
  ]);
  const hashes = new Set<string>();
  for (const entry of provenance.entries) {
    for (const file of [entry, entry.master]) {
      const bytes = readFileSync(file.path);
      expect(bytes.length).toBe(file.bytes);
      expect(createHash('sha256').update(bytes).digest('hex')).toBe(file.sha256);
    }
    const image = sharp(entry.path);
    expect(await image.metadata()).toMatchObject({
      format: 'webp',
      width: 256,
      height: 256,
      hasAlpha: false,
    });
    await image.raw().toBuffer();
    hashes.add(entry.sha256);
  }
  expect(hashes.size).toBe(2);
});

it('uses the matching seals with the existing responsive and forced-colors behavior', () => {
  const ui = readFileSync('src/ui/world_quest_confection_window.ts', 'utf8');
  const css = readFileSync('src/styles/components.css', 'utf8');
  const mobile = readFileSync('src/styles/hud.mobile.css', 'utf8');
  expect(ui).toContain(
    "'--wqm-victory-seal-art': '/ui/whetstorm/minigames/confection-victory-seal.webp'",
  );
  expect(ui).toContain(
    "'--wqm-defeat-seal-art': '/ui/whetstorm/minigames/confection-defeat-seal.webp'",
  );
  expect(css).toContain('background: var(--wqm-victory-seal-art, none) center / contain no-repeat');
  expect(css).toContain('background-image: var(--wqm-defeat-seal-art, none)');
  expect(css).toContain('mix-blend-mode: screen');
  expect(css).toMatch(/\.wqm-result-emblem\s*\{[^}]*width: 82px;[^}]*height: 82px;/);
  expect(mobile).toMatch(/\.wqm-result-emblem\s*\{[^}]*width: 58px;[^}]*height: 58px;/);
  expect(css).toMatch(
    /@media \(forced-colors: active\)[\s\S]*?\.wqm-result-emblem svg\s*\{\s*visibility: visible;/,
  );
});

it('routes each remaining Confection decorative image to original artwork', () => {
  const ui = readFileSync('src/ui/world_quest_confection_window.ts', 'utf8');
  for (const [property, file] of [
    ['--wqm-wood-texture', 'confection-walnut-original.webp'],
    ['--wqm-frame-art', 'confection-frame-original.webp'],
    ['--wqm-clasp-art', 'confection-clasp.webp'],
    ['--wqm-crest-art', 'confection-jewel-crest.webp'],
    ['--wqm-hinge-art', 'confection-hinge-original.webp'],
  ]) {
    expect(ui).toContain(`'${property}': '/ui/whetstorm/minigames/${file}'`);
    expect(readFileSync(`public/ui/whetstorm/minigames/${file}`).length).toBeGreaterThan(0);
  }
});
