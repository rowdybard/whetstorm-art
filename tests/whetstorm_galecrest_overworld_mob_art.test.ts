import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { describe, expect, it } from 'vitest';
import { visualKeyFor } from '../src/render/characters/manifest';
import {
  GALECREST_CAMPS,
  GALECREST_MOBS,
  GALECREST_QUEST_CAMPS,
} from '../src/sim/content/galecrest';
import type { Entity } from '../src/sim/types';

const ids = ['moor_ram', 'shoal_scuttler', 'the_wreck_warden', 'drowned_deckhand'];
const provenance = JSON.parse(
  readFileSync('public/ui/whetstorm/mobs/galecrest-overworld-provenance.json', 'utf8'),
);
const digest = (bytes: Buffer) => createHash('sha256').update(bytes).digest('hex');

describe('Galecrest overworld target portraits', () => {
  it('covers active camps and their actual renderer bodies', () => {
    expect(provenance.entries.map((entry: { id: string }) => entry.id)).toEqual(ids);
    expect(ids.map((id) => GALECREST_MOBS[id].family)).toEqual([
      'beast',
      'beast',
      'undead',
      'undead',
    ]);
    expect(ids.map((templateId) => visualKeyFor({ kind: 'mob', templateId } as Entity))).toEqual([
      'mob_alpaca',
      'mob_crab',
      'mob_bruiser',
      'skel_minion',
    ]);
    for (const id of ids) {
      expect([...GALECREST_CAMPS, ...GALECREST_QUEST_CAMPS].some((camp) => camp.mobId === id)).toBe(
        true,
      );
    }
  });

  it('pins distinct shipping images and original masters', async () => {
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
