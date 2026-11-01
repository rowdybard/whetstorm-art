import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, symlinkSync } from 'node:fs';
import { basename, dirname, resolve } from 'node:path';
import { tmpdir } from 'node:os';
import { spawnSync } from 'node:child_process';
import ffmpeg from 'ffmpeg-static';
import ffprobe from 'ffprobe-static';
import { expect, it } from 'vitest';
import { CANDIDATE_DIR, CLOCK_SPEC, ensureCandidateDirectory, renderClockCandidate, validateCandidateOutput } from '../scripts/sfx/whetstorm_temporal_clock_candidate.mjs';

it('keeps the independent candidate outside runtime and decodes its recorded bytes', () => {
  const record = JSON.parse(readFileSync('docs/whetstorm/temporal-clock-candidate.json', 'utf8'));
  const bytes = readFileSync(record.candidate);
  expect(createHash('sha256').update(bytes).digest('hex')).toBe(record.sha256);
  expect(createHash('sha256').update(readFileSync(record.generator)).digest('hex')).toBe(record.generatorSha256);
  expect(CLOCK_SPEC.key).toBe('ui_temporal_clock_candidate');
  expect(validateCandidateOutput(record.candidate)).toBe(resolve(record.candidate));
  expect(() => validateCandidateOutput('public/audio/sfx/temporal_clock.mp3')).toThrow();
  expect(() => validateCandidateOutput(resolve(CANDIDATE_DIR, '../outside.mp3'))).toThrow();
  expect(() => renderClockCandidate(record.candidate, 'not-run')).toThrow(/already exists/);
  const runtime = resolve('public/audio/sfx/temporal_clock.mp3');
  const existed = existsSync(runtime);
  expect(() => renderClockCandidate(runtime, 'not-run')).toThrow();
  expect(existsSync(runtime)).toBe(existed);
  const probe = spawnSync(ffprobe.path, ['-v', 'error', '-select_streams', 'a:0', '-show_entries', 'stream=codec_name,sample_rate,channels,bit_rate', '-of', 'json', record.candidate], { encoding: 'utf8' });
  expect(probe.status).toBe(0);
  expect(JSON.parse(probe.stdout).streams[0]).toMatchObject({ codec_name: 'mp3', sample_rate: '44100', channels: 1, bit_rate: '192000' });
  const decode = spawnSync(ffmpeg, ['-v', 'error', '-i', record.candidate, '-f', 's16le', '-'], { maxBuffer: 1024 * 1024 });
  expect(decode.status).toBe(0);
  expect(decode.stdout.some((sample) => sample !== 0)).toBe(true);
});

it('rejects symlink or junction ancestors before creating a candidate directory', () => {
  const root = resolve(tmpdir());
  const stage = mkdtempSync(resolve(root, 'whetstorm-clock-test-'));
  expect(dirname(stage)).toBe(root);
  expect(basename(stage)).toMatch(/^whetstorm-clock-test-/);
  try {
    const outside = resolve(stage, 'outside');
    mkdirSync(outside);
    const link = resolve(stage, 'link');
    try {
      symlinkSync(outside, link, process.platform === 'win32' ? 'junction' : 'dir');
    } catch (error) {
      if (error.code === 'EPERM' || error.code === 'EACCES' || error.code === 'ENOTSUP') return;
      throw error;
    }
    expect(() => ensureCandidateDirectory(stage, resolve(link, 'nested'))).toThrow(/link/);
    expect(existsSync(resolve(outside, 'nested'))).toBe(false);
  } finally {
    rmSync(stage, { recursive: true, force: true });
  }
});
