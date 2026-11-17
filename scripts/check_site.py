"""Build and validate the site without changing its source files."""

import hashlib
import json
import re
import subprocess
import sys
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urljoin, urlsplit

ROOT = Path(__file__).resolve().parent.parent
SITE = ROOT / "_page"
LOCAL = "https://site.invalid"
# The site is public. Private repos and paths, buckets, machine paths and SSH remotes must
# never reach it, whichever importer or page they arrive through. Written generically so
# this public file names none of them.
INTERNAL = re.compile(r"[-_]internal\b|s3://\w|git\+ssh://|git@github\.com:|/disk\d+/|/home/\w")
TEXT = {".html", ".js", ".json", ".css", ".svg", ".txt", ".xml", ".md"}


class Page(HTMLParser):
    def __init__(self, text):
        super().__init__()
        self.ids = set()
        self.links = []
        self.api_slots = []
        self.feed(text)

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if attrs.get("id"):
            self.ids.add(attrs["id"])
        if attrs.get("data-api"):
            self.api_slots.append(attrs["data-api"])
        for name in ("href", "src", "poster"):
            if attrs.get(name):
                self.links.append(attrs[name])


def validate(site):
    pages = {
        path: Page(path.read_text(encoding="utf-8"))
        for path in site.rglob("*.html")
    }
    errors = []
    if site / "index.html" not in pages:
        errors.append("missing landing page")
    for path, page in pages.items():
        rel = path.relative_to(site).as_posix()
        if page.api_slots:
            errors.append(f"{rel}: unresolved API reference blocks")
        for link in page.links:
            url = urlsplit(urljoin(f"{LOCAL}/{rel}", link))
            if f"{url.scheme}://{url.netloc}" != LOCAL:
                continue
            target = (site / unquote(url.path).lstrip("/")).resolve()
            if not target.is_relative_to(site.resolve()):
                errors.append(f"{rel}: link escapes site: {link}")
                continue
            if target.is_dir():
                target /= "index.html"
            if not target.is_file():
                errors.append(f"{rel}: missing target {link}")
            elif url.fragment and target in pages and target.is_relative_to(site / "docs"):
                if unquote(url.fragment) not in pages[target].ids:
                    errors.append(f"{rel}: missing anchor {link}")

    index = json.loads((site / "data" / "search.json").read_text(encoding="utf-8"))
    documents = {
        path.parent.relative_to(site / "docs").as_posix(): page
        for path, page in pages.items()
        if path.is_relative_to(site / "docs") and "doc-body" in page.ids
    }
    if not documents:
        errors.append("no rendered documentation pages")
    if index.keys() != documents.keys():
        errors.append(f"search/page mismatch: {sorted(index.keys() ^ documents.keys())}")
    for key, value in index.items():
        if not isinstance(value, str) or not value.strip():
            errors.append(f"empty search text: {key}")
    for path in sorted(site.rglob("*")):
        if path.suffix in TEXT and path.is_file():
            for hit in sorted(set(INTERNAL.findall(path.read_text(encoding="utf-8", errors="replace")))):
                errors.append(f"{path.relative_to(site).as_posix()}: internal reference {hit!r}")
    for name in ("data/docs", "scripts", "README.md", "Makefile", ".git", ".github"):
        if (site / name).exists():
            errors.append(f"build input copied into site: {name}")
    if errors:
        raise ValueError("\n".join(sorted(set(errors))))
    print(f"Checked {len(pages)} HTML files and {len(documents)} search entries")


def manifest(root, paths):
    return {
        str(path.relative_to(root)): hashlib.sha256(path.read_bytes()).hexdigest()
        if path.is_file() else None
        for path in paths
    }


def source_manifest():
    names = subprocess.check_output(
        ["git", "ls-files", "-z", "--cached", "--others", "--exclude-standard"],
        cwd=ROOT,
    ).decode().split("\0")
    return manifest(ROOT, [ROOT / name for name in names if name])


def main():
    before = source_manifest()
    subprocess.run(["make", "site"], cwd=ROOT, check=True)
    validate(SITE)
    first = manifest(SITE, SITE.rglob("*"))
    subprocess.run(["make", "site"], cwd=ROOT, check=True)
    if first != manifest(SITE, SITE.rglob("*")):
        raise ValueError("site output differs between builds")
    if before != source_manifest():
        raise ValueError("building changed source files")
    print("Builds are identical; source files are unchanged")


if __name__ == "__main__":
    try:
        main()
    except (ValueError, OSError, subprocess.CalledProcessError) as error:
        sys.exit(str(error))
