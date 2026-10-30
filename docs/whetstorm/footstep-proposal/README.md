# Footstep sketches: nonshipping proposal

This is an original procedural audio experiment, not a replacement asset pack. The
generator combines seeded pseudorandom noise, decaying sine oscillators, envelopes,
and surface-specific parameters. It reads no sound files or external samples, uses
no paid services, and was authored for Whetstorm. The output is mono 44.1 kHz,
16-bit PCM WAV, 0.24 seconds per take. Six surfaces each have five fixed seeds.
The generated manifest records each filename, surface, seed, and SHA-256 of the WAV.
Python and its standard library are the only generation dependencies; exact hashes
are reproducible within the same Python/platform math environment.

The existing `foot_*` assets are credited in `CREDITS.md` as CC BY-NC 4.0 with a
commercial grant to Levy Street that does not transfer to this fork; this
experiment does not derive from those recordings.
The runtime uses these surface keys for optional footsteps and mount stride fallback.
No runtime files, generated game manifests, or credits have been changed.

Run from this directory, using an existing empty directory under the system temporary
directory:

```powershell
$out = Join-Path $env:TEMP 'whetstorm-footstep-preview'
New-Item -ItemType Directory -Path $out
python synthesize.py --output $out
python -m unittest -v test_proposal.py
```

The generator rejects a nonempty directory or a path outside system temp. It never
overwrites existing files. Inspect a take with the locally installed FFmpeg tools,
for example `ffprobe -v error -show_streams "$out/foot_grass_1.wav"`. Use the
repository's bundled ffprobe executable if it is not on PATH.

Outstanding before any shipping decision: subjective listening to every surface and
variation, iteration on realism, loudness and repetition, runtime integration for both
optional footsteps and mount fallback, codec and SFX pipeline conformance, licensing
review and credits, and the full game QA gate. Passing the local tests does not establish
perceptual quality or game readiness.
