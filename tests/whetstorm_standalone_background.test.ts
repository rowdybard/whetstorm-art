import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const publicDir = resolve(import.meta.dirname, '../public');

describe('standalone page backgrounds', () => {
  it('preloads the same shipped Whetstorm image used by the guide hero', () => {
    const image = '/website-hero-road.webp';
    const html = readFileSync(resolve(import.meta.dirname, '../guide.html'), 'utf8');
    const css = readFileSync(resolve(import.meta.dirname, '../src/guide/styles.css'), 'utf8');
    expect(existsSync(resolve(publicDir, image.slice(1)))).toBe(true);
    expect(html).toContain(`href="${image}"`);
    expect(html).not.toContain('/loading-screen.jpg');
    expect(css).toContain(`url("${image}")`);
  });

  it('uses a shipped Whetstorm painting for the fallback and legal pages', () => {
    const image = '/website-hero-arena.webp';
    expect(existsSync(resolve(publicDir, image.slice(1)))).toBe(true);
    for (const page of [
      'data-deletion.html',
      'privacy.html',
      'server-unavailable.html',
      'support.html',
      'terms.html',
    ]) {
      const html = readFileSync(resolve(publicDir, page), 'utf8');
      expect(html).toContain(image);
      expect(html).not.toContain('/loading-screen.jpg');
    }
  });
});
