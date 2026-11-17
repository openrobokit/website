#!/bin/sh
set -eu

preview_root=$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)
preview_port=${1:-8914}

cd "$preview_root"
make site
printf '\nWebsite: http://localhost:%s/retargetingkit/\nDocs:    http://localhost:%s/docs/retargetingkit/\n\n' "$preview_port" "$preview_port"
exec python3 -u scripts/serve.py "$preview_port" _page
