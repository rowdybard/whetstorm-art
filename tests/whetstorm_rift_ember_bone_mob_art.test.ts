import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { describe, expect, it } from 'vitest';
import { RIFT_THEMES } from '../src/sim/content/rift/themes';

const ids = ['rift_ember_fiend', 'rift_magma_brute', 'rift_boneclad', 'rift_marrow_golem'];
const provenance = JSON.parse(
  readFileSync('public/ui/whetstorm/mobs/rift-ember-bone-provenance.json', 'utf8'),
);
const digest = (bytes: Buffer) => createHash('sha256').update(bytes).digest('hex');

describe('Rift Emberforge and Boneyard portraits', () => {
  it('covers the live trash pools', () => {
    expect(RIFT_THEMES.find((theme) => theme.id === 'ember')?.trash).toEqual(ids.slice(0, 2));
    expect(RIFT_THEMES.find((theme) => theme.id === 'bone')?.trash).toEqual(ids.slice(2));
    expect(provenance.entries.map((entry: { id: string }) => entry.id)).toEqual(ids);
  });

  it('pins distinct shipping images and original masters', async () => {
    const hashes = new Set<string>();
    const masters = new Set<string>();
    for (const entry of provenance.entries) {
      expect(entry.path).toBe(`public/ui/whetstorm/mobs/${entry.id}.webp`);
      expect(entry.master.path).toBe(`docs/design/whetstorm-art/mobs/${entry.id}.png`);
      expect(entry.source).toBe('OpenAI built-in image generation, text only');
      expect(entry.prompt.length).toBeGreaterThan(100);
      const webp = readFileSync(entry.path);
      const master = readFileSync(entry.master.path);
      expect(digest(webp)).toBe(entry.sha256);
      expect(webp.length).toBe(entry.bytes);
      expect(digest(master)).toBe(entry.master.sha256);
      expect(master.length).toBe(entry.master.bytes);
      expect(await sharp(webp).metadata()).toMatchObject({
        format: 'webp',
        width: 128,
        height: 128,
      });
      const metadata = await sharp(master).metadata();
      expect(metadata.format).toBe('png');
      expect(metadata.width).toBeGreaterThanOrEqual(512);
      expect(metadata.height).toBeGreaterThanOrEqual(512);
      hashes.add(entry.sha256);
      masters.add(entry.master.sha256);
    }
    expect(hashes.size).toBe(ids.length);
    expect(masters.size).toBe(ids.length);
  });
});
