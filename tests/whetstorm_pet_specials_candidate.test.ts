import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { describe, expect, it } from 'vitest';
import { abilityImageUrl, iconDataUrl } from '../src/ui/icons';
import { PET_ACTION_ICONS, petSpecialButtonState } from '../src/ui/pet_action_icons';
import { whetstormPetCommandImageUrl } from '../src/ui/whetstorm_pet_command_art';

const ids = ['pet_water_jet', 'emberkin_felbolt', 'gloomshade_abyssal_chain'] as const;
describe('pet special command paintings', () => {
  it('routes actual special command identities through both production icon APIs', () => {
    expect(PET_ACTION_ICONS.waterJet).toBe(ids[0]);
    expect(
      petSpecialButtonState({ petRanged: { ability: ids[1], active: { cooldown: 8 } } }, 0, false)
        ?.iconId,
    ).toBe(ids[1]);
    expect(petSpecialButtonState({ petChainPull: { ability: ids[2] } }, 0, false)?.iconId).toBe(
      ids[2],
    );
    for (const id of ids) {
      const url = `/ui/whetstorm/abilities/${id}.webp`;
      expect(whetstormPetCommandImageUrl(id)).toBe(url);
      expect(abilityImageUrl(id)).toBe(url);
      expect(iconDataUrl('ability', id)).toBe(url);
    }
  });
  it('pins three distinct opaque 128px WebPs and their source images', async () => {
    const provenance = JSON.parse(
      readFileSync('docs/design/whetstorm-art/skills/pet-specials/provenance.json', 'utf8'),
    ) as {
      entries: {
        id: string;
        source: string;
        sourceSha256: string;
        output: string;
        outputSha256: string;
      }[];
    };
    expect(provenance.entries.map((entry) => entry.id)).toEqual(ids);
    const sha = (bytes: Buffer) => createHash('sha256').update(bytes).digest('hex');
    const hashes = new Set<string>();
    for (const entry of provenance.entries) {
      expect(entry.source).toBe(`docs/design/whetstorm-art/skills/pet-specials/${entry.id}.png`);
      expect(entry.output).toBe(`public/ui/whetstorm/abilities/${entry.id}.webp`);
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
    expect(hashes.size).toBe(3);
  });
});
