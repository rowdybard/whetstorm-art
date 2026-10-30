import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { describe, expect, it } from 'vitest';
import { POWERUPS_BY_ID } from '../src/sim/content/augments';
import { resolveHudAuraIconId } from '../src/ui/aura_icon_runtime';
import { auraImageUrl, iconDataUrl } from '../src/ui/icons';
import { whetstormPowerupAuraImageUrl } from '../src/ui/whetstorm_powerup_aura_art';

const effects = [
  ['pow_berserker', ['buff_ap', 'buff_speed']],
  ['pow_colossus', ['buff_scale', 'slow']],
  ['pow_moon_boots', ['buff_jump', 'buff_speed']],
  ['pow_speed_demon', ['buff_speed', 'buff_scale']],
] as const;

describe('powerup aura candidate art', () => {
  it('resolves the actual powerup effect aliases to their corresponding source identity', () => {
    for (const [id, kinds] of effects) {
      const expected = `/ui/whetstorm/auras/${id}.webp`;
      expect(whetstormPowerupAuraImageUrl(id)).toBe(expected);
      expect(auraImageUrl(id)).toBe(expected);
      expect(iconDataUrl('aura', id)).toBe(expected);
      expect(POWERUPS_BY_ID[id].buffs.map((buff) => buff.kind)).toEqual(kinds);
      for (const buff of POWERUPS_BY_ID[id].buffs) {
        const resolved = resolveHudAuraIconId({
          id: `powerup_${id}_${buff.kind}`,
          kind: buff.kind,
        });
        expect(resolved).toBe(id);
        expect(auraImageUrl(resolved)).toBe(expected);
      }
    }
    expect(whetstormPowerupAuraImageUrl('unknown')).toBeNull();
  });

  it('pins distinct opaque 128px WebPs and their original source images', async () => {
    const provenance = JSON.parse(
      readFileSync('docs/design/whetstorm-art/auras/powerups/provenance.json', 'utf8'),
    ) as {
      entries: {
        id: string;
        source: string;
        sourceSha256: string;
        output: string;
        outputSha256: string;
      }[];
    };
    expect(provenance.entries.map((entry) => entry.id)).toEqual(effects.map(([id]) => id));
    const sha256 = (bytes: Buffer) => createHash('sha256').update(bytes).digest('hex');
    const hashes = new Set<string>();
    for (const entry of provenance.entries) {
      expect(entry.source).toBe(`docs/design/whetstorm-art/auras/powerups/${entry.id}.png`);
      expect(entry.output).toBe(`public/ui/whetstorm/auras/${entry.id}.webp`);
      const source = readFileSync(entry.source),
        output = readFileSync(entry.output);
      expect(sha256(source)).toBe(entry.sourceSha256);
      expect(sha256(output)).toBe(entry.outputSha256);
      const metadata = await sharp(output).metadata();
      expect([metadata.format, metadata.width, metadata.height, metadata.hasAlpha]).toEqual([
        'webp',
        128,
        128,
        false,
      ]);
      hashes.add(sha256(output));
    }
    expect(hashes.size).toBe(4);
  });
});
