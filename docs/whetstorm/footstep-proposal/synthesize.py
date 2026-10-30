"""Original procedural footstep sketches. Output must be an empty temporary directory."""
import argparse
import hashlib
import json
import math
import random
import struct
import tempfile
import wave
from pathlib import Path

RATE = 44100
SURFACES = {
    # low impact frequency, noise color, texture, decay
    'dirt': (95, 0.20, 0.32, 19),
    'grass': (105, 0.12, 0.28, 13),
    'snow': (78, 0.08, 0.42, 11),
    'stone': (165, 0.48, 0.20, 27),
    'water': (115, 0.30, 0.36, 10),
    'wood': (125, 0.34, 0.16, 20),
}


def render(surface, seed):
    frequency, color, texture, decay = SURFACES[surface]
    rng = random.Random(seed)
    frequency *= rng.uniform(0.93, 1.07)
    length = int(RATE * 0.24)
    samples = []
    smooth = 0.0
    previous = 0.0
    for i in range(length):
        t = i / RATE
        noise = rng.uniform(-1, 1)
        smooth += color * (noise - smooth)
        high = noise - previous
        previous = noise
        attack = min(1, t / 0.004)
        body = math.sin(2 * math.pi * frequency * t) * math.exp(-decay * t)
        grain = (smooth + 0.12 * high) * math.exp(-decay * 0.65 * t)
        # Water adds a short decaying tonal ripple, wood a hollow resonance.
        extra = 0.0
        if surface == 'water':
            extra = 0.15 * math.sin(2 * math.pi * (650 * t - 900 * t * t)) * math.exp(-17 * t)
        elif surface == 'wood':
            extra = 0.18 * math.sin(2 * math.pi * 420 * t) * math.exp(-24 * t)
        fade = min(1, (length - 1 - i) / (RATE * 0.012))
        value = attack * fade * (0.42 * body + texture * grain + extra)
        samples.append(max(-32767, min(32767, round(value * 24000))))
    return struct.pack('<' + 'h' * length, *samples)


def generate(out):
    out = Path(out).resolve()
    temp = Path(tempfile.gettempdir()).resolve()
    if out == temp or temp not in out.parents or not out.is_dir() or any(out.iterdir()):
        raise ValueError('output must be an existing empty directory below the system temporary directory')
    entries = []
    for index, surface in enumerate(SURFACES):
        for variation in range(1, 6):
            seed = 71000 + index * 100 + variation
            name = f'foot_{surface}_{variation}.wav'
            path = out / name
            pcm = render(surface, seed)
            with wave.open(str(path), 'wb') as wav:
                wav.setnchannels(1)
                wav.setsampwidth(2)
                wav.setframerate(RATE)
                wav.writeframes(pcm)
            entries.append({'file': name, 'surface': surface, 'seed': seed,
                            'sha256': hashlib.sha256(path.read_bytes()).hexdigest()})
    (out / 'manifest.json').write_text(json.dumps(entries, indent=2) + '\n', encoding='utf-8')
    return entries


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--output', required=True, help='existing empty directory under system temp')
    generate(parser.parse_args().output)
