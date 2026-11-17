#!/usr/bin/env python3
"""Markdown -> data/docs/<kit>.js conversion, shared by the per-kit importers.

Prose is copied word-for-word; only markup is translated to the site's .doc
classes. Links between imported docs become links to the built page
(/docs/<kit>/<id>/); anything else points at the source repo on GitHub.
"""

import ast
import html
import json
import re
import sys
from pathlib import Path, PurePosixPath

SITE = "https://openrobokit.com/"
ROOT = Path(__file__).resolve().parent.parent  # the site checkout
TASK_VIDEOS = {
    "ik": "bento/ik",
    "motion-planning": "tile/motion-planning",
    "hand-eye-calibration": "bento/calibration",
    "humanoid-retargeting": "bento/humanoid-retargeting",
    "hand-retargeting": "bento/hand-retargeting",
    "grasp-optimization": "tile/grasping-optimization",
}


def esc(s: str) -> str:
    return html.escape(s, quote=False)


# ---------------------------------------------------------------- placeholders
class Stash:
    def __init__(self):
        self.items = []

    def put(self, html_frag: str) -> str:
        self.items.append(html_frag)
        return f"\x00{len(self.items) - 1}\x01"

    def restore(self, s: str) -> str:
        # nested placeholders (math inside a list item, etc.)
        pat = re.compile("\x00(\\d+)\x01")
        while pat.search(s):
            s = pat.sub(lambda m: self.items[int(m.group(1))], s)
        return s


# ---------------------------------------------------------------- blocks
def code_block(lang: str, code: str, stash: Stash, imports: dict[str, str] | None = None) -> str:
    if lang == "mermaid":
        return stash.put(f'<div class="mermaid">{esc(code)}</div>')
    full, short = [], []
    hidden = False
    for line in code.split("\n"):
        marker = line.strip() if lang == "python" else ""
        if marker == "# docs: hide":
            if hidden:
                raise ValueError("nested # docs: hide")
            hidden = True
        elif marker == "# docs: endhide":
            if not hidden:
                raise ValueError("# docs: endhide without # docs: hide")
            hidden = False
        elif re.match(r"(?:>>>\s*)?#\s*xdoctest:", marker):
            continue
        else:
            full.append(line)
            if not hidden:
                short.append(line)
    if hidden:
        raise ValueError("unclosed # docs: hide")
    full, short = "\n".join(full).strip("\n"), "\n".join(short).strip("\n")
    if lang == "python" and full.lstrip().startswith(">>>"):
        from xdoctest.parser import DoctestParser

        full = "\n".join(
            line for part in DoctestParser().parse(full)
            if not isinstance(part, str) for line in part.exec_lines
        )
        tree = ast.parse(full)
        loaded = {node.id for node in ast.walk(tree) if isinstance(node, ast.Name) and isinstance(node.ctx, ast.Load)}
        defined = {node.id for node in ast.walk(tree) if isinstance(node, ast.Name) and isinstance(node.ctx, ast.Store)}
        defined.update(node.name for node in ast.walk(tree) if isinstance(node, (ast.FunctionDef, ast.ClassDef)))
        defined.update(alias.asname or alias.name.split(".")[0] for node in ast.walk(tree)
                       if isinstance(node, (ast.Import, ast.ImportFrom)) for alias in node.names)
        # A name a docstring example takes from its module's globals gets that global's import.
        merged = {}
        for name in sorted((loaded - defined) & (imports or {}).keys()):
            head, _, item = imports[name].partition(" import ") if imports[name].startswith("from ") else (imports[name], "", "")
            merged.setdefault(head, []).extend([item] if item else [])
        lines = [f"{head} import {', '.join(items)}" if items else head for head, items in merged.items()]
        if lines:
            full = "\n".join(sorted(lines, key=lambda line: line.startswith("from "))) + "\n\n" + full
    abbreviated = full != short
    toggle = (
        '<button type="button" class="code-toggle" data-code-toggle '
        'aria-expanded="false" aria-label="Show full code">Full</button>'
        if abbreviated else ""
    )
    source = "[data-code-full]" if abbreviated else "pre"
    complete = f'<pre data-code-full hidden>{esc(full)}</pre>' if abbreviated else ""
    label = lang or "text"
    return stash.put(
        '<div class="doc__code" data-copy-scope>'
        f'<div class="bar"><span style="color:var(--fg-dim)">{label}</span>'
        f'<span class="code-actions">{toggle}'
        f'<button type="button" class="copy copy--swap" data-copy-from="{source}" title="Copy">'
        '<span class="t"></span><span class="o"></span></button></span></div>'
        f'<pre>{esc(short)}</pre>{complete}</div>'
    )


