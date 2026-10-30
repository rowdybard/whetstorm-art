# Warrior material textures

These three independent procedural textures were created for Whetstorm from
the checked-in generators, without importing pixels from the upstream maps.
The generators are the editable sources. SHA-256 values below identify the
shipped WebPs; the loading path retains the existing color-space and filtering
settings.

| Texture | Generator under `scripts/assets/vfx_production/` | WebP SHA-256 |
| --- | --- | --- |
| `warrior_pressure.webp` | `build_whetstorm_pressure.mjs` | `3ee2aeb15a71d0d772f2aefef146073ebefaf886a9eccd5cdeddd2cd604f952c` |
| `blood_film.webp` | `whetstorm_blood_film.mjs` | `89dc0bd45d2996e1f92ce49ce2ff870d04e50efa40af897b5540d9b37f1221e2` |
| `forged_steel.webp` | `whetstorm_steel.mjs` | `5d995ecc0e2eca63ce02def6602a72d6a73a4ec2e1be0a558c1112bb959223e7` |

All are under `public/textures/vfx/whetstorm/`. Pressure is opaque 1024-square
linear grayscale; blood is opaque 2048×1024 RGB; steel is opaque 1024-square
RGB. Focused tests check the image contracts and the loader paths. The full
candidate must regenerate its media manifest and visually review bark, storm,
blood film, fury, guard plates and crest effects on supported graphics tiers.
