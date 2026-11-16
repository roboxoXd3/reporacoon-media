"""Tighten pauses in the voice and estimate word timings without a speech recogniser.
usage: python3 align.py <episode_dir>
Reads   <ep>/script.json  = [["R" | "I", "line text"], ...]  (speaker per TTS block, in order)
        <ep>/vo_raw.wav   (the AI Studio download; falls back to vo.wav)
Writes  <ep>/vo.wav (pauses longer than MAXGAP shortened), <ep>/words.json, <ep>/words.js
Each speech block is matched to the speech between pauses by text length; inside a block,
words are spread over the speaking time (pauses excluded) by syllable-ish weight, and pauses are skipped,
so sentence ends land on pauses when the text-length estimate is close."""
import sys, json, re, subprocess, wave, os
import numpy as np

EP = sys.argv[1]
SR = 24000; MAXGAP = 0.32; KEEP = 0.26; THR_DB = -40; MIN_SIL = 0.12
src = os.path.join(EP, 'vo_raw.wav') if os.path.exists(os.path.join(EP, 'vo_raw.wav')) else os.path.join(EP, 'vo.wav')
if not os.path.exists(os.path.join(EP, 'vo_raw.wav')): os.rename(src, os.path.join(EP, 'vo_raw.wav')); src = os.path.join(EP, 'vo_raw.wav')
raw = subprocess.run(['ffmpeg', '-v', 'error', '-i', src, '-ar', str(SR), '-ac', '1', '-f', 's16le', '-'], capture_output=True).stdout
x = np.frombuffer(raw, np.int16).astype(np.float32) / 32768


def silences(x):
    hop = int(0.01 * SR); n = len(x) // hop
    e = np.sqrt(np.mean(x[:n * hop].reshape(n, hop) ** 2, 1) + 1e-12)
    quiet = 20 * np.log10(e) < THR_DB; out = []; i = 0
    while i < n:
        if quiet[i]:
            j = i
            while j < n and quiet[j]: j += 1
            if (j - i) * 0.01 >= MIN_SIL: out.append([i * 0.01, j * 0.01])
            i = j
        else: i += 1
    return out


# 1) shorten long pauses (keep lead/trail silence short too)
sil = silences(x); keep = []; t = 0.0
for a, b in sil:
    if a <= 0.0: a2 = max(a, b - 0.08); keep.append((t, a)); t = a2; continue
    if b - a > MAXGAP: keep.append((t, a + KEEP / 2)); t = b - KEEP / 2
keep.append((t, len(x) / SR))
y = np.concatenate([x[int(a * SR):int(b * SR)] for a, b in keep if b > a])
tail = silences(y)
if tail and tail[-1][1] >= len(y) / SR - 0.02: y = y[:int((tail[-1][0] + 0.15) * SR)]
with wave.open(os.path.join(EP, 'vo.wav'), 'wb') as w:
    w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR); w.writeframes((np.clip(y, -1, 1) * 32767).astype(np.int16).tobytes())

# 2) speech chunks on the tightened audio
sil = [s for s in silences(y) if s[1] - s[0] >= 0.16]
dur = len(y) / SR; chunks = []; t = 0.0
for a, b in sil:
    if a > t + 0.05: chunks.append([t, a])
    t = b
if dur > t + 0.05: chunks.append([t, dur])

script = json.load(open(os.path.join(EP, 'script.json')))
wgt = lambda w: len(re.sub(r'[^A-Za-z0-9]', '', w)) + 1.5 + (2.5 if re.search(r'[.,!?]$', w) else 0)
lines = [(sp, txt.split()) for sp, txt in script]
lw = [sum(wgt(w) for w in ws) for _, ws in lines]

# 3) assign chunks to lines: dynamic programming on duration share vs text share
spk = [c[1] - c[0] for c in chunks]; C, L = len(chunks), len(lines)
tot_s, tot_w = sum(spk), sum(lw)
INF = 1e9; cost = np.full((L + 1, C + 1), INF); back = np.zeros((L + 1, C + 1), int); cost[0][0] = 0
for i in range(1, L + 1):
    for j in range(i, C - (L - i) + 1):
        for k in range(i - 1, j):
            if cost[i - 1][k] >= INF: continue
            d = sum(spk[k:j]) / tot_s - lw[i - 1] / tot_w
            c = cost[i - 1][k] + d * d
            if c < cost[i][j]: cost[i][j] = c; back[i][j] = k
groups = []; j = C
for i in range(L, 0, -1): k = back[i][j]; groups.append((k, j)); j = k
groups.reverse()

# 4) spread words over the speaking time of each line, snapping sentence ends to pauses
W = []
for (sp, ws), (k, j) in zip(lines, groups):
    segs = chunks[k:j]; seg_t = sum(b - a for a, b in segs)
    ww = [wgt(w) for w in ws]; tw = sum(ww); acc = 0.0
    def at(p):  # p in [0, seg_t] speaking time -> real time
        for a, b in segs:
            if p <= b - a + 1e-9: return a + p
            p -= b - a
        return segs[-1][1]
    starts = []
    for w, g in zip(ws, ww): starts.append(acc / tw * seg_t); acc += g
    for n, w in enumerate(ws):
        s = at(starts[n] + 1e-4); e = at(starts[n + 1] - 1e-4) if n + 1 < len(ws) else segs[-1][1]
        W.append({'w': w, 's': round(s, 3), 'e': round(max(e, s + 0.08), 3), 'sp': sp})
json.dump(W, open(os.path.join(EP, 'words.json'), 'w'))
open(os.path.join(EP, 'words.js'), 'w').write('const WORDS=' + json.dumps(W) + ';')
print(f'voice {len(x)/SR:.1f}s -> {dur:.1f}s, {len(chunks)} chunks, {len(W)} words')
for i, w in enumerate(W): print(i, w['w'], w['s'], w['sp'], end=' | ' if (i + 1) % 6 else '\n')
print()
