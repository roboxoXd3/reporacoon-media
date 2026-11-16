#!/usr/bin/env bash
# usage: engine/stills.sh episodes/epNN_slug t1 t2 ...  -> episodes/epNN_slug/stills.jpg (contact sheet)
set -euo pipefail
EP=$(realpath "$1"); shift; E=$(realpath "$(dirname "$0")")
cp "$EP/timeline.js" "$EP/words.js" "$E/scene/"; for f in "$EP"/*.png; do [ -e "$f" ] && cp "$f" "$E/scene/img/"; done
cd "$E"; rm -rf chk; python3 render.py stills "$@"
python3 - "$EP/stills.jpg" "$@" <<'PY'
import sys; from PIL import Image
ts=sys.argv[2:]; W,H=270,480; n=len(ts); cols=min(n,9); rows=(n+cols-1)//cols
sh=Image.new('RGB',(W*cols,H*rows))
for i,t in enumerate(ts): sh.paste(Image.open(f'chk/st/{float(t)}.jpg').resize((W,H)),((i%cols)*W,(i//cols)*H))
sh.save(sys.argv[1])
PY
