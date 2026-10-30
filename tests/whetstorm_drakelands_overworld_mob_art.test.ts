import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { describe, expect, it } from 'vitest';
import {
  DRAKELANDS_CAMPS,
  DRAKELANDS_MOBS,
  DRAKELANDS_QUEST_CAMPS,
} from '../src/sim/content/drakelands';

const ids = ['ashbone_raider', 'ashbone_warcaller', 'dune_troll', 'cindraleth_maw_matriarch'];
const provenance = JSON.parse(
  readFileSync('public/ui/whetstorm/mobs/drakelands-overworld-provenance.json', 'utf8'),
);
const digest = (bytes: Buffer) => createHash('sha256').update(bytes).digest('hex');

describe('Drakelands overworld target portraits', () => {
  it('covers live Drakelands camp mobs with the intended families', () => {
    expect(provenance.entries.map((entry: { id: string }) => entry.id)).toEqual(ids);
    expect(ids.map((id) => DRAKELANDS_MOBS[id].family)).toEqual([
      'undead',
      'undead',
      'troll',
      'dragonkin',
    ]);
    for (const id of ids) {
      expect(
        [...DRAKELANDS_CAMPS, ...DRAKELANDS_QUEST_CAMPS].some((camp) => camp.mobId === id),
      ).toBe(true);
    }
  });

  it('pins distinct 128px shipping images and original masters', async () => {
    const hashes = new Set<string>();
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
    }
    expect(hashes.size).toBe(ids.length);
  });
});
