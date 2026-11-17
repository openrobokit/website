"""Encode the original 400-grasp timeline with the hero's matte studio rendering."""

import argparse
import hashlib
import json
import subprocess
from pathlib import Path

from PIL import Image, ImageChops, ImageFilter


def compose(path: Path) -> Image.Image:
    foreground = Image.open(path).convert("RGBA")
    width, height = foreground.size
    alpha = foreground.getchannel("A")
    # Match the hero: keep opaque geometry and nearby physical contact shadows.
    core = alpha.point(lambda value: 255 if value >= 250 else 0).filter(ImageFilter.MaxFilter(5))
    contact = core.filter(ImageFilter.GaussianBlur(36 * height / 1080))
    weight = ImageChops.lighter(core, contact.point(lambda value: min(255, 2 * value)))
    foreground.putalpha(ImageChops.multiply(alpha, weight))
    image = Image.new("RGBA", (width, height), "#E7EBE4")
    image.alpha_composite(foreground)
    return image.convert("RGB")


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--data", type=Path, required=True)
    parser.add_argument("--frames", type=Path, required=True)
    parser.add_argument("--out", type=Path, required=True)
    parser.add_argument("--preview-only", action="store_true")
    parser.add_argument("--still", type=Path, help="Composite one close-up before rendering the full video")
    parser.add_argument("--camera-stop-seconds", type=float, default=4.0, help="Hold the settled scene after this time")
    args = parser.parse_args()
    args.out.mkdir(parents=True, exist_ok=True)
    manifest = json.loads((args.data / "manifest.json").read_text())
    times = manifest["frame_seconds"][:75]
    assert manifest["batch_size"] == 400 and round(times[-1], 2) == 3.09
    assert round(times[48], 2) == 2.00
    stop_frame = round(args.camera_stop_seconds * 24) + 1
    assert 87 <= stop_frame <= 255
    if args.still is not None:
        compose(args.still).save(args.out / "close-up.png")
        print("PREVIEW: featured grasp; website supplies the RoboKit timing badge", flush=True)
        return
    for index in (0, 86, 122, 158, 206, 254):
        compose(args.frames / "tour" / f"frame_{min(index + 1, stop_frame):04d}.png").save(args.out / f"preview-{index:03d}.png")
    if args.preview_only:
        print("PREVIEW: six camera-tour frames; timer 0.00–3.09 s; 400 scenes", flush=True)
        return
    timeline = [
        args.frames / "tour" / f"frame_{min(index + 1, stop_frame):04d}.png"
        for index in range(255)
    ]
    assert len(timeline) == 255
    video = args.out / "grasp-optim.mp4"
    first = compose(timeline[0])
    command = [
        "ffmpeg", "-y", "-hide_banner", "-loglevel", "error", "-xerror", "-f", "rawvideo", "-pix_fmt", "rgb24",
        "-s", f"{first.width}x{first.height}", "-r", "24", "-i", "-", "-an", "-c:v", "libx264", "-threads", "4",
        "-crf", "16", "-preset", "medium", "-vf", "scale=out_color_matrix=bt709:out_range=tv,format=yuv420p",
        "-colorspace", "bt709", "-color_primaries", "bt709", "-color_trc", "bt709", "-color_range", "tv",
        "-movflags", "+faststart", str(video),
    ]
    with (args.out / "encode.log").open("w") as log:
        process = subprocess.Popen(command, stdin=subprocess.PIPE, stderr=log)
        last, image = None, None
        for path in timeline:
            if path != last:
                image = compose(path).tobytes()
                last = path
            process.stdin.write(image)
        process.stdin.close()
        assert process.wait() == 0
    first.save(args.out / "grasp-optim.webp", quality=95)
    result = {
        "frames": 255, "fps": 24, "duration_seconds": 10.625, "cells": 400, "source_pose_frames": list(range(75)),
        "source_frame_seconds": times, "lead_frames": 12, "settled_frames": 168,
        "camera": "front view; zoom stops and holds after four seconds", "background": "#E7EBE4",
        "camera_stop_seconds": args.camera_stop_seconds,
        "camera_stop_source_frame": stop_frame,
        "render_source_frames": [min(index + 1, stop_frame) for index in range(255)],
        "featured_cell": json.loads((args.frames / "tour/render-meta-0.json").read_text())["featured_cell"],
        "width": first.width, "height": first.height, "timer": "RoboKit badge on the website",
        "version": hashlib.sha256(video.read_bytes()).hexdigest()[:10], "encoder": command,
    }
    (args.out / "validation.json").write_text(json.dumps(result, indent=2) + "\n")
    print("ENCODED: 255 frames, 24 fps, 10.625 s; 400 original trajectories; timer ends at 3.09 s", flush=True)
    print(f"VERSION {result['version']}", flush=True)


if __name__ == "__main__":
    main()
