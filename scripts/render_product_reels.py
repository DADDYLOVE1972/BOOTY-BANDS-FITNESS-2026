from pathlib import Path
import math
import os
import shutil
import subprocess
import wave

import numpy as np
from PIL import Image, ImageDraw, ImageFilter, ImageFont


ROOT = Path(__file__).resolve().parents[1]
FFMPEG = ROOT / "node_modules" / "@ffmpeg-installer" / "win32-x64" / "ffmpeg.exe"
OUT_DIR = ROOT / "marketing-reels"
WORK_DIR = OUT_DIR / "_working"
W, H = 1080, 1920
SEGMENT_SECONDS = 6.5
FPS = 30


def font(size, bold=False):
    candidates = [
        Path("C:/Windows/Fonts/arialbd.ttf" if bold else "C:/Windows/Fonts/arial.ttf"),
        Path("C:/Windows/Fonts/segoeuib.ttf" if bold else "C:/Windows/Fonts/segoeui.ttf"),
    ]
    for path in candidates:
        if path.exists():
            return ImageFont.truetype(str(path), size)
    return ImageFont.load_default()


FONT_BLACK = font(96, True)
FONT_TITLE = font(72, True)
FONT_SUB = font(46, True)
FONT_BODY = font(38)
FONT_SMALL = font(30, True)
FONT_CTA = font(54, True)


def wrap_text(draw, text, fnt, max_width):
    words = text.split()
    lines = []
    line = ""
    for word in words:
        test = f"{line} {word}".strip()
        if draw.textbbox((0, 0), test, font=fnt)[2] <= max_width:
            line = test
        else:
            if line:
                lines.append(line)
            line = word
    if line:
        lines.append(line)
    return lines


def draw_centered(draw, y, text, fnt, fill, max_width=920, spacing=10):
    lines = wrap_text(draw, text, fnt, max_width)
    for line in lines:
        bbox = draw.textbbox((0, 0), line, font=fnt)
        x = (W - (bbox[2] - bbox[0])) // 2
        draw.text((x, y), line, font=fnt, fill=fill)
        y += (bbox[3] - bbox[1]) + spacing
    return y


def cover_image(path, size=(W, H), blur=False):
    img = Image.open(path).convert("RGB")
    scale = max(size[0] / img.width, size[1] / img.height)
    resized = img.resize((math.ceil(img.width * scale), math.ceil(img.height * scale)), Image.Resampling.LANCZOS)
    x = (resized.width - size[0]) // 2
    y = (resized.height - size[1]) // 2
    out = resized.crop((x, y, x + size[0], y + size[1]))
    if blur:
        out = out.filter(ImageFilter.GaussianBlur(26))
    return out


def contain_image(path, max_w=860, max_h=920):
    img = Image.open(path).convert("RGBA")
    scale = min(max_w / img.width, max_h / img.height)
    resized = img.resize((max(1, int(img.width * scale)), max(1, int(img.height * scale))), Image.Resampling.LANCZOS)
    return resized


def rounded_rect(draw, xy, radius, fill, outline=None, width=1):
    draw.rounded_rectangle(xy, radius=radius, fill=fill, outline=outline, width=width)


