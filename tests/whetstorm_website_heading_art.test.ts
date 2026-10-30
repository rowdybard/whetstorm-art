import { readFileSync } from 'node:fs';
import { expect, it } from 'vitest';

it('routes website headings to self-contained original artwork', () => {
  const css = readFileSync('src/styles/shell.website-pages.css', 'utf8');
  for (const name of ['news', 'highscores']) {
    const url = `/ui/whetstorm/website-${name}.svg`;
    expect(css).toContain(url);
    const svg = readFileSync(`public${url}`, 'utf8');
    expect(svg).toContain('<svg');
    expect(svg).not.toMatch(/<script\b|<image\b|(?:href|src)\s*=/i);
  }
});
