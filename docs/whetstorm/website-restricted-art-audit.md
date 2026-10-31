# Website art audit: permission-required SVGs

Read-only inventory, 2026-10-30. The following six files exist in this art worktree's `public/` directory. `CREDITS.md` marks each family **No, permission required** (do not redistribute):

| Present file | Credit evidence |
| --- | --- |
| `public/website-fractured-portal-v1.svg` | `CREDITS.md`, Website fractured portal row |
| `public/website-fractured-portal-v2.svg` | Same row |
| `public/website-fractured-portal-v3.svg` | Same row |
| `public/website-stone-gateway-v2.svg` | `CREDITS.md`, Website stone gateway row |
| `public/website-parchment-scroll-v1.svg` | `CREDITS.md`, Website parchment scroll row |
| `public/website-parchment-scroll-v2.svg` | Same row |

A filename search across `src/`, `public/`, `index.html`, and `play.html`, excluding SVG contents, found no references to these six paths. They are therefore apparently unused by the current source, not proven unreachable under every deployment. `SOURCE_SNAPSHOT.json` inventories all six; historical design notes in `docs/design/website-fractured-portal.md`, `website-stone-gateway.md`, and `website-parchment-scroll.md` describe earlier usage. Those notes are not evidence of current runtime use. The credit rows describe generated artwork in these SVGs; an SVG extension does not eliminate the recorded restrictions.

Presence under `public/` makes these files packaging candidates even if no page references them. This inventory was not a build or package inspection: check the actual `dist/`, desktop/mobile bundles, and deployment artifacts separately. Conversely, other restricted assets absent from this partial checkout cannot be assumed absent from a complete checkout or downstream package. No files were removed as part of this audit.

The production configuration predicts that all six present SVGs are copied to
the root of `dist/`: `package.json` runs `vite build`, `vite.config.ts` does not
override `publicDir` or `copyPublicDir`, and the installed Vite implementation
defaults `copyPublicDir` to true and copies the public directory into the output.
`scripts/build_media_manifest.mjs` documents that Vite copy separately from its
hashed-media emission; its native duplicate-prune scope covers only the
`models`, `textures`, `env`, and `vfx` media roots, not these root SVGs. This is
a configuration and installed-tool inspection, not an observed artifact: no
build was run and no `dist/` or downstream package was inspected.

## Whetstorm-generated art terms

The recent Whetstorm paintings have source and output provenance recorded in `CREDITS.md` and their individual manifests. Those records identify authorship and hashes but do not specify redistribution terms for the paintings or masters. The operative credits register says media terms must be recorded separately from the source-code MIT license; the owner should establish those terms before distribution. This is a documentation gap, not evidence that these new paintings belong to the upstream project.
