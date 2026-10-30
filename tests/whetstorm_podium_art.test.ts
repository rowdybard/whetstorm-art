import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const css = readFileSync('src/styles/components.css', 'utf8');
const colors = ['gold', 'silver', 'bronze'] as const;

describe('Whetstorm podium medals', () => {
  it('uses the same rank-specific original art on both leaderboard podiums', () => {
    for (const [index, color] of colors.entries()) {
      const url = `/ui/whetstorm/leaderboard/medal_${color}.svg`;
      for (const windowId of ['leaderboard-window', 'world-quest-leaderboard-window']) {
        const rule = css.match(new RegExp(`#${windowId} \\.lbp-slot-${index + 1} \\{([^}]+)\\}`));
        expect(rule?.[1]).toContain(`url("${url}")`);
      }
      const svg = readFileSync(`public${url}`, 'utf8');
      expect(svg).toContain('<svg');
      expect(svg).toContain('</svg>');
      expect(svg).not.toMatch(/<image\b|<script\b|(?:href|src)\s*=/i);
    }
  });
});
