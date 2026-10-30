# Whetstorm surface candidate

This is a non-shipping review candidate. The 16 input images and their generation
records are in this directory: `row0-provenance.md`, `row1-provenance.md`,
`row2-provenance.md`, `row2-striped-canvas-provenance.md`, and `row3-provenance.md`.
The builder explicitly lists the row-major inputs. It prints every source SHA-256.
No existing Eastbrook atlas pixels are used.

Run `node scripts/assets/whetstorm_surface_candidate/build.mjs --check` to rebuild
in memory and compare all outputs. For a fresh output directory, `--write` uses
exclusive creation and refuses to overwrite existing candidates. Run
`node --test scripts/assets/whetstorm_surface_candidate/build.test.mjs` for the
pixel contract checks.

The builder resizes each independent material to 128 square, converts luminance
using 54/183/19 weights, clips each cell to its 2nd and 98th percentiles, and
maps it to equal RGB channels in the 192 to 255 range. It generates tangent-space
normal and equal-channel roughness companions with the same per-cell strengths,
roughness bases, within-cell tent blur and four-pixel normal edge fade as the
current renderer contract. These outputs are lossless 512 square WebP files.

| Candidate | Bytes | SHA-256 |
| --- | ---: | --- |
| `whetstorm-surface-candidate.webp` | 150752 | `6f59e0960b5163beba1084da3ec16cbc4f45d3f1ed8b0cf0236e1aff2b69591c` |
| `whetstorm-normal-candidate.webp` | 120220 | `60442dea851c44db43a9e1d5f00e0de780630f3024dbbb5bf0ae9c0b7f7982e4` |
| `whetstorm-rough-candidate.webp` | 130796 | `3b2ec7a50ff2b3d365f84b4f755fc21beb6e0345af80d0ef5c5fefacad475cce` |

Visual review is pending. In particular the canvas stripes are broad and highly
contrasting in the multiplier; check them in the real town and across Lambert and
Standard tiers. Seamlessness and mip behavior have not been verified. The roughness
candidate is only 276 bytes below the existing 131072-byte PBR ceiling. Do not ship
or switch runtime paths until the visual and integration checks pass.
