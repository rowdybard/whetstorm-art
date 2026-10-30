import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { describe, expect, it } from 'vitest';
import { DELVE_MOBS } from '../src/sim/content/delves/mobs';
import { ZONE2_MOBS } from '../src/sim/content/zone2';

const ids = ['mirejaw_frenzy', 'widow_hatchling', 'nhalia_mourner', 'tolling_bell'];
const provenance = JSON.parse(
  readFileSync('public/ui/whetstorm/mobs/mirefen-encounter-adds-provenance.json', 'utf8'),
);
const digest = (bytes: Buffer) => createHash('sha256').update(bytes).digest('hex');

describe('Mirefen and Litany encounter portraits', () => {
  it('covers the summoned and encounter entity templates', () => {
    expect(ZONE2_MOBS.mirejaw_the_ravenous.summonAdds?.mobId).toBe('mirejaw_frenzy');
    expect(ZONE2_MOBS.sister_nhalia.summonAdds?.mobId).toBe('nhalia_mourner');
    expect(ZONE2_MOBS.widow_hatchling.family).toBe('spider');
    expect(DELVE_MOBS.tolling_bell).toBeDefined();
    expect(provenance.entries.map((entry: { id: string }) => entry.id)).toEqual(ids);
  });

  it('pins distinct original masters and 128px shipping portraits', async () => {
    for (const key of ['prompt', 'sha256']) {
      expect(
        new Set(provenance.entries.map((entry: Record<string, string>) => entry[key])).size,
      ).toBe(ids.length);
    }
    expect(
      new Set(
        provenance.entries.map((entry: { master: { sha256: string } }) => entry.master.sha256),
      ).size,
    ).toBe(ids.length);
    for (const entry of provenance.entries) {
      expect(entry.source).toBe('OpenAI built-in image generation, text only');
      expect(entry.path).toBe(`public/ui/whetstorm/mobs/${entry.id}.webp`);
      expect(entry.master.path).toBe(`docs/design/whetstorm-art/mobs/${entry.id}.png`);
      for (const asset of [entry, entry.master]) {
        const bytes = readFileSync(asset.path);
        expect(digest(bytes)).toBe(asset.sha256);
        expect(bytes.length).toBe(asset.bytes);
      }
      expect(await sharp(entry.path).metadata()).toMatchObject({
        format: 'webp',
        width: 128,
        height: 128,
      });
      const master = await sharp(entry.master.path).metadata();
      expect(master.format).toBe('png');
      expect(master.width).toBeGreaterThanOrEqual(512);
      expect(master.height).toBeGreaterThanOrEqual(512);
    }
  });
});
