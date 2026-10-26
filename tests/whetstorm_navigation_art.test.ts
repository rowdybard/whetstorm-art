import { createHash } from 'node:crypto';
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { crestIconUrl, FAMILY_CREST_ART_IDS, STATUS_CREST_ART_IDS } from '../src/ui/crest_icon_art';
import { hudArtworkUrl } from '../src/ui/hud_art';
import {
  MAP_MARKER_ART_IDS,
  MAP_MARKER_SIZES,
  mapMarkerIconUrl,
  mapMarkerSizeForSemantic,
  mapMarkerSizesFor,
  questMarkerArtId,
  semanticMapMarkerArt,
} from '../src/ui/map_marker_icon_art';
import {
  createMapMarkerArt,
  MAP_MARKER_RASTER_COLOR_TOKENS,
  type MapMarkerRasterColors,
} from '../src/ui/map_marker_icon_loader';

const root = resolve(import.meta.dirname, '..');
const read = (path: string) => readFileSync(resolve(root, path), 'utf8');
const base = 'public/ui/whetstorm/';

describe('original Whetstorm navigation and creature crests', () => {
  it('routes every marker and atlas legend away from restricted paintings', () => {
    expect(MAP_MARKER_ART_IDS).toHaveLength(29);
    for (const id of MAP_MARKER_ART_IDS) {
      const painted = hudArtworkUrl('map-markers', id);
      expect(mapMarkerIconUrl(id)).toBe(painted ?? `/ui/whetstorm/map-markers/${id}.svg`);
      if (painted) {
        expect(
          readFileSync(resolve(root, `public${painted}`))
            .subarray(8, 12)
            .toString(),
        ).toBe('WEBP');
      } else {
        expect(read(`public${mapMarkerIconUrl(id)}`)).toContain('viewBox="0 0 64 64"');
      }
    }
    const css = read('src/styles/components.css');
    expect(css).not.toContain('/ui/map-markers/');
    for (const id of [
      'dungeon-entrance',
      'gather-ore',
      'gather-herb',
      'service-mailbox',
      'world-passage',
    ]) {
      expect(css).toContain(
        hudArtworkUrl('map-markers', id) ?? `/ui/whetstorm/map-markers/${id}.svg`,
      );
    }
  });

  it('routes the complete closed family/status catalogs to existing originals', () => {
    expect(FAMILY_CREST_ART_IDS.size).toBe(13);
    for (const id of FAMILY_CREST_ART_IDS) {
      expect(crestIconUrl(`family_${id}`)).toBe(`/ui/whetstorm/families/${id}.svg`);
      expect(read(`public${crestIconUrl(`family_${id}`)}`)).toContain('<svg');
    }
    for (const id of STATUS_CREST_ART_IDS) {
      expect(crestIconUrl(`status_${id}`)).toBe(`/ui/whetstorm/status/${id}.svg`);
      expect(read(`public${crestIconUrl(`status_${id}`)}`)).toContain('<svg');
    }
    for (const id of ['family___proto__', 'family_../../secret', 'status_toString']) {
      expect(crestIconUrl(id)).toBeNull();
    }
  });

  it('pins unique original masters and historical paths without external image content', () => {
    const manifest = JSON.parse(read(`${base}mapping.json`));
    const entries = manifest.assets.filter((entry: { supersedes?: string }) => entry.supersedes);
    expect(entries).toHaveLength(44);
    const hashes = new Set<string>();
    for (const entry of entries) {
      const svg = read(`${base}${entry.path}`);
      const hash = createHash('sha256').update(svg).digest('hex');
      expect(hash).toBe(entry.sha256);
      expect(entry.subject.length).toBeGreaterThan(10);
      expect(entry.source).toContain('no image inputs');
      expect(entry.supersedes).toMatch(/^\/ui\/(map-markers|crests\/families|crests\/status)\//);
      // Vite copies public verbatim, including files no longer requested by UI.
      // Full-checkout integration must remove these exact retired paintings.
      expect(existsSync(resolve(root, `public${entry.supersedes}`))).toBe(false);
      expect(svg).not.toMatch(/<image|<script|<foreignObject|<text|href=|onload=|<filter/i);
      expect(svg).toContain('width="64" height="64"');
      hashes.add(hash);
    }
    expect(hashes.size).toBe(44);
  });

  it('preserves actionable quest, navigation and reward state routing', () => {
    for (const state of ['available', 'ready', 'repeat', 'cooldown'] as const) {
      expect(questMarkerArtId(state)).toBe(`quest-${state}`);
    }
    const locked = semanticMapMarkerArt({ kind: 'delve-passage', state: 'sealed' });
    const opened = semanticMapMarkerArt({ kind: 'delve-passage', state: 'open' });
    expect(locked?.state).toBe('locked');
    expect(opened?.state).toBe('available');
    if (!locked) throw new Error('Expected sealed passage art');
    expect(mapMarkerSizeForSemantic('minimap', true, locked)).toBe(
      'minimapNavigationLockedCompact',
    );
    for (const state of ['locked', 'ready', 'active', 'opened'] as const) {
      const art = semanticMapMarkerArt({
        kind: 'delve-reward',
        reward: 'cache',
        state,
        bountiful: true,
      });
      expect(art?.bountiful).toBe(true);
      expect(art?.state).toBe(state === 'ready' ? 'available' : state);
    }
  });

  it('loads original art through the existing cache and rasterizes every supported state size once', () => {
    const sources: string[] = [];
    let rasterCount = 0;
    let pixelReads = 0;
    const colors = Object.fromEntries(
      Object.keys(MAP_MARKER_RASTER_COLOR_TOKENS).map((key) => [key, '#071512']),
    ) as unknown as MapMarkerRasterColors;
    const doc = {
      createElement() {
        const canvas = { width: 0, height: 0, getContext: () => ctx };
        const ctx = new Proxy(
          {},
          {
            get(_target, key) {
              if (key === 'getImageData')
                return () => {
                  pixelReads++;
                  return { data: new Uint8ClampedArray(canvas.width * canvas.height * 4) };
                };
              return () => {};
            },
            set() {
              return true;
            },
          },
        );
        rasterCount++;
        return canvas;
      },
    } as unknown as Pick<Document, 'createElement'>;
    const cache = createMapMarkerArt(
      doc,
      () => {
        const image = { complete: true, naturalWidth: 64 };
        Object.defineProperty(image, 'src', { set: (value: string) => sources.push(value) });
        return image as HTMLImageElement;
      },
      colors,
    );
    cache.preload();
    expect(sources).toHaveLength(29);
    expect(sources.every((url) => url.startsWith('/ui/whetstorm/'))).toBe(true);
    for (const id of MAP_MARKER_ART_IDS) {
      for (const size of mapMarkerSizesFor(id)) {
        const sprite = cache.sprite(id, size) as HTMLCanvasElement;
        expect(sprite.width).toBe(MAP_MARKER_SIZES[size]);
        expect(cache.sprite(id, size)).toBe(sprite);
      }
    }
    expect(pixelReads).toBeGreaterThan(0);
    const count = rasterCount;
    cache.preload();
    cache.refreshPalette();
    expect(sources).toHaveLength(29);
    expect(rasterCount).toBe(count);
  });
});
