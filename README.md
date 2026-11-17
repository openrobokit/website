# OpenRoboKit website

The static site behind openrobokit.com. Each page is a small HTML stub that
`assets/js/` renders from the content in `data/`. The docs are built ahead of
time into one HTML page per document.

## Running it

```shell
make serve        # build into _page/ and serve http://localhost:8914 (PORT=… to change)
make test         # converter and page-builder tests, JS syntax checks
make check-site   # links, search coverage, and reproducible output
```

You need `make`, `uv` and Node.js. Everything the build reads is committed
here. Paths are root-relative, so browse through the server rather than
`file://`. `scripts/serve.py` answers Range requests so videos can seek.

## Layout

```
index.html                   landing page
robokit/ retargetingkit/     one stub per project page; the directory name is the URL
graspkit/ roboskills/        (roboskills/showcase/ holds the run gallery)
assets/js/site.js            nav, copy buttons, code highlighting; every page
assets/js/project.js         renders a project page from data/projects.js
assets/js/*.js, assets/css/  each page's script and stylesheet
data/projects.js             project page content and themes
data/showcase*               RoboSkills showcase runs
data/docs/<kit>.js           docs source, one file per kit; read by the build, never served
scripts/                     docs importer and builder, site checks, benchmark tools
_page/                       the built site (ignored)
```

To add a project, copy a stub such as `graspkit/index.html`, change its
`<title>` and `window.RK_PROJECT`, then add the kit to `RK_PROJECTS`,
`RK_THEMES` and `RK_VIDEOS` in `data/projects.js`, to `RK_NAMES` in
`assets/js/site.js`, to the chapters in `assets/js/project-nav.js`, and to
`PUBLIC` in the `Makefile`.

## Docs

Docs are written in each kit's repository (`docs/*.md`, with the sidebar in
`docs/nav.yml`) and imported here:

```shell
make import PROJECT=robokit SRC=../robokit      # or retargetingkit, graspkit
make check-docs PROJECT=robokit SRC=../robokit  # fails if an import would change anything
```

An import replaces only that kit's generated block in `data/docs/<kit>.js`
and, where a kit has them, its API examples in `data/projects.js`.
`make site` turns the docs source into `_page/docs/<kit>/<id>/` and
`_page/data/search.json`. Edit docs in the kit's repository, not here.

## Publishing

CI (`.github/workflows/deploy.yml`) runs the tests and `make check-site` on
every push and pull request. Only the public `openrobokit/website` repository
deploys `main` to GitHub Pages.
