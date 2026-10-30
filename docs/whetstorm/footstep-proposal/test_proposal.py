import hashlib
import json
import math
import struct
import tempfile
import unittest
import wave
from pathlib import Path

from synthesize import RATE, SURFACES, generate


class ProposalTests(unittest.TestCase):
    def test_conformance_and_reproducibility(self):
        with tempfile.TemporaryDirectory() as a, tempfile.TemporaryDirectory() as b:
            first, second = generate(a), generate(b)
            self.assertEqual(first, second)
            self.assertEqual(len(first), 30)
            self.assertEqual({e['surface'] for e in first}, set(SURFACES))
            self.assertEqual(len({e['sha256'] for e in first}), 30)
            for entry in first:
                path = Path(a) / entry['file']
                self.assertEqual(hashlib.sha256(path.read_bytes()).hexdigest(), entry['sha256'])
                with wave.open(str(path), 'rb') as wav:
                    self.assertEqual((wav.getnchannels(), wav.getsampwidth(), wav.getframerate()), (1, 2, RATE))
                    self.assertEqual(wav.getnframes(), int(RATE * 0.24))
                    samples = struct.unpack('<' + 'h' * wav.getnframes(), wav.readframes(wav.getnframes()))
                self.assertEqual(samples[0], 0)
                self.assertEqual(samples[-1], 0)
                self.assertGreater(math.sqrt(sum(x*x for x in samples) / len(samples)), 100)
                self.assertLess(max(abs(x) for x in samples), 32767)
            self.assertEqual(json.loads((Path(a) / 'manifest.json').read_text()), first)

    def test_rejects_nonempty_or_non_temp_output(self):
        with tempfile.TemporaryDirectory() as temp:
            (Path(temp) / 'keep').write_text('keep')
            with self.assertRaises(ValueError):
                generate(temp)
        with self.assertRaises(ValueError):
            generate(Path(__file__).parent)


if __name__ == '__main__':
    unittest.main()
