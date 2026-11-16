// ---------- helpers ----------
const $ = (h) => { const d = document.createElement('div'); d.innerHTML = h.trim(); return d.firstChild; };
const stage = document.getElementById('stage');
const clamp = (x, a = 0, b = 1) => Math.max(a, Math.min(b, x));
const lerp = (a, b, k) => a + (b - a) * k;
const prog = (t, a, b) => clamp((t - a) / (b - a));
const eOut = (k) => 1 - Math.pow(1 - k, 3);
const eIO = (k) => k < .5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2;
const eBack = (k) => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * Math.pow(k - 1, 3) + c1 * Math.pow(k - 1, 2); };
const W = WORDS;
const wt = (i) => W[i].s;              // start time of word i
const FADE = 0.14;
const HANDLE = '@reporacoon', CHANNEL = 'Repo Raccoon';

// ---------- building blocks ----------
function layer(cls) { const l = $(`<div class="layer ${cls}"></div>`); stage.appendChild(l); return l; }
function glows(l, colors) {
  colors.forEach(([x, y, r, c]) => l.appendChild($(`<div class="glow" style="left:${x - r}px;top:${y - r}px;width:${2 * r}px;height:${2 * r}px;background:${c}"></div>`)));
}
function mascot(l, name, width = 900, bottom = 0) {
  const m = $(`<img class="mascot" src="img/m/${name}.png" style="width:${width}px;bottom:${bottom}px;margin-left:${-width / 2}px">`);
  l.appendChild(m); return m;
}
function bursts(l, x, y, s = 1) { // three yellow "pop" strokes, original drawing
  const b = $(`<svg style="position:absolute;left:${x}px;top:${y}px;width:${150 * s}px;height:${150 * s}px;overflow:visible" viewBox="0 0 150 150">
    <g stroke="#FFC83D" stroke-width="16" stroke-linecap="round">
    <line x1="20" y1="80" x2="2" y2="30"/><line x1="60" y1="62" x2="78" y2="8"/><line x1="92" y1="98" x2="140" y2="70"/></g></svg>`);
  l.appendChild(b); return b;
}
function caption(l, idxs, accents = [], top = 1250, size = 66) {
  const c = $(`<div class="cap" style="top:${top}px;font-size:${size}px"></div>`);
  const spans = idxs.map(i => {
    const raw = W[i].w; const s = $(`<span>${raw}</span>`);
    if (accents.includes(i)) s.classList.add('a');
    c.appendChild(s); c.appendChild(document.createTextNode(' ')); return [s, i];
  });
  l.appendChild(c);
  return (t) => spans.forEach(([s, i]) => { const k = eOut(prog(t, wt(i) - 0.06, wt(i) + 0.12)); s.style.opacity = k; s.style.transform = `translateY(${(1 - k) * 18}px)`; });
}
function footer(l, txt) { l.appendChild($(`<div class="foot" style="bottom:auto;top:1028px;color:rgba(255,255,255,.45)">${txt}</div>`)); }
function shot(l, img, iw, ih, box) { // camera card
  const s = $(`<div class="shot" style="left:${box.x}px;top:${box.y}px;width:${box.w}px;height:${box.h}px"><img src="img/${img}" style="width:${iw}px;height:${ih}px"></div>`);
  l.appendChild(s); const im = s.querySelector('img');
  return { el: s, cam(cx, cy, sw) { const z = box.w / sw; im.style.transform = `translate(${box.w / 2 - cx * z}px,${box.h / 2 - cy * z}px) scale(${z})`; } };
}
function headline(l, lines, top = 230, size = 112) { // lines: [[wordIndex|string, italic?],...]
  const h = $(`<div class="headline" style="top:${top}px;font-size:${size}px"></div>`); const parts = [];
  lines.forEach((ln, li) => {
    ln.forEach(([w, it, at]) => {
      const s = $(`<span style="display:inline-block;opacity:0">${it ? '<i>' + w + '</i>' : w}</span>`); h.appendChild(s); h.appendChild(document.createTextNode(' ')); parts.push([s, at]);
    }); if (li < lines.length - 1) h.appendChild(document.createElement('br'));
  });
  l.appendChild(h);
  return (t) => parts.forEach(([s, at]) => { const k = eOut(prog(t, at - 0.05, at + 0.16)); s.style.opacity = k; s.style.transform = `translateY(${(1 - k) * 24}px)`; s.style.filter = `blur(${(1 - k) * 8}px)`; });
}

function ripple(l) { const r = $(`<div class="finger" style="opacity:0;z-index:9"></div>`); l.appendChild(r);
  return (t, at, x, y) => { const k = prog(t, at, at + 0.5); r.style.opacity = (k > 0 && k < 1) ? 1 - k : 0; r.style.left = (x - 55) + 'px'; r.style.top = (y - 55) + 'px'; r.style.transform = `scale(${0.4 + 1.3 * k})`; }; }
