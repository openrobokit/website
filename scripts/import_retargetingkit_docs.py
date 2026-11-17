# /// script
# requires-python = ">=3.10"
# dependencies = ["griffe>=2,<3", "pillow>=11,<12", "pyyaml>=6,<7", "xdoctest>=1.3,<2"]
# ///
"""Import the public retargetingkit docs (md) into data/docs/retargetingkit.js.

    uv run scripts/import_retargetingkit_docs.py /path/to/retargetingkit

As for RoboKit, pages, sidebar order (`docs/nav.yml`), and API definitions
come from the supplied checkout. Source images are copied to
assets/docs/retargetingkit/; gallery recordings already live there. Only this
kit's marked block in data/docs/retargetingkit.js is replaced.
"""

import shutil
import sys
from pathlib import Path

import apimodel
import yaml
from md2doc import Converter, assemble, splice, splice_api_tabs
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
GITHUB = "https://github.com/openrobokit/retargetingkit/"
BEGIN = "// BEGIN GENERATED retargetingkit DOCS (scripts/import_retargetingkit_docs.py)"
END = "// END GENERATED retargetingkit DOCS"
# Frame the original panel in the page; preserve all screenshot pixels.
CROPS = {
    "xrobotoolkit-pico-fullbody-settings.jpeg": [640, 280, 790, 715],
    "vision-pro-tracking-streamer-start.jpg": [310, 270, 1060, 560],
}


def main() -> None:
    repo = Path(sys.argv[1]).expanduser().resolve()
    docs = repo / "docs"
    files = []
    for group in yaml.safe_load((docs / "nav.yml").read_text()):
        runs = [(None, group.get("pages") or [])]
        runs += [(f["fold"], f["pages"]) for f in group.get("folds") or []]
        for fold, pages in runs:
            for page in pages:
                files.append(
                    {"group": group["group"], "src": page["file"], "id": page["id"], "sub": fold, "nav": page.get("nav")}
                )
    images = {}
    for source in sorted((docs / "assets").rglob("*")):
        if not source.is_file() or source.suffix.lower() not in {".png", ".jpg", ".jpeg", ".webp"}:
            continue
        public = f"/assets/docs/retargetingkit/{source.relative_to(docs)}"
        dest = ROOT / public.lstrip("/")
        dest.parent.mkdir(parents=True, exist_ok=True)
        shutil.copyfile(source, dest)
        with Image.open(dest) as img:
            images[public] = {"size": img.size}
        if source.name in CROPS:
            images[public]["crop"] = CROPS[source.name]
    conv = Converter("retargetingkit", GITHUB, {f["src"]: f["id"] for f in files}, images)
    conv.docs_dir = docs
    package = apimodel.load_package("retargetingkit", repo / "src")
    source = apimodel.Repo(src=repo / "src", github=GITHUB)
    groups = assemble(files, docs, conv, lambda name: apimodel.resolve(package, name, source, conv))
    splice(ROOT / "data/docs/retargetingkit.js", BEGIN, END, groups)
    splice_api_tabs("retargetingkit", "RetargetingKit", "scripts/import_retargetingkit_docs.py", docs, conv, files, (
        ("guide/hand_retargeting.md", "Use the Python API", "Hand", "hand.py"),
        ("guide/arm_retargeting.md", "Retarget an arm and hand", "Arm and hand", "arm_hand.py"),
        ("guide/humanoid_retargeting.md", "Use the Python API", "Humanoid", "humanoid.py"),
    ))
    print(f"Published {len(files)} pages and {len(images)} original images.")


if __name__ == "__main__":
    main()
