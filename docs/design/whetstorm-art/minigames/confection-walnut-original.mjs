import sharp from 'sharp';

// Original procedural walnut: all grain fields are periodic on the tile.
const size = 1024;
const data = Buffer.alloc(size * size * 3);
const tau = 2 * Math.PI;
for (let y = 0; y < size; y++) {
  for (let x = 0; x < size; x++) {
    const u = (tau * (x + 0.5)) / size;
    const v = (tau * (y + 0.5)) / size;
    const warp =
      1.9 * Math.sin(u + 0.7) + 0.55 * Math.sin(2 * u - v + 1.2) + 0.24 * Math.sin(5 * u + 2 * v);
    const grain =
      Math.sin(25 * v + warp) +
      0.42 * Math.sin(49 * v + warp * 1.6 + 0.4) +
      0.18 * Math.sin(93 * v + warp * 2.1);
    const pores = Math.max(0, Math.sin(71 * v + warp * 2.3 + 0.4 * Math.sin(3 * u))) ** 9;
    const broad = Math.sin(3 * v + 0.55 * Math.sin(u)) + 0.32 * Math.sin(7 * v + Math.sin(2 * u));
    const light =
      10 * grain + 8 * broad - 14 * pores + 2 * Math.sin(11 * u + 5 * v) * Math.sin(29 * v);
    const i = (y * size + x) * 3;
    data[i] = Math.max(0, Math.min(255, 103 + light * 1.25));
    data[i + 1] = Math.max(0, Math.min(255, 54 + light * 0.77));
    data[i + 2] = Math.max(0, Math.min(255, 30 + light * 0.48));
  }
}
const base = 'docs/design/whetstorm-art/minigames/confection-walnut-original';
const dest = 'public/ui/whetstorm/minigames/confection-walnut-original.webp';
await sharp(data, { raw: { width: size, height: size, channels: 3 } })
  .png()
  .toFile(`${base}.png`);
await sharp(data, { raw: { width: size, height: size, channels: 3 } })
  .resize(512, 512)
  .webp({ quality: 90, effort: 6 })
  .toFile(dest);
