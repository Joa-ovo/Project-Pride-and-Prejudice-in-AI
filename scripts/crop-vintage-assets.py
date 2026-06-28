from PIL import Image
from collections import deque
import os

SRC = r"C:\Users\melon\.cursor\projects\c-Users-melon-Desktop-AI\assets"
DST = r"c:\Users\melon\Desktop\AI中的傲慢与偏见\assets\images\vintage"
DEBUG = os.path.join(DST, "_crop-debug")
os.makedirs(DST, exist_ok=True)
os.makedirs(DEBUG, exist_ok=True)

# box, mode: flood | light
CROPS = {
    "guide-lady.png": ("ui-vintage-bright-01-home.png", (105, 430, 312, 702), "flood"),
    "guide-gentleman.png": ("ui-vintage-bright-02-dialogue.png", (34, 148, 302, 442), "flood"),
    "guide-lady-blind.png": ("ui-vintage-bright-03-blind.png", (145, 300, 288, 505), "light"),
}


def is_parchment(r, g, b):
    return (
        (r > 228 and g > 205 and b > 165 and abs(int(r) - int(g)) < 28)
        or (r > 245 and g > 232 and b > 205)
    )


def is_light_parchment(r, g, b):
    return r > 248 and g > 238 and b > 218


def flood_remove_bg(im):
    im = im.convert("RGBA")
    px = im.load()
    w, h = im.size
    seen = bytearray(w * h)
    q = deque()

    def push(x, y):
        if x < 0 or x >= w or y < 0 or y >= h:
            return
        i = y * w + x
        if seen[i]:
            return
        r, g, b, a = px[x, y]
        if not is_parchment(r, g, b):
            return
        seen[i] = 1
        q.append((x, y))

    for x in range(w):
        push(x, 0)
        push(x, h - 1)
    for y in range(h):
        push(0, y)
        push(w - 1, y)

    while q:
        x, y = q.popleft()
        px[x, y] = (255, 255, 255, 0)
        push(x + 1, y)
        push(x - 1, y)
        push(x, y + 1)
        push(x, y - 1)

    return im


def light_remove_bg(im):
    im = im.convert("RGBA")
    px = im.load()
    w, h = im.size
    for y in range(h):
        for x in range(w):
            r, g, b, a = px[x, y]
            if is_light_parchment(r, g, b):
                px[x, y] = (r, g, b, 0)
    return im


def keep_largest_opaque_blob(im, min_alpha=40):
    im = im.convert("RGBA")
    px = im.load()
    w, h = im.size
    seen = bytearray(w * h)
    best = []

    for sy in range(h):
        for sx in range(w):
            i = sy * w + sx
            if seen[i] or px[sx, sy][3] < min_alpha:
                continue
            q = deque([(sx, sy)])
            seen[i] = 1
            blob = [(sx, sy)]
            while q:
                x, y = q.popleft()
                for nx, ny in ((x + 1, y), (x - 1, y), (x, y + 1), (x, y - 1)):
                    if nx < 0 or nx >= w or ny < 0 or ny >= h:
                        continue
                    j = ny * w + nx
                    if seen[j] or px[nx, ny][3] < min_alpha:
                        continue
                    seen[j] = 1
                    q.append((nx, ny))
                    blob.append((nx, ny))
            if len(blob) > len(best):
                best = blob

    out = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    opx = out.load()
    for x, y in best:
        opx[x, y] = px[x, y]
    return out


def trim_transparent(im, pad=8):
    im = im.convert("RGBA")
    bbox = im.getbbox()
    if not bbox:
        return im
    left, top, right, bottom = bbox
    left = max(0, left - pad)
    top = max(0, top - pad)
    right = min(im.width, right + pad)
    bottom = min(im.height, bottom + pad)
    return im.crop((left, top, right, bottom))


for name, (src_name, box, mode) in CROPS.items():
    src_path = os.path.join(SRC, src_name)
    im = Image.open(src_path).crop(box)
    if mode == "flood":
        im = flood_remove_bg(im)
        im = keep_largest_opaque_blob(im)
    else:
        im = light_remove_bg(im)
        im = keep_largest_opaque_blob(im)
    im = trim_transparent(im, pad=8)
    im.save(os.path.join(DST, name), "PNG")
    im.save(os.path.join(DEBUG, name), "PNG")
    print(f"{name}: crop {box} mode={mode} -> {im.size}")

print("done")
