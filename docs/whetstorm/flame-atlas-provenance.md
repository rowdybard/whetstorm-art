# Original flame intensity atlas

`public/textures/vfx/whetstorm_flame_6x6.webp` is an original procedural
intensity animation authored for Whetstorm. `scripts/build_whetstorm_flame_atlas.py`
constructs every pixel from analytic tapered tongues and sine functions, with no input
images, external art, random source, or paid service. It was authored for this project. Pillow 13.0.0 encodes the output as lossless WebP.
Run `python scripts/build_whetstorm_flame_atlas.py` from the repository root.
Encoder versions can affect the encoded bytes without changing decoded pixels.

The 768 by 768 RGB sheet contains 36 grayscale 128 by 128 frames in row-major
order, starting at the upper left. Black aprons prevent adjacent cell bleed.
The renderer samples red and interpolates consecutive frames; shader ramps color
it for additive fire and use the same intensity mask for soot. The complete
sheet was visually reviewed as a contact sheet; full in-engine screenshots remain
outstanding.

SHA-256 at creation:

- Generator: `35192bc64e8dd8ee4f9444294dbe3c85d17af7f261b51551e5b868008214078c`
- WebP: `f88132e2dfa198994b8f714eef412a0d3aa9e4ed51c0020b0d12c74805a4256e`
