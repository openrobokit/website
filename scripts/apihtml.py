"""Reference blocks for the generated API pages, as HTML.

A Python port of what assets/js/docs-api.js used to build in the browser. The
pages are static now, so the markup is produced here at build time; the model
comes from apimodel.py unchanged.

One component does the work: a declaration card, carrying the kind and the
source link on its first line and the qualified name with a parameter per line
below. A published symbol gets one; so does every member, so a class and its
methods read the same way at two levels of indentation.
"""

import re

# every `<div data-api="name"></div>` the converter left behind
API_SLOT_RE = re.compile(r'<div data-api="([^"]*)"></div>')


def esc(s) -> str:
    """Escapes what the browser must not read as markup -- and nothing else, so
    an apostrophe in a default value stays an apostrophe."""
    return (
        ("" if s is None else str(s))
        .replace("&", "&amp;")
        .replace("<", "&lt;")
        .replace(">", "&gt;")
        .replace('"', "&quot;")
    )


def _source(url: str) -> str:
    return f'<a class="api-src" href="{esc(url)}">[source]</a>' if url else ""


def _ret(r) -> str:
    return r.get("type", "") if r else ""


def sig_body(params: list[dict], ret_type: str) -> str:
    """`name: type = default,` -- one parameter per line, each token its own colour.

    A single annotated line runs off the column as soon as the generics arrive,
    which is the whole reason for the per-line form.
    """
    lines = []
    for i, p in enumerate(params):
        sep = '<span class="pp">: </span>' if p.get("type") else ""
        eq = '<span class="pp"> = </span>' if p.get("default") is not None else ""
        comma = "" if i == len(params) - 1 else ","
        lines.append(
            f'<div class="api-sig__line"><span class="pn">{esc(p.get("name"))}</span>{sep}'
            f'<span class="pt">{esc(p.get("type"))}</span>{eq}'
            f'<span class="pd">{esc(p.get("default"))}</span>'
            f'<span class="pp">{comma}</span></div>'
        )
    # the closing paren dedents back to the name, the way a formatter leaves it
    arrow = " -> " if ret_type else ""
    lines.append(
        f'<div class="api-sig__line api-sig__close"><span class="pp">){arrow}</span>'
        f'<span class="pt">{esc(ret_type)}</span></div>'
    )
    return f'<div class="api-sig__body">{"".join(lines)}</div>'


def card(d: dict) -> str:
    """d: anchor, kind, source, prefix, name, params, ret_type, callable, type, bases, base."""
    params = d.get("params") or []
    open_paren = ""
    if d.get("callable"):
        open_paren = f'<span class="pp">({"" if params else ")"}</span>'
    type_part = ""
    if d.get("type"):
        type_part = f'<span class="pp">: </span><span class="pt">{esc(d["type"])}</span>'
    tail = ""
    if d.get("callable") and not params and d.get("ret_type"):
        tail = f'<span class="pp"> -> </span><span class="pt">{esc(d["ret_type"])}</span>'
    body = sig_body(params, d.get("ret_type", "")) if d.get("callable") and params else ""
    bases = (
        f'<div class="api-sig__bases">Bases: <span>{esc(d["bases"])}</span></div>'
        if d.get("bases")
        else ""
    )
    anchor = f' id="{esc(d["anchor"])}"' if d.get("anchor") else ""
    from_base = (
        f'<span class="api-from">inherited from {esc(d["base"])}</span>' if d.get("base") else ""
    )
    prefix = f'<span class="mod">{esc(d["prefix"])}.</span>' if d.get("prefix") else ""
    return (
        f'<div class="api-card"{anchor}>\n'
        f'    <div class="api-card__head"><span class="api-kind">{esc(d.get("kind"))}</span>'
        f'{from_base}{_source(d.get("source", ""))}</div>\n'
        f'    <div class="api-card__decl">{prefix}'
        f'<span class="api-card__name">{esc(d.get("name"))}</span>'
        f"{open_paren}{type_part}{tail}</div>\n"
        f"    {body}{bases}\n"
        f"  </div>"
    )


def param_rows(params) -> str:
    out = []
    for p in params or []:
        type_part = f'<span class="api-type">{esc(p.get("type"))}</span>' if p.get("type") else ""
        default = (
            f'<span class="api-def">= {esc(p.get("default"))}</span>'
            if p.get("default") is not None
            else ""
        )
        req = '<span class="api-req">required</span>' if p.get("required") else ""
        out.append(
            f'<div class="api-row">\n'
            f'      <div class="api-row__head"><span class="api-name">{esc(p.get("name"))}</span>'
            f"{type_part}{default}{req}</div>\n"
            f'      <div class="api-row__doc">{p.get("doc") or ""}</div>\n'
            f"    </div>"
        )
    return "".join(out)


def returns_row(ret) -> str:
    if not ret or (not ret.get("type") and not ret.get("doc")):
        return ""
    type_part = (
        f'<div class="api-row__head"><span class="api-type">{esc(ret["type"])}</span></div>'
        if ret.get("type")
        else ""
    )
    return (
        f'<div class="api-row api-row--plain">{type_part}'
        f'<div class="api-row__doc">{ret.get("doc") or ""}</div></div>'
    )


