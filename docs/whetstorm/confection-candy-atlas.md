# Confection Cascade candy atlas provenance

Original vector artwork authored by Codex for Whetstorm on 2026-10-30 using simple geometric paths, gradients, and highlights. No reference image, external asset, or generative image service was used. The SVG master is `docs/design/whetstorm-art/minigames/confection-candies.svg` (SHA-256 `9e13af9d8bf7d40d50c835c0ae5bc5116a30bafb8c90cd0a6f7d553a174eb4a7`).

The shipping RGB lossless WebP is `public/ui/whetstorm/minigames/confection-candies.webp` (SHA-256 `fd86af4aee145435599bf489fe5f3bf5c6b43042cc30de7774cd9a40e4781c3c`). Rasterize with the repository's sharp dependency:

```sh
node -e "const sharp=require('sharp'); sharp('docs/design/whetstorm-art/minigames/confection-candies.svg').flatten({background:'#000'}).webp({lossless:true}).toFile('public/ui/whetstorm/minigames/confection-candies.webp')"
```

The 3 by 2 grid is berry diamond, citrus round, mint triangle, grape square, blue star, and a black empty cell. Each shape is positioned to account for the existing per-candy CSS transforms. The black background supports screen blending.
