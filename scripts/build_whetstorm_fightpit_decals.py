"""Author two original transparent Fightpit ground decals without image inputs."""
from pathlib import Path
from math import atan2, cos, sin, pi, sqrt
from random import Random
from PIL import Image

SIZE = 512
OUT = Path('public/textures/battleground/decals')
OUT.mkdir(parents=True, exist_ok=True)


def render(name, seed, count, spread):
    rng = Random(seed)
    blobs = [(0.0, 0.0, 0.19 if name == 'blood_pool' else 0.09, 1)]
    for _ in range(count):
        angle = rng.uniform(0, 2 * pi)
        distance = rng.uniform(0.04, spread)
        radius = rng.uniform(0.012, 0.09) * (1 - 0.5 * distance / spread)
        blobs.append((cos(angle) * distance, sin(angle) * distance, radius, 1))
    image = Image.new('RGBA', (SIZE, SIZE))
    pixels = image.load()
    for y in range(SIZE):
        for x in range(SIZE):
            px, py = (x + 0.5) / SIZE - 0.5, (y + 0.5) / SIZE - 0.5
            field = 0.0
            for bx, by, radius, strength in blobs:
                d = sqrt(((px - bx) * 0.93) ** 2 + ((py - by) * 1.07) ** 2)
                angle = atan2(py - by, px - bx)
                edge = radius * (1 + 0.19 * sin(3 * angle + bx * 41) + 0.12 * sin(7 * angle + by * 37))
                field = max(field, strength * max(0, min(1, (edge - d) * SIZE / 3)))
            # Fine, deterministic surface grain keeps the stain from reading as flat paint.
            grain = ((x * 37 + y * 73 + x * y * 13) % 29) / 28
            alpha = round(field * (150 + 30 * grain))
            pixels[x, y] = (70 + round(19 * grain), 12 + round(6 * grain), 11 + round(4 * grain), alpha)
    image.save(OUT / f'{name}.webp', 'WEBP', lossless=True, method=6)


render('blood_pool', 2718, 38, 0.28)
render('blood_splatter', 3141, 55, 0.39)
