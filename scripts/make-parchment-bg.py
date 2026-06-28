from PIL import Image, ImageFilter
import random
import os

OUT = r"c:\Users\melon\Desktop\AI中的傲慢与偏见\assets\images\vintage"


def noise_layer(w, h, base=(249, 237, 214), spread=10, seed=42):
    random.seed(seed)
    im = Image.new("RGB", (w, h), base)
    px = im.load()
    for y in range(h):
        for x in range(w):
            r, g, b = base
            n = random.randint(-spread, spread)
            r = max(0, min(255, r + n))
            g = max(0, min(255, g + n - 1))
            b = max(0, min(255, b + n - 3))
            if y % 5 == 0:
                r, g, b = r - 3, g - 2, b - 1
            px[x, y] = (r, g, b)
    return im.filter(ImageFilter.GaussianBlur(radius=0.8))


def make_bg(w=1600, h=1200):
    canvas = noise_layer(w, h)
    # warm edge tint
    tint = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    from PIL import ImageDraw

    draw = ImageDraw.Draw(tint)
    draw.rectangle([0, 0, w, h], fill=(210, 180, 130, 18))
    draw.ellipse([-w * 0.15, -h * 0.2, w * 1.15, h * 1.1], fill=(255, 250, 235, 55))
    out = Image.alpha_composite(canvas.convert("RGBA"), tint).convert("RGB")
    return out.filter(ImageFilter.GaussianBlur(radius=1.2))


os.makedirs(OUT, exist_ok=True)
make_bg().save(os.path.join(OUT, "parchment-bg.jpg"), "JPEG", quality=90)
# small tile for fallback - seamless noise only
make_bg(400, 400).save(os.path.join(OUT, "parchment-tile.jpg"), "JPEG", quality=90)
print("ok")
