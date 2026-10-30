# Fel meteor impact texture provenance

`public/vfx/fel_meteor_impact.png` is original Whetstorm artwork, hand-authored as
`docs/whetstorm/fel-meteor-impact.svg` for this project on 2026-10-30. No inherited
bitmap or external reference was used. The SVG uses white radial gradients, a
starburst, and isolated sparks, with transparent falloff for the renderer's
additive green tint. Rasterize at 512 x 512 with:

```sh
node -e "import('sharp').then(async ({default:s})=>await s('docs/whetstorm/fel-meteor-impact.svg').png().toFile('public/vfx/fel_meteor_impact.png'))"
```

`fel-meteor-impact-review.png` shows the alpha composited on a dark background.
This is a texture review, not an in-game capture.
