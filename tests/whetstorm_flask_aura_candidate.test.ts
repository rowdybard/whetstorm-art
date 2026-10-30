import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import sharp from 'sharp';
import { describe, expect, it } from 'vitest';
import { resolveHudAuraIconId } from '../src/ui/aura_icon_runtime';
import { auraImageUrl, iconDataUrl } from '../src/ui/icons';
import { whetstormFlaskAuraImageUrl } from '../src/ui/whetstorm_flask_aura_art';

const rows = [
  ['buff_sta', 'flask_buff_sta'],
  ['buff_ap', 'flask_buff_ap'],
  ['buff_int', 'flask_buff_int'],
] as const;

describe('flask aura candidate art', () => {
  it('resolves flask-marked buffs to distinct flask identities before the shared elixir identity', () => {
    for (const [kind, icon] of rows) {
      const aura = { id: `elixir_${kind}`, kind };
      expect(resolveHudAuraIconId({ ...aura, flask: true })).toBe(icon);
      expect(resolveHudAuraIconId(aura)).toBe(
        kind === 'buff_sta' ? 'elixir_buff_sta' : `aura_${kind}`,
      );
      // Revisit the same id in both orders to pin the flask-aware cache key.
      expect(resolveHudAuraIconId({ ...aura, flask: true })).toBe(icon);
      const expected = `/ui/whetstorm/auras/${icon}.webp`;
      expect(whetstormFlaskAuraImageUrl(icon)).toBe(expected);
      expect(auraImageUrl(icon)).toBe(expected);
      expect(iconDataUrl('aura', icon)).toBe(expected);
    }
    expect(whetstormFlaskAuraImageUrl('elixir_buff_sta')).toBeNull();
  });

  it('ships three different opaque 128px WebP paintings', async () => {
    const assets = await Promise.all(
      rows.map(async ([, id]) => {
        const bytes = readFileSync(`public/ui/whetstorm/auras/${id}.webp`);
        const metadata = await sharp(bytes).metadata();
        expect(metadata.format).toBe('webp');
        expect([metadata.width, metadata.height, metadata.hasAlpha]).toEqual([128, 128, false]);
        return bytes.toString('base64');
      }),
    );
    expect(new Set(assets).size).toBe(3);
  });

  it('pins each recorded source and output to the shipped bytes', () => {
    const provenance = JSON.parse(
      readFileSync('docs/design/whetstorm-art/auras/flask/provenance.json', 'utf8'),
    ) as {
      entries: {
        id: string;
        source: string;
        sourceSha256: string;
        output: string;
        outputSha256: string;
      }[];
    };
    expect(provenance.entries.map((entry) => entry.id)).toEqual(rows.map(([, id]) => id));
    const sha256 = (path: string) => createHash('sha256').update(readFileSync(path)).digest('hex');
    for (const entry of provenance.entries) {
      expect(entry.source).toBe(`docs/design/whetstorm-art/auras/flask/${entry.id}.png`);
      expect(entry.output).toBe(`public/ui/whetstorm/auras/${entry.id}.webp`);
      expect(sha256(entry.source)).toBe(entry.sourceSha256);
      expect(sha256(entry.output)).toBe(entry.outputSha256);
    }
  });
});
