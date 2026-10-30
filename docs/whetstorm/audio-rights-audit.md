# Audio rights and runtime reference audit

Read-only inventory, 2026-10-30. In this partial worktree, `public/audio/` contains `sfx/runtime-pack.json` but no audio binaries. This is not evidence that a complete checkout, build, deployed site, or downstream package omits or clears those binaries. Inspect the actual package and its source assets separately.

## Permission required

- `public/audio/sfx/temporal_clock.mp3` is marked **No, permission required** in the Temporal clock row of `CREDITS.md`. The present `public/audio/sfx/runtime-pack.json` catalogs its URL, and `src/ui/hud.ts` requests `temporal_clock` for temporal spell effects and the Temporal Hourglass aura. This is an active code reference; the MP3 itself is absent from this worktree.
- `public/audio/voice/ignivar/*.mp3` and `public/audio/voice/varkhul/*.mp3` are marked **No, permission required** in the Audio table of `CREDITS.md`. `src/game/voice.ts` resolves voice keys through `VOICE_LINES` and defines an Ignivar room-welcome key; `src/ui/hud.ts` plays voiced yell keys. The voice binaries and generated `src/game/voice_manifest.generated.ts` are absent here, so the precise key-to-file mappings and actual playback remain unverified. Treat the families as potentially active pending inspection of the complete manifest and package. The separate `mob_elemental_ignivar_*` and `mob_elemental_varkhul_*` URLs in the SFX runtime pack are not established here as these dialogue recordings.

### Temporal clock selection and replacement

`scripts/sfx/sfx_prompts.mjs` declares `temporal_clock` as a custom recording without a generation prompt. The runtime pack lists one main variant, `/audio/sfx/temporal_clock.mp3?v=01240b109c87`, with SHA-256 `01240b109c87a07bca05e2bf7eae23ea597bef270b4110bcf3d9338d56824100`; `scripts/sfx/sfx_gain_ceiling.generated.json` records the same hash. `src/game/sfx.ts` loads the validated whole-catalog runtime pack and fetches its selected variant. If the pack is unavailable or invalid, `src/game/sfx_runtime_pack.ts` falls back to the compiled `SFX_CLIPS` manifest. That generated manifest and the recording are absent in this partial worktree.

Changing the runtime-pack URL alone does not remove the compiled fallback. A replacement needs a suitable independently sourced or synthesized cue with recorded rights and provenance, SFX conformance and listening review, and regeneration of the compiled manifest and runtime pack through the owning SFX pipeline, including their catalog and bundle identities. Verify both selection paths and the resulting complete package. No cleared clock-like substitute was established in this audit: nearby countdown and loot cues are custom recordings whose individual source and permission were not established here. No audio was created or modified.

## With the project only

`CREDITS.md` marks the remastered streamed soundtrack under `public/audio/music/*.mp3`, the Crucible floor soundtrack, and the Proving Shore cue **With the project only**. The record permits shipping those assets as part of the project or its fork, not as standalone assets. `src/game/music_tracks.ts` references town and zone tracks, and `src/game/crucible_music.ts` references four floor tracks. The MP3s are absent in this partial worktree; their absence does not establish downstream package contents.

## Non-commercial with attribution

The Audio section of `CREDITS.md` credits selected @jamiecypher recordings under CC BY-NC 4.0 with attribution. Its separate commercial grant is to Levy Street and does not transfer with a fork. The affected families include quest, lockpick, wand, combat, movement, creature, and selected UI sounds. This is a different category from the explicit **No, permission required** rows above. The recordings are absent in this partial worktree; inspect a complete package and the individual credit rows before drawing conclusions about its contents or usage.
