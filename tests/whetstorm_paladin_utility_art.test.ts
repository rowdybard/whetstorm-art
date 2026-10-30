import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { describe, expect, it } from 'vitest';
import { abilityImageUrl, iconDataUrl } from '../src/ui/icons';

const ART = [
  ['blessing_of_might', 'ff99b13c985e9d4cac2a3e4347b5154bac9c0d6a26c77e4d97d9682ab84c981e', 'c325dda7ba17b0090cf92a31d44a24ca987986de9697574ae58ce6ee098f350b'],
  ['divine_protection', 'a304a297f8cd5d319253ee2c3e0aea62e0666be5a4234b4e27bc9a9b617efc29', 'a73aaac9209c9cef1439d7be7cdb7efbc71211a6deeea9e62b60cf0b48240f03'],
  ['hammer_of_justice', '473ceebfb9bbe97e9d34b4c25a6fe9d46f5b8fe6cb6615beacb667bedafaa407', '4fdfe8a645708f3e62799e390a4d4c3e92e2b276e8ed4eb5352c2c2757d4e314'],
  ['lay_on_hands', '2e1491da66385ba67816c80129f5efc68bc76d88dfa7b4b2a7213799a91117f9', '9e06e0b8cd840df0fd749a3a86b30e4881c3e6659161517fc5f67da002c2b7ad'],
] as const;
const hash = (bytes: Buffer) => createHash('sha256').update(bytes).digest('hex');

describe('Paladin utility paintings', () => {
  it('records distinct master and shipping hashes in provenance', () => {
    expect(new Set(ART.map((row) => row[1])).size).toBe(ART.length);
    expect(new Set(ART.map((row) => row[2])).size).toBe(ART.length);
    const note = readFileSync('docs/design/whetstorm-art/skills/paladin-utility/provenance.md', 'utf8');
    for (const [id, master, output] of ART) {
      expect(note).toContain(`## ${id}`);
      expect(note).toContain(master);
      expect(note).toContain(output);
    }
  });
  it.each(ART)('resolves %s to the recorded 128px painting', async (id, master, output) => {
    const url = `/ui/whetstorm/abilities/paladin_utility_${id}.webp`;
    expect(abilityImageUrl(id)).toBe(url);
    expect(iconDataUrl('ability', id)).toBe(url);
    expect(hash(readFileSync(`docs/design/whetstorm-art/skills/paladin-utility/${id}.png`))).toBe(master);
    const bytes = readFileSync(`public${url}`);
    expect(hash(bytes)).toBe(output);
    expect(await sharp(bytes).metadata()).toMatchObject({ format: 'webp', width: 128, height: 128 });
  });
});
