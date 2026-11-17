"""Regression checks for broken build artifacts."""

import contextlib
import io
import json
import tempfile
import unittest
from pathlib import Path

from check_site import validate


class TestCheckSite(unittest.TestCase):
    def setUp(self):
        temporary = tempfile.TemporaryDirectory()
        self.addCleanup(temporary.cleanup)
        self.site = Path(temporary.name)
        self.doc = self.site / "docs/robokit/overview/index.html"
        self.doc.parent.mkdir(parents=True)
        self.doc.write_text('<div id="doc-body"><h3 id="intro">Intro</h3></div>')
        (self.site / "index.html").write_text(
            '<a href="/docs/robokit/overview/#intro">Docs</a>'
            '<img src="/assets/logo.svg?v=1">'
        )
        (self.site / "assets").mkdir()
        (self.site / "assets/logo.svg").write_text("<svg></svg>")
        (self.site / "data").mkdir()
        self.index = self.site / "data/search.json"
        self.index.write_text(json.dumps({"robokit/overview": "intro"}))

    def test_missing_asset_is_rejected(self):
        with contextlib.redirect_stdout(io.StringIO()):
            validate(self.site)
        (self.site / "assets/logo.svg").unlink()
        with self.assertRaisesRegex(ValueError, "missing target /assets/logo.svg"):
            validate(self.site)

    def test_missing_documentation_anchor_is_rejected(self):
        self.doc.write_text('<div id="doc-body">Intro</div>')
        with self.assertRaisesRegex(ValueError, "missing anchor"):
            validate(self.site)

    def test_missing_or_orphaned_search_entries_are_rejected(self):
        for index in ({}, {"robokit/overview": "intro", "robokit/deleted": "stale"}):
            with self.subTest(index=index):
                self.index.write_text(json.dumps(index))
                with self.assertRaisesRegex(ValueError, "search/page mismatch"):
                    validate(self.site)

    def test_build_inputs_are_rejected(self):
        (self.site / "data/docs").mkdir()
        with self.assertRaisesRegex(ValueError, "build input copied into site"):
            validate(self.site)


if __name__ == "__main__":
    unittest.main()
