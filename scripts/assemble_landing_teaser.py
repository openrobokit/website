#!/usr/bin/env python3
"""Encode fresh Blender frames and hero cuts into the landing page's video and poster assets.

uv run --no-project python scripts/assemble_landing_teaser.py

Inputs: --renders <dir>/<shot>/frame_XXXX.png from Blender, and
the RetargetingKit, GraspKit and RoboSkills clips, which supply their shots.
Outputs: the teaser and four matching kit previews under assets/{videos,images}/landing/.
Use --previews-only to refresh the cards from an existing teaser.
Use --kit graspkit to replace that shot and card while preserving the other kits.
Intermediate clips and render provenance stay in ignored output/landing-teaser/.
"""

import argparse
import hashlib
import json
import struct
import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "output/landing-teaser"
MOVIE = ROOT / "assets/videos/landing/teaser.mp4"
POSTER = ROOT / "assets/images/landing/teaser.webp"
SIZE = 1600  # every shot matches, so the concat can copy streams
CLIPS = (
    ("RoboKit", "Motion planning", "motion_planning"),
    ("RetargetingKit", "Scene interaction", "full-body-cutting"),
    ("GraspKit", "Pick and place", "hero-place"),
    ("RoboSkills", "Paper folding", "paper-folding"),
)
# Three shots are cut from their kit's hero clip rather than rendered: 4 s squared
# up around the action (a short crop is padded square), and the clip's ground
# lifted to the teaser's, so the page band shows through the multiply as it does
# for the renders.
HERO_CUTS = {
    # The kitchen scene's broad floor shadow would still darken that ground out
    # to the frame edge, so, like the renders' haze cut, faint shading fades to
    # the ground: a pixel's darkest channel 16 levels under it goes, 40 under it
    # stays whole. The shadow is smeared into the padding.
    "full-body-cutting": dict(clip=ROOT / "assets/videos/retargetingkit/hero/full-body-cutting.mp4",
                              start=5, crop=(1200, 1080, 320, 0), ground=(233, 242, 247), flatten=True),
    # Keep Ability -> Sharpa and Panda -> xArm -> Vega at the original speed.
    # Start after Inspire has vanished and finish before Vega's return wipe.
    # Fade the cropped torso into the ground instead of smearing it into padding.
    "hero-place": dict(clip=ROOT / "assets/videos/graspkit/hero-place.mp4",
                       start=77 / 30, crop=(1440, 1080, 380, 0), ground=(231, 235, 228),
                       flatten=False, fade_bottom=80),
    # The paper-folding teaser already sits on a near-white studio; its first
    # 4 s keep both hands in a 1560px-wide crop, and flattening drops the floor
    # line and contact shadow so only the hands and paper remain. The padding is
    # plain ground: smearing would drag the faint shadow into vertical streaks.
    "paper-folding": dict(clip=ROOT / "assets/videos/roboskills/teaser/paper-folding.mp4",
                          start=0, crop=(1560, 1080, 240, 0), ground=(248, 248, 246), flatten=True,
                          smear=False),
}


def ffmpeg(args: list[str]) -> None:
    subprocess.run(["ffmpeg", "-y", "-hide_banner", "-loglevel", "error", "-xerror", *args], check=True)


def encode_hero_cut(cut: dict, output: Path) -> None:
    w, h, x, y = cut["crop"]
    r, g, b = cut["ground"]
    pad = (w - h) // 2
    chain = ["scale=in_color_matrix=bt709:in_range=tv", "fps=30", "format=rgb24", f"crop={w}:{h}:{x}:{y}"]
    if cut.get("fade_bottom"):
        fade = f"clip((H-1-Y)/{cut['fade_bottom']},0,1)"
        chain.append("geq=" + ":".join(f"{channel}='{channel}(X,Y)*{fade}+{ground}*(1-{fade})'"
                                      for channel, ground in zip("rgb", (r, g, b))))
    if pad:
        chain.append(f"pad={w}:{w}:0:{pad}:color=0x{r:02x}{g:02x}{b:02x}")
        if not cut.get("fade_bottom") and cut.get("smear", True):
            chain.append(f"fillborders=top={pad}:bottom={pad}:mode=smear")
    chain.append(f"colorchannelmixer=rr={250 / r:.5f}:gg={250 / g:.5f}:bb={248 / b:.5f}")
    if cut["flatten"]:
        keep = ("st(0,max(max(250-r(X,Y),250-g(X,Y)),248-b(X,Y)));"
                "st(1,clip((ld(0)-16)/24,0,1));st(1,ld(1)*ld(1)*(3-2*ld(1)))")
        chain.append(f"geq=r='{keep};250-(250-r(X,Y))*ld(1)':g='{keep};250-(250-g(X,Y))*ld(1)'"
                     f":b='{keep};248-(248-b(X,Y))*ld(1)'")
    chain.append(f"scale={SIZE}:{SIZE}:flags=lanczos:out_color_matrix=bt709:out_range=tv,format=yuv420p")
    graph = f"[0:v]{','.join(chain)}[v]"
    ffmpeg(["-threads", "2", "-ss", str(cut["start"]), "-i", str(cut["clip"]),
            "-filter_complex_threads", "2", "-filter_complex", graph, "-map", "[v]",
            "-frames:v", "120", "-an", "-c:v", "libx264", "-threads", "6", "-crf", "14",
            "-preset", "medium", "-pix_fmt", "yuv420p", "-colorspace", "bt709",
            "-color_primaries", "bt709", "-color_trc", "bt709", "-color_range", "tv",
            "-movflags", "+faststart", str(output)])


