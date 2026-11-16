"""Original music bed + SFX under the voiceover. usage: python3 audio.py vo.wav sfx.json mix.wav
sfx.json = {"dur": 37.0, "whoosh": [t,...], "pop": [...], "pophi": [...], "thud": [...], "click": [...], "ding": [...]} (seconds)."""
import sys
CFG = __import__("json").load(open(sys.argv[2]))
import numpy as np, json, subprocess, wave

SR = 48000; DUR = float(CFG["dur"]); N = int(SR * DUR)
rng = np.random.default_rng(7)
t = np.arange(N) / SR


def lp(x, a):  # one-pole low-pass
    y = np.empty_like(x); acc = 0.0
    for i, v in enumerate(x): acc += a * (v - acc); y[i] = acc
    return y


def env(n, a=0.005, d=0.2):
    e = np.exp(-np.arange(n) / SR / d); k = int(a * SR); e[:k] *= np.linspace(0, 1, k); return e


def note(f): return 440 * 2 ** ((f - 69) / 12)


# ---- music: 100 bpm, Am - F - C - G pads + pluck + kick/hat ----
bpm = 100; beat = 60 / bpm; bar = 4 * beat
chords = [[57, 60, 64], [53, 57, 60], [48, 52, 55], [55, 59, 62]]
mus = np.zeros(N)
for b in range(int(DUR / bar) + 1):
    ch = chords[b % 4]; s0 = int(b * bar * SR); n = min(int(bar * SR), N - s0)
    if n <= 0: break
    tt = np.arange(n) / SR
    pad = sum(np.sin(2 * np.pi * note(m) * tt) + 0.3 * np.sin(2 * np.pi * note(m) * 2.003 * tt) for m in ch)
    pad *= np.minimum(1, tt / 0.3) * np.minimum(1, (bar - tt) / 0.3) * 0.05
    mus[s0:s0 + n] += pad
    for k in range(8):  # eighth-note pluck arpeggio
        s = s0 + int(k * beat / 2 * SR); m = ch[[0, 1, 2, 1][k % 4]] + 12; L = int(0.35 * SR)
        if s + L > N: continue
        tt2 = np.arange(L) / SR
        mus[s:s + L] += 0.06 * np.sin(2 * np.pi * note(m) * tt2) * env(L, 0.002, 0.12)
for k in range(int(DUR / beat)):
    s = int(k * beat * SR); L = int(0.25 * SR)
    if s + L > N: break
    tt = np.arange(L) / SR
    mus[s:s + L] += 0.35 * np.sin(2 * np.pi * (50 + 90 * np.exp(-tt * 30)) * tt) * env(L, 0.001, 0.09)  # kick
    h = int((k + 0.5) * beat * SR); HL = int(0.05 * SR)
    if h + HL < N: mus[h:h + HL] += 0.05 * np.diff(np.r_[0, rng.standard_normal(HL)]) * env(HL, 0.0005, 0.015)  # hat
mus[:int(0.4 * SR)] *= np.linspace(0, 1, int(0.4 * SR))
mus[-int(1.2 * SR):] *= np.linspace(1, 0, int(1.2 * SR))

# ---- SFX ----
sfx = np.zeros(N)
def add(x, at, g=1.0):
    s = int(at * SR); e = min(N, s + len(x)); sfx[s:e] += g * x[:e - s]
def whoosh(d=0.35):
    L = int(d * SR); n = rng.standard_normal(L); sw = np.linspace(0.02, 0.35, L)
    y = np.empty(L); acc = 0.0
    for i in range(L): acc += sw[i] * (n[i] - acc); y[i] = acc
    return y * np.sin(np.linspace(0, np.pi, L)) ** 2 * 0.5
def pop(f=900):
    L = int(0.09 * SR); tt = np.arange(L) / SR; return np.sin(2 * np.pi * f * (1 + 2 * np.exp(-tt * 60)) * tt) * env(L, 0.001, 0.03) * 0.5
def click():
    L = int(0.03 * SR); return rng.standard_normal(L) * env(L, 0.0003, 0.006) * 0.6

def ding():
    L = int(0.6 * SR); tt = np.arange(L) / SR
    return (np.sin(2*np.pi*1318*tt) + 0.5*np.sin(2*np.pi*1975*tt)) * env(L, 0.002, 0.25) * 0.45
def thud():
    L = int(0.18 * SR); tt = np.arange(L) / SR
    return np.sin(2*np.pi*(60 + 120*np.exp(-tt*25))*tt) * env(L, 0.001, 0.07) * 0.9
for at in CFG.get("whoosh", []): add(whoosh(), at - 0.17, 0.8)
for at in CFG.get("pop", []): add(pop(600), at, 0.8)
for at in CFG.get("pophi", []): add(pop(1200), at, 0.45)
for at in CFG.get("thud", []): add(thud(), at, 0.9)
for at in CFG.get("click", []): add(click(), at, 0.9)
for at in CFG.get("ding", []): add(ding(), at, 0.8)

# ---- voice + mix ----
raw = subprocess.run(['ffmpeg', '-v', 'error', '-i', sys.argv[1], '-ar', str(SR), '-ac', '1', '-f', 's16le', '-'], capture_output=True).stdout
vo = np.frombuffer(raw, np.int16).astype(float) / 32768
v = np.zeros(N); v[:min(N, len(vo))] = vo[:N]
# duck music while voice is active
lvl = np.sqrt(np.convolve(v ** 2, np.ones(2400) / 2400, 'same'))
duck = 1 - 0.55 * np.clip(lvl / 0.05, 0, 1); duck = np.convolve(duck, np.ones(4800) / 4800, 'same')
mix = v * 1.0 + mus * duck * 0.55 + sfx * 0.5
mix = mix / max(1e-9, np.abs(mix).max()) * 0.9
st = np.stack([mix, mix], 1)
with wave.open(sys.argv[3], 'wb') as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes((st * 32767).astype(np.int16).tobytes())
print('ok', len(mix) / SR)
