#!/usr/bin/env bash
# Local preview with the test fixture articles included (content/ has no sample articles of its own).
# Usage: bash scripts/preview.sh   → http://localhost:1313/blog/
set -eu
cd "$(dirname "$0")/.."
DIR=$(mktemp -d)
trap 'rm -rf "$DIR"' EXIT
cp -R content/. "$DIR"/ && cp -R scripts/fixtures/. "$DIR"/
echo "Previewing content/ + scripts/fixtures/ (edits to content/ need a restart)"
hugo server -D --contentDir "$DIR"
