# /// script
# requires-python = ">=3.10"
# ///
"""data/docs/*.js -> one static HTML page per document, plus a search index.

The docs used to be a single-page app: a 48-line shell that fetched the whole
1.2 MB corpus and rendered whichever page the query string named. Every reader
paid for every page, deep links rendered nothing until the script ran, and the
Back button had to be emulated.

So the rendering happens here instead. Each document becomes
`_page/docs/<kit>/<id>/index.html`, complete with its sidebar, breadcrumb, rail and
prev/next links, and the browser is left with the things that genuinely need
one: syntax highlighting, copy buttons, the scroll-spy rail, and search.

Search reads `data/search.json`, which is fetched only once someone actually
types -- 51 KB gzipped against the 115 KB the old page loaded every time.

    uv run scripts/build_docs.py
"""

import html
import json
import re
import shutil
import subprocess
import sys
from pathlib import Path
from urllib.parse import parse_qs, urlsplit

sys.path.insert(0, str(Path(__file__).resolve().parent))

import apihtml  # noqa: E402

ROOT = Path(__file__).resolve().parent.parent
DATA = ROOT / "data" / "docs"
OUT = ROOT / "_page" / "docs"
INDEX = ROOT / "_page" / "data" / "search.json"

SITE_JS = ROOT / "assets" / "js" / "site.js"
BRAND = "OpenRoboKit"
VERSION = "v0.1.0 · MIT"


def kit_names() -> dict[str, str]:
    """Display names, read from the RK_NAMES literal the nav is built from.

    The browser and this renderer must call a kit the same thing, so site.js
    stays the single authority and the build parses it rather than repeating it.
    """
    block = re.search(r"window\.RK_NAMES = \{(.*?)\}", SITE_JS.read_text(), re.S)
    if not block:
        raise SystemExit(f"no RK_NAMES literal in {SITE_JS}")
    names = dict(re.findall(r"(\w+):\s*'([^']+)'", block.group(1)))
    if not names:
        raise SystemExit(f"RK_NAMES in {SITE_JS} is empty")
    return names


NAMES = kit_names()
KITS = list(NAMES)

# kept verbatim from the old renderer so the chevron and tick do not shift
CHEV_SVG = (
    '<svg class="chev" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6">'
    '<path d="m4 6 4 4 4-4" stroke-linecap="round" stroke-linejoin="round"/></svg>'
)
TICK_SVG = (
    '<svg class="tick" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8">'
    '<path d="m3.5 8.5 3 3 6-7" stroke-linecap="round" stroke-linejoin="round"/></svg>'
)
FOLD_SVG = (
    '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6">'
    '<path d="m6 4 4 4-4 4" stroke-linecap="round" stroke-linejoin="round"/></svg>'
)
RAIL_HEAD = """<div class="rail__head">
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M2.5 4h11M2.5 8h7M2.5 12h9" stroke-linecap="round"/></svg>
  <span>On this page</span>
</div>"""


def esc(s) -> str:
    return html.escape("" if s is None else str(s), quote=False)


def attr(s) -> str:
    return html.escape("" if s is None else str(s), quote=True)


def text_of(fragment: str) -> str:
    """What `.textContent` would have returned for a run of HTML."""
    return html.unescape(re.sub(r"<[^>]*>", " ", fragment)).strip()


def slug(s: str) -> str:
    return re.sub(r"^-|-$", "", re.sub(r"[^a-z0-9]+", "-", str(s).lower()))


def load_docs() -> dict:
    """Each kit owns one file under data/docs/, so two importers never touch the
    same path. They are JS assignments with template literals, so node reads
    them; sorted, because the sidebar order must not depend on the filesystem."""
    files = sorted(DATA.glob("*.js"))
    if not files:
        sys.exit(f"no documentation corpus in {DATA}")
    reads = "".join(
        f"new Function(fs.readFileSync({json.dumps(str(f))},'utf8'))();" for f in files
    )
    script = (
        "const fs=require('fs');global.window={};" + reads +
        "process.stdout.write(JSON.stringify(window.RK_DOCS));"
    )
    try:
        out = subprocess.run(
            ["node", "-e", script], capture_output=True, text=True, check=True
        ).stdout
    except FileNotFoundError:
        sys.exit("node is required to read the data/docs corpus")
    except subprocess.CalledProcessError as e:
        sys.exit(f"could not read {DATA}:\n{e.stderr}")
    return json.loads(out)


