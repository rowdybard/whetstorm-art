import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { describe, expect, it } from 'vitest';
import { DEEDS } from '../src/sim/content/deeds';
import { deedCrestHasPaintedArt, deedCrestId } from '../src/ui/deeds_view';
import { earlyDeedImageUrl } from '../src/ui/early_deed_art';
import { deedImageUrl, iconDataUrl } from '../src/ui/icons';
import { rareCraftDeedImageUrl } from '../src/ui/rare_craft_deed_art';

const crafts = [
  'engineering',
  'leatherworking',
  'tailoring',
  'jewelcrafting',
  'inscription',
] as const;
describe('rare craft deed painting candidates', () => {
  it('matches live rare-craft deed triggers and exact artwork paths', () => {
    for (const craft of crafts) {
      const id = `prog_${craft}_rare`;
      expect(DEEDS[id].trigger).toEqual({ kind: 'visit', markId: `craft_rare:${craft}` });
      const url = `/ui/whetstorm/deeds/${id}.webp`;
      const crest = `deed_${id}`;
      expect(rareCraftDeedImageUrl(id)).toBe(url);
      expect(earlyDeedImageUrl(id)).toBe(url);
      expect(deedCrestId(id, DEEDS[id].category)).toBe(crest);
      expect(deedCrestHasPaintedArt(crest)).toBe(true);
      expect(deedImageUrl(crest)).toBe(url);
      expect(iconDataUrl('crest', crest)).toBe(url);
    }
    expect(rareCraftDeedImageUrl('prog_alchemy_rare')).toBeNull();
  });
  it('pins five distinct opaque 128px WebPs and their source images', async () => {
    const provenance = JSON.parse(
      readFileSync('docs/design/whetstorm-art/deeds/rare-craft/provenance.json', 'utf8'),
    ) as {
      entries: {
        id: string;
        source: string;
        sourceSha256: string;
        output: string;
        outputSha256: string;
      }[];
    };
    expect(provenance.entries.map((entry) => entry.id)).toEqual(
      crafts.map((craft) => `prog_${craft}_rare`),
    );
    const sha = (bytes: Buffer) => createHash('sha256').update(bytes).digest('hex');
    const hashes = new Set<string>();
    for (const entry of provenance.entries) {
      expect(entry.source).toBe(`docs/design/whetstorm-art/deeds/rare-craft/${entry.id}.png`);
      expect(entry.output).toBe(`public/ui/whetstorm/deeds/${entry.id}.webp`);
      const source = readFileSync(entry.source),
        output = readFileSync(entry.output);
      expect(sha(source)).toBe(entry.sourceSha256);
      expect(sha(output)).toBe(entry.outputSha256);
      const meta = await sharp(output).metadata();
      expect([meta.format, meta.width, meta.height, meta.hasAlpha]).toEqual([
        'webp',
        128,
        128,
        false,
      ]);
      hashes.add(sha(output));
    }
    expect(hashes.size).toBe(5);
  });
});
