"""Tests for the static docs build: the API renderer and the page assembler."""

import unittest

import apihtml
import build_docs


class TestImportedHtml(unittest.TestCase):
    def test_query_links_become_static_and_keep_anchors(self):
        for key in ("project", "kit"):
            body = f'<a href="/docs/?{key}=retargetingkit&amp;id=frames#handframe">Frames</a>'
            self.assertIn(
                'href="/docs/retargetingkit/frames/#handframe"',
                build_docs.static_body(body, "robokit"),
            )
        self.assertIn(
            'href="/docs/graspkit/"',
            build_docs.static_body('<a href="/docs/?project=graspkit">Docs</a>', "robokit"),
        )

    def test_legacy_copy_uses_shared_keyboard_accessible_control(self):
        body = '<div class="doc__code"><div class="bar"><span class="copy" style="color:var(--fg-muted)">⧉ copy</span></div><pre>x &lt; 2</pre></div>'
        result = build_docs.static_body(body, "retargetingkit")
        self.assertIn('class="doc__code" data-copy-scope', result)
        self.assertIn('<button type="button" class="copy copy--swap" data-copy-from="pre"', result)
        self.assertIn('<span class="t"></span><span class="o"></span>', result)
        self.assertIn('<pre>x &lt; 2</pre>', result)
        self.assertEqual(build_docs.static_body(result, "retargetingkit"), result)

SYM = {
    "kind": "class",
    "name": "GDOptimizer",
    "module": "robokit.opt",
    "anchor": "gdoptimizer",
    "source": "https://example.com/opt.py#L4",
    "doc": "<p>Gradient descent.</p>",
    "bases": "Optimizer",
    "callable": True,
    "returns": None,
    "params": [
        {"name": "lr", "type": "float", "default": "0.1", "required": False, "doc": "<p>Step.</p>"},
        {"name": "mode", "type": "Literal['a']", "default": None, "required": True, "doc": ""},
    ],
    "members": [
        {
            "kind": "method",
            "base": "",
            "name": "step",
            "signature": "step(n: int)",
            "source": "",
            "doc": "<p>One step.</p>",
            "params": [{"name": "n", "type": "int", "default": None, "required": True, "doc": ""}],
            "returns": {"type": "None", "doc": ""},
        },
        {
            "kind": "attribute",
            "base": "Optimizer",
            "name": "lr",
            "signature": "lr: float",
            "source": "",
            "doc": "",
            "params": [],
            "returns": None,
        },
    ],
}


class TestApiHtml(unittest.TestCase):
    def test_esc_keeps_apostrophes(self):
        # a default value of 'cpu' must stay readable in the signature
        self.assertEqual(apihtml.esc("a<b&'c\""), "a&lt;b&amp;'c&quot;")
        self.assertEqual(apihtml.esc(None), "")

    def test_symbol_html(self):
        html = apihtml.symbol_html(SYM)
        self.assertIn('<div class="api-card" id="gdoptimizer">', html)
        self.assertIn('<span class="mod">robokit.opt.</span>', html)
        self.assertIn('Bases: <span>Optimizer</span>', html)
        # one line per parameter, and the closing paren dedented onto its own
        self.assertIn('<span class="pn">lr</span>', html)
        self.assertIn('<span class="pd">0.1</span>', html)
        self.assertIn('class="api-sig__line api-sig__close"', html)
        self.assertIn('<span class="api-req">required</span>', html)
        self.assertIn('id="gdoptimizer-step"', html)
        self.assertIn('inherited from Optimizer', html)
        # a property/attribute renders as `name: T`, never as a call
        self.assertIn('<span class="pt">float</span>', html)

    def test_returns_row_skipped_when_empty(self):
        self.assertEqual(apihtml.returns_row(None), "")
        self.assertEqual(apihtml.returns_row({"type": "", "doc": ""}), "")

    def test_hydrate_and_toc_follow_document_order(self):
        body = '<p>a</p><div data-api="b"></div><p>c</p><div data-api="a"></div>'
        api = {"a": {**SYM, "name": "A", "anchor": "a"}, "b": {**SYM, "name": "B", "anchor": "b"}}
        out = apihtml.hydrate(body, api)
        self.assertLess(out.index('id="b"'), out.index('id="a"'))
        self.assertNotIn("data-api", out)
        self.assertEqual([s["text"] for s in apihtml.toc(body, api)], ["B", "A"])
        self.assertEqual(
            apihtml.toc(body, api)[0]["members"],
            [{"text": "step()", "href": "#b-step"}, {"text": "lr", "href": "#b-lr"}],
        )

    def test_hydrate_without_api_is_a_noop(self):
        self.assertEqual(apihtml.hydrate("<p>x</p>", None), "<p>x</p>")

    def test_api_text_feeds_search(self):
        text = apihtml.api_text('<div data-api="x"></div>', {"x": SYM})
        for want in ("GDOptimizer", "robokit.opt", "Optimizer", "step(n: int)"):
            self.assertIn(want, text)