LIST_RE = re.compile(r"^(\s*)(-|\d+\.)\s+(.*)$")
QUOTE_RE = re.compile(r"^\s*>\s?")
# GitHub alert marker on the first line of a blockquote: `> [!NOTE]`
ALERT_RE = re.compile(r"^\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]\s*$", re.I)
FENCE_RE = re.compile(r"^(\s*)```(\w*)\s*$")
MATH_RE = re.compile(r"^(\s*)\$\$\s*$")
# `::: pkg.mod.Symbol` on its own line: an API reference block, mkdocstrings
# style. The converter only marks the spot; whoever knows how to resolve the
# name fills it in.
API_RE = re.compile(r"^\s*:::\s+([A-Za-z_][\w.]*)\s*$")
# `=== "uv"` on its own line, each label followed by one block: a tab tray.
# Unlike mkdocs-material the bodies are not indented, so a fence stays a fence.
TAB_RE = re.compile(r'^\s*===\s+"(.+?)"\s*$')
IMAGE_RE = re.compile(r"^!\[([^\]]*)\]\(([^\s)]+)\)$")


class Converter:
    """Converts one docs tree; `doc_ids` maps source path -> item id for links."""

    def __init__(
        self, kit: str, github: str, doc_ids: dict[str, str], images: dict | None = None
    ):
        self.kit = kit
        self.github = github
        self.doc_ids = doc_ids
        self.rel = ""  # path of the doc being converted, for relative links
        self.api_refs: list[str] = []  # ":::" names seen in the last conversion
        self.docs_dir: Path | None = None  # source docs/ tree; relative images are copied from it
        self.images = images or {}
        self.example_imports: dict[str, str] = {}  # global name -> import, for API example copies

    # ------------------------------------------------------------ inline
    def resolve(self, target: str) -> str:
        """A link target, as a path relative to the docs root."""
        parts: list[str] = []
        for seg in (PurePosixPath(self.rel).parent / target).as_posix().split("/"):
            if seg in ("", "."):
                continue
            if seg == "..":
                if parts:
                    parts.pop()
            else:
                parts.append(seg)
        return "/".join(parts)

    def link(self, text: str, target: str) -> str:
        if target.startswith(("http://", "https://", "/", "#", "mailto:")):
            return f'<a class="inline" href="{target}">{text}</a>'
        path = target.split("#")[0]
        item_id = self.doc_ids.get(self.resolve(path))
        if item_id:
            fragment = "#" + target.split("#", 1)[1] if "#" in target else ""
            href = f"/docs/{self.kit}/{item_id}/{fragment}"
            return f'<a class="inline" href="{href}">{text}</a>'
        path = re.sub(r"^(\.\./)+", "", target)
        kind = "tree/main/" if target.endswith("/") else "blob/main/"
        return f'<a class="inline" href="{self.github}{kind}{path}">{text}</a>'

    def _media_src(self, src: str) -> str:
        # Relative media stays in the source repo; importing only rewrites its URL.
        if not src.startswith(("http://", "https://", "/")):
            rel = self.resolve(src)
            if self.docs_dir and (self.docs_dir / rel).is_file():
                src = f"/assets/docs/{self.kit}/{rel}"
            else:
                src = f"{self.github}raw/main/docs/{rel}"
        return src.replace(SITE, "/", 1)

    def image(self, alt: str, src: str) -> str:
        # site-hosted posters become their clip when the site has one
        src = self._media_src(src)
        clip = re.sub(r"^/assets/images/(.*)\.webp$", r"/assets/videos/\1.mp4", src)
        task = re.fullmatch(r"/assets/docs/robokit/assets/built-in-tasks/([^/]+)\.webp", src)
        if task and task[1] in TASK_VIDEOS:
            clip = f"/assets/videos/robokit/{TASK_VIDEOS[task[1]]}.mp4"
        if clip != src and (ROOT / clip.lstrip("/")).is_file():
            return f'<video src="{clip}" poster="{src}" autoplay muted loop playsinline></video>'
        return f'<img src="{src}" alt="{alt}">'

    def quote_block(self, lines: list[str]) -> str:
        """`> ...` lines: a GitHub alert when the first line is `[!TYPE]`, else a blockquote."""
        inner = [QUOTE_RE.sub("", l) for l in lines]
        kind = ""
        m = ALERT_RE.match(inner[0].strip())
        if m:
            kind = m.group(1).lower()
            inner = inner[1:]
        refs = self.api_refs  # fragment() resets these; keep the outer ones
        body = self.fragment("\n".join(inner), self.rel)
        refs.extend(self.api_refs)
        self.api_refs = refs
        if not kind:
            return f"<blockquote>{body}</blockquote>"
        return (
            f'<div class="doc-note doc-note--{kind}">'
            f'<div class="doc-note__title">{kind.capitalize()}</div>{body}</div>'
        )

    def figure(self, caption: str, target: str) -> str:
        """Render a documentation image, optionally framed to its relevant UI."""
        meta = self.images[target]
        width, height = meta["size"]
        style = ""
        media_class = "doc-figure__media"
        if "crop" in meta:
            x, y, crop_width, crop_height = meta["crop"]
            media_class += " doc-figure__media--focused"
            style = (
                f' style="aspect-ratio:{crop_width}/{crop_height};'
                f"--image-width:{width / crop_width * 100:.4f}%;"
                f"--image-left:{-x / crop_width * 100:.4f}%;"
                f'--image-top:{-y / crop_height * 100:.4f}%"'
            )
        return (
            '<figure class="doc-figure">'
            f'<a class="doc-figure__link" href="{html.escape(target, quote=True)}" '
            'target="_blank" rel="noopener" title="Open full-size image">'
            f'<span class="{media_class}"{style}>'
            f'<img src="{html.escape(target, quote=True)}" alt="{html.escape(caption, quote=True)}" '
            f'width="{width}" height="{height}" decoding="async"></span></a>'
            f'<figcaption>{esc(caption)} <a href="{html.escape(target, quote=True)}" '
            'target="_blank" rel="noopener">Open image ↗</a></figcaption></figure>'
        )

    def inline(self, text: str, stash: Stash) -> str:
        # keep tree glyphs glued to what follows (└─ `X` must not wrap)
        text = text.replace("└─ ", "└─ ")
        # protect code spans, then math, then escape the rest
        text = re.sub(
            r"`([^`]+)`", lambda m: stash.put(f"<code>{esc(m.group(1))}</code>"), text
        )
        text = re.sub(
            r"\$([^$]+?)\$", lambda m: stash.put(f"${esc(m.group(1))}$"), text
        )
        text = re.sub(
            r"<(https?://[^<>\s]+)>",
            lambda m: stash.put(self.link(esc(m.group(1)), m.group(1))),
            text,
        )
        text = esc(text)
        text = re.sub(
            r"!\[([^\]]*)\]\(([^)\s]+)\)",
            lambda m: stash.put(self.image(m.group(1), m.group(2))),
            text,
        )
        text = re.sub(
            r"\[([^\]]+)\]\(([^)]+)\)",
            lambda m: self.link(m.group(1), m.group(2)),
            text,
        )
        text = re.sub(r"\*\*(.+?)\*\*", r"<strong>\1</strong>", text)
        text = re.sub(r"(?<![\w*])\*([^*\n]+?)\*(?![\w*])", r"<em>\1</em>", text)
        return text

    def table_block(self, lines: list[str], stash: Stash) -> str:
        def cells(line):
            return [c.strip() for c in line.strip().strip("|").split("|")]

        head = cells(lines[0])
        rows = [cells(l) for l in lines[2:]]
        thead = "".join(f"<th>{self.inline(c, stash)}</th>" for c in head)
        body = "".join(
            "<tr>" + "".join(f"<td>{self.inline(c, stash)}</td>" for c in r) + "</tr>"
            for r in rows
        )
        # the media grid lays a table out by its own column count, not a fixed 3
        return (
            f'<table class="doc-table" style="--cols:{len(head)}"><thead><tr>{thead}</tr></thead>'
            f"<tbody>{body}</tbody></table>"
        )

    # ------------------------------------------------------------ document
    def convert(self, md: str, rel: str = "") -> tuple[str, str]:
        """Returns (title, body_html) for one markdown file."""
        lines = md.split("\n")
        title = ""
        rest = lines  # no H1: the whole file is body
        for i, l in enumerate(lines):
            if l.startswith("# "):
                title = l[2:].strip()
                rest = lines[i + 1 :]
                break
        return title, self.fragment("\n".join(rest), rel)

    def fragment(self, md: str, rel: str = "") -> str:
        """Converts a headless chunk -- one docstring section -- to body HTML."""
        self.rel = rel
        self.api_refs: list[str] = []
        stash = Stash()
        rest = md.split("\n")

        # pass 1: pull out fences and display math, line-based
        flat = []
        i = 0
        while i < len(rest):
            l = rest[i]
            mf = FENCE_RE.match(l)
            mm = MATH_RE.match(l)
            if mf:
                indent, lang = mf.groups()
                buf = []
                i += 1
                while i < len(rest) and not FENCE_RE.match(rest[i]):
                    buf.append(
                        rest[i][len(indent) :]
                        if rest[i].startswith(indent)
                        else rest[i]
                    )
                    i += 1
                i += 1
                flat.append(("block", code_block(lang, "\n".join(buf), stash, self.example_imports)))
            elif l.lstrip().startswith(">>> "):
                buf = []
                while i < len(rest) and rest[i].strip():
                    buf.append(rest[i].strip())
                    i += 1
                flat.append(("block", code_block("python", "\n".join(buf), stash, self.example_imports)))
            elif mm:
                indent = mm.group(1)
                buf = []
                i += 1
                while i < len(rest) and not MATH_RE.match(rest[i]):
                    buf.append(rest[i].strip())
                    i += 1
                i += 1
                ph = stash.put("$$" + esc("\n".join(buf)) + "$$")
                flat.append(("line", indent + ph))
            else:
                flat.append(("line", l))
                i += 1

        # pass 2: structure
        out = []
        para: list[str] = []
        lists: list[tuple[int, str]] = []  # (indent, 'ul'|'ol') stack

        def flush_para():
            if para:
                out.append(f"<p>{self.inline(' '.join(para), stash)}</p>")
                para.clear()

        def close_all_lists():
            while lists:
                out.append(f"</li></{lists.pop()[1]}>")

        j = 0
        while j < len(flat):
            kind, l = flat[j]
            j += 1
            if kind == "block":
                flush_para()
                close_all_lists()
                out.append(l)
                continue

            s = l.strip()
            ml = LIST_RE.match(l)
            ma = API_RE.match(l)
            mi = IMAGE_RE.match(s)
            if mi and self._media_src(mi.group(2)) in self.images:
                flush_para()
                close_all_lists()
                out.append(self.figure(mi.group(1), self._media_src(mi.group(2))))
                continue
            if ma:
                flush_para()
                close_all_lists()
                self.api_refs.append(ma.group(1))
                out.append(f'<div data-api="{ma.group(1)}"></div>')
                continue
            if (mt := TAB_RE.match(l)) and j < len(flat) and flat[j][0] == "block":
                flush_para()
                close_all_lists()
                tabs = []
                while mt and j < len(flat) and flat[j][0] == "block":
                    tabs.append((mt.group(1), flat[j][1]))
                    j += 1
                    mt = TAB_RE.match(flat[j][1]) if j < len(flat) else None
                    j += 1 if mt else 0
                out.append('<div class="doc-tabs"><div class="tabs">')
                for k, (label, _) in enumerate(tabs):
                    cls = ' class="is-active"' if k == 0 else ""
                    out.append(
                        f"<button type=\"button\"{cls}>{self.inline(label, stash)}</button>"
                    )
                out.append("</div>")
                for k, (_, body) in enumerate(tabs):
                    cls = " is-active" if k == 0 else ""
                    out.append(f'<div class="doc-tabs__pane{cls}">{body}</div>')
                out.append("</div>")
                continue
            if not s:
                flush_para()
                close_all_lists()
            elif block := re.match(r"<(table|video)(?:\s|>)", s):
                flush_para()
                close_all_lists()
                markup = [l]
                while f"</{block[1]}>" not in markup[-1] and j < len(flat):
                    markup.append(flat[j][1])
                    j += 1
                fragment = "\n".join(markup)
                if block[1] == "video":
                    fragment = re.sub(
                        r'''(?<=\s)(src|poster)=(["'])(.*?)\2''',
                        lambda m: f"{m[1]}={m[2]}{self._media_src(m[3])}{m[2]}",
                        fragment,
                    )
                out.append(fragment)
            elif s.startswith("<") and re.match(r"^</?(details|summary)", s):
                flush_para()
                close_all_lists()
                out.append(s)
            elif s.startswith(">"):
                flush_para()
                close_all_lists()
                quote = [l]
                while (
                    j < len(flat)
                    and flat[j][0] == "line"
                    and flat[j][1].strip().startswith(">")
                ):
                    quote.append(flat[j][1])
                    j += 1
                out.append(self.quote_block(quote))
            elif s.startswith("#"):
                flush_para()
                close_all_lists()
                level = len(s) - len(s.lstrip("#"))
                tag = {2: "h3", 3: "h4"}.get(level, "h5")
                out.append(
                    f"<{tag}>{self.inline(s.lstrip('#').strip(), stash)}</{tag}>"
                )
            elif s.startswith("|"):
                flush_para()
                close_all_lists()
                tbl = [l]
                while (
                    j < len(flat)
                    and flat[j][0] == "line"
                    and flat[j][1].strip().startswith("|")
                ):
                    tbl.append(flat[j][1])
                    j += 1
                out.append(self.table_block(tbl, stash))
            elif ml:
                flush_para()
                indent = len(ml.group(1))
                tag = "ol" if ml.group(2) != "-" else "ul"
                if not lists or indent > lists[-1][0]:
                    out.append(f"<{tag}><li>")
                    lists.append((indent, tag))
                else:
                    while len(lists) > 1 and indent < lists[-1][0]:
                        out.append(f"</li></{lists.pop()[1]}>")
                    out.append("</li><li>")
                out.append(self.inline(ml.group(3), stash))
            elif lists:
                # lazy continuation: a blank line is what ends an item, so any
                # prose line while a list is open belongs to the current item
                out.append(" " + self.inline(s, stash))
            else:
                para.append(s)

        flush_para()
        close_all_lists()
        return stash.restore("".join(out))


