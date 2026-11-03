"""Final whale-maid sprite builder using rembg + isnet-anime.

The user-provided reference images are opaque white-background meme
illustrations. This script crops out captions, paints away leftover sticker
text, runs the anime segmentation model once per pose, normalizes every pose
into a 512x512 transparent tile, and packs a 3x3 sprite sheet plus a face
avatar for the plugin.

Run (requires rembg + onnxruntime on PYTHONPATH):
  python build_whale_sprites.py

Outputs are checked in under art/whale/; the model is not needed at runtime.
"""
from __future__ import annotations

from pathlib import Path

import numpy as np
import cv2
from PIL import Image, ImageDraw, ImageFilter
from rembg import new_session, remove

HERE = Path(__file__).resolve().parent
SOURCE = HERE / 'source'
TILES = HERE / 'tiles'
TILE = 512
BOTTOM = TILE - 10

# key, source, source crop, white-out rects in source coordinates, extra scale, offset
FRAMES = [
    ('default', '03_pout.png', (80, 100, 504, 504), [(390, 120, 504, 280)], 1.0, (0, 0)),
    ('happy', '05_headpat.png', (100, 90, 640, 621), [], 1.06, (0, 0)),
    ('love', '09_love.png', (0, 0, 450, 450), [(0, 378, 450, 450)], 1.0, (0, 0)),
    ('curious', '02_question.png', (110, 95, 620, 636), [], 1.0, (0, 0)),
    ('thinking', '01_token.png', (265, 35, 576, 505), [], 1.0, (0, 0)),
    ('pill', '07_pill.png', (100, 100, 640, 640), [(0, 0, 640, 100)], 1.06, (0, 0)),
    ('hungry', '04_rice_point.png', (225, 80, 504, 504), [(0, 0, 230, 504)], 1.0, (0, 0)),
    ('blush', '06_blush.png', (235, 50, 503, 504), [(0, 0, 240, 504)], 1.0, (0, 0)),
]


def prepare(path: Path, crop: tuple[int, int, int, int],
            paint: list[tuple[int, int, int, int]]) -> Image.Image:
    image = Image.open(path).convert('RGB')
    if paint:
        draw = ImageDraw.Draw(image)
        for rect in paint:
            draw.rectangle(rect, fill=(255, 255, 255))
    return image.crop(crop)


def clean_alpha(image: Image.Image) -> Image.Image:
    alpha = np.asarray(image.getchannel('A'))
    # Isnet's matte is already good; remove any one-pixel fringe and dust.
    softened = Image.fromarray(alpha, 'L').filter(ImageFilter.GaussianBlur(0.45))
    arr = np.asarray(softened).copy()
    arr[arr < 10] = 0
    image.putalpha(Image.fromarray(arr, 'L'))
    return image


def keep_main_components(image: Image.Image) -> Image.Image:
    """Drop detached speech-bubble fragments, hearts, captions and glow dust."""
    alpha = np.asarray(image.getchannel('A'))
    foreground = (alpha > 20).astype(np.uint8)
    count, labels, stats, _ = cv2.connectedComponentsWithStats(foreground, connectivity=8)
    if count <= 1:
        return image
    areas = stats[:, cv2.CC_STAT_AREA].astype(np.int64)
    areas[0] = 0
    main = int(np.argmax(areas))
    keep = {main}
    for label in range(1, count):
        if label != main and areas[label] >= 8000:
            keep.add(label)
    kept = np.isin(labels, list(keep))
    image.putalpha(Image.fromarray(np.where(kept, alpha, 0).astype(np.uint8), 'L'))
    return image


