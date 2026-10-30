import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { describe, expect, it } from 'vitest';
import { FARSHORE_CAMPS, FARSHORE_MOBS } from '../src/sim/content/farshore';

const ids = ['riftspawn', 'breach_wretch', 'void_stalker', 'sundered_horror'];
const hash = (path: string) => createHash('sha256').update(readFileSync(path)).digest('hex');

describe('original Farshore mob portraits', () => {
  it('covers four active creatures with distinct masters and 128px deliveries', async () => {
    const { entries } = JSON.parse(
      readFileSync('public/ui/whetstorm/mobs/farshore-overworld-provenance.json', 'utf8'),
    );
    expect(entries.map((entry: { id: string }) => entry.id)).toEqual(ids);
    expect(new Set(entries.map((entry: { sha256: string }) => entry.sha256)).size).toBe(ids.length);
    expect(
      new Set(entries.map((entry: { master: { sha256: string } }) => entry.master.sha256)).size,
    ).toBe(ids.length);
    for (const entry of entries) {
      expect(FARSHORE_MOBS[entry.id]).toBeDefined();
      expect(FARSHORE_CAMPS.some((camp) => camp.mobId === entry.id && camp.count > 0)).toBe(true);
      expect(entry.source).toBe('OpenAI built-in image generation, text only');
      expect(entry.prompt.length).toBeGreaterThan(50);
      expect(entry.path).toBe(`public/ui/whetstorm/mobs/${entry.id}.webp`);
      expect(entry.master.path).toBe(`docs/design/whetstorm-art/mobs/${entry.id}.png`);
      expect(hash(entry.path)).toBe(entry.sha256);
      expect(hash(entry.master.path)).toBe(entry.master.sha256);
      expect(await sharp(entry.path).metadata()).toMatchObject({
        format: 'webp',
        width: 128,
        height: 128,
      });
      expect((await sharp(entry.master.path).metadata()).format).toBe('png');
    }
  });
});
