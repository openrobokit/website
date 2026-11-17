#!/usr/bin/env python3
"""Re-encode the RetargetingKit showcase clips from the original camera footage.

The real-world clips on /retargetingkit/ were published at 480p and a bitrate
low enough to smear the robot against the background. The raw takes live in a
sibling internal checkout; this script re-cuts them at 720p and writes the
matching poster stills. Run it after `make site` has been proven to work, then
bump RKV in data/projects.js so browsers fetch the new files.
"""

from __future__ import annotations

import os
import shutil
import subprocess
import sys
from dataclasses import dataclass
from pathlib import Path

REPO = Path(__file__).resolve().parent.parent
FOOTAGE = Path(os.environ.get("RETARGETINGKIT_FOOTAGE", REPO / "footage/raw"))
VIDEOS = REPO / "assets/videos/retargetingkit"
POSTERS = REPO / "assets/images/retargetingkit"

# Every clip is published at 1080p; the source aspect decides the width.
HEIGHT = 1080
CRF = "23"
# Teleoperation runs slower than a page visit has patience for, so the published
# clips are sped up. The whole-body takes are the longest, so they go faster.
# Whatever is set here, the page has to say so on the stage.
SPEED = 2


@dataclass(frozen=True)
class Clip:
    out: str  # path under the video/poster trees, without extension
    src: str  # file name inside FOOTAGE
    start: float | None = None  # seconds into the source, None for the whole take
    duration: float | None = None
    speed: int = SPEED


# The published clips are straight cuts of these takes at 1:1 speed. `coffee` is
# the only one that starts partway in; the rest run from the first frame.
CLIPS = (
    Clip("hand/inhand/tennis", "tennis.MOV"),
    Clip("hand/inhand/cube", "cube1.MOV"),
    Clip("hand/inhand/cylinder", "cylinder.MOV"),
    Clip("hand/inhand/pen", "pen.MOV"),
    Clip("hand/tool/hammer", "tool_use_1.MOV"),
    Clip("hand/tool/marker", "tool_use_2.MOV"),
    Clip("hand/tool/cup", "tool_use_4.MOV"),
    Clip("hand/tool/plug", "tool_use_6.MOV"),
    Clip("humanoid/flowers", "5.mov", speed=4),
    Clip("humanoid/picnic", "7.mov", speed=4),
    Clip("humanoid/basket", "2.mov", speed=4),
    # The published bottle/book clips open on ~4.9s and ~2.4s of lead-in that is
    # not in these takes, so they now start where the take does.
    Clip("humanoid/bottle", "4.mov", speed=4),
    Clip("humanoid/book", "3.mov", speed=4),
    Clip("humanoid/coffee", "6.mov", start=12.10, duration=20.03, speed=4),
)


def run(cmd: list[str]) -> None:
    subprocess.run(cmd, check=True)


def trim(clip: Clip) -> list[str]:
    args = []
    if clip.start is not None:
        args += ["-ss", str(clip.start)]
    if clip.duration is not None:
        args += ["-t", str(clip.duration)]
    return args


def encode(clip: Clip) -> None:
    src = FOOTAGE / clip.src
    video = VIDEOS / f"{clip.out}.mp4"
    poster = POSTERS / f"{clip.out}.webp"
    video.parent.mkdir(parents=True, exist_ok=True)
    poster.parent.mkdir(parents=True, exist_ok=True)

    # The takes are 29.97fps; setpts retimes them and fps=30 resamples the
    # result, so the output is a real 30fps clip rather than dropped duplicates.
    run([
        "ffmpeg", "-y", "-v", "error",
        *trim(clip), "-i", str(src),
        "-vf", f"setpts=PTS/{clip.speed},fps=30,scale=-2:{HEIGHT}",
        "-c:v", "libx264", "-crf", CRF, "-preset", "slow",
        "-pix_fmt", "yuv420p", "-profile:v", "high",
        "-an", "-movflags", "+faststart",
        str(video),
    ])
    run([
        "ffmpeg", "-y", "-v", "error",
        "-i", str(video), "-frames:v", "1",
        "-c:v", "libwebp", "-quality", "82",
        str(poster),
    ])
    print(f"{clip.out:26s} {video.stat().st_size / 1048576:5.1f} MB"
          f"  poster {poster.stat().st_size / 1024:5.0f} KB")


def main() -> int:
    if shutil.which("ffmpeg") is None:
        print("ffmpeg not on PATH", file=sys.stderr)
        return 1
    missing = [c.src for c in CLIPS if not (FOOTAGE / c.src).exists()]
    if missing:
        print(f"missing footage in {FOOTAGE}: {', '.join(missing)}", file=sys.stderr)
        return 1
    for clip in CLIPS:
        encode(clip)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
