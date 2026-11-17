"""Render the RoboKit speed bars as robokit's README image, at its exact size.

make benchmark-image OUT=<robokit>/docs/assets/robokit-benchmarks.webp

The README shows a 3120x1912 transparent image of the legend and bar card. This
draws it from the built /robokit/ page, so the bars, styles, and numbers are the
ones in data/projects.js. The extension picks the format: .png or .webp.
"""

import argparse
import io
import threading
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

from PIL import Image
from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parent.parent
SITE = ROOT / "_page"
WIDTH, HEIGHT, SCALE = 1560, 956, 2  # CSS px; 2x gives 3120x1912 (9 rows)
VIEWPORT = 1920  # wide enough that every clamp() in the bench styles is at its max

# Only the legend and the card, on a transparent frame of the export's size.
# The README shows the image at about 60% of its CSS width, so type and bars
# run larger than on the page; the sizes match the original design export.
# The pill keeps its own accent gradient; the moving layers inside it are hidden.
FRAME_CSS = f"""
html, body {{ background: transparent !important; margin: 0; }}
#rk-export {{
  position: fixed; top: 0; left: 0; width: {WIDTH}px; height: {HEIGHT}px;
  box-sizing: border-box; padding-top: 1px; display: flex; flex-direction: column;
}}
#rk-export .bench__legend {{ align-self: flex-end; gap: 20px; font-size: 21px; }}
#rk-export .bench__legend span {{ gap: 12px; }}
#rk-export .bench__legend i {{ width: 13px; height: 13px; }}
#rk-export .bench__table {{
  margin-top: auto; height: 905px; box-sizing: border-box; padding: 22.5px 45px 27.5px;
}}
#rk-export .bench__row {{ flex: 1 1 0; padding: 0; gap: 34px; }}
#rk-export .bench__task {{ flex-basis: 172px; font-size: 20.8px; color: #192638; }}
#rk-export .bench__bars {{ gap: 9px; }}
#rk-export .bench__bars i {{ height: 12px; border-radius: 6px; }}
#rk-export .bench__fig {{ flex-basis: 146px; }}
#rk-export .bench__fig .x {{ font-size: 42px; }}
#rk-export .bench__fig .vs {{ font-size: 21px; margin-top: 7px; }}
#rk-export .bench__note, #rk-export .flow, #rk-export .swell {{ display: none; }}
"""

ISOLATE = """() => {
  const frame = document.createElement('div');
  frame.id = 'rk-export';
  frame.append(document.querySelector('.bench__legend'), document.querySelector('.bench__table'));
  document.body.replaceChildren(frame);
  const box = (s) => frame.querySelector(s).getBoundingClientRect();
  const legend = box('.bench__legend'), table = box('.bench__table');
  const rows = [...frame.querySelectorAll('.bench__row')];
  return {
    legendBottom: legend.bottom, tableTop: table.top, tableBottom: table.bottom,
    rowsOverflow: rows.some((r) => r.scrollHeight > r.clientHeight + 1),
  };
}"""


def serve(root: Path) -> ThreadingHTTPServer:
    class Quiet(SimpleHTTPRequestHandler):
        def log_message(self, *args):
            pass

    server = ThreadingHTTPServer(("127.0.0.1", 0), partial(Quiet, directory=str(root)))
    threading.Thread(target=server.serve_forever, daemon=True).start()
    return server


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    parser.add_argument("--out", type=Path, default=ROOT / "output/robokit-benchmarks.png")
    args = parser.parse_args()
    if args.out.suffix not in (".png", ".webp"):
        parser.error("--out must end in .png or .webp")
    if not (SITE / "robokit/index.html").exists():
        raise SystemExit("_page/ is missing; run `make site` first")

    server = serve(SITE)
    try:
        with sync_playwright() as p:
            browser = p.chromium.launch(channel="chrome")
            page = browser.new_page(
                viewport={"width": VIEWPORT, "height": 1080},
                device_scale_factor=SCALE,
                reduced_motion="reduce",  # bars land at full width with final figures
            )
            page.goto(f"http://127.0.0.1:{server.server_port}/robokit/", wait_until="networkidle")
            page.wait_for_selector(".bench__table.is-in")
            page.evaluate("document.fonts.ready")
            page.add_style_tag(content=FRAME_CSS)
            fit = page.evaluate(ISOLATE)
            if (
                fit["tableBottom"] > HEIGHT
                or fit["tableTop"] < fit["legendBottom"]
                or fit["rowsOverflow"]
            ):
                raise SystemExit(f"bench card does not fit {WIDTH}x{HEIGHT}: {fit}")
            png = page.screenshot(
                clip={"x": 0, "y": 0, "width": WIDTH, "height": HEIGHT}, omit_background=True
            )
            browser.close()
    finally:
        server.shutdown()

    image = Image.open(io.BytesIO(png))
    assert image.size == (WIDTH * SCALE, HEIGHT * SCALE), image.size
    args.out.parent.mkdir(parents=True, exist_ok=True)
    if args.out.suffix == ".png":
        args.out.write_bytes(png)
    else:
        image.save(args.out, "WEBP", quality=90, alpha_quality=100, method=6)
    print(f"{args.out} {image.width}x{image.height}")


if __name__ == "__main__":
    main()
