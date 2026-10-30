# Whetstorm Fightpit decals

The `blood_pool.webp` and `blood_splatter.webp` ground decals in
`public/textures/battleground/decals/` were authored for Whetstorm with
`scripts/build_whetstorm_fightpit_decals.py`. The generator uses seeded analytic
shapes and arithmetic grain, with no input images, external art, or paid service.
The names match the existing Thornhollow field texture IDs. The two 512 by 512
RGBA WebP files are losslessly encoded with Pillow 13.0.0. Reproduce from the
repository root with `python scripts/build_whetstorm_fightpit_decals.py`; encoder
versions may change the encoded bytes. Historical upstream credits and rights
remain unchanged.

SHA-256:

- Generator: `5838e9152d0b7a848cd4c3435ad7e08694edc88bb37c0785dd402eb83b9c2ed3`
- Pool: `a3d1d6fab0959072638d709311ed87d649ea1ef6c71b3bb1bb9435efec5b6b89`
- Splatter: `3d29c4a9070a66b30a1936d91473526f59e3a9d211f11d3faaa086e34595e462`

The images were visually inspected composited over a neutral ground color.
In-engine placement and appearance remain to be checked.