DOC = {
    "title": "robokit",
    "lede": "A toolkit.",
    "groups": [
        {"name": "Get Started", "items": [{"id": "overview", "nav": "Overview", "h": "Overview", "body": "<p>Hi</p>"}]},
        {
            "name": "Reference",
            "items": [
                {"id": "a", "nav": "A", "h": "A", "sub": "Terms", "body": "<h3>One</h3><h3>Two &amp; Three</h3>"},
                {"id": "b", "nav": "B", "h": "B", "sub": "Terms", "body": "<p>b</p>"},
            ],
        },
        {"name": "Get Started", "items": [{"id": "install", "nav": "Install", "h": "Install", "body": "<p>go</p>"}]},
    ],
}


class TestBuildDocs(unittest.TestCase):
    def test_groups_merge_by_name(self):
        names = [g["name"] for g in build_docs.groups_of(DOC)]
        self.assertEqual(names, ["Get Started", "Reference"])
        # the second Get Started block appends to the first rather than repeating it
        self.assertEqual(
            [i["id"] for i in build_docs.groups_of(DOC)[0]["items"]], ["overview", "install"]
        )

    def test_with_ids_slugs_heading_text(self):
        out = build_docs.with_ids("<h3>Two &amp; Three</h3>")
        self.assertEqual(out, '<h3 id="two-three">Two &amp; Three</h3>')

    def test_toc_reads_headings(self):
        item = DOC["groups"][1]["items"][0]
        body = build_docs.with_ids(item["body"])
        self.assertEqual(
            build_docs.toc_of(body, item),
            [{"text": "One", "href": "#one"}, {"text": "Two & Three", "href": "#two-three"}],
        )

    def test_page_is_self_contained(self):
        items = build_docs.pages_of(DOC)
        i = next(n for n, it in enumerate(items) if it["id"] == "a")
        html = build_docs.page("robokit", DOC, items, i)
        # the article is in the markup, not fetched
        self.assertIn('<h1 id="doc-h">A</h1>', html)
        self.assertIn('<h3 id="one">One</h3>', html)
        self.assertIn('<link rel="canonical" href="https://openrobokit.com/docs/robokit/a/" />', html)
        self.assertIn("<title>A · RoboKit docs · OpenRoboKit</title>", html)
        # the sidebar marks this page and opens the fold holding it
        self.assertIn('<a href="/docs/robokit/a/" data-id="a" class="is-active">A</a>', html)
        self.assertIn('<div class="side__sub" data-fold="Reference·Terms">', html)
        self.assertNotIn("is-folded", html)
        # breadcrumb, prev/next and the rail are all pre-rendered
        self.assertIn('<span class="slash">/</span><span>Terms</span>', html)
        self.assertIn('<span class="lbl">← Previous</span>', html)
        self.assertIn('<a href="#two-three">Two &amp; Three</a>', html)
        self.assertNotIn("/data/docs", html)

    def test_first_page_has_no_previous(self):
        items = build_docs.pages_of(DOC)
        html = build_docs.page("robokit", DOC, items, 0)
        self.assertNotIn("← Previous", html)
        self.assertIn("Next →", html)

    def test_unrelated_fold_stays_folded(self):
        items = build_docs.pages_of(DOC)
        html = build_docs.page("robokit", DOC, items, 0)
        self.assertIn('data-fold="Reference·Terms"', html)
        self.assertIn("side__sub is-folded", html)

    def test_rail_needs_two_entries(self):
        self.assertEqual(build_docs.rail([{"text": "One", "href": "#one"}]), "")


if __name__ == "__main__":
    unittest.main()
