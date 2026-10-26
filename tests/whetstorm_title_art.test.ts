import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { LOADING_BACKDROP_PATHS, selectLoadingBackdropPath } from '../src/ui/loading_backdrop_core';

const root = resolve(import.meta.dirname, '..');
const read = (name: string) => readFileSync(resolve(root, name), 'utf8');
const names = ['arena', 'road', 'smokewatch', 'peatfire'];

describe('Whetstorm title and loading artwork', () => {
  it('uses four original paintings for every loading selection', () => {
    expect([...LOADING_BACKDROP_PATHS]).toEqual(names.map((name) => `/website-hero-${name}.webp`));
    for (const path of LOADING_BACKDROP_PATHS) {
      expect(existsSync(resolve(root, `public${path}`))).toBe(true);
      for (const random of [NaN, -1, 0, 0.25, 0.5, 0.99, 1, 2, Infinity]) {
        const next = selectLoadingBackdropPath(random, path);
        expect(LOADING_BACKDROP_PATHS).toContain(next);
        expect(next).not.toBe(path);
      }
    }
    expect(selectLoadingBackdropPath(NaN)).toBe(LOADING_BACKDROP_PATHS[0]);
    expect(LOADING_BACKDROP_PATHS).toContain(selectLoadingBackdropPath(0.5, '/retired.webp'));
  });

  it('preserves PNG masters alongside small delivery copies', () => {
    for (const name of names) {
      const png = readFileSync(resolve(root, `public/website-hero-${name}.png`));
      expect(png.subarray(1, 4).toString()).toBe('PNG');
      expect(png.readUInt32BE(16)).toBeGreaterThan(1500);
      expect(png.readUInt32BE(20)).toBeGreaterThan(850);
      const webp = readFileSync(resolve(root, `public/website-hero-${name}.webp`));
      expect(webp.subarray(8, 12).toString()).toBe('WEBP');
      expect(webp.length).toBeLessThan(600_000);
    }
    const frame = readFileSync(resolve(root, 'public/website-portal-frame.png'));
    expect(frame.readUInt32BE(16)).toBe(1024);
    expect(frame.readUInt32BE(20)).toBe(1536);
    expect(frame[25]).toBe(6); // PNG RGBA, not an opaque RGB plate.
  });

  it('wires both entries and excludes inherited title/loading URLs from client styles', () => {
    for (const entry of ['index.html', 'play.html']) {
      const html = read(entry);
      for (const name of names) expect(html).toContain(`website-scene-${name}`);
      expect(html).toContain('poster="/website-hero-arena.webp"');
      expect(html).not.toContain('entry-landscape.webp');
    }
    for (const file of [
      'src/styles/shell.website.css',
      'src/styles/components.css',
      'src/guide/styles.css',
    ]) {
      const css = read(file);
      expect(css).not.toMatch(
        /\/textures\/loading\/|website-hero-eastbrook|entry-landscape\.webp|website-fractured-portal/,
      );
    }
    const css = read('src/styles/shell.website.css');
    expect(css).toContain('url("/website-portal-frame.png") 400 280 320 280 / 1 / 0 stretch');
    expect(css).not.toContain('320 280 fill');
  });

  it('rejects retired title/loading binaries that would otherwise copy into a build', () => {
    const old = [
      'website-hero-eastbrook-v1.webp',
      'website-hero-galecrest-v1.webp',
      'website-hero-drakelands-v1.webp',
      'website-hero-thornpeak-v1.webp',
      'website-fractured-portal-v5.webp',
      'ui/whetstorm/entry-landscape.webp',
      ...[
        'hollow-crypt-empty',
        'crystal-delve',
        'duskmoor-eclipse',
        'thornpeak-storm',
        'eastbrook-mine-duel',
        'veiled-hollow-stag',
        'hollow-crypt-party',
        'eastbrook-square',
        'drakemaw-caldera',
        'fenbridge-march',
        'fenbridge-rain-skiff',
      ].map((name) => `textures/loading/${name}.webp`),
    ];
    for (const path of old) expect(existsSync(resolve(root, 'public', path))).toBe(false);
  });
});
