# /// script
# requires-python = ">=3.10"
# dependencies = ["griffe>=2,<3", "pillow>=11,<12", "pyyaml>=6,<7", "xdoctest>=1.3,<2"]
# ///
"""Import one kit's Markdown docs into data/docs/<kit>.js, verbatim.

    uv run scripts/import_docs.py <robokit|retargetingkit|graspkit> path/to/repo

The sidebar comes from `docs/nav.yml` in the source repo, so which pages are
published and in what order travels with the docs. Prose is copied
word-for-word; only markup is translated to the site's .doc classes (see
md2doc.py). A `::: robokit.opt.GDOptimizer` line selects an API reference
block, read out of the source with griffe (see apimodel.py).

Only the kit's GENERATED block in its corpus file is replaced, plus the
landing page's API tabs for kits that list `tabs`.
"""

import shutil
import sys
from pathlib import Path

import apimodel
import yaml
from md2doc import Converter, assemble, splice, splice_api_tabs
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent

# `tabs` lists (guide page, heading, tab label, tab file name) for the landing
# page's API card. `crops` frame screenshots without changing their pixels; a
# kit that has them gets its docs images copied to assets/docs/<kit>/.
PROJECTS = {
    "robokit": {
        "name": "RoboKit",
        "tabs": (
            ("guide/ik.md", "Batch IK", "Inverse kinematics", "ik.py"),
            ("guide/motion_planning.md", "Basic Example", "Motion planning", "motion_planning.py"),
            ("guide/hand_retargeting.md", "Online Retargeting", "Hand retargeting", "hand_retargeting.py"),
            ("guide/humanoid_retargeting.md", "Online Retargeting", "Humanoid retargeting", "humanoid_retargeting.py"),
            ("guide/hand_eye_calibration.md", "Quick start", "Calibration", "hand_eye_calibration.py"),
        ),
    },
    "retargetingkit": {
        "name": "RetargetingKit",
        "tabs": (
            ("guide/hand_retargeting.md", "Use the Python API", "Hand", "hand.py"),
            ("guide/arm_retargeting.md", "Retarget an arm and hand", "Arm and hand", "arm_hand.py"),
            ("guide/humanoid_retargeting.md", "Use the Python API", "Humanoid", "humanoid.py"),
        ),
        "crops": {
            "xrobotoolkit-pico-fullbody-settings.jpeg": [640, 280, 790, 715],
            "vision-pro-tracking-streamer-start.jpg": [310, 270, 1060, 560],
        },
    },
    "graspkit": {"name": "GraspKit"},
}


def nav_files(docs: Path) -> list[dict]:
    files = []
    for group in yaml.safe_load((docs / "nav.yml").read_text()):
        runs = [(None, group.get("pages") or [])]
        runs += [(f["fold"], f["pages"]) for f in group.get("folds") or []]
        for fold, pages in runs:
            for page in pages:
                files.append(
                    {"group": group["group"], "src": page["file"], "id": page["id"], "sub": fold, "nav": page.get("nav")}
                )
    return files


def copy_images(kit: str, docs: Path, crops: dict) -> dict:
    images = {}
    for source in sorted((docs / "assets").rglob("*")):
        if not source.is_file() or source.suffix.lower() not in {".png", ".jpg", ".jpeg", ".webp"}:
            continue
        public = f"/assets/docs/{kit}/{source.relative_to(docs)}"
        dest = ROOT / public.lstrip("/")
        dest.parent.mkdir(parents=True, exist_ok=True)
        shutil.copyfile(source, dest)
        with Image.open(dest) as img:
            images[public] = {"size": img.size}
        if source.name in crops:
            images[public]["crop"] = crops[source.name]
    return images


def main() -> None:
    if len(sys.argv) != 3 or sys.argv[1] not in PROJECTS:
        sys.exit(f"usage: {sys.argv[0]} <{'|'.join(PROJECTS)}> path/to/repo")
    kit, project = sys.argv[1], PROJECTS[sys.argv[1]]
    repo = Path(sys.argv[2]).expanduser().resolve()
    docs, src = repo / "docs", repo / "src"
    for path in (docs / "nav.yml", src / kit):
        if not path.exists():
            sys.exit(f"not found: {path}")
    github = f"https://github.com/openrobokit/{kit}/"
    files = nav_files(docs)
    images = copy_images(kit, docs, project["crops"]) if "crops" in project else None
    conv = Converter(kit, github, {f["src"]: f["id"] for f in files}, images)
    conv.docs_dir = docs
    package = apimodel.load_package(kit, src)
    source = apimodel.Repo(src=src, github=github)
    groups = assemble(files, docs, conv, lambda name: apimodel.resolve(package, name, source, conv))
    splice(ROOT / "data" / "docs" / f"{kit}.js",
           f"// BEGIN GENERATED {kit} DOCS (scripts/import_docs.py)", f"// END GENERATED {kit} DOCS", groups)
    if "tabs" in project:
        splice_api_tabs(kit, project["name"], "scripts/import_docs.py", docs, conv, files, project["tabs"])


if __name__ == "__main__":
    main()
