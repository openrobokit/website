# Only `make import` reaches outside this checkout. A plain build reads the
# committed corpus, so CI and a fresh clone both work with no sibling repos.
PROJECT ?=
SRC ?=
PORT ?= 8914

# What a browser is allowed to see. Everything else in the checkout -- the
# scripts, the Makefile, the README -- is how the site is made, not part of it.
PUBLIC = index.html CNAME .nojekyll assets graspkit retargetingkit robokit roboskills

.PHONY: serve import site benchmark-image check-docs check-site test clean

# The pages use root-relative paths, so the site must be served from this
# built directory — opening HTML over file:// will not resolve /assets or /data.
serve: site
	@printf '\nSite: http://localhost:$(PORT)/\nDocs: http://localhost:$(PORT)/docs/robokit/overview/\n\n'
	python3 -u scripts/serve.py $(PORT) _page

# Convert one product repo's Markdown into its own file under data/docs/, then
# rebuild. Each kit owns one path, so two imports never touch the same file.
#
#     make import PROJECT=retargetingkit SRC=../retargetingkit
#
# In CI this runs from the product repo, which then commits the result here.
import:
	uv run scripts/import_docs.py $(PROJECT) $(SRC)
	$(MAKE) site

# Assemble the complete site without writing generated files into source paths.
# Everything it needs is committed here, so this works on a bare clone.
site: clean
	mkdir -p _page/data
	cp -R $(PUBLIC) _page/
	cp -R data/projects.js data/showcase.js data/showcase _page/data/
	# Notes written for maintainers are not part of the site.
	find _page -name README.md -delete
	uv run --python 3.12 scripts/build_docs.py

# The converters use 3.10+ syntax, so pin the interpreter rather than trust
# whatever `python3` happens to be on the machine.
test:
	cd scripts && uv run --python 3.12 --with xdoctest --with griffe python -m unittest discover -p 'test_*.py'
	node --test scripts/test_code_controls.js
	@for file in assets/js/*.js data/*.js data/docs/*.js; do node --check "$$file" || exit 1; done

# Fails if importing one project's docs would change anything. Needs its source.
check-docs:
	$(MAKE) import PROJECT=$(PROJECT) SRC=$(SRC)
	git diff --exit-code HEAD -- data/docs/ assets/docs/
	test -z "$$(git ls-files --others --exclude-standard -- data/docs/ assets/docs/)"

# Render the speed bars as robokit's README image (3120x1356) from the built
# page. OUT defaults to output/robokit-benchmarks.png; .webp is the README's.
#
#     make benchmark-image OUT=../robokit/docs/assets/robokit-benchmarks.webp
benchmark-image: site
	uv run --python 3.12 --with playwright==1.55.0 --with pillow python scripts/export_benchmark_image.py $(if $(OUT),--out $(OUT))

# Check links, search coverage, repeatable output, and unchanged source files.
check-site:
	uv run --python 3.12 scripts/check_site.py

clean:
	rm -rf _page
