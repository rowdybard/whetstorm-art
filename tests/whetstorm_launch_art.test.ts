import { createHash } from 'node:crypto';
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { abilityImageUrl, hasAbilityIconIdentity, iconDataUrl } from '../src/ui/icons';
import {
  BULWARK_ABILITY_ART_IDS,
  LAUNCH_CLASS_ART_IDS,
  launchAbilityImageUrl,
  launchClassIconUrl,
} from '../src/ui/launch_art';

const root = resolve(import.meta.dirname, '..');
const read = (path: string) => readFileSync(resolve(root, path));

describe('owner-directed launch paintings', () => {
  it('provides the exact seven current launch art identities independently of gameplay', () => {
    expect([...LAUNCH_CLASS_ART_IDS]).toEqual([
      'bulwark',
      'brute',
      'whirlblade',
      'ranger',
      'skybinder',
      'cleric',
      'warden',
    ]);
    for (const id of LAUNCH_CLASS_ART_IDS) {
      expect(launchClassIconUrl(id)).toBe(`/ui/classes/${id}.webp`);
      const png = read(`public/ui/classes/${id}.png`);
      expect(png.readUInt32BE(16)).toBe(1024);
      expect(png.readUInt32BE(20)).toBe(1024);
      expect(
        read(`public${launchClassIconUrl(id)}`)
          .subarray(8, 12)
          .toString(),
      ).toBe('WEBP');
    }
    expect(launchClassIconUrl('stormcaller')).toBeNull();
    expect(launchClassIconUrl('bladedancer')).toBeNull();
    expect(launchClassIconUrl('paladin')).toBeNull();
  });

  it('serves eight individually painted Bulwark icons through existing public URL APIs', () => {
    expect(BULWARK_ABILITY_ART_IDS).toHaveLength(8);
    const hashes = new Set<string>();
    for (const id of BULWARK_ABILITY_ART_IDS) {
      const url = `/ui/skills/bulwark/${id}.webp`;
      expect(launchAbilityImageUrl(id)).toBe(url);
      expect(abilityImageUrl(id)).toBe(url);
      expect(hasAbilityIconIdentity(id)).toBe(true);
      expect(iconDataUrl('ability', id)).toBe(url);
      expect(iconDataUrl('aura', id)).toBe(url);
      const bytes = read(`public${url}`);
      expect(bytes.subarray(8, 12).toString()).toBe('WEBP');
      expect(bytes.length).toBeLessThan(16_384);
      hashes.add(createHash('sha256').update(bytes).digest('hex'));
      const png = read(`docs/design/whetstorm-art/skills/bulwark/${id}.png`);
      expect(existsSync(resolve(root, `public/ui/skills/bulwark/${id}.png`))).toBe(false);
      expect(png.readUInt32BE(16)).toBe(1024);
      expect(png.readUInt32BE(20)).toBe(1024);
    }
    expect(hashes.size).toBe(8);
  });

  it('rejects arbitrary paths and prototype keys in both closed catalogs', () => {
    for (const id of ['__proto__', 'constructor', '../../secret', '<script>', 'bulwark_unknown']) {
      expect(launchClassIconUrl(id)).toBeNull();
      expect(launchAbilityImageUrl(id)).toBeNull();
    }
  });

  it('pins all twenty delivered paintings to their source and runtime bytes', () => {
    const record = JSON.parse(read('docs/whetstorm/accepted-launch-art.json').toString());
    expect(record.assets).toHaveLength(20);
    for (const asset of record.assets) {
      expect(createHash('sha256').update(read(asset.masterPath)).digest('hex')).toBe(
        asset.masterSha256,
      );
      expect(createHash('sha256').update(read(asset.deliveryPath)).digest('hex')).toBe(
        asset.deliverySha256,
      );
    }
  });
});
