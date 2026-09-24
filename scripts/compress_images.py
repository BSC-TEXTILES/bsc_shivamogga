from PIL import Image
import os

root = r"D:\BTPL_SMG\Shivamogga opening  invitee"
jobs = [
    ("src/assets/loc-shivamogga.webp", 1200, 55),
    ("public/assets/loc-shivamogga.webp", 1200, 55),
    ("src/assets/loc-belagavi.webp", 1000, 60),
    ("public/assets/loc-belagavi.webp", 1000, 60),
    ("src/assets/invite-p1.webp", 1200, 60),
    ("public/assets/invite-p1.webp", 1200, 60),
    ("src/assets/invite-p1-sm.webp", 768, 62),
    ("public/assets/invite-p1-sm.webp", 768, 62),
    ("src/assets/bsc-logo-crop.webp", 400, 65),
    ("public/assets/bsc-logo-crop.webp", 400, 65),
    ("public/assets/bsc-logo.webp", 400, 65),
    ("public/assets/invite-p1.jpg", 1200, 70),
    ("src/assets/invite-p1.jpg", 1200, 70),
]

for rel, max_w, q in jobs:
    path = os.path.join(root, rel)
    if not os.path.exists(path):
        print("missing", rel)
        continue
    before = os.path.getsize(path)
    try:
        im = Image.open(path)
        im.load()
        w, h = im.size
        if w > max_w:
            nh = int(h * max_w / w)
            im = im.resize((max_w, nh), Image.Resampling.LANCZOS)
        if im.mode not in ("RGB", "RGBA"):
            im = im.convert("RGBA" if "A" in im.getbands() else "RGB")
        if rel.endswith(".jpg") or rel.endswith(".jpeg"):
            if im.mode == "RGBA":
                im = im.convert("RGB")
            tmp = path + ".tmp"
            im.save(tmp, "JPEG", quality=q, optimize=True, progressive=True)
        else:
            tmp = path + ".tmp"
            im.save(tmp, "WEBP", quality=q, method=6)
        after = os.path.getsize(tmp)
        if after < before:
            os.replace(tmp, path)
            print(f"{rel}: {before//1024}KB -> {after//1024}KB ({im.size[0]}x{im.size[1]})")
        else:
            os.remove(tmp)
            print(f"{rel}: keep {before//1024}KB (new {after//1024}KB)")
    except Exception as e:
        print(f"{rel}: ERROR {e}")
