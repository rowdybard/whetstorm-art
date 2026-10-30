import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { describe, expect, it } from 'vitest';
import { DEEDS } from '../src/sim/content/deeds';
import { deedCrestHasPaintedArt, deedCrestId } from '../src/ui/deeds_view';
import { earlyDeedImageUrl } from '../src/ui/early_deed_art';
import { grandmasterCraftDeedImageUrl } from '../src/ui/grandmaster_craft_deed_art';
import { deedImageUrl, iconDataUrl } from '../src/ui/icons';

const crafts = ['alchemy', 'cooking', 'enchanting', 'inscription'] as const;
describe('Grandmaster craft deed painting candidates', () => {
  it('matches live skill-125 triggers and exact artwork paths', () => {
    for (const craft of crafts) {
      const id = `prog_grandmaster_${craft}`;
      expect(DEEDS[id].trigger).toEqual({ kind: 'craftSkill', craftId: craft, level: 125 });
      const url = `/ui/whetstorm/deeds/${id}.webp`;
      const crest = `deed_${id}`;
      expect(grandmasterCraftDeedImageUrl(id)).toBe(url);
      expect(earlyDeedImageUrl(id)).toBe(url);
      expect(deedCrestId(id, DEEDS[id].category)).toBe(crest);
      expect(deedCrestHasPaintedArt(crest)).toBe(true);
      expect(deedImageUrl(crest)).toBe(url);
      expect(iconDataUrl('crest', crest)).toBe(url);
    }
    expect(grandmasterCraftDeedImageUrl('prog_grandmaster_tailoring')).toBeNull();
  });
  it('pins four distinct opaque 128px WebPs and their source images', async () => {
    const provenance = JSON.parse(
      readFileSync('docs/design/whetstorm-art/deeds/grandmaster-craft/provenance.json', 'utf8'),
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
      crafts.map((craft) => `prog_grandmaster_${craft}`),
    );
    const sha = (bytes: Buffer) => createHash('sha256').update(bytes).digest('hex');
    const hashes = new Set<string>();
    for (const entry of provenance.entries) {
      expect(entry.source).toBe(
        `docs/design/whetstorm-art/deeds/grandmaster-craft/${entry.id}.png`,
      );
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
    expect(hashes.size).toBe(4);
  });
});
