import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const read = (path: string) => readFileSync(path, 'utf8');

describe('weekly vault art', () => {
  it('ships distinct, self-contained square illustrations for all states', () => {
    const art = ['closed', 'normal', 'heroic'].map((name) =>
      read(`public/ui/weekly-vault/${name}.svg`),
    );
    expect(new Set(art).size).toBe(3);
    for (const svg of art) {
      expect(svg).toContain('viewBox="0 0 256 256"');
      expect(svg).not.toMatch(/<script|<image|href=/i);
    }
  });

  it('uses shipped decorative art in both progress and claim routes', () => {
    const progress = read('src/ui/weekly_rewards_window.ts');
    const claim = read('src/ui/weekly_reward_claim_controller.ts');
    for (const source of [progress, claim]) {
      expect(source).toContain('/ui/weekly-vault/${art}.svg');
      expect(source).toMatch(/class="weekly-vault-art"[^>]*alt=""/);
    }
    expect(progress).toContain(
      "earned ? (difficulty === 'heroic' ? 'heroic' : 'normal') : 'closed'",
    );
    expect(claim).toContain("heroic ? 'heroic' : 'normal'");
  });
});