def groups_of(doc: dict) -> list[dict]:
    """The hand-written and generated pages are spliced in as separate blocks, so
    one section can arrive as more than one group; the sidebar shows one heading."""
    merged: list[dict] = []
    for g in doc.get("groups") or []:
        found = next((m for m in merged if m["name"] == g.get("name")), None)
        if found:
            found["items"] += list(g.get("items") or [])
        else:
            merged.append({"name": g.get("name"), "items": list(g.get("items") or [])})
    return merged


def pages_of(doc: dict) -> list[dict]:
    out = []
    for g in groups_of(doc):
        for it in g["items"]:
            out.append({**it, "group": g["name"]})
    return out


def with_ids(body: str) -> str:
    return re.sub(
        r"<h3>([\s\S]*?)</h3>",
        lambda m: f'<h3 id="{attr(slug(text_of(m.group(1))))}">{m.group(1)}</h3>',
        body,
    )


def href_of(kit: str, page_id: str) -> str:
    return f"/docs/{kit}/{page_id}/"


def static_body(body: str, kit: str) -> str:
    """Adapt older imported HTML to static links and the shared copy control."""
    def link(match):
        url = urlsplit(html.unescape(match.group(1)))
        query = parse_qs(url.query)
        project = (query.get("project") or query.get("kit") or [kit])[0]
        target = href_of(project, query["id"][0]) if "id" in query else f"/docs/{project}/"
        if url.fragment:
            target += f"#{url.fragment}"
        return f'href="{attr(target)}"'

    body = re.sub(r'href="(/docs/\?[^"]*)"', link, body)
    body = body.replace('<div class="doc__code">', '<div class="doc__code" data-copy-scope>')
    return re.sub(
        r'<span class="copy"(?:\s[^>]*)?>[^<]*</span>',
        '<button type="button" class="copy copy--swap" data-copy-from="pre" title="Copy" aria-label="Copy code">'
        '<span class="t"></span><span class="o"></span></button>',
        body,
    )


# ---------------------------------------------------------------- fragments
def kitpick(kit: str) -> str:
    rows = "".join(
        f'<a href="/docs/{k}/" class="{"is-active" if k == kit else ""}">\n'
        f'        <span class="nm">{esc(NAMES[k])}</span>{TICK_SVG if k == kit else ""}\n'
        f"      </a>"
        for k in KITS
    )
    return (
        f'\n    <span class="kitpick__label">Project</span>\n'
        f'    <button class="kitpick__btn" aria-haspopup="listbox">\n'
        f'      <span class="nm">{esc(NAMES[kit])}</span>{CHEV_SVG}\n'
        f"    </button>\n"
        f'    <div class="kitpick__menu" role="listbox">\n'
        f"      {rows}\n"
        f"    </div>"
    )


def sidebar(kit: str, doc: dict, current: dict) -> str:
    """Plain items, with sub-runs (Terms / Optimizers) as fold groups.

    A run starts folded unless it holds the page being read; from there the
    reader owns it, and searching forces every run open while the query stands.
    """
    out = []
    for g in groups_of(doc):
        blocks: list = []
        run = None
        for it in g["items"]:
            active = " is-active" if it["id"] == current["id"] else ""
            row = (
                f'<a href="{href_of(kit, it["id"])}" data-id="{attr(it["id"])}"'
                f' class="{active.strip()}">{esc(it.get("nav"))}</a>'
            )
            if not it.get("sub"):
                run = None
                blocks.append(f'<div class="side__list">{row}</div>')
                continue
            if not run or run["sub"] != it["sub"]:
                run = {
                    "sub": it["sub"],
                    "key": f'{g["name"]}·{it["sub"]}',
                    "open": current.get("sub") == it["sub"],
                    "rows": [],
                }
                blocks.append(run)
            run["rows"].append(row)
        if not blocks:
            continue
        body = "".join(
            b
            if isinstance(b, str)
            else (
                f'\n      <div class="side__sub{"" if b["open"] else " is-folded"}"'
                f' data-fold="{attr(b["key"])}">\n'
                f'        <span>{esc(b["sub"])}</span>\n'
                f"        {FOLD_SVG}\n"
                f"      </div>\n"
                f'      <div class="side__subitems">{"".join(b["rows"])}</div>'
            )
            for b in blocks
        )
        out.append(
            f'<div class="side__group"><h4>{esc(g["name"])}</h4>'
            f'<div class="side__list">{body}</div></div>'
        )
    return "".join(out)


