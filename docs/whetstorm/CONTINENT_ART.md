# Whetstorm continent plate

`public/map_art/whetstorm_continent.webp` is original procedural artwork authored for
Whetstorm. `scripts/build_whetstorm_continent.mjs` builds it from the MIT-licensed
simulation's world bounds, seed, terrain heights and biome IDs. Its palette and
relief treatment were authored for this plate. No upstream map image was used as a
reference or source. It contains no text; labels and markers are drawn by the UI.

Run `node scripts/build_whetstorm_continent.mjs` in a complete checkout to rebuild.
The frame is the simulation world bounds with positive X and Z toward the top left.
The lossless WebP keeps land and water colors compatible with the continent wash mask.
