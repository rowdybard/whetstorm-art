# Full-game art integration notes

Snapshot: art branch `ea59da4118`, full-game task checkout `16796615be`,
2026-10-30. Recheck both revisions and working trees before using these notes.
The art repository is an independent, partial source snapshot based on full-game
commit `64dcb3e84`; its root `e79fbec070` is not an ancestor in the full game's
Git history. It omits many game assets, tests, translations and generated files.
Do not interpret those omissions as requested deletions or merge the unrelated
histories wholesale.

At the snapshot the art delta had 4,289 changed paths: 4,251 additions and 38
modifications. None of the additions was tracked at the inspected full-game
HEAD at that snapshot. Later work deliberately adds a replacement at
`public/vfx/fel_meteor_impact.png`, a path already present in the full checkout;
review it as a replacement rather than assuming all additions are collision-free.
These counts are historical, not a current inventory. Preserve unrelated
uncommitted and untracked work in both repositories, including the independent
temporal-clock audio worktree.

For a future integration, start with a separate full-game candidate at the
appropriate current fork revision. Review and apply the intentional art delta
relative to the snapshot root, including deliberate deletions only after checking
their full-game consumers and rights. Reconcile source changes instead of
replacing full-game files with older snapshot copies. In particular:

- `src/guide/pages/deeds.ts`: preserve the newer removal of Steam/Epic copy and
  the art branch's deed-image routing and fallback.
- `src/guide/styles.css`: preserve the original hero-art substitution alongside
  newer responsive navigation, search and layout changes.
- `src/styles/components.css`: preserve art URL changes alongside newer
  dev-command and grid sizing changes.
- Reconcile `CREDITS.md` by individual provenance record; never relabel the
  historical restricted art as cleared.

Full-game tests may intentionally pin old art. In particular, inspect currency,
quest-dialog, guide/deed, held-weapon, map-marker, podium and world-quest ladder
tests against actual consumers before updating assertions. A read-only search
found 53 full-game test files mentioning legacy art paths; this is a review
queue, not a count of proven failures. Retain current guide navigation and
responsive tests. `tests/guide.test.ts`, `tests/release_v034_additional_art.test.ts`
and `tests/release_art_audit_v036_reliquary_deeds.test.ts` specifically assert
the old generated deed `crest` field; the guide generator no longer emits it.
Reconcile those tests and regenerate the guide content in the full candidate,
while preserving spoiler filtering and live deed fallback coverage. Run the
applicable full gate, a fresh candidate build, and
desktop/mobile in-game checks, including missing-state art and held-model grips.

The restricted originals and possible packed or cached copies remain a separate
release task. Compare physical files and hashes across each actual distribution,
reconcile attribution, regenerate owning manifests, and verify no restricted or
unclassified media ships. The art branch's focused checks do not establish those
conditions, authorize deployment, or verify subjective visual fit.

The fel meteor work produced an untracked partial
`src/render/assets/manifest.generated.ts` in the art worktree. It reflects only
the media present in that incomplete snapshot and must not be transplanted as a
full-game manifest. Regenerate the owning media manifest in the complete
candidate and verify the new texture there.
The later `whetstorm_flame_6x6.webp` atlas was also added after that partial
manifest was generated. The complete candidate must regenerate the manifest for
both textures and verify all VFX consumers in the built package.
