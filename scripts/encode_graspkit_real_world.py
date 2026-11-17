"""Encode the original 1080p HDR robustness footage for browser playback.

Run with uv run --no-project --with imageio-ffmpeg python <script>.
"""

import argparse
import json
import shlex
import subprocess
from pathlib import Path

import imageio_ffmpeg


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--source', type=Path, required=True)
    parser.add_argument('--out', type=Path, required=True)
    args = parser.parse_args()
    args.out.mkdir(parents=True, exist_ok=True)
    ffmpeg = imageio_ffmpeg.get_ffmpeg_exe()
    reader = imageio_ffmpeg.read_frames(str(args.source))
    source_metadata = next(reader)
    reader.close()
    assert source_metadata['size'] == (1920, 1080)
    assert source_metadata['fps'] == 30
    source_frames, _ = imageio_ffmpeg.count_frames_and_secs(str(args.source))
    video = args.out / 'real-world.mp4'
    # Convert HLG/BT.2020 to SDR/BT.709 without resizing or retiming the source.
    tone_map = ('zscale=t=linear:npl=100,format=gbrpf32le,zscale=p=bt709,'
                'tonemap=hable:desat=0,zscale=t=bt709:m=bt709:r=tv,format=yuv420p')
    command = [ffmpeg, '-y', '-v', 'error', '-threads', '8', '-i', str(args.source),
               '-map', '0:v:0', '-filter_threads', '4', '-vf', tone_map,
               '-c:v', 'libx264', '-threads', '8', '-preset', 'slow', '-crf', '18',
               '-pix_fmt', 'yuv420p', '-profile:v', 'high', '-an',
               '-colorspace', 'bt709', '-color_primaries', 'bt709', '-color_trc', 'bt709',
               '-color_range', 'tv', '-movflags', '+faststart', str(video)]
    print(shlex.join(command), flush=True)
    subprocess.run(command, check=True)
    poster_command = [ffmpeg, '-y', '-v', 'error', '-ss', '3', '-i', str(video),
                      '-frames:v', '1', '-c:v', 'libwebp', '-quality', '92',
                      str(args.out / 'real-world.webp')]
    subprocess.run(poster_command, check=True)
    reader = imageio_ffmpeg.read_frames(str(video))
    metadata = next(reader)
    reader.close()
    frames, seconds = imageio_ffmpeg.count_frames_and_secs(str(video))
    assert metadata['size'] == (1920, 1080) and metadata['fps'] == 30
    assert frames == source_frames
    assert abs(metadata['duration'] - source_metadata['duration']) < 0.04
    report = {'source': str(args.source), 'source_metadata': source_metadata,
              'output_metadata': metadata, 'decoded_frames': frames, 'seconds': seconds,
              'bytes': video.stat().st_size, 'encode_command': command,
              'poster_command': poster_command}
    (args.out / 'validation.json').write_text(json.dumps(report, indent=2) + '\n')
    print(f'PASS full decode: {frames} frames, 1920x1080, 30 fps, {seconds:.3f} seconds', flush=True)
    print(f'PASS source timing preserved; SDR BT.709; {video.stat().st_size / 1048576:.2f} MiB', flush=True)


if __name__ == '__main__':
    main()
