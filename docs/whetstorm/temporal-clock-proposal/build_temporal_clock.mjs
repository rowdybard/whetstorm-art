// Original clock cue: two short ticks followed by a decaying metallic chime.
// No source recordings are used. Run with an FFmpeg executable as argv[2].
import { execFileSync } from 'node:child_process';
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { conformSfxAudio } from './conform_audio.mjs';

export function generateTemporalClock(outputFile, ffmpegPath = 'ffmpeg') {
  const work = mkdtempSync(join(tmpdir(), 'temporal-clock-'));
  const source = join(work, 'source.wav');
  // The inharmonic upper partials give the final strike its bell character.
  const tick = (start, frequency) => `if(gte(t,${start}),sin(2*PI*${frequency}*(t-${start}))*exp(-65*(t-${start})),0)`;
  const chime = `if(gte(t,0.31),(sin(2*PI*880*(t-0.31))+0.35*sin(2*PI*1760*(t-0.31))+0.2*sin(2*PI*2354*(t-0.31)))*exp(-7*(t-0.31)),0)`;
  const expression = `0.3*(${tick(0.025, 1850)}+${tick(0.17, 1500)})+0.35*${chime}`;
  try {
    execFileSync(ffmpegPath, ['-hide_banner', '-loglevel', 'error', '-y', '-f', 'lavfi', '-i', `aevalsrc=exprs='${expression}':s=44100:d=0.85`, '-ac', '1', source]);
    conformSfxAudio({ inputFile: source, outputFile, duration: 0.85, ffmpegPath });
  } finally {
    rmSync(work, { recursive: true, force: true });
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  generateTemporalClock(resolve('public/audio/sfx/temporal_clock.mp3'), process.argv[2]);
}