def rail(toc: list[dict]) -> str:
    """The reader has not scrolled yet, so no row is active and no members show."""
    if len(toc) < 2:
        return ""
    rows = "".join(f'<a href="{attr(h["href"])}">{esc(h["text"])}</a>' for h in toc)
    return f'{RAIL_HEAD}<div class="rail__list">{rows}</div>'


def prevnext(kit: str, prev, nxt) -> str:
    out = ""
    if prev:
        out += (
            f'<a href="{href_of(kit, prev["id"])}"><span class="lbl">← Previous</span>'
            f'<span class="nm">{esc(prev.get("nav"))}</span></a>'
        )
    if nxt:
        out += (
            f'<a class="next" href="{href_of(kit, nxt["id"])}">'
            f'<span class="lbl">Next →</span><span class="nm">{esc(nxt.get("nav"))}</span></a>'
        )
    return out


def toc_of(body: str, item: dict) -> list[dict]:
    if item.get("api"):
        return apihtml.toc(item["body"], item["api"])
    return [
        {"text": text_of(m.group(2)), "href": f"#{m.group(1)}"}
        for m in re.finditer(r'<h3 id="([^"]*)">([\s\S]*?)</h3>', body)
    ]


# ---------------------------------------------------------------- page
HEAD = """<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>{title}</title>
  <meta name="description" content="{lede}" />
  <link rel="canonical" href="https://openrobokit.com{href}" />
  <link rel="icon" type="image/svg+xml" href="/assets/brand/gear/robokit-ucsd.svg" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Archivo:wght@500;600;700&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" />
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" />
  <link rel="stylesheet" href="/assets/css/site.css?v=20261013-polish1" />
  <link rel="stylesheet" href="/assets/css/docs.css?v=20261012-runnable-code" />
  <script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js"></script>
  <script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/contrib/auto-render.min.js"></script>
  <script type="module" src="/assets/js/docs-mermaid.js"></script>
</head>
<body>
"""

SEARCH_BOX = """      <div class="search">
        <svg viewBox="0 0 16 16" fill="none" stroke="#8A8478" stroke-width="1.5" style="width:14px;height:14px;flex:none"><circle cx="7" cy="7" r="4.5"/><path d="m10.4 10.4 3.1 3.1" stroke-linecap="round"/></svg>
        <input id="search" placeholder="Search..." aria-label="Search documentation" />
        <span class="kbd">⌘K</span>
      </div>"""


