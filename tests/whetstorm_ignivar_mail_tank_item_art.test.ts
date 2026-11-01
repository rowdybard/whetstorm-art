import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { describe, expect, it } from 'vitest';
import { iconDataUrl, itemImageUrl } from '../src/ui/icons';
import { ignivarMailTankItemImageUrl } from '../src/ui/ignivar_mail_tank_item_art';

const ART = [
  ['forgewall_girdle', '5e903df8cac446030f2ac81dd04760f3f91877e417eb4c90db28d9f7eef2c9ba', '3452b38f7af0222aa121cf956a5e0343c7f015e7e2d6cde8be114daad5a1f51d'],
  ['anvilstance_sabatons', '09ee2e33428b0d33a400ff07587d93cc6fbc86ebdbbaba810428064e624dea09', '45f8d47000f8ad24b1acf5b9fac9453610ad210b471c71f6fcea3ed047843bdd'],
] as const;
const hash = (bytes: Buffer) => createHash('sha256').update(bytes).digest('hex');

describe('Ignivar mail tank offset paintings', () => {
  it('records distinct source and output hashes', () => {
    expect(new Set(ART.map((row) => row[1])).size).toBe(ART.length);
    expect(new Set(ART.map((row) => row[2])).size).toBe(ART.length);
    const note = readFileSync('docs/design/whetstorm-art/items/ignivar-mail-tank/provenance.md', 'utf8');
    for (const [id, master, output] of ART) {
      expect(note).toContain(`## ${id}`);
      expect(note).toContain(master);
      expect(note).toContain(output);
    }
    expect(ignivarMailTankItemImageUrl('unknown')).toBeNull();
  });
  it.each(ART)('resolves %s to its recorded 128px painting', async (id, master, output) => {
    const url = `/ui/whetstorm/items/${id}.webp`;
    expect(ignivarMailTankItemImageUrl(id)).toBe(url);
    expect(itemImageUrl(id)).toBe(url);
    expect(iconDataUrl('item', id)).toBe(url);
    expect(hash(readFileSync(`docs/design/whetstorm-art/items/ignivar-mail-tank/${id}.png`))).toBe(master);
    const bytes = readFileSync(`public${url}`);
    expect(hash(bytes)).toBe(output);
    expect(await sharp(bytes).metadata()).toMatchObject({ format: 'webp', width: 128, height: 128 });
  });
});
