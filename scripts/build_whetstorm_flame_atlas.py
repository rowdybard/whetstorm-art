"""Create the original Whetstorm 6x6 flame intensity atlas (Pillow 13.0.0)."""
import math
from pathlib import Path
from PIL import Image

CELL = 128
GRID = 6
image = Image.new('RGB', (CELL * GRID, CELL * GRID), (0, 0, 0))
for frame in range(GRID * GRID):
    t = frame / 35
    for y in range(5, CELL - 5):
        for x in range(5, CELL - 5):
            # Analytic tapered tongues, bending and climbing continuously over
            # the sequence. No sampled images or external sources are used.
            xx = (x + .5) / CELL * 2 - 1
            height = (CELL - y - .5) / CELL
            value = 0.0
            for i in range(4):
                base = .10 + i * .025
                tip = .81 - i * .075 + .035 * math.sin(t * 4.0 + i * 1.8)
                h = (height - base) / (tip - base)
                if not 0 < h < 1:
                    continue
                center = (i - 1.5) * .13 * (1 - h) + .11 * math.sin(h * 4.5 + t * 4.5 + i * 1.7) * h
                width = (.24 - i * .026) * (1 - h) ** .7 + .006
                distance = abs(xx - center) / width
                edge = max(0, min(1, (1.12 - distance) * 4.5))
                foot = min(1, h * 9)
                heat = .56 + .44 * max(0, 1 - distance * .7)
                value = max(value, edge * foot * heat * (1 - .18 * h))
            # Slim internal streaks move upwards through the hot core.
            flicker = .91 + .09 * math.sin(height * 24 - t * 9 + xx * 10)
            v = max(0, min(1, value * flicker))
            edge = min(x - 4, CELL - 5 - x, y - 4, CELL - 5 - y) / 9
            v *= min(1, max(0, edge))
            b = round(v * 255)
            image.putpixel(((frame % GRID) * CELL + x, (frame // GRID) * CELL + y), (b, b, b))
output = Path('public/textures/vfx/whetstorm_flame_6x6.webp')
image.save(output, 'WEBP', lossless=True, exact=True, method=6)
print(output)
