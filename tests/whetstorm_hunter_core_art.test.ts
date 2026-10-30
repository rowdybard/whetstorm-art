import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { describe, expect, it } from 'vitest';
import { abilityImageUrl, iconDataUrl } from '../src/ui/icons';

const ART = [
  ['arcane_shot', '702603a988b5474b7496a8fabc43b6623582a9ed3c25e7c9f1e1c0d9f09c0fdc', '984451d89686749ee0db274d6f7cbc40ee3dc3b04f6f5705ca8dac434af5ee9a'],
  ['concussive_shot', '2e1039dead55eed33553959bf0dd20f652e740eb5fee83a083e9056f47e31abb', '789d560f484ba26e272dbe416079da00717ac59854f24ec9e6f4253cf3fe3c0e'],
  ['aimed_shot', '157e332e2ce61413ae2a432e3c1b9ee478f5b0e166f589de4409c2e9e7b441d0', 'ea74434ab40bb8e2c61d64fefd24bd9da2a03795d10ec433df47270b443c2345'],
  ['serpent_sting', '65bd2ce851c8a791465785534b5057aba3988a38ab28e8e811b394cb2f669bdc', 'ff302da53b66ffc44ef9291eff4291665b9733eb28da797fd0dd79cfceea5f2e'],
] as const;

const hash = (bytes: Buffer) => createHash('sha256').update(bytes).digest('hex');

describe('Hunter core shot art', () => {
  it('has distinct master and shipping hashes', () => {
    expect(new Set(ART.map((row) => row[1])).size).toBe(ART.length);
    expect(new Set(ART.map((row) => row[2])).size).toBe(ART.length);
    const provenance = readFileSync('docs/design/whetstorm-art/skills/hunter-core/provenance.md', 'utf8');
    for (const [id, masterHash, shippingHash] of ART) {
      expect(provenance).toContain(`| ${id} |`);
      expect(provenance).toContain(masterHash);
      expect(provenance).toContain(shippingHash);
    }
  });

  it.each(ART)(
    'resolves %s through the ability and aura icon paths',
    async (id, masterHash, shippingHash) => {
      const url = `/ui/whetstorm/abilities/hunter_core_${id}.webp`;
      expect(abilityImageUrl(id)).toBe(url);
      expect(iconDataUrl('ability', id)).toBe(url);
      expect(iconDataUrl('aura', id)).toBe(url);
      expect(hash(readFileSync(`docs/design/whetstorm-art/skills/hunter-core/${id}.png`))).toBe(masterHash);
      const bytes = readFileSync(`public${url}`);
      expect(hash(bytes)).toBe(shippingHash);
      expect(await sharp(bytes).metadata()).toMatchObject({ format: 'webp', width: 128, height: 128 });
    },
  );
});
