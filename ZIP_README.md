# Whetstorm source snapshot

This is the source code of Whetstorm at commit 64dcb3e84 on the main branch
(2026-10-25). It is a reading copy for planning and drafting changes.

Left out on purpose, to keep it small:
- art, models, textures, sound and music files (png, webp, jpg, glb, ktx2,
  hdr, mp3, mp4 and similar);
- the tests folder;
- translation files for languages other than English, generated files, and
  large data dumps (screenshots, balance sweeps, wiki seed);
- secrets: none are in the repo, and `.env` is never committed.

Read `CLAUDE.md` first: it holds the project rules (the deterministic sim
under `src/sim/`, the `IWorld` seam, every player-visible string as a `t()`
key, no em dashes, and so on).

## Sending changes back

Return a zip that contains only the files you changed or added, each at the
same path as in this snapshot (for example `src/sim/combat/dodge.ts`). For a
deleted file, list its path in a `DELETED.txt` file at the top of the zip.
Add a short `CHANGES.md` that says what the change does and why. Claude
applies the zip to the real repo, adds or fixes tests, runs the checks, and
opens a pull request for review.