def make_slide(path, product_image, kicker, headline, body, cta="Shop now at bootybandsfitness.com", theme=(245, 63, 94)):
    bg = cover_image(product_image, blur=True)
    overlay = Image.new("RGBA", (W, H), (0, 0, 0, 142))
    canvas = Image.alpha_composite(bg.convert("RGBA"), overlay)
    draw = ImageDraw.Draw(canvas)

    rounded_rect(draw, (54, 72, 1026, 1848), 34, (10, 10, 10, 112), (255, 255, 255, 44), 2)
    draw.text((86, 112), "BOOTY BANDS FITNESS", font=FONT_SMALL, fill=(255, 255, 255, 230))
    draw.rectangle((86, 164, 288, 171), fill=theme + (255,))

    product = contain_image(product_image)
    px = (W - product.width) // 2
    py = 365
    shadow = Image.new("RGBA", product.size, (0, 0, 0, 0))
    shadow_draw = ImageDraw.Draw(shadow)
    shadow_draw.rounded_rectangle((18, 18, product.width - 18, product.height - 18), 28, fill=(0, 0, 0, 110))
    shadow = shadow.filter(ImageFilter.GaussianBlur(24))
    canvas.alpha_composite(shadow, (px + 12, py + 18))
    canvas.alpha_composite(product, (px, py))

    draw = ImageDraw.Draw(canvas)
    rounded_rect(draw, (86, 220, 994, 322), 50, theme + (230,))
    draw_centered(draw, 246, kicker.upper(), FONT_SMALL, (255, 255, 255, 255), 820, 2)

    y = 1240
    y = draw_centered(draw, y, headline, FONT_TITLE, (255, 255, 255, 255), 900, 12)
    y += 22
    y = draw_centered(draw, y, body, FONT_BODY, (232, 232, 232, 255), 850, 10)

    rounded_rect(draw, (120, 1690, 960, 1790), 50, (255, 255, 255, 240))
    draw_centered(draw, 1716, cta, FONT_SMALL, (0, 0, 0, 255), 780, 4)
    canvas.convert("RGB").save(path, quality=95)


def make_beat(path, seconds):
    sr = 44100
    t = np.linspace(0, seconds, int(sr * seconds), endpoint=False)
    audio = np.zeros_like(t)
    bpm = 124
    beat_gap = 60 / bpm
    for beat in np.arange(0, seconds, beat_gap):
        idx = int(beat * sr)
        length = int(0.12 * sr)
        if idx + length < len(audio):
            env = np.exp(-np.linspace(0, 7, length))
            tone = np.sin(2 * np.pi * 65 * np.arange(length) / sr)
            audio[idx:idx + length] += 0.9 * tone * env
    for beat in np.arange(beat_gap * 2, seconds, beat_gap * 4):
        idx = int(beat * sr)
        length = int(0.08 * sr)
        if idx + length < len(audio):
            env = np.exp(-np.linspace(0, 10, length))
            noise = np.random.default_rng(int(idx)).normal(0, 1, length)
            audio[idx:idx + length] += 0.28 * noise * env
    for beat in np.arange(0, seconds, beat_gap / 2):
        idx = int(beat * sr)
        length = int(0.025 * sr)
        if idx + length < len(audio):
            env = np.exp(-np.linspace(0, 8, length))
            noise = np.random.default_rng(int(idx) + 42).normal(0, 1, length)
            audio[idx:idx + length] += 0.08 * noise * env
    audio += 0.05 * np.sin(2 * np.pi * 110 * t) * (0.6 + 0.4 * np.sin(2 * np.pi * 2 * t))
    audio = audio / max(1.0, np.max(np.abs(audio))) * 0.85
    pcm = (audio * 32767).astype(np.int16)
    with wave.open(str(path), "wb") as wf:
        wf.setnchannels(1)
        wf.setsampwidth(2)
        wf.setframerate(sr)
        wf.writeframes(pcm.tobytes())


def run(cmd):
    subprocess.run([str(FFMPEG), "-y", *map(str, cmd)], check=True)


def image_segment(image, out):
    frames = int(SEGMENT_SECONDS * FPS)
    run([
        "-loop", "1",
        "-i", image,
        "-t", str(SEGMENT_SECONDS),
        "-vf", f"zoompan=z='min(zoom+0.00055,1.055)':d={frames}:s={W}x{H}:fps={FPS},format=yuv420p",
        "-an",
        "-c:v", "libx264",
        "-preset", "veryfast",
        "-crf", "20",
        out,
    ])


def video_segment(video, out):
    run([
        "-stream_loop", "-1",
        "-i", video,
        "-t", str(SEGMENT_SECONDS),
        "-vf", f"scale={W}:{H}:force_original_aspect_ratio=increase,crop={W}:{H},fps={FPS},eq=brightness=-0.04:contrast=1.08:saturation=1.12,format=yuv420p",
        "-an",
        "-c:v", "libx264",
        "-preset", "veryfast",
        "-crf", "21",
        out,
    ])