def page(kit: str, doc: dict, items: list[dict], i: int) -> str:
    item = items[i]
    body = static_body(apihtml.hydrate(with_ids(item["body"]), item.get("api")), kit)
    toc = toc_of(body, item)
    crumb = f'<span>{esc(item["group"])}</span>'
    if item.get("sub"):
        crumb += f'<span class="slash">/</span><span>{esc(item["sub"])}</span>'
    head = HEAD.format(
        title=attr(f'{item.get("h")} · {NAMES[kit]} docs · {BRAND}'),
        lede=attr(doc.get("lede", "")),
        href=href_of(kit, item["id"]),
    )
    return (
        head
        + '  <div class="grid">\n'
        + '    <aside class="side">\n'
        + '      <button type="button" class="docs-menu" id="docs-menu" aria-expanded="false" aria-controls="docs-nav">'
        'Browse documentation <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="m4 6 4 4 4-4"/></svg></button>\n'
        + '      <div class="docs-nav" id="docs-nav">\n'
        + SEARCH_BOX
        + "\n"
        + f'      <div class="kitpick" id="kitpick">{kitpick(kit)}</div>\n'
        + f'      <div id="side-groups">{sidebar(kit, doc, item)}</div>\n'
        + f'      <div class="side__foot" id="side-foot">{esc(kit)} · {VERSION}</div>\n'
        + "      </div>\n"
        + "    </aside>\n\n"
        + '    <div class="card">\n'
        + '      <article class="doc">\n'
        + '        <div class="doc__head">\n'
        + f'          <div class="crumb" id="crumb">{crumb}</div>\n'
        + '          <button type="button" class="copy-page copy--swap" data-copy-from="#doc-body" title="Copy page" aria-label="Copy page">'
        '<span class="t"></span><span class="o"></span></button>\n'
        + "        </div>\n"
        + f'        <h1 id="doc-h">{esc(item.get("h"))}</h1>\n'
        + f'        <div class="doc-body" id="doc-body">{body}</div>\n'
        + f'        <div class="prevnext" id="prevnext">{prevnext(kit, items[i - 1] if i else None, items[i + 1] if i + 1 < len(items) else None)}</div>\n'
        + "      </article>\n"
        + f'      <aside class="rail" id="rail">{rail(toc)}</aside>\n'
        + "    </div>\n"
        + "  </div>\n"
        + f"  <script>window.RK_PAGE={json.dumps({'kit': kit, 'id': item['id'], 'toc': toc}, ensure_ascii=False)}</script>\n"
        + '  <script src="/assets/js/site.js?v=20261106-roboskills"></script>\n'
        + '  <script src="/assets/js/docs.js"></script>\n'
        + "</body>\n</html>\n"
    )


REDIRECT = """<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>{title}</title>
  <link rel="canonical" href="https://openrobokit.com{to}" />
  <meta http-equiv="refresh" content="0; url={to}" />
  <script>location.replace("{to}" + location.hash)</script>
</head>
<body><a href="{to}">Continue to the documentation</a></body>
</html>
"""

def main():
    global KITS
    docs = load_docs()
    # RoboSkills has a page in the nav but no docs yet; the project picker
    # lists only kits with a corpus, so it never links to a missing /docs/ page.
    KITS = [k for k in KITS if k in docs]
    if OUT.exists():
        shutil.rmtree(OUT)
    OUT.mkdir(parents=True)
    INDEX.parent.mkdir(parents=True, exist_ok=True)

    index: dict[str, str] = {}
    written = 0
    for kit in KITS:
        doc = docs.get(kit)
        if not doc:
            continue
        items = pages_of(doc)
        if not items:
            continue
        for i, item in enumerate(items):
            out = OUT / kit / item["id"] / "index.html"
            out.parent.mkdir(parents=True, exist_ok=True)
            out.write_text(page(kit, doc, items, i))
            searchable = " ".join(
                [
                    str(item.get("nav") or ""),
                    str(item.get("h") or ""),
                    str(item.get("sub") or ""),
                    text_of(item.get("body") or ""),
                    apihtml.api_text(item.get("body") or "", item.get("api")),
                ]
            )
            index[f'{kit}/{item["id"]}'] = re.sub(r"\s+", " ", searchable).strip().lower()
            written += 1
        (OUT / kit / "index.html").write_text(
            REDIRECT.format(to=href_of(kit, items[0]["id"]), title=f"{NAMES[kit]} docs · {BRAND}")
        )

    (OUT / "index.html").write_text(
        REDIRECT.format(to=href_of(KITS[0], pages_of(docs[KITS[0]])[0]["id"]), title=f"Docs · {BRAND}")
    )
    INDEX.write_text(json.dumps(index, ensure_ascii=False, separators=(",", ":")))
    print(f"wrote {written} pages under {OUT}")
    print(f"wrote {INDEX} ({INDEX.stat().st_size // 1024} KB)")


if __name__ == "__main__":
    main()
