import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { describe, expect, it } from 'vitest';
import { abilityImageUrl, iconDataUrl } from '../src/ui/icons';
import { PET_ACTION_ICONS } from '../src/ui/pet_action_icons';
import { whetstormPetCommandImageUrl } from '../src/ui/whetstorm_pet_command_art';

const commands = [
  ['attack', 'pet_attack'],
  ['taunt', 'pet_growl'],
  ['healDemon', 'pet_mend'],
  ['passive', 'pet_passive'],
] as const;
describe('pet command painting candidates', () => {
  it('matches live pet action identities and exact artwork paths', () => {
    for (const [command, id] of commands) {
      expect(PET_ACTION_ICONS[command]).toBe(id);
      const url = `/ui/whetstorm/abilities/${id}.webp`;
      expect(whetstormPetCommandImageUrl(id)).toBe(url);
      expect(abilityImageUrl(id)).toBe(url);
      expect(iconDataUrl('ability', id)).toBe(url);
    }
    expect(whetstormPetCommandImageUrl('pet_feed')).toBeNull();
  });
  it('pins four distinct opaque 128px WebPs and their source images', async () => {
    const provenance = JSON.parse(
      readFileSync('docs/design/whetstorm-art/skills/pet-commands/provenance.json', 'utf8'),
    ) as {
      entries: {
        id: string;
        source: string;
        sourceSha256: string;
        output: string;
        outputSha256: string;
      }[];
    };
    expect(provenance.entries.map((entry) => entry.id)).toEqual(commands.map(([, id]) => id));
    const sha = (bytes: Buffer) => createHash('sha256').update(bytes).digest('hex');
    const hashes = new Set<string>();
    for (const entry of provenance.entries) {
      expect(entry.source).toBe(`docs/design/whetstorm-art/skills/pet-commands/${entry.id}.png`);
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
    expect(hashes.size).toBe(4);
  });
});
