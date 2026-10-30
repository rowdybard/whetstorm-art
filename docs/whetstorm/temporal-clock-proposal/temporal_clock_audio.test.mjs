import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import { inspectSfxConformance } from '../../../scripts/sfx/conform_audio.mjs';
import { generateTemporalClock } from './build_temporal_clock.mjs';

const ffmpegPath = process.env.WOC_FFMPEG_PATH || 'ffmpeg';
const ffprobePath = process.env.WOC_FFPROBE_PATH || 'ffprobe';
const digest = (file) => createHash('sha256').update(readFileSync(file)).digest('hex');

test('temporal clock synthesizes reproducibly and conforms to the shipped cue contract', () => {
  const dir = mkdtempSync(join(tmpdir(), 'temporal-clock-test-'));
  try {
    const first = join(dir, 'first.mp3');
    const second = join(dir, 'second.mp3');
    generateTemporalClock(first, ffmpegPath);
    generateTemporalClock(second, ffmpegPath);
    assert.equal(digest(first), digest(second));
    const saved = fileURLToPath(new URL('./temporal_clock.mp3', import.meta.url));
    for (const file of [saved, first, second]) {
      const report = inspectSfxConformance(file, {
        ffmpegPath,
        ffprobePath,
        preserveLoudness: true,
      });
      assert.equal(report.reject, false);
      assert.deepEqual(report.problems, []);
      assert.equal(report.codec, 'mp3');
      assert.equal(report.channels, 1);
      assert.equal(report.sampleRate, 44100);
      assert.equal(report.bitrate, 192);
    }
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});