def trim_pale_edge(image: Image.Image, strength: int = 4) -> Image.Image:
    """Erode a few pixels of near-white rim without eating the blue line art."""
    rgba = np.asarray(image)
    alpha = rgba[:, :, 3]
    rgb = rgba[:, :, :3].astype(np.int16)
    kernel = np.ones((strength * 2 + 1, strength * 2 + 1), np.uint8)
    eroded = np.zeros_like(alpha)
    # simple binary erosion via Pillow min filter is sufficient here
    eroded_img = Image.fromarray(alpha, 'L').filter(ImageFilter.MinFilter(strength * 2 + 1))
    low = rgb.min(axis=2)
    sat = rgb.max(axis=2) - low
    colorful = (low < 200) | (sat > 50)
    new_alpha = np.asarray(eroded_img).copy()
    # keep coloured silhouette pixels that the erosion would remove
    new_alpha[colorful] = alpha[colorful]
    new_alpha[alpha == 0] = 0
    image.putalpha(Image.fromarray(new_alpha, 'L'))
    return image


def build_tile(cut: Image.Image, scale: float, offset: tuple[int, int]) -> Image.Image:
    ratio = min((TILE - 24) / cut.width, (TILE - 20) / cut.height) * scale
    size = (max(1, round(cut.width * ratio)), max(1, round(cut.height * ratio)))
    cut = cut.resize(size, Image.Resampling.LANCZOS)
    tile = Image.new('RGBA', (TILE, TILE), (0, 0, 0, 0))
    x = (TILE - size[0]) // 2 + offset[0]
    y = BOTTOM - size[1] + offset[1]
    tile.alpha_composite(cut, (x, y))
    return tile


def main() -> None:
    TILES.mkdir(exist_ok=True)
    session = new_session('isnet-anime')
    tiles: list[Image.Image] = []

    for key, filename, crop, paint, scale, offset in FRAMES:
        prepared = prepare(SOURCE / filename, crop, paint)
        cut = remove(prepared, session=session)
        cut = clean_alpha(cut)
        cut = keep_main_components(cut)
        cut = trim_pale_edge(cut)
        bounds = cut.getbbox()
        if bounds is None:
            raise RuntimeError(f'{key}: no foreground')
        pad = 5
        cut = cut.crop((max(0, bounds[0] - pad), max(0, bounds[1] - pad),
                        min(cut.width, bounds[2] + pad), min(cut.height, bounds[3] + pad)))
        tile = build_tile(cut, scale, offset)
        tile.save(TILES / f'{key}.png')
        tiles.append(tile)
        print(f'{key:9s} cut={cut.size} bbox={tile.getbbox()}')

    sheet = Image.new('RGBA', (TILE * 3, TILE * 3), (0, 0, 0, 0))
    for index, tile in enumerate(tiles):
        row, col = divmod(index, 3)
        sheet.alpha_composite(tile, (col * TILE, row * TILE))
    sheet.save(HERE / 'sprite-sheet.webp', 'WEBP', quality=90, method=6)
    sheet.save(HERE / 'sprite-sheet.png')
    print('sheet bytes', (HERE / 'sprite-sheet.webp').stat().st_size)

    # Avatar from the default pose head.
    default_tile = tiles[0]
    bbox = default_tile.getbbox()
    w, h = bbox[2] - bbox[0], bbox[3] - bbox[1]
    center_x = bbox[0] + w // 2
    center_y = bbox[1] + int(h * 0.34)
    radius = int(min(w, h) * 0.42)
    avatar = default_tile.crop((center_x - radius, center_y - radius,
                               center_x + radius, center_y + radius)).resize((160, 160), Image.Resampling.LANCZOS)
    avatar.save(HERE / 'avatar.webp', 'WEBP', quality=92, method=6)
    avatar.save(HERE / 'avatar.png')
    print('avatar bytes', (HERE / 'avatar.webp').stat().st_size)

    cell = 384
    contact = Image.new('RGB', (cell * 3, cell * 3), (44, 47, 55))
    draw = ImageDraw.Draw(contact)
    for y in range(0, cell * 3, 32):
        for x in range(0, cell * 3, 32):
            if (x // 32 + y // 32) % 2 == 0:
                draw.rectangle((x, y, x + 31, y + 31), fill=(52, 55, 64))
    for index, tile in enumerate(tiles):
        row, col = divmod(index, 3)
        thumb = tile.resize((cell, cell), Image.Resampling.LANCZOS)
        contact.paste(thumb, (col * cell, row * cell), thumb)
    contact.save(HERE / 'contact.png')
    print('done')


if __name__ == '__main__':
    main()
