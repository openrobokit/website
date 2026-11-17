"""API examples include the defining module's globals when copied."""

import html
import re
import tempfile
import unittest
from pathlib import Path

from apimodel import Repo, load_package, resolve
from md2doc import Converter


class TestApiExamples(unittest.TestCase):
    def test_property_example_has_module_import(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            (root / "example_api.py").write_text(
                'class Counter:\n'
                '    @property\n'
                '    def count(self) -> int:\n'
                '        """Read the count.\n\n'
                '        Example:\n'
                '            >>> Counter().count\n'
                '            1\n'
                '        """\n'
                '        return 1\n'
            )
            package = load_package("example_api", root)
            converter = Converter("test", "https://example.com/", {})
            entry = resolve(package, "example_api.Counter", Repo(root, "https://example.com/"), converter)
            document = entry["members"][0]["doc"]
            full = html.unescape(re.search(r'<pre data-code-full hidden>(.*?)</pre>', document, re.S)[1])
            self.assertEqual(full, "from example_api import Counter\n\nCounter().count")
            self.assertEqual(converter.example_imports, {})
            compile(full, "property example", "exec")
