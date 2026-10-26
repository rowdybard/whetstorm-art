"""Prepare the owner's original HUD PNG masters and compact runtime copies.

Requires Pillow in the art tooling environment; no client dependency is added.
Only numerical sizing/encoding is applied, with generated alpha preserved.
"""
from pathlib import Path
import hashlib
import io
import json
from PIL import Image, __version__ as pillow_version

ROOT = Path(__file__).resolve().parent.parent
SOURCE = ROOT / "docs/design/whetstorm-art/hud"
MANIFEST = ROOT / "docs/whetstorm/hud-art-generation.json"
OUT = ROOT / "public/ui/whetstorm/hud"
FAMILIES = {"chrome": 8, "map-markers": 6, "currency": 3, "cursors": 3}


def sha(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()


def publish(image, destination, image_format, **options):
    # Encode and validate in memory before any destination file is opened.
    buffer = io.BytesIO()
    image.save(buffer, format=image_format, **options)
    data = buffer.getvalue()
    if len(data) < 100:
        raise ValueError(f"Empty encoded artwork: {destination.name}")
    with Image.open(io.BytesIO(data)) as decoded:
        decoded.load()
        if decoded.size != image.size:
            raise ValueError(f"Invalid encoded dimensions: {destination.name}")
    temporary = destination.with_name(destination.name + ".tmp")
    try:
        temporary.write_bytes(data)
        if temporary.read_bytes() != data:
            raise ValueError(f"Incomplete artwork write: {destination.name}")
        temporary.replace(destination)
    finally:
        temporary.unlink(missing_ok=True)


def main():
    doc = json.loads(MANIFEST.read_text())
    counts = {family: 0 for family in FAMILIES}
    for row in doc["records"]:
        family = row["family"]
        if family not in FAMILIES:
            raise ValueError(f"Unknown art family: {family}")
        counts[family] += 1
        master = (ROOT / row["masterPath"]).resolve()
        if not master.is_relative_to(SOURCE):
            raise ValueError("Master must remain inside the HUD source directory")
        image = Image.open(io.BytesIO(master.read_bytes())).convert("RGBA")
        if family != "currency":
            alpha = image.getchannel("A")
            if alpha.getextrema()[0] != 0 or alpha.getextrema()[1] < 200:
                raise ValueError(f"Missing usable generated alpha: {master.name}")
        raw = Path(row["source"])
        if raw.is_file():
            row["sourceSha256"] = sha(raw)
        if image.size != (1024, 1024):
            image = image.resize((1024, 1024), Image.Resampling.LANCZOS)
        publish(image, master, "PNG")
        size = 32 if family == "cursors" else 128
        extension = "png" if family == "cursors" else "webp"
        target = OUT / family / f"{row['id']}.{extension}"
        target.parent.mkdir(parents=True, exist_ok=True)
        sprite = image.resize((size, size), Image.Resampling.LANCZOS)
        if extension == "png":
            publish(sprite, target, "PNG")
            if row["id"] == "hand-grab":
                hotspot = (16, 16)
            else:
                alpha = sprite.getchannel("A")
                points = [(x, y) for y in range(size) for x in range(size)
                          if alpha.getpixel((x, y)) >= 128]
                hotspot = min(points, key=lambda point: (sum(point), point[1]))
            row["hotspot"] = list(hotspot)
        else:
            publish(sprite, target, "WEBP", quality=90, method=6)
        row.update({
            "masterSha256": sha(master), "masterDimensions": [1024, 1024],
            "deliveryPath": str(target.relative_to(ROOT)),
            "deliverySha256": sha(target), "deliveryDimensions": [size, size],
            "deliveryBytes": target.stat().st_size,
            "alphaPreserved": family != "currency",
        })
    if counts != FAMILIES:
        raise ValueError(f"Incomplete HUD batch: {counts}")
    doc["processing"] = {
        "tool": f"Pillow {pillow_version}",
        "operations": "Lanczos numerical resizing and encoding only; generated alpha preserved",
        "script": "scripts/prepare_whetstorm_hud_art.py",
        "counts": counts,
    }
    MANIFEST.write_text(json.dumps(doc, indent=2) + "\n")
    public_rows = []
    for row in doc["records"]:
        public_row = {
            "id": row["id"], "family": row["family"],
            "path": str(Path(row["deliveryPath"]).relative_to("public/ui/whetstorm/hud")),
            "sha256": row["deliverySha256"],
            "dimensions": row["deliveryDimensions"],
        }
        if "hotspot" in row:
            public_row["hotspot"] = row["hotspot"]
        public_rows.append(public_row)
    (OUT / "mapping.json").write_text(json.dumps({
        "project": "Whetstorm",
        "source": "Original OpenAI built-in image generation from text only",
        "assets": public_rows,
    }, indent=2) + "\n")
    print(json.dumps({"assets": sum(counts.values()), "counts": counts,
                      "cursorHotspots": {r["id"]: r["hotspot"] for r in doc["records"]
                                         if r["family"] == "cursors"}}))


if __name__ == "__main__":
    main()
