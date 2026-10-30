import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { describe, expect, it } from 'vitest';
import { abilityImageUrl, iconDataUrl } from '../src/ui/icons';
import { whetstormDruidNatureImageUrl } from '../src/ui/whetstorm_druid_nature_art';

const ART = [
  ['healing_touch', 'f0a08f2a9d3faa96d9231d57baada22397f463f125779f1736b9a9798b92386c', 'a1a54f270cb0acf90a095536dcf18d8e0da5e1c79bfecd17fde1e064d3daa00c'],
  ['rejuvenation', '48579e0c74e0990f9e487e7b2f596812717724854a0a3bd9b77372f10f6d64ca', '6fac02a6040654a452b79df4e814adeaf8f8e60d6dc2627473c8471a6fe51117'],
  ['entangling_roots', '98573811c1e45d6b4fa5a451e4498fb83f39b235e6fba9006f538daedca43174', '5026771152a592522aa609a99f26f97475c4755cac455dd0374a85d03e41d82c'],
  ['barkskin', '68701fd70dbd42cceedae8b0c889f9ed8bf31ba43e2ec10d093e5b829aeed62a', '6a2696a173fe64f8dedff546c167db480640ef286d98246c15ed6ff6449843f1'],
] as const;
const hash = (bytes: Buffer) => createHash('sha256').update(bytes).digest('hex');

describe('Druid nature paintings', () => {
  it('records distinct source and shipping hashes', () => {
    expect(new Set(ART.map((row) => row[1])).size).toBe(ART.length);
    expect(new Set(ART.map((row) => row[2])).size).toBe(ART.length);
    expect(whetstormDruidNatureImageUrl('unknown')).toBeNull();
    const note = readFileSync('docs/design/whetstorm-art/skills/druid-nature/provenance.md', 'utf8');
    for (const [id, master, output] of ART) {
      expect(note).toContain(`## ${id}`);
      expect(note).toContain(master);
      expect(note).toContain(output);
    }
  });
  it.each(ART)('maps %s to its recorded 128px painting', async (id, master, output) => {
    const url = `/ui/whetstorm/abilities/druid_nature_${id}.webp`;
    expect(whetstormDruidNatureImageUrl(id)).toBe(url);
    expect(abilityImageUrl(id)).toBe(url);
    expect(iconDataUrl('ability', id)).toBe(url);
    expect(hash(readFileSync(`docs/design/whetstorm-art/skills/druid-nature/${id}.png`))).toBe(master);
    const bytes = readFileSync(`public${url}`);
    expect(hash(bytes)).toBe(output);
    expect(await sharp(bytes).metadata()).toMatchObject({ format: 'webp', width: 128, height: 128 });
  });
});
