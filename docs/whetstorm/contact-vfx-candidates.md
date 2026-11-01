# Warrior contact VFX source candidates

These are independent procedural source candidates for the Warrior cut, crush,
and pierce contact sheets. Their editable generators use no inherited image
pixels. They are **not runtime replacements** and have not passed in-game visual
review. The existing contact assets and their runtime paths remain unchanged.

| Source under `docs/design/whetstorm-art/vfx/` | Generator under `scripts/assets/vfx_production/` | Source SHA-256 |
| --- | --- | --- |
| `contact_cut_source.png` | `whetstorm_contact_cut.mjs` | `50d8a68a80a584f40caa9184c6d03ffa7e60f2206f9a6019ccb6050997790ed3` |
| `contact_crush_source.png` | `whetstorm_contact_crush.mjs` | `e590d5ffc517a9fc33175a1a541c31e060cab0520514ec40d3ab0dafcecb4755` |
| `contact_pierce_source.png` | `whetstorm_contact_pierce.mjs` | `36c69e0e9cfdf6103d69a94da8222da9159a4633890a6bd7c68759b5dfbc4278` |

Each source is a 2048×2048 RGBA sheet containing 64 chronological cells in an
8×8 grid. Focused tests check reproducibility, transparent gutters and blank
endpoints. Passing those tests does not verify visual fidelity, frame orientation
after GPU transcoding, or performance.

The existing runtime expects one-level, sRGB, alpha-bearing UASTC KTX2 assets.
No suitable encoder was found in this environment. Before replacing runtime
URLs, bake and verify the vertical orientation, encode and decode with a
verified encoder, inspect all cells and alpha, and compare early/middle/late
frames under the actual shader in game. Check HDR and low-range rendering,
frame interpolation, edge bleed, effect readability, existing Warrior kit
loading/prewarm tests, and a full-candidate media manifest. Do not ship PNG or
WebP as a substitute without separately validating GPU memory and performance.

On 2026-11-01, a targeted read-only search found no KTX2/UASTC encoder on
`PATH`, in the two game checkouts' `node_modules`, the Codex directory, or the
standard Program Files and `C:/tools` locations. This is not a whole-machine
absence proof. `public/basis/basis_transcoder` is a runtime transcoder, not a
verified encoder. `scripts/assets/vfx_production/package_warrior_crush.mjs`
shows an existing vertical-flip, UASTC encode, extraction and validation
workflow, but targets a different effect and must not be run unchanged against
these sheets. Use a dedicated staging path and independently validate the
contact atlas before changing a runtime URL or full-game manifest.

The upstream contact files were introduced as binary assets in commit
`6d44ff40ddbc45ad5871ab8c357535b47b0b45a5`; that history alone does not establish
their creator or a grant for reuse. These candidates do not clear the existing
upstream assets or the other Warrior effects.
