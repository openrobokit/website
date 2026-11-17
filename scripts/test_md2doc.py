"""Regression checks for guide links and asset tables."""

import html
import re
import unittest
import xml.etree.ElementTree as ET

from md2doc import Converter


class TestConverter(unittest.TestCase):
    def setUp(self):
        self.converter = Converter(
            "robokit",
            "https://github.com/openrobokit/robokit/",
            {"guide/assets.md": "ref-assets", "dev.md": "dev"},
        )

    def test_asset_table(self):
        table = (
            '<table>\n<tbody>\n<tr><td rowspan="2"><code>franka_panda</code></td>'
            '<td>URDF</td><td><a href="https://example.com/">Source</a></td></tr>\n'
            "<tr><td>MJCF</td><td>Apache-2.0</td></tr>\n</tbody>\n</table>"
        )
        result = self.converter.fragment(f"Before\n\n{table}\n\nAfter")
        self.assertEqual(result, f"<p>Before</p>{table}<p>After</p>")
        root = ET.fromstring(f"<div>{result}</div>")
        self.assertEqual(len(root.findall(".//tr")), 2)
        self.assertEqual(root.find(".//td").get("rowspan"), "2")

    def test_single_line_table(self):
        table = '<table class="doc-table"><tr><td>URDF</td></tr></table>'
        self.assertEqual(self.converter.fragment(table), table)

    def test_markdown_table(self):
        result = self.converter.fragment("| Name |\n| --- |\n| `franka_panda` |")
        root = ET.fromstring(result)
        self.assertEqual(root.get("class"), "doc-table")
        self.assertEqual(root.find(".//code").text, "franka_panda")

    def test_fenced_table_is_code(self):
        result = self.converter.fragment("```html\n<table></table>\n```")
        self.assertIn("<pre>&lt;table&gt;&lt;/table&gt;</pre>", result)
        self.assertNotIn("<table>", result)

    def test_hidden_setup_keeps_complete_copy_source(self):
        result = self.converter.fragment(
            '```python\n# docs: hide\n# xdoctest: +REQUIRES(env:ROBOKIT_ASSET_TESTS==1)\n'
            'values = [1, 2, 3]\n# docs: endhide\n'
            'total = sum(values)\n# docs: hide\nassert total == 6\n# docs: endhide\n```'
        )
        [(short_attrs, short), (full_attrs, full)] = re.findall(r"<pre([^>]*)>(.*?)</pre>", result, re.S)
        self.assertEqual(short_attrs, "")
        self.assertEqual(html.unescape(short), "total = sum(values)")
        self.assertIn("data-code-full hidden", full_attrs)
        self.assertIn('data-copy-from="[data-code-full]"', result)
        self.assertIn('aria-expanded="false"', result)
        self.assertNotIn("docs:", result)
        self.assertNotIn("xdoctest:", result)
        namespace = {}
        exec(html.unescape(full), namespace)
        self.assertEqual(namespace["total"], 6)

    def test_hide_markers_are_validated(self):
        for code in ("# docs: hide\nx = 1", "# docs: endhide\nx = 1", "# docs: hide\n# docs: hide"):
            with self.subTest(code=code), self.assertRaises(ValueError):
                self.converter.fragment(f"```python\n{code}\n```")

    def test_complete_code_is_escaped_and_plain_blocks_keep_copy(self):
        result = self.converter.fragment('```python\n# docs: hide\nx = "<tag>&é"\n# docs: endhide\nprint(x)\n```')
        self.assertIn('x = "&lt;tag&gt;&amp;é"', result)
        result = self.converter.fragment("```python\nprint(1)\n```")
        self.assertIn('data-copy-from="pre"', result)
        self.assertNotIn("data-code-toggle", result)


    def test_xdoctest_comments_are_hidden_without_removing_strings(self):
        code = '# regular comment\nprint("# xdoctest: is text")'
        result = self.converter.fragment(f"```python\n#xdoctest: +SKIP\n{code}\n```")
        self.assertIn(f"<pre>{code}</pre>", result)
        self.assertNotIn("+SKIP", result)
        self.assertNotIn("data-code-toggle", result)

    def test_prose_is_escaped(self):
        self.assertEqual(
            self.converter.fragment("a < b & c"), "<p>a &lt; b &amp; c</p>"
        )

    def test_image(self):
        result = self.converter.fragment("[![Py](https://img.shields.io/x.svg)](https://x.org) ![Fig](/assets/x.webp)")
        self.assertIn('<a class="inline" href="https://x.org"><img src="https://img.shields.io/x.svg" alt="Py"></a>', result)
        self.assertIn('<img src="/assets/x.webp" alt="Fig">', result)
        result = self.converter.fragment("![Banner](../assets/banner.webp)", "guide/overview.md")
        self.assertIn('<img src="https://github.com/openrobokit/robokit/raw/main/docs/assets/banner.webp" alt="Banner">', result)

    def test_site_video(self):
        for name, video in (
            ("ik", "bento/ik"),
            ("motion-planning", "tile/motion-planning"),
            ("hand-eye-calibration", "bento/calibration"),
            ("humanoid-retargeting", "bento/humanoid-retargeting"),
            ("hand-retargeting", "bento/hand-retargeting"),
            ("grasp-optimization", "tile/grasping-optimization"),
        ):
            with self.subTest(task=name):
                poster = f"/assets/docs/robokit/assets/built-in-tasks/{name}.webp"
                result = self.converter.fragment(f"![Task]({poster})")
                self.assertIn(f'<video src="/assets/videos/robokit/{video}.mp4" poster="{poster}"', result)
        result = self.converter.fragment("![Hero](https://openrobokit.com/assets/images/robokit/hero.webp)")
        self.assertIn('<img src="/assets/images/robokit/hero.webp" alt="Hero">', result)

    def test_local_image_does_not_copy_source(self):
        import tempfile
        from pathlib import Path
        from unittest.mock import patch
        with tempfile.TemporaryDirectory() as d, patch("md2doc.ROOT", Path(d) / "site"):
            (Path(d) / "assets").mkdir()
            (Path(d) / "assets" / "t.webp").write_bytes(b"x")
            self.converter.docs_dir = Path(d)
            result = self.converter.fragment("![T](../assets/t.webp)", "guide/overview.md")
            self.converter.docs_dir = None
            self.assertFalse((Path(d) / "site").exists())
            self.assertEqual((Path(d) / "assets" / "t.webp").read_bytes(), b"x")
        self.assertIn('<img src="/assets/docs/robokit/assets/t.webp" alt="T">', result)

    def test_quote(self):
        result = self.converter.fragment("> [!NOTE]\n> Pinned to `main`.\n> Second line.\n\nAfter.")
        self.assertEqual(
            result,
            '<div class="doc-note doc-note--note"><div class="doc-note__title">Note</div>'
            "<p>Pinned to <code>main</code>. Second line.</p></div><p>After.</p>",
        )
        self.assertEqual(self.converter.fragment("> quoted"), "<blockquote><p>quoted</p></blockquote>")

    def test_no_title(self):
        self.assertEqual(self.converter.convert("Body only"), ("", "<p>Body only</p>"))

    def test_tabs(self):
        md = '=== "uv"\n```shell\nuv add robokit\n```\n=== "pip"\n```shell\npip install robokit\n```\n\nAfter.'
        result = self.converter.fragment(md)
        # the code blocks carry boolean attributes, so match on the markup
        self.assertIn(
            '<div class="doc-tabs"><div class="tabs">'
            '<button type="button" class="is-active">uv</button>'
            '<button type="button">pip</button></div>',
            result,
        )
        self.assertEqual(result.count('class="doc-tabs__pane is-active"'), 1)
        self.assertEqual(result.count('class="doc-tabs__pane"'), 1)
        self.assertLess(result.index("uv add robokit"), result.index("pip install robokit"))
        self.assertTrue(result.endswith("</div></div><p>After.</p>"))

    def test_lone_tab_marker_is_prose(self):
        self.assertEqual(self.converter.fragment('=== "uv"'), '<p>=== "uv"</p>')

    def test_guide_links(self):
        for rel, target, page in (
            ("guide/assets.md", "../dev.md", "dev"),
            ("dev.md", "guide/assets.md", "ref-assets"),
        ):
            with self.subTest(target=target):
                result = self.converter.fragment(f"[Guide]({target})", rel)
                self.assertIn(f'href="/docs/robokit/{page}/"', result)

    def test_guide_link_keeps_section(self):
        result = self.converter.fragment("[Guide](../dev.md#setup)", "guide/assets.md")
        self.assertIn('href="/docs/robokit/dev/#setup"', result)

    def test_framed_device_image_keeps_original_link(self):
        src = "/assets/images/device.png"
        self.converter.images[src] = {"size": (1200, 800), "crop": (200, 100, 600, 400)}
        result = self.converter.fragment(f"![Device panel]({src})")
        self.assertIn('class="doc-figure"', result)
        self.assertIn('href="/assets/images/device.png"', result)
        self.assertIn('src="/assets/images/device.png"', result)
        self.assertIn('aspect-ratio:600/400', result)
        self.assertIn('--image-width:200.0000%', result)
        self.assertIn('alt="Device panel"', result)

    def test_doctest_stays_code(self):
        result = self.converter.fragment(">>> solve(frame)\narray([1, 2])\n\nAfter")
        self.assertIn('<pre>&gt;&gt;&gt; solve(frame)\narray([1, 2])</pre>', result)
        self.assertNotIn('<blockquote>', result)

    def test_api_copy_has_imports_without_prompts_or_outputs(self):
        self.converter.example_imports = {"sqrt": "from math import sqrt", "floor": "from math import floor"}
        result = self.converter.fragment(
            ">>> # xdoctest: +REQUIRES(module:math)\n>>> value = sqrt(16)\n"
            ">>> # xdoctest: +IGNORE_WANT\n>>> print(value)\n4.0")
        self.assertNotIn("xdoctest:", result)
        full = html.unescape(re.search(r'<pre data-code-full hidden>(.*?)</pre>', result, re.S)[1])
        self.assertEqual(full, "from math import sqrt\n\nvalue = sqrt(16)\nprint(value)")
        namespace = {}
        exec(full, namespace)
        self.assertEqual(namespace["value"], 4)

    def test_api_copy_imports_module_aliases_as_written(self):
        self.converter.example_imports = {"np": "import numpy as np", "sqrt": "from math import sqrt",
                                          "pi": "from math import pi", "Path": "from pathlib import Path"}
        result = self.converter.fragment(">>> sqrt(pi)\n>>> np.zeros(2).shape\n(2,)")
        full = html.unescape(re.search(r'<pre data-code-full hidden>(.*?)</pre>', result, re.S)[1])
        self.assertEqual(full, "import numpy as np\nfrom math import pi, sqrt\n\nsqrt(pi)\nnp.zeros(2).shape")


if __name__ == "__main__":
    unittest.main()
