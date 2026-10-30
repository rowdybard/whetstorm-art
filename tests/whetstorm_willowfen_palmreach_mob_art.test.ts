import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { describe, expect, it } from 'vitest';
import { visualKeyFor } from '../src/render/characters/manifest';
import { PALMREACH_CAMPS, PALMREACH_MOBS } from '../src/sim/content/palmreach';
import { WILLOWFEN_CAMPS, WILLOWFEN_MOBS } from '../src/sim/content/willowfen';
import type { Entity } from '../src/sim/types';

const ids = ['lily_wisp', 'drowsy_croaker', 'tide_scuttler', 'thicket_boar'];
const provenance = JSON.parse(
  readFileSync('public/ui/whetstorm/mobs/willowfen-palmreach-provenance.json', 'utf8'),
);
const digest = (bytes: Buffer) => createHash('sha256').update(bytes).digest('hex');

describe('Willowfen and Palmreach target portraits', () => {
  it('covers live camp mobs and their actual renderer bodies', () => {
    expect(provenance.entries.map((entry: { id: string }) => entry.id)).toEqual(ids);
    expect(ids.map((id) => (WILLOWFEN_MOBS[id] ?? PALMREACH_MOBS[id]).family)).toEqual([
      'elemental',
      'mudfin',
      'beast',
      'beast',
    ]);
    expect(ids.map((templateId) => visualKeyFor({ kind: 'mob', templateId } as Entity))).toEqual([
      'mob_ghost',
      'mob_murloc',
      'mob_crab',
      'mob_boar',
    ]);
    for (const id of ids) {
      expect([...WILLOWFEN_CAMPS, ...PALMREACH_CAMPS].some((camp) => camp.mobId === id)).toBe(true);
    }
  });

  it('pins distinct original masters and 128px shipping images', async () => {
    const hashes = new Set<string>();
    const prompts = new Set<string>();
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
      prompts.add(entry.prompt);
    }
    expect(hashes.size).toBe(ids.length);
    expect(prompts.size).toBe(ids.length);
  });
});
