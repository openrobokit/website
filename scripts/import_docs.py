# /// script
# requires-python = ">=3.10"
# dependencies = ["griffe>=2,<3", "pyyaml>=6,<7", "xdoctest>=1.3,<2"]
# ///
"""Import RoboKit docs (md) into data/docs/robokit.js, verbatim.

Splices generated groups between the BEGIN/END markers in data/docs/robokit.js. Prose
is copied word-for-word; only markup is translated to the site's .doc classes
(see md2doc.py).

The sidebar comes from `docs/nav.yml` in the source repo, so which pages are
published and in what order travels with the docs rather than living here.

A page selects API reference blocks the way mkdocstrings does -- a line of
`::: robokit.opt.GDOptimizer` -- so what gets published, and in what order,
is decided in Markdown next to the prose. Those names are read out of the
source with griffe (see apimodel.py).

    uv run scripts/import_docs.py [--project robokit|graspkit] [path/to/repo]
"""

import json
import re
import sys
from pathlib import Path

import yaml

sys.path.insert(0, str(Path(__file__).resolve().parent))

import apimodel  # noqa: E402
from md2doc import Converter, assemble, splice, splice_api_tabs  # noqa: E402

PROJECTS = {
    "robokit": {
        "repo": "~/code/library/robokit",
        "github": "https://github.com/openrobokit/robokit/",
        "package": "robokit",
        "begin": "// BEGIN GENERATED DOCS (tools/import_docs.py)",
        "end": "// END GENERATED DOCS",
    },
    "graspkit": {
        "repo": "~/code/manip/graspkit",
        "github": "https://github.com/openrobokit/graspkit/",
        "package": "graspkit",
        "begin": "// BEGIN GENERATED graspkit DOCS (scripts/import_docs.py)",
        "end": "// END GENERATED graspkit DOCS",
    },
}


def main():
    args = sys.argv[1:]
    kit = "robokit"
    if args and args[0] == "--project":
        kit, args = args[1], args[2:]
    if kit not in PROJECTS:
        sys.exit(f"unknown project: {kit}\nusage: {sys.argv[0]} [--project {'|'.join(PROJECTS)}] [path/to/repo]")
    project = PROJECTS[kit]
    repo = Path(args[0] if args else project["repo"]).expanduser().resolve()
    src, source = repo / "docs", repo / "src"
    if not src.is_dir():
        sys.exit(f"docs not found: {src}\nusage: {sys.argv[0]} [--project {kit}] [path/to/repo]")
    if not (source / project["package"]).is_dir():
        sys.exit(f"source not found: {source / project['package']}")
    nav_path = src / "nav.yml"
    if not nav_path.is_file():
        sys.exit(f"nav not found: {nav_path}")
    files = []
    for group in yaml.safe_load(nav_path.read_text()):
        runs = [(None, group.get("pages") or [])]
        runs += [(f["fold"], f["pages"]) for f in group.get("folds") or []]
        for fold, pages in runs:
            for page in pages:
                files.append(
                    {"group": group["group"], "src": page["file"], "id": page["id"], "sub": fold, "nav": page.get("nav")}
                )
    conv = Converter(kit, project["github"], {f["src"]: f["id"] for f in files})
    conv.docs_dir = src
    repo_src = apimodel.Repo(src=source, github=project["github"])
    package = apimodel.load_package(project["package"], source)
    splice(
        Path(__file__).resolve().parent.parent / "data" / "docs" / f"{kit}.js",
        project["begin"],
        project["end"],
        assemble(files, src, conv, lambda name: apimodel.resolve(package, name, repo_src, conv)),
    )
    if kit == "robokit":
        tabs = splice_api_tabs(kit, "RoboKit", "scripts/import_docs.py", src, conv, files, (
            ("guide/ik.md", "Batch IK", "Inverse kinematics", "ik.py"),
            ("guide/motion_planning.md", "Basic Example", "Motion planning", "motion_planning.py"),
            ("guide/hand_retargeting.md", "Online Retargeting", "Hand retargeting", "hand_retargeting.py"),
            ("guide/humanoid_retargeting.md", "Online Retargeting", "Humanoid retargeting", "humanoid_retargeting.py"),
            ("guide/hand_eye_calibration.md", "Quick start", "Calibration", "hand_eye_calibration.py"),
        ))
        projects = Path(__file__).resolve().parent.parent / "data" / "projects.js"
        text = projects.read_text()
        # The hidden legacy modules section shares the same IK example.
        text = re.sub(r"(        codeFile: 'examples/ik/basic.py',\n        codeLines: )\[.*?\],(?=\n      \},)",
                      lambda match: match[1] + json.dumps(tabs[0]["lines"], ensure_ascii=False) + ",",
                      text, count=1, flags=re.DOTALL)
        projects.write_text(text)


if __name__ == "__main__":
    main()
