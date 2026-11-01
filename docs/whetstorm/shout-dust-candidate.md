# Shout dust source candidate

This independent procedural source is an unshipped experiment, not a runtime
replacement. It uses analytical puffs and no input images, inherited pixels,
external services, random state, or paid tools. Irregular lobed clumps spread
outward and fade; this is not yet a verified visual replacement.

- Generator: `scripts/assets/vfx_production/whetstorm_shout_dust_candidate.mjs`
- Generator SHA-256: `e44eb74588146cb06e9efd1eb3051ff8735c23219be62836766066da63bdfe2e`
- Source: `docs/design/whetstorm-art/vfx/shout_dust_candidate_source.png`
- Source SHA-256: `8af10b5087f4df8402ef0848726b919a9d9e980b66ecd782e15cfe2d68d1f697`
- Format: 1024 square RGBA PNG; 64 chronological cells in an 8 by 8 grid,
  left to right and top to bottom. Eight transparent pixels surround each cell;
  first and last cells are blank. The source holds straight alpha.

The runtime sheet's provenance remains unresolved, not established as
permission-required. Before any integration, verify the shader's reversed V
row sampling and shout-dust pivot `(0.5, 0.5 + 1.25 / 5.6)` against this source,
including placement and cell order. Review animation under the actual shader,
reduced-motion phase, premultiplied blending and alpha edges, mip bleed, HDR
and low-range rendering. Check on-demand kit loading and prewarm, GPU memory,
performance, and media manifest updates on all relevant graphics tiers. The
procedural image and its source tests do not establish visual or runtime fit.

Static sheet review found the cloud remains smooth and similar across many
frames, with little distinct particulate breakup. It needs motion and visual
refinement before it can be considered a replacement.
