"""Prepare/optimize site assets from original sources. Run: python scripts/prepare_assets.py"""
from PIL import Image
import os
import qrcode
from qrcode.constants import ERROR_CORRECT_H

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
SRC = os.path.join(ROOT, "src", "assets")
PUB = os.path.join(ROOT, "public", "assets")

MAPS_URL = (
    "https://www.google.com/maps/search/?api=1&query="
    "Parekh+Vinayaka+Mall,+BH+Road,+Shivamogga,+Karnataka"
)


def out_size(path):
    return f"{os.path.getsize(path) // 1024}KB {Image.open(path).size}"


def save_webp(img, path, quality=88):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    if img.mode == "RGBA":
        img.save(path, "WEBP", quality=quality, method=6)
    else:
        img.convert("RGB").save(path, "WEBP", quality=quality, method=6)
    print(f"  webp {os.path.relpath(path, ROOT)} {out_size(path)}")


def save_jpg(img, path, quality=85):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    img.convert("RGB").save(path, "JPEG", quality=quality, optimize=True, progressive=True)
    print(f"  jpg  {os.path.relpath(path, ROOT)} {out_size(path)}")


def save_png(img, path):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    if img.mode not in ("RGBA", "RGB", "L"):
        img = img.convert("RGBA")
    img.save(path, "PNG", optimize=True)
    print(f"  png  {os.path.relpath(path, ROOT)} {out_size(path)}")


def prep_hero():
    print("== Hero HD invitation (red/blue logo) ==")
    hero_path = os.path.join(PUB, "invite-p1-sm.png")
    hero = Image.open(hero_path)
    print("  source", hero.size, hero.mode)
    for p in (
        os.path.join(PUB, "invite-p1.webp"),
        os.path.join(SRC, "invite-p1.webp"),
    ):
        save_webp(hero, p, quality=90)
    for p in (
        os.path.join(PUB, "invite-p1.jpg"),
        os.path.join(SRC, "invite-p1.jpg"),
    ):
        save_jpg(hero, p, quality=88)

    sm = hero.copy()
    sm.thumbnail((1000, 1000), Image.Resampling.LANCZOS)
    for p in (
        os.path.join(PUB, "invite-p1-sm.webp"),
        os.path.join(SRC, "invite-p1-sm.webp"),
    ):
        save_webp(sm, p, quality=90)


def prep_logo():
    print("== Red/blue logo ==")
    logo = Image.open(os.path.join(PUB, "bsc-logo.png")).convert("RGBA")
    px = logo.load()
    w, h = logo.size
    for y in range(h):
        for x in range(w):
            r, g, b, _a = px[x, y]
            if r >= 248 and g >= 248 and b >= 248:
                px[x, y] = (255, 255, 255, 0)
            elif r >= 240 and g >= 240 and b >= 240:
                px[x, y] = (255, 255, 255, 90)
    bbox = logo.getbbox()
    if bbox:
        logo = logo.crop(bbox)
    # Cap size for web
    if logo.width > 800:
        logo.thumbnail((800, 800), Image.Resampling.LANCZOS)
    print("  transparent logo", logo.size)

    save_png(logo, os.path.join(PUB, "bsc-logo.png"))
    save_webp(logo, os.path.join(PUB, "bsc-logo.webp"), quality=92)

    # Crop variant used by navbar/footer (same art, transparent)
    for p in (
        os.path.join(PUB, "bsc-logo-crop.png"),
        os.path.join(PUB, "bsc-logo-crop.webp"),
        os.path.join(SRC, "bsc-logo-crop.png"),
        os.path.join(SRC, "bsc-logo-crop.webp"),
    ):
        if p.endswith(".png"):
            save_png(logo, p)
        else:
            save_webp(logo, p, quality=92)


def prep_locations():
    print("== Location images from originals ==")
    jobs = [
        ("loc-davanagere-orig.png", "loc-davanagere", "png", "jpeg"),
        ("loc-shivamogga-orig.jpeg", "loc-shivamogga", "jpeg", "jpeg"),
        ("loc-belagavi.jpg", "loc-belagavi", "jpg", "jpg"),
    ]
    for src_name, base, raster_ext, _ in jobs:
        src = os.path.join(PUB, src_name)
        if not os.path.exists(src):
            print("  missing", src_name)
            continue
        img = Image.open(src).convert("RGB")
        img.thumbnail((1800, 1800), Image.Resampling.LANCZOS)
        print(f"  from {src_name} -> {img.size}")
        for folder in (PUB, SRC):
            save_webp(img, os.path.join(folder, f"{base}.webp"), quality=86)
            if raster_ext == "png":
                save_png(img, os.path.join(folder, f"{base}.png"))
            else:
                ext = "jpeg" if base == "loc-shivamogga" else "jpg"
                save_jpg(img, os.path.join(folder, f"{base}.{ext}"), quality=86)


def prep_qr():
    print("== Google Maps QR ==")
    qr = qrcode.QRCode(
        version=None,
        error_correction=ERROR_CORRECT_H,
        box_size=12,
        border=4,
    )
    qr.add_data(MAPS_URL)
    qr.make(fit=True)
    img = qr.make_image(fill_color="#1a1466", back_color="white").convert("RGB")
    # Ensure high resolution for retina/scanning
    img = img.resize((img.width * 2, img.height * 2), Image.Resampling.NEAREST)
    # Pad quiet zone extra
    from PIL import Image as PILImage

    pad = max(24, img.width // 16)
    canvas = PILImage.new("RGB", (img.width + pad * 2, img.height + pad * 2), "white")
    canvas.paste(img, (pad, pad))
    img = canvas
    print("  QR", MAPS_URL, img.size)
    for folder in (PUB, SRC):
        save_png(img, os.path.join(folder, "qr-location.png"))
        save_webp(img, os.path.join(folder, "qr-location.webp"), quality=95)

    # Verify scannable
    import cv2
    import numpy as np

    arr = cv2.cvtColor(np.array(img), cv2.COLOR_RGB2BGR)
    data, _pts, _ = cv2.QRCodeDetector().detectAndDecode(arr)
    print("  decoded:", repr(data))
    if data != MAPS_URL:
        raise SystemExit(f"QR verification failed: {data!r}")


if __name__ == "__main__":
    prep_hero()
    prep_logo()
    prep_locations()
    prep_qr()
    print("ALL ASSETS READY")
