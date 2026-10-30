# Temporal clock audio proposal (nonshipping)

This is an original proposed replacement, not integrated into this source snapshot.
The generator synthesizes two ticks and a chime from mathematical tones without
borrowed recordings. The snapshot omits the audio catalog, and its existing
`public/audio/sfx/runtime-pack.json` still references the old clock hash
`01240b109c87`. This proposal does not change that runtime pack or shared credits.

## Run and verify

Node.js and a working FFmpeg with `aevalsrc`, `ebur128`, and `libmp3lame`, plus
ffprobe, are required. The scripts use this checkout's
`scripts/sfx/conform_audio.mjs`; they resolve imports and the saved clip relative
to their own locations, so the commands may be run from any working directory.
Set `WOC_FFMPEG_PATH` and `WOC_FFPROBE_PATH` to executable paths, or leave them
unset to use `ffmpeg` and `ffprobe` on PATH. No dependency installation is needed
when those executables already exist.

From the checkout root, for example, using PowerShell and the existing Windows
static binaries:

```powershell
$env:WOC_FFMPEG_PATH = (Resolve-Path node_modules/ffmpeg-static/ffmpeg.exe).Path
$env:WOC_FFPROBE_PATH = (Resolve-Path node_modules/ffprobe-static/bin/win32/x64/ffprobe.exe).Path
node --test docs/whetstorm/temporal-clock-proposal/temporal_clock_audio.test.mjs
node docs/whetstorm/temporal-clock-proposal/build_temporal_clock.mjs "$env:TEMP/temporal-clock-proposal.mp3"
```

The generator requires an explicit output path and overwrites that file. Its
optional second argument selects FFmpeg and takes precedence over the environment
variable. Use a temporary output path, not a shipping asset. The test checks the
saved proposal audio and two temporary renders for MP3 format, mono, 44.1 kHz,
192 kbps and conformance. It checks byte repeatability between those two renders
using the same executable; it does not require the saved clip to match a different
encoder version byte for byte. The commands above passed here with FFmpeg
6.1.1 and ffprobe 4.0.2. Other versions must support the required features and
pass the same test; their encoded bytes may differ. A subjective listening review
has not been performed.

## Integration remains pending

In a complete game checkout, adapt the generator and test to their intended
shipping locations, update the old clock provenance in `CREDITS.md`, regenerate
the SFX gain ceilings, TypeScript manifest and runtime pack with
`node scripts/build_sfx_manifest.mjs`, integrate the test into the normal gate,
and run the applicable QA gate. Keep other art credits. None of those integration
steps has been performed by this proposal.

An earlier full task checkout's broader gate exited with code 1 at the artifact
step: pnpm rejected its `node_modules` junction with `ERR_PNPM_UNSAFE_MODULES_DIR`,
so later steps did not run. Its dependency sync preflight also could not verify npm.