# ---------------------------------------------------------------- assemble
def assemble(files: list[dict], src: Path, conv: Converter, resolve=None) -> list[dict]:
    """files: dicts with group/src/id and optional nav/h/sub. -> data/docs/<kit>.js groups.

    `resolve(name)` is called for every `::: name` the document used, and its
    results ride along on the item as `api`, keyed by name; apihtml.py fills
    the matching placeholders in. Without it, a `:::` line renders as nothing.
    """
    groups: dict[str, list] = {}
    order: list[str] = []
    for f in files:
        title, body = conv.convert((src / f["src"]).read_text(), f["src"])
        title = title.replace("`", "")
        api = {name: resolve(name) for name in conv.api_refs} if resolve else {}
        if f["group"] not in groups:
            groups[f["group"]] = []
            order.append(f["group"])
        item = {
            "id": f["id"],
            "nav": f.get("nav") or title,
            "h": f.get("h") or title or f.get("nav") or "",
            "body": body,
        }
        if f.get("sub"):
            item["sub"] = f["sub"]  # nested as a fold group in the sidebar
        if api:
            item["api"] = api
        groups[f["group"]].append(item)
        print(f"  {f['src']} -> {f['id']} ({item['h']})")
    return [{"name": g, "items": groups[g]} for g in order]


