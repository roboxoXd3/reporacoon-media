#!/usr/bin/env bash
# usage: engine/build.sh episodes/epNN_slug  -> reels/epNN_slug.mp4 + covers/epNN.png
# The episode folder needs: vo.wav, words.py (writes words.json + words.js), timeline.js, sfx.json, cover.json, any img/*.png it uses.
set -euo pipefail
EP=$(realpath "$1"); NAME=$(basename "$EP"); NUM=${NAME%%_*}; ROOT=$(realpath "$(dirname "$0")/.."); E=$ROOT/engine
cd "$EP"; python3 words.py >/dev/null
cp timeline.js "$E/scene/timeline.js"; cp words.js "$E/scene/words.js"
for f in "$EP"/*.png; do [ -e "$f" ] && cp "$f" "$E/scene/img/"; done
cd "$E"; python3 render.py video "$EP/frames.mp4"
python3 audio.py "$EP/vo.wav" "$EP/sfx.json" "$EP/mix.wav"
ffmpeg -v error -y -i "$EP/frames.mp4" -i "$EP/mix.wav" -map 0:v -map 1:a -c:v copy -af "loudnorm=I=-14:TP=-1.5:LRA=11" -c:a aac -b:a 192k -ar 48000 -shortest -movflags +faststart "$EP/reel.mp4"
python3 - "$EP/cover.json" "$ROOT/covers/$NUM.png" <<'PY'
import json,sys,subprocess; c=json.load(open(sys.argv[1]))
subprocess.run(['python3','covers/mk.py',sys.argv[2],c['ep'],c['title'],c['repo'],c['mascot']],check=True)
PY
ffmpeg -v error -y -framerate 30 -i "$ROOT/covers/$NUM.png" -i "$EP/reel.mp4" -filter_complex "[0:v]format=yuv420p,loop=-1:1,trim=duration=0.55,setpts=PTS-STARTPTS,fps=30,settb=AVTB[c];[1:v]fps=30,settb=AVTB[v];[c][v]xfade=transition=fade:duration=0.15:offset=0.4[vo];[1:a]adelay=400|400[ao]" -map "[vo]" -map "[ao]" -c:v libx264 -preset veryfast -crf 18 -pix_fmt yuv420p -c:a aac -b:a 192k -movflags +faststart "$ROOT/reels/$NAME.tmp.mp4"
mv "$ROOT/reels/$NAME.tmp.mp4" "$ROOT/reels/$NAME.mp4"; rm -f "$EP/frames.mp4" "$EP/mix.wav" "$EP/reel.mp4"
echo "built reels/$NAME.mp4"