def label(text: str, inner: str, anchor: str = "") -> str:
    """Parameters, Returns and Members label a block rather than open a section
    of their own, so nothing on the page shouts; the kind pill does the signposting."""
    if not inner:
        return ""
    at = f' id="{anchor}"' if anchor else ""
    return f'<div class="api-label"{at}>{text}</div>{inner}'


def body_block(parts: list[str]) -> str:
    """A declaration is flush and everything belonging to it -- the docstring, its
    parameters, its members -- is indented under it, once per level of nesting."""
    inner = "".join(p for p in parts if p)
    return f'<div class="api-body">{inner}</div>' if inner else ""


def members_html(sym: dict) -> str:
    rows = []
    for m in sym.get("members") or []:
        callable_ = m.get("kind") in ("method", "function")
        # griffe models a property as an attribute, so its signature is `name: T`
        type_ = "" if callable_ else ": ".join(str(m.get("signature", "")).split(": ")[1:])
        member_card = card(
            {
                "kind": m.get("kind"),
                "base": m.get("base"),
                "source": m.get("source"),
                "prefix": sym.get("name"),
                "name": m.get("name"),
                "params": m.get("params"),
                "ret_type": _ret(m.get("returns")),
                "callable": callable_,
                "type": type_,
            }
        )
        inner = body_block(
            [
                f'<div class="api-row__doc">{m["doc"]}</div>' if m.get("doc") else "",
                label("Parameters", param_rows(m.get("params"))),
                label("Returns", returns_row(m.get("returns"))),
            ]
        )
        anchor = f'{sym.get("anchor")}-{esc(str(m.get("name", "")).lower())}'
        rows.append(
            f'<div class="api-row api-row--plain" id="{anchor}">\n'
            f"      {member_card}\n"
            f"      {inner}\n"
            f"    </div>"
        )
    joined = "".join(rows)
    return f'<div class="api-members">{joined}</div>' if joined else ""


def symbol_html(sym: dict) -> str:
    sym_card = card(
        {
            "anchor": sym.get("anchor"),
            "kind": sym.get("kind"),
            "source": sym.get("source"),
            "prefix": sym.get("module"),
            "name": sym.get("name"),
            "params": sym.get("params"),
            "ret_type": _ret(sym.get("returns")),
            "callable": sym.get("callable"),
            "bases": sym.get("bases"),
        }
    )
    inner = body_block(
        [
            f'<div class="api-prose">{sym["doc"]}</div>' if sym.get("doc") else "",
            label("Parameters", param_rows(sym.get("params"))),
            label("Returns", returns_row(sym.get("returns"))),
            label("Members", members_html(sym), f'{sym.get("anchor")}-members'),
        ]
    )
    return f'<section class="api-sym">\n    {sym_card}\n    {inner}\n  </section>'


def slots(body: str) -> list[str]:
    """The `::: name` placeholders in a body, in the order the document used them."""
    return API_SLOT_RE.findall(body)


def hydrate(body: str, api: dict | None) -> str:
    """Fill each `<div data-api="...">` the converter left behind. Prose and
    reference blocks interleave because the document interleaved them."""
    if not api:
        return body

    def fill(m):
        sym = api.get(m.group(1))
        return f'<div class="api">{symbol_html(sym)}</div>' if sym else m.group(0)

    return API_SLOT_RE.sub(fill, body)


def toc(body: str, api: dict | None) -> list[dict]:
    """The rail lists the published symbols, each carrying its members. A page can
    hold thirty classes with thirty methods apiece, so the rail shows one symbol's
    members at a time -- whichever the reader is currently inside."""
    out = []
    for sym in _listed(body, api):
        out.append(
            {
                "text": sym.get("name"),
                "href": f'#{sym.get("anchor")}',
                # the class name is already the row above, so a member shows only its own
                "members": [
                    {
                        "text": f'{m.get("name")}'
                        + ("()" if m.get("kind") in ("method", "function") else ""),
                        "href": f'#{sym.get("anchor")}-{str(m.get("name", "")).lower()}',
                    }
                    for m in sym.get("members") or []
                ],
            }
        )
    return out


def _listed(body: str, api: dict | None) -> list[dict]:
    if not api:
        return []
    names = slots(body) or list(api.keys())
    return [api[n] for n in names if n in api]


def api_text(body: str, api: dict | None) -> str:
    """The reference text, which search needs and the body HTML does not carry."""
    parts = []
    for s in _listed(body, api):
        params = " ".join(
            f'{p.get("name")} {p.get("type")} {p.get("doc")}' for p in s.get("params") or []
        )
        mem = " ".join(
            f'{m.get("signature")} {m.get("doc")}' for m in s.get("members") or []
        )
        parts.append(
            " ".join(
                [
                    str(s.get("name", "")),
                    str(s.get("module", "")),
                    str(s.get("kind", "")),
                    s.get("bases") or "",
                    s.get("doc") or "",
                    params,
                    mem,
                ]
            )
        )
    return " ".join(parts)
