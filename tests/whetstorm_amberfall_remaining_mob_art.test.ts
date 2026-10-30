import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { describe, expect, it } from 'vitest';
import { VISUALS, visualKeyFor } from '../src/render/characters/manifest';
import {
  AMBERFALL_CAMPS,
  AMBERFALL_MOBS,
  AMBERFALL_QUEST_CAMPS,
} from '../src/sim/content/amberfall';
import type { Entity } from '../src/sim/types';

const ids = ['harvest_sprite', 'mere_lurker', 'the_meredark'];
const provenance = JSON.parse(
  readFileSync('public/ui/whetstorm/mobs/amberfall-remaining-provenance.json', 'utf8'),
);
const digest = (bytes: Buffer) => createHash('sha256').update(bytes).digest('hex');

describe('remaining Amberfall target portrait art', () => {
  it('covers active camps and follows the actual creature models', () => {
    expect(provenance.entries.map((entry: { id: string }) => entry.id)).toEqual(ids);
    for (const id of ids) {
      expect(AMBERFALL_MOBS[id]).toBeDefined();
      expect([...AMBERFALL_CAMPS, ...AMBERFALL_QUEST_CAMPS].some((camp) => camp.mobId === id)).toBe(
        true,
      );
      const key = visualKeyFor({ kind: 'mob', templateId: id } as Entity);
      expect(key).toBe(id === 'harvest_sprite' ? 'mob_kobold' : 'mob_murloc');
      expect(VISUALS[key].url).toContain(id === 'harvest_sprite' ? '/goblin.glb' : '/frog.glb');
    }
  });

  it('pins distinct full PNG masters and 128px WebPs', async () => {
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
