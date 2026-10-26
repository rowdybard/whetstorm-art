import { createHash } from 'node:crypto';
import { readdirSync, readFileSync } from 'node:fs';
import { relative, resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import {
  CURSOR_ATTACK,
  CURSOR_FRIENDLY,
  CURSOR_GRAB,
  CURSOR_HAND,
  cursorForHover,
} from '../src/game/cursors';
import { chromeIconUrl } from '../src/ui/chrome_icon_art';
import { currencyImageUrl } from '../src/ui/currency_art';
import {
  HUD_CHROME_ART_IDS,
  HUD_COIN_ART_IDS,
  HUD_MARKER_ART_IDS,
  hudArtworkUrl,
} from '../src/ui/hud_art';
import { type MapMarkerArtId, mapMarkerIconUrl } from '../src/ui/map_marker_icon_art';

const root = resolve(import.meta.dirname, '..');
const read = (path: string) => readFileSync(resolve(root, path));
const manifest = JSON.parse(read('docs/whetstorm/hud-art-generation.json').toString());

describe('original painted HUD batch', () => {
  it('ships only declared runtime images and the public provenance map', () => {
    const base = resolve(root, 'public/ui/whetstorm/hud');
    function files(directory: string): string[] {
      return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
        const path = resolve(directory, entry.name);
        return entry.isDirectory() ? files(path) : [relative(base, path).replaceAll('\\', '/')];
      });
    }
    const expected = manifest.records.map((row: { deliveryPath: string }) =>
      row.deliveryPath.replace('public/ui/whetstorm/hud/', ''),
    );
    expect(files(base).sort()).toEqual([...expected, 'mapping.json'].sort());
  });
  it('pins twenty distinct masters and nonempty correctly formatted runtime exports', () => {
    expect(manifest.records).toHaveLength(20);
    const hashes = new Set<string>();
    for (const row of manifest.records) {
      const master = read(row.masterPath);
      expect(master.readUInt32BE(16)).toBe(1024);
      expect(master.readUInt32BE(20)).toBe(1024);
      expect(createHash('sha256').update(master).digest('hex')).toBe(row.masterSha256);
      const bytes = read(row.deliveryPath);
      expect(bytes.length).toBeGreaterThan(100);
      expect(bytes.length).toBe(row.deliveryBytes);
      expect(createHash('sha256').update(bytes).digest('hex')).toBe(row.deliverySha256);
      if (row.family === 'cursors') {
        expect(bytes.subarray(1, 4).toString()).toBe('PNG');
        expect(bytes.readUInt32BE(16)).toBe(32);
        expect(bytes.readUInt32BE(20)).toBe(32);
        expect(bytes[25]).toBe(6);
      } else {
        expect(bytes.subarray(0, 4).toString()).toBe('RIFF');
        expect(bytes.subarray(8, 12).toString()).toBe('WEBP');
        expect(bytes.length).toBeLessThan(16_384);
      }
      hashes.add(row.masterSha256);
    }
    expect(hashes.size).toBe(20);
  });

  it('uses painted art for the exact primary identities and retains other original families', () => {
    expect(HUD_CHROME_ART_IDS).toHaveLength(8);
    expect(HUD_MARKER_ART_IDS).toHaveLength(6);
    expect(HUD_COIN_ART_IDS).toHaveLength(3);
    for (const id of HUD_CHROME_ART_IDS)
      expect(chromeIconUrl(id)).toBe(hudArtworkUrl('chrome', id));
    for (const id of HUD_COIN_ART_IDS)
      expect(currencyImageUrl(id)).toBe(hudArtworkUrl('currency', id));
    for (const id of HUD_MARKER_ART_IDS)
      expect(mapMarkerIconUrl(id as MapMarkerArtId)).toBe(hudArtworkUrl('map-markers', id));
    expect(chromeIconUrl('arena')).toBe('/ui/whetstorm/chrome/arena.svg');
    expect(currencyImageUrl('delve_mark')).toBe('/ui/whetstorm/currency/delve_mark.svg');
    expect(mapMarkerIconUrl('gather-ore')).toBe('/ui/whetstorm/map-markers/gather-ore.svg');
    for (const id of ['__proto__', 'constructor', '../../secret', '<script>']) {
      expect(hudArtworkUrl('chrome', id)).toBeNull();
      expect(hudArtworkUrl('currency', id)).toBeNull();
      expect(hudArtworkUrl('map-markers', id)).toBeNull();
    }
  });

  it('keeps CSS and game cursor hotspots aligned with exported metadata and existing hover semantics', () => {
    const css = read('src/styles/tokens.css').toString();
    const cursors: Record<string, string> = {
      arrow: CURSOR_HAND,
      gauntlet: CURSOR_ATTACK,
      'hand-grab': CURSOR_GRAB,
    };
    for (const row of manifest.records.filter((r: { family: string }) => r.family === 'cursors')) {
      const [x, y] = row.hotspot;
      expect(x).toBeGreaterThanOrEqual(0);
      expect(y).toBeGreaterThanOrEqual(0);
      expect(x).toBeLessThan(32);
      expect(y).toBeLessThan(32);
      const fragment = `/ui/whetstorm/hud/cursors/${row.id}.png") ${x} ${y},`;
      expect(css).toContain(fragment);
      expect(cursors[row.id]).toContain(fragment);
    }
    expect(cursorForHover('default', false)).toBe(CURSOR_HAND);
    expect(cursorForHover('attack', false)).toBe(CURSOR_ATTACK);
    expect(cursorForHover('friendly', false)).toBe(CURSOR_FRIENDLY);
    expect(cursorForHover('attack', true)).toBe(CURSOR_GRAB);
  });

  it('updates direct headers, coin backgrounds and the atlas legend alongside shared lookups', () => {
    for (const [file, id] of [
      ['src/ui/bags_window.ts', 'bags'],
      ['src/ui/spellbook_window.ts', 'spellbook'],
      ['src/ui/talents_window.ts', 'talents'],
      ['src/ui/hud/quest/questlog_window.ts', 'questlog'],
    ]) {
      const source = read(file).toString();
      expect(source).toContain(`/ui/whetstorm/hud/chrome/${id}.webp`);
      expect(source).not.toContain(`/ui/whetstorm/chrome/${id}.svg`);
    }
    const css = read('src/styles/components.css').toString();
    for (const id of HUD_COIN_ART_IDS) expect(css).toContain(hudArtworkUrl('currency', id));
    expect(css).toContain(hudArtworkUrl('map-markers', 'service-mailbox'));
  });
});
