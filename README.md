# OpenRoboKit website

A static site — no framework, and nothing rendered at request time. The hand-
written pages are markup only; the documentation is generated once, up front,
into one HTML file per page. All CSS and JS live under `assets/`.

## Running it

```shell
./scripts/preview.sh # build, then preview http://localhost:8914/retargetingkit/
make serve          # build, then serve http://localhost:8734 from _page/
make test           # the converter and page-builder tests
make site           # rebuild the complete site in ignored _page/
make check-site     # build twice; check links, search, and reproducibility
make clean          # remove _page/
```

The preview script works from any directory and accepts an optional port:
`./scripts/preview.sh 8915`. Keep its terminal open while browsing, or run it
in the background from the repository root:

```shell
mkdir -p output
nohup ./scripts/preview.sh 8914 > output/preview.log 2>&1 < /dev/null &
```

When the repository is on a remote machine, forward port 8914 in your editor
or SSH connection before opening the localhost URL on your computer.

All paths in the site are **root-relative** (`/assets/…`, `/data/…`), so the
site has to be served from `_page/`. Opening an `.html` file over
`file://` will not resolve anything.

Building requires `make`, `uv`, and Node.js. `uv` selects Python 3.12 for the
build and tests. Everything a build reads is committed here, so `make site`
works on a bare clone — no sibling checkouts. Only `make import` needs one, and
only for the project being imported.

`scripts/serve.py` serves the built tree with HTTP Range support so the video
scrubbers can seek locally.

The landing hero and its three kit previews live under
`assets/{videos,images}/landing/`. After updating the hero, regenerate the
matching card clips and posters with
`uv run --python 3.12 python scripts/assemble_landing_teaser.py --previews-only`.
The same script can assemble the hero from existing Blender frames using
`--renders <render-directory>`.

## Layout

```
index.html                  landing page
robokit/                    ┐
retargetingkit/             ├ one stub each: title, favicon, RK_PROJECT, script tags
graspkit/                   ┘

assets/css/site.css         nav + mobile menu, shared by every page
assets/css/{home,project,docs}.css
assets/js/site.js           nav render, menu toggle, hero-video fallback
assets/js/{home,project,docs}.js
                            docs.js is page behaviour only — no router
assets/{brand,images,videos}/

data/projects.js            content + theme for the three project pages
data/docs/<kit>.js          the documentation corpus, one file per kit;
                            build input, never served

scripts/                    the Python importers and page builder
.github/workflows/ci.yml    test, validate, and upload a downloadable site artifact

_page/                      complete built site; ignored by Git
_page/docs/                 generated pages and legacy URL redirects
_page/data/search.json      full-text search index
```

Each project page is a directory so its URL is just its name —
`openrobokit.com/robokit` — which is what paper and preprint links need.
The local server resolves `/robokit` to `robokit/index.html`.

### Shared chrome

`assets/css/site.css` owns the nav's structure; every colour in it comes from a
custom property the page sets (`--nav-bg`, `--nav-ink`, `--nav-muted`,
`--nav-hover-bg`, `--nav-dot`, `--brand-shadow`, `--menu-bg`, `--menu-line`).
Re-tint the nav by setting those, not by writing new `nav …` rules.

The burger and mobile overlay are always in the DOM but hidden; a page opts in
by unhiding `nav .right button.burger` in its own media query. The landing page
deliberately does not, and so has no mobile menu.

### Adding a project

1. Copy an existing stub, e.g. `graspkit/index.html`, changing the `<title>` and
   `window.RK_PROJECT`.
2. Add the matching entry to `RK_PROJECTS`, `RK_THEMES` and `RK_VIDEOS` in
   `data/projects.js`. A project that rotates multiple hero clips can also add
   an `RK_HERO_REELS` entry.
3. Add it to `NAV` in `assets/js/site.js`.

## CI

On pushes to `main`, pull requests, and manual runs, CI runs the tests and
`make check-site`, then uploads `_page/` as a `site` artifact. Only the public
`openrobokit/website` repo publishes that artifact to GitHub Pages, from `main`.

`make check-site` checks local HTML links and assets, documentation anchors,
and search-index coverage. It builds twice and compares every output file,
then verifies that source files have not changed. CI also requires a clean
Git checkout. The workflow still needs RoboKit's asset input provisioned.

Only handwritten pages, assets, scripts, and the documentation corpus are
tracked. Generated HTML, redirects, and the search index live in `_page/`.
The build excludes the corpus, scripts, README, and Makefile from that tree.

## Documentation

Every document is a static page at `/docs/<kit>/<id>/`, built from the
committed corpus. Each kit owns one file, so two projects importing at once
never touch the same path:

```shell
make site                                             # build from the corpus
make import PROJECT=robokit SRC=../robokit    # re-convert one project
make check-docs PROJECT=robokit SRC=../robokit  # fails if it would change
```

`data/docs/<kit>.js` stays the corpus: `scripts/import_docs.py` splices the generated
groups into it, and `scripts/build_docs.py` turns the whole thing into
`_page/docs/<kit>/<id>/index.html` plus `_page/data/search.json`. Importing is
an explicit source update; ordinary builds never rewrite `data/docs/`.

RoboKit's README and overview images have one source: RoboKit's `docs/assets/`.
The importer rewrites image URLs without copying files into this repository.
`make site` bundles the banner, framework, teaser, and six `built-in-tasks/` images
into `_page/assets/docs/robokit/assets/`;
these are generated output and are never committed. Gallery previews, task videos,
and images used only by the website remain under `assets/`.

The browser gets no router and no corpus. `assets/js/docs.js` handles only what
needs a live page — syntax highlighting, copy buttons, the scroll-spy rail, the
sidebar folds — and fetches the search index the first time somebody types.

A page selects reference blocks the way mkdocstrings does — a line of
`::: robokit.opt.GDOptimizer` in the Markdown, next to the prose. What gets
published, and in what order, is decided there rather than in a config file
here.

`scripts/md2doc.py` turns such a line into a `<div data-api="...">`
placeholder; `scripts/apimodel.py` reads the name out of the source with
griffe, and `scripts/apihtml.py` fills the placeholder in with the signature
card, parameters and members.

RetargetingKit works the same way: its pages, sidebar order (`docs/nav.yml`),
API reference pages, and device screenshots live in the RetargetingKit repo.
Rebuild them against that checkout:

```shell
make import PROJECT=retargetingkit SRC=../retargetingkit
```

The importer copies the original device screenshots into
`assets/docs/retargetingkit/` and frames the PICO and Vision Pro panels without
changing their pixels. Edit the Markdown in RetargetingKit, never
here. Only `data/docs/retargetingkit.js` is replaced, then the static site is
rebuilt in `_page/`.