def export_previews(kit: str | None = None) -> None:
    for i, (name, _, _) in enumerate(CLIPS):
        if kit and name.lower() != kit:
            continue
        clip = MOVIE.with_name(f"{name.lower()}.mp4")
        poster = POSTER.with_name(f"{name.lower()}.webp")
        ffmpeg(["-threads", "2", "-ss", str(i * 4), "-i", str(MOVIE), "-t", "4",
                "-vf", "scale=640:640", "-an", "-c:v", "libx264", "-threads", "2",
                "-crf", "19", "-preset", "medium", "-movflags", "+faststart", str(clip)])
        ffmpeg(["-threads", "2", "-ss", "1", "-i", str(clip), "-frames:v", "1",
                "-c:v", "libwebp", "-quality", "90", "-threads", "2", str(poster)])
        print(f"{name}: matching 4s preview and poster", flush=True)


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--renders", type=Path, help="Blender frames, one folder per shot; required unless --previews-only")
    parser.add_argument("--previews-only", action="store_true")
    parser.add_argument("--kit", choices=[name.lower() for name, _, _ in CLIPS])
    args = parser.parse_args()
    if args.previews_only:
        export_previews(args.kit)
        return
    OUT.mkdir(parents=True, exist_ok=True)
    MOVIE.parent.mkdir(parents=True, exist_ok=True)
    POSTER.parent.mkdir(parents=True, exist_ok=True)
    shots = []
    provenance = []
    previous_version = hashlib.sha256(MOVIE.read_bytes()).hexdigest()[:10] if args.kit else None
    for i, (name, task, stem) in enumerate(CLIPS):
        output = OUT / f"{stem}.mp4"
        if args.kit and name.lower() != args.kit:
            ffmpeg(["-ss", str(i * 4), "-i", str(MOVIE), "-frames:v", "120",
                    "-map", "0:v", "-an", "-c", "copy", "-movflags", "+faststart", str(output)])
            shots.append(output)
            provenance.append(dict(name=name, task=task, retained_from=previous_version, start=i * 4))
            print(f"{name}: retained original 4s shot without re-encoding", flush=True)
            continue
        if cut := HERO_CUTS.get(stem):
            encode_hero_cut(cut, output)
            shots.append(output)
            provenance.append(dict(name=name, task=task, clip=str(cut["clip"].relative_to(ROOT)), start=cut["start"]))
            print(f"{name}: {cut['start']}-{cut['start'] + 4}s of {cut['clip'].name}, squared to {SIZE}px", flush=True)
            continue
        if args.renders is None:
            parser.error(f"--renders is required to encode {name}'s Blender shot")
        frames = args.renders / stem
        assert len(list(frames.glob("frame_*.png"))) == 120, f"Expected 120 rendered frames in {frames}"
        meta = json.loads((frames / "render-meta.json").read_text())
        size = meta["size"]
        assert size == SIZE, f"{SIZE}px renders required: {size}px"
        for frame in range(120):
            path = frames / f"frame_{frame:04d}.png"
            with path.open("rb") as image:
                header = image.read(24)
                image.seek(-12, 2)
                footer = image.read(12)
            assert header[:8] == b"\x89PNG\r\n\x1a\n", f"Invalid PNG: {path}"
            assert struct.unpack(">II", header[16:24]) == (size, size), f"Wrong frame size: {path}"
            assert footer == b"\x00\x00\x00\x00IEND\xaeB`\x82", f"Incomplete frame: {path}"
        # Remove low-opacity floor haze while retaining opaque meshes and stronger shadows.
        graph = (
            f"color=c=0xFAFAF8:s={size}x{size}:r=30:d=4[bg];"
            "[0:v]format=rgba,lut=a='max(0,(val-24)*255/231)'[fg];"
            "[bg][fg]overlay=shortest=1:format=rgb,"
            "scale=out_color_matrix=bt709:out_range=tv,format=yuv420p[v]"
        )
        ffmpeg(["-threads", "2", "-framerate", "30", "-i", str(frames / "frame_%04d.png"),
                "-filter_complex_threads", "2", "-filter_complex", graph, "-map", "[v]",
                "-frames:v", "120", "-an", "-c:v", "libx264", "-threads", "6", "-crf", "14",
                "-preset", "medium", "-pix_fmt", "yuv420p", "-colorspace", "bt709",
                "-color_primaries", "bt709", "-color_trc", "bt709", "-color_range", "tv",
                "-movflags", "+faststart", str(output)])
        shots.append(output)
        provenance.append(dict(name=name, task=task, render=meta))
        print(f"{name}: {size}×{size}, 120 frames, native render, CRF 14", flush=True)
    concat = OUT / "shots.txt"
    concat.write_text("".join(f"file '{shot.name}'\n" for shot in shots))
    movie = MOVIE
    ffmpeg(["-f", "concat", "-safe", "0", "-i", str(concat), "-c", "copy",
            "-movflags", "+faststart", str(movie)])
    if args.kit is None or args.kit == "robokit":
        ffmpeg(["-threads", "2", "-ss", "1", "-i", str(movie), "-frames:v", "1",
                "-c:v", "libwebp", "-quality", "95", "-threads", "2", str(POSTER)])
    export_previews(args.kit)
    version = hashlib.sha256(movie.read_bytes()).hexdigest()[:10]
    (OUT / "sources.json").write_text(json.dumps({
        "duration": 4 * len(CLIPS), "fps": 30, "shot_duration": 4, "clips": provenance,
        "assembly": "Native-resolution render and squared hero cuts; direct cuts; one kit at a time; labels are HTML.",
    }, indent=2) + "\n")
    print(f"{movie.relative_to(ROOT)}: {4 * len(CLIPS)}s, {120 * len(CLIPS)} frames, {movie.stat().st_size / 1048576:.2f} MB", flush=True)
    print(f"Poster: {POSTER.relative_to(ROOT)}; asset version: {version}", flush=True)


if __name__ == "__main__":
    main()