def splice(data_path: Path, begin: str, end: str, js_groups: list[dict]) -> None:
    """Replaces everything between the begin/end markers in the kit's file."""
    payload = (
        ",\n".join(json.dumps(g, ensure_ascii=False, indent=2) for g in js_groups) + ","
    )
    data = data_path.read_text()
    if begin not in data or end not in data:
        sys.exit(f"markers not found in {data_path}")
    pre, tail = data.split(begin, 1)
    _, post = tail.split(end, 1)
    data_path.write_text(pre + begin + "\n" + payload + "\n" + end + post)
    print(f"wrote {data_path}")


def splice_api_tabs(kit: str, name: str, script: str, docs: Path, conv: Converter, files: list[dict],
                    examples: tuple[tuple[str, str, str, str], ...]) -> list[dict]:
    """Replaces a kit's landing-page API tabs with the first Python example that solves under each guide heading.

    Each tab shows the short example and copies the complete one, so the landing page runs what the guides test.
    `examples` lists `(page, heading, tab label, tab file name)`.
    """
    tabs = []
    for page, heading, label, filename in examples:
        section = (docs / page).read_text().split(f"## {heading}\n", 1)[1]
        fence = next((f for f in re.findall(r"```python\n.*?\n```", section, re.DOTALL) if ".solve" in f), None)
        if not fence:
            raise ValueError(f"No Python example that solves in {page}: {heading}")
        blocks = re.findall(r"<pre[^>]*>(.*?)</pre>", conv.fragment(fence), re.DOTALL)
        short, full = html.unescape(blocks[0]), html.unescape(blocks[-1])
        doc = next(file["id"] for file in files if file["src"] == page)
        tabs.append({"label": label, "file": filename, "doc": doc,
                     "lines": [{"text": line} for line in short.splitlines()], "fullCode": full})
    projects = ROOT / "data" / "projects.js"
    generated = "\n".join("        " + json.dumps(tab, ensure_ascii=False) + "," for tab in tabs)
    text, count = re.subn(
        rf"(\n  {kit}: \{{\n.*?\n    api: \{{\n.*?\n      tabs: \[).*?(\n      \],\n    \}},)",
        lambda match: f"{match[1]}\n        // Generated from {name} guide examples by {script}.\n{generated}{match[2]}",
        projects.read_text(), count=1, flags=re.DOTALL,
    )
    if count != 1:
        raise ValueError(f"{name} project API tabs not found")
    projects.write_text(text)
    return tabs