def concat_segments(segments, no_audio_out, final_out):
    list_file = WORK_DIR / f"{final_out.stem}_concat.txt"
    list_file.write_text("".join(f"file '{p.as_posix()}'\n" for p in segments), encoding="utf-8")
    run(["-f", "concat", "-safe", "0", "-i", list_file, "-c", "copy", no_audio_out])
    beat = WORK_DIR / f"{final_out.stem}_beat.wav"
    make_beat(beat, SEGMENT_SECONDS * len(segments))
    run([
        "-i", no_audio_out,
        "-i", beat,
        "-c:v", "copy",
        "-c:a", "aac",
        "-b:a", "160k",
        "-shortest",
        final_out,
    ])


def render_reel(slug, slides, workout_videos):
    reel_dir = WORK_DIR / slug
    reel_dir.mkdir(parents=True, exist_ok=True)
    segments = []
    for idx, slide in enumerate(slides, start=1):
        slide_path = reel_dir / f"slide_{idx:02}.jpg"
        make_slide(slide_path, **slide)
        seg_path = reel_dir / f"seg_{idx:02}.mp4"
        if idx in (2, 5):
            video_segment(workout_videos[(idx // 3) % len(workout_videos)], seg_path)
        else:
            image_segment(slide_path, seg_path)
        segments.append(seg_path)
    final = OUT_DIR / f"{slug}.mp4"
    concat_segments(segments, reel_dir / f"{slug}_silent.mp4", final)
    return final


def main():
    if not FFMPEG.exists():
        raise FileNotFoundError(f"Missing ffmpeg: {FFMPEG}")
    if WORK_DIR.exists():
        shutil.rmtree(WORK_DIR)
    WORK_DIR.mkdir(parents=True, exist_ok=True)
    OUT_DIR.mkdir(parents=True, exist_ok=True)

    public = ROOT / "public"
    video = ROOT / "Video"
    products = [
        (
            "reel-01-starter-kit-fabric-bands",
            [
                {"product_image": public / "band3.jpeg", "kicker": "Starter Kit", "headline": "Build Stronger Glutes At Home", "body": "3 non-slip fabric bands for glutes, legs, hips, and core.", "theme": (244, 63, 94)},
                {"product_image": public / "band3.jpeg", "kicker": "Real Workout Energy", "headline": "Add resistance to every rep", "body": "Use them for squats, bridges, kickbacks, and lateral walks.", "theme": (244, 63, 94)},
                {"product_image": public / "band1.png", "kicker": "3 Resistance Levels", "headline": "Light. Medium. Heavy.", "body": "Start simple and progress as you get stronger.", "theme": (244, 63, 94)},
                {"product_image": video / "IMG_2730 (1).jpeg", "kicker": "What You Get", "headline": "Bands + bag + workout guide", "body": "Everything you need to start training anywhere.", "theme": (244, 63, 94)},
                {"product_image": public / "band3.jpeg", "kicker": "Made For Movement", "headline": "Soft fabric. Strong resistance.", "body": "Comfortable on skin and built for real workouts.", "theme": (244, 63, 94)},
                {"product_image": video / "IMG_2729.jpeg", "kicker": "Beginner Friendly", "headline": "Train at home in 15 minutes", "body": "No machines. No complicated setup. Just move.", "theme": (244, 63, 94)},
                {"product_image": public / "band3.jpeg", "kicker": "Launch Offer", "headline": "Use code BOOTY20", "body": "Get 20% off today at bootybandsfitness.com.", "theme": (244, 63, 94)},
                {"product_image": video / "IMG_2730 (1).jpeg", "kicker": "Booty Bands Fitness", "headline": "Shop The Starter Kit", "body": "Fast U.S. shipping. 30-day guarantee.", "theme": (244, 63, 94)},
            ],
        ),
        (
            "reel-02-latex-5-level-band-set",
            [
                {"product_image": public / "band2.jpeg", "kicker": "Latex Set", "headline": "5 Levels. Full Body Training.", "body": "A lightweight resistance set for strength, stretching, and mobility.", "theme": (34, 197, 94)},
                {"product_image": public / "band2.jpeg", "kicker": "Workout Anywhere", "headline": "Glutes. Arms. Core. Mobility.", "body": "Easy to pack, simple to use, and beginner friendly.", "theme": (34, 197, 94)},
                {"product_image": video / "IMG_2724.jpeg", "kicker": "Progressive Resistance", "headline": "From light to extra heavy", "body": "Choose the level that matches your workout.", "theme": (34, 197, 94)},
                {"product_image": public / "band2.jpeg", "kicker": "Best Budget Pick", "headline": "Only $29.99", "body": "Add resistance to home workouts without heavy equipment.", "theme": (34, 197, 94)},
                {"product_image": video / "IMG_2708.jpeg", "kicker": "Mobility + Strength", "headline": "Warm up. Stretch. Train.", "body": "A simple set for everyday movement.", "theme": (34, 197, 94)},
                {"product_image": public / "band2.jpeg", "kicker": "Includes Carry Bag", "headline": "Take your bands anywhere", "body": "Home, gym, travel, or outdoor workouts.", "theme": (34, 197, 94)},
                {"product_image": public / "band2.jpeg", "kicker": "Launch Offer", "headline": "Use code BOOTY20", "body": "Get 20% off today at bootybandsfitness.com.", "theme": (34, 197, 94)},
                {"product_image": video / "IMG_2724.jpeg", "kicker": "Booty Bands Fitness", "headline": "Shop The 5-Level Latex Set", "body": "Fast U.S. shipping. 30-day guarantee.", "theme": (34, 197, 94)},
            ],
        ),
        (
            "reel-03-full-body-training-bundle",
            [
                {"product_image": public / "band1.png", "kicker": "Full Body Bundle", "headline": "One Kit. More Workout Options.", "body": "Resistance bands with handles for glutes, legs, arms, back, and core.", "theme": (168, 85, 247)},
                {"product_image": public / "band1.png", "kicker": "Best Value", "headline": "Train more than legs", "body": "Use the handles and attachments for total-body resistance training.", "theme": (168, 85, 247)},
                {"product_image": video / "Image1.jpeg", "kicker": "Home Gym Ready", "headline": "No big machines needed", "body": "Build a simple workout routine anywhere.", "theme": (168, 85, 247)},
                {"product_image": public / "band1.png", "kicker": "What You Get", "headline": "Bands. Handles. Door anchor. Bag.", "body": "A complete resistance training kit for your routine.", "theme": (168, 85, 247)},
                {"product_image": video / "Image2.JPEG", "kicker": "Progress Your Training", "headline": "5 resistance levels", "body": "Go light for warmups or heavier for strength work.", "theme": (168, 85, 247)},
                {"product_image": public / "band1.png", "kicker": "Made To Move", "headline": "Workout at home or on the go", "body": "Compact, portable, and easy to use.", "theme": (168, 85, 247)},
                {"product_image": public / "band1.png", "kicker": "Launch Offer", "headline": "Use code BOOTY20", "body": "Get 20% off today at bootybandsfitness.com.", "theme": (168, 85, 247)},
                {"product_image": public / "band1.png", "kicker": "Booty Bands Fitness", "headline": "Shop The Full Body Bundle", "body": "Fast U.S. shipping. 30-day guarantee.", "theme": (168, 85, 247)},
            ],
        ),
    ]
    workouts = [public / "Workout1.mp4", public / "Workout2.mp4", public / "Workout3.mp4", public / "workout.mp4"]
    finals = [render_reel(slug, slides, workouts) for slug, slides in products]
    print("Created:")
    for path in finals:
        print(path)


if __name__ == "__main__":
    main()
