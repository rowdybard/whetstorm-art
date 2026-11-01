// Independent candidate, never a runtime catalog entry. Only writes a new file
// under docs/design/whetstorm-art/audio/temporal-clock-candidate/.
import { spawnSync } from 'node:child_process';
import { copyFileSync, constants, lstatSync, mkdtempSync, mkdirSync, realpathSync, rmSync } from 'node:fs';
import { basename, dirname, isAbsolute, parse, relative, resolve, sep } from 'node:path';
import { tmpdir } from 'node:os';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { conformSfxAudio } from './conform_audio.mjs';
import { ffmpegArgsForUiSfx } from './ui_sfx.mjs';

const ROOT = fileURLToPath(new URL('../..', import.meta.url));
export const CANDIDATE_DIR = resolve(ROOT, 'docs/design/whetstorm-art/audio/temporal-clock-candidate');
export const CLOCK_SPEC = {
  key: 'ui_temporal_clock_candidate',
  duration: 0.8,
  prompt: 'Two soft clockwork ticks followed by a short bright bell decay.',
  masterGainDb: 0,
  layers: [
    { kind: 'tone', frequency: 1200, endFrequency: 900, start: 0, duration: 0.05, gain: 0.16, wave: 'sine' },
    { kind: 'tone', frequency: 1500, endFrequency: 1100, start: 0.24, duration: 0.05, gain: 0.14, wave: 'sine' },
    { kind: 'tone', frequency: 880, endFrequency: 880, start: 0.36, duration: 0.38, gain: 0.10, wave: 'triangle' },
    { kind: 'tone', frequency: 1760, endFrequency: 1760, start: 0.36, duration: 0.24, gain: 0.035, wave: 'sine' },
  ],
};

export function validateCandidateOutput(output) {
  const target = resolve(output);
  if (dirname(target) !== CANDIDATE_DIR || !basename(target).endsWith('.mp3')) {
    throw new Error('candidate output must be an MP3 inside the candidate directory');
  }
  return target;
}

// Check every existing ancestor before creating anything. This guards ordinary
// symlink/junction escapes, but filesystem changes can still race the checks.
export function ensureCandidateDirectory(root, directory) {
  root = resolve(root);
  directory = resolve(directory);
  const within = relative(root, directory);
  if (!within || within === '..' || within.startsWith(`..${sep}`) || isAbsolute(within)) {
    throw new Error('candidate directory must be inside the root');
  }
  const volume = parse(directory).root;
  let current = volume;
  for (const component of relative(volume, directory).split(sep).filter(Boolean)) {
    current = resolve(current, component);
    let info;
    try {
      info = lstatSync(current);
    } catch (error) {
      if (error.code !== 'ENOENT') throw error;
      const fromRoot = relative(root, current);
      if (!fromRoot || fromRoot === '..' || fromRoot.startsWith(`..${sep}`) || isAbsolute(fromRoot)) throw error;
      mkdirSync(current);
      info = lstatSync(current);
    }
    if (info.isSymbolicLink() || !info.isDirectory()) throw new Error('candidate path contains a link or non-directory');
  }
  const realRoot = realpathSync(root);
  const realDirectory = realpathSync(directory);
  const actual = relative(realRoot, realDirectory);
  if (!actual || actual === '..' || actual.startsWith(`..${sep}`) || isAbsolute(actual)) {
    throw new Error('candidate real path escapes the root');
  }
}

export function renderClockCandidate(output, ffmpegPath) {
  const target = validateCandidateOutput(output);
  if (!ffmpegPath) throw new Error('explicit ffmpeg path required');
  ensureCandidateDirectory(ROOT, CANDIDATE_DIR);
  try {
    lstatSync(target);
    throw new Error('candidate output already exists');
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
  }
  const tempRoot = resolve(tmpdir());
  const stage = mkdtempSync(resolve(tempRoot, 'whetstorm-clock-'));
  if (dirname(stage) !== tempRoot || !basename(stage).startsWith('whetstorm-clock-')) {
    throw new Error('unexpected temporary directory');
  }
  const wav = resolve(stage, 'source.wav');
  const mp3 = resolve(stage, 'candidate.mp3');
  try {
    const result = spawnSync(ffmpegPath, ffmpegArgsForUiSfx(CLOCK_SPEC, wav), { encoding: 'utf8', windowsHide: true });
    if (result.error) throw result.error;
    if (result.status !== 0) throw new Error(result.stderr || 'FFmpeg synthesis failed');
    conformSfxAudio({ inputFile: wav, outputFile: mp3, duration: CLOCK_SPEC.duration, ffmpegPath });
    ensureCandidateDirectory(ROOT, CANDIDATE_DIR);
    copyFileSync(mp3, target, constants.COPYFILE_EXCL);
  } finally {
    rmSync(stage, { recursive: true, force: true });
  }
  return target;
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  const [output, ffmpeg] = process.argv.slice(2);
  if (!output || !ffmpeg || process.argv.length !== 4) {
    throw new Error('usage: node scripts/sfx/whetstorm_temporal_clock_candidate.mjs <new-candidate.mp3> <ffmpeg-path>');
  }
  console.log(`Wrote ${renderClockCandidate(output, ffmpeg)}`);
}
