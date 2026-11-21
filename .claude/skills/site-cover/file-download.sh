#!/bin/bash
# file-download.sh <slug> [dir]: wait (≤40 s) for a PNG in ~/Downloads newer than the newest cover in <dir>
# (default ~/Documents/aitanyan/covers), refuse it if it duplicates an existing cover (the generation was not
# finished, so the previous image was downloaded again), else move it to <dir>/<slug>.png.
D=${2:-$HOME/Documents/aitanyan/covers}; mkdir -p "$D"
ref=$(ls -t "$D"/*.png 2>/dev/null | head -1); [[ -n "$ref" ]] || { touch "$D/.ref"; ref="$D/.ref"; }
for _ in $(seq 1 40); do
  f=$(find "$HOME/Downloads" -maxdepth 1 -name '*.png' -newer "$ref" -print 2>/dev/null | head -1)
  if [[ -n "$f" ]]; then
    sleep 1; sum=$(md5 -q "$f")
    for g in "$D"/*.png; do [[ -f "$g" && $(md5 -q "$g") == "$sum" ]] && { rm "$f"; echo "$1: DUPLICATE of $(basename "$g"), regenerate"; exit 2; }; done
    mv "$f" "$D/$1.png"; echo "$1 <- $(basename "$f")"; exit 0
  fi
  sleep 1
done
echo "$1: no new download"; exit 1
