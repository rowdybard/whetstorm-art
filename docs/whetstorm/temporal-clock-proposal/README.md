# Temporal clock audio proposal (nonshipping)

This is a proposed original replacement, not integrated into this source snapshot.
The generator synthesizes two ticks and a chime from mathematical tones without
borrowed recordings. The snapshot omits the audio catalog, and its existing
`public/audio/sfx/runtime-pack.json` still references the old clock hash
`01240b109c87`. This proposal does not change that runtime pack or shared credits.

In a complete game checkout, place the files at:

- `scripts/sfx/build_temporal_clock.mjs`
- `public/audio/sfx/temporal_clock.mp3`
- `tests/temporal_clock_audio.test.mjs`

Apply the two targeted clock provenance edits to `CREDITS.md`: remove the old
permission-only clock reference from the introductory paragraph and replace its
asset table row with the original tone-synthesis provenance. Keep other art credits.
Regenerate the SFX gain ceilings, TypeScript manifest and runtime pack with
`node scripts/build_sfx_manifest.mjs` in the complete checkout. Integrate the
focused Node test into the normal test gate and run the applicable QA gate.

The full task checkout generated the MP3 with the existing conform pipeline. Its
focused Node test passed reproducibility, cue-key and per-file conformance checks:
mono MP3, 44.1 kHz, 192 kbps, -6.2 dB true peak. A subjective listening review
was not performed. The broader gate exited with code 1 at the artifact step:
pnpm rejected the worktree's `node_modules` junction with
`ERR_PNPM_UNSAFE_MODULES_DIR`, so later gate steps did not run. Its dependency
sync preflight also could not verify npm. The test assumes its intended
destination paths and is not directly runnable from this proposal directory;
its byte-for-byte MP3 assertion also depends on the encoder version.
