// Episode 3 (skit format): LocalSend. Teacher = Repo Raccoon (right), student = penguin intern (left).
const DURATION = 37.0;
const ink = '#1d2340', red = '#E5352B';
const S = [];
function scene(a, b, build) { const l = layer(''); const r = build(l, a, b); S.push({ a, b, l, r }); }
const end = (i) => W[i].e;

// word list on a light board or dark bg: items [text, italic, at, color?]
function words(l, items, top, size, color = ink, font = 'Serif', left = null) {
  const h = $(`<div style="position:absolute;${left === null ? 'left:0;right:0;text-align:center' : 'left:' + left + 'px'};top:${top}px;font-family:${font};font-weight:800;font-size:${size}px;line-height:1.05;color:${color};letter-spacing:-1px"></div>`);
  const parts = items.map(([w, it, at, c]) => { const s = $(`<span style="display:inline-block;opacity:0;${c ? 'color:' + c : ''}">${it ? '<i>' + w + '</i>' : w}</span>`); h.appendChild(s); h.appendChild(document.createTextNode(' ')); return [s, at]; });
  l.appendChild(h);
  return (t) => parts.forEach(([s, at]) => { const k = eOut(prog(t, at - 0.05, at + 0.16)); s.style.opacity = k; s.style.transform = `translateY(${(1 - k) * 22}px)`; s.style.filter = `blur(${(1 - k) * 6}px)`; });
}
function popIn(el, t, at, rot = 0, dur = 0.28) { const k = eBack(prog(t, at, at + dur)); el.style.opacity = prog(t, at, at + 0.06); el.style.transform = `scale(${0.3 + 0.7 * k}) rotate(${rot * (2 - k)}deg)`; }
function wipe(el, t, at, dur = 0.35) { const k = eIO(prog(t, at, at + dur)); el.style.clipPath = `inset(-20px ${100 - 100 * k}% -20px -20px)`; el.style.opacity = k > 0 ? 1 : 0; }
function stroke(svgEl, t, at, dur = 0.3) { const L = svgEl.getTotalLength ? svgEl.getTotalLength() : 1000; svgEl.style.strokeDasharray = L; svgEl.style.strokeDashoffset = L * (1 - eOut(prog(t, at, at + dur))); }
function board(l) { l.appendChild($(`<div class="board"></div>`)); }
function kick(l, txt, top = 240, color = '#8a8577') { const k = $(`<div class="kick" style="top:${top}px;color:${color}">${txt}</div>`); l.appendChild(k); return k; }
const PHONE_SVG = `<svg viewBox="0 0 120 200" width="150"><rect x="6" y="6" width="108" height="188" rx="22" fill="${ink}"/><rect x="16" y="22" width="88" height="150" rx="8" fill="#9FF0CF"/><circle cx="60" cy="183" r="5" fill="#fff"/></svg>`;
const LAPTOP_SVG = (w) => `<svg viewBox="0 0 260 170" width="${w}"><rect x="30" y="6" width="200" height="130" rx="12" fill="${ink}"/><rect x="42" y="18" width="176" height="106" rx="4" fill="#BFD0FF"/><path d="M6 140 H254 L240 162 H20 Z" fill="${ink}"/></svg>`;

// ---------- background ----------
const BG = layer('brand'); BG.style.opacity = 1;
glows(BG, [[150, 300, 320, '#5f7bff'], [950, 1500, 360, '#1124a0']]);
BG.appendChild($(`<div style="position:absolute;left:0;right:0;top:1640px;bottom:0;background:linear-gradient(#1a2fae,#14238a)"></div>`));

// ---------- P1: the task (hook) ----------
scene(0, 4.62, (l) => {
  board(l); const k = kick(l, "TODAY'S TASK", 250);
  const w1 = words(l, [['Send', 0, wt(0)], ['a', 0, wt(1)], ['4 GB', 1, wt(2), red], ['video', 0, wt(4)]], 320, 104);
  const w2 = words(l, [['phone', 0, wt(7)], ['to', 0, wt(8)], ['laptop.', 1, wt(10)]], 440, 84, '#5b6075');
  const ph = $(`<div style="position:absolute;left:200px;top:580px">${PHONE_SVG}</div>`); l.appendChild(ph);
  const lp = $(`<div style="position:absolute;left:640px;top:620px">${LAPTOP_SVG(260)}</div>`); l.appendChild(lp);
  const dash = $(`<svg style="position:absolute;left:0;top:0;width:1080px;height:1920px"><path d="M370 680 Q 520 560 650 680" fill="none" stroke="#b8b3a3" stroke-width="8" stroke-dasharray="4 22" stroke-linecap="round"/></svg>`); l.appendChild(dash);
  const chip = $(`<div class="chip" style="left:0;top:0">4 GB</div>`); l.appendChild(chip);
  const s1 = $(`<div class="stamp" style="left:110px;top:840px">NO CABLE</div>`); l.appendChild(s1);
  const s2 = $(`<div class="stamp" style="left:520px;top:840px">NO INTERNET</div>`); l.appendChild(s2);
  const tm = $(`<div class="timer" style="left:385px;top:560px;opacity:0">00:10</div>`); l.appendChild(tm);
  return (t) => {
    k.style.opacity = prog(t, 0, 0.2); w1(t); w2(t);
    popIn(ph, t, wt(6), -6); popIn(lp, t, wt(9), 6); dash.style.opacity = prog(t, wt(8), wt(8) + 0.2);
    const kc = eIO(prog(t, wt(7), wt(10) + 0.25)); const x = lerp(330, 640, kc), y = 650 - Math.sin(kc * Math.PI) * 110;
    chip.style.left = (x - 60) + 'px'; chip.style.top = (y - 40) + 'px'; chip.style.opacity = prog(t, wt(7) - 0.1, wt(7)) * (1 - prog(t, wt(11) - 0.1, wt(11)));
    popIn(s1, t, wt(11), -14, 0.22); popIn(s2, t, wt(13), 10, 0.22);
    if (t >= wt(15)) { tm.style.opacity = 1; const k2 = eBack(prog(t, wt(15), wt(15) + 0.25)); tm.style.transform = `scale(${0.4 + 0.6 * k2})`; tm.textContent = '00:' + String(10 - Math.floor((t - wt(15)) * 2)).padStart(2, '0'); }
    else tm.style.opacity = 0;
  };
});

// ---------- P2: the intern's over-engineered plan ----------
scene(4.62, 13.15, (l) => {
  board(l); kick(l, "THE INTERN'S PLAN", 250);
  const items = [['1. Build a local server', wt(18)], ['2. Write an Android app', wt(22)], ['3. Write a desktop app', wt(25)], ['4. Add encryption', wt(28)]]
    .map(([txt, at], i) => { const e = $(`<div class="hand" style="left:140px;top:${330 + i * 105}px;font-size:70px">${txt}</div>`); l.appendChild(e); return [e, at]; });
  const eta = $(`<div class="hand" style="left:140px;top:780px;font-size:96px;color:${red}">ETA:</div>`); l.appendChild(eta);
  const three = $(`<div class="hand" style="left:400px;top:780px;font-size:96px;color:${red}">3</div>`); l.appendChild(three);
  const months = $(`<div class="hand" style="left:470px;top:780px;font-size:96px;color:${red}">months</div>`); l.appendChild(months);
  const svg = $(`<svg style="position:absolute;left:0;top:0;width:1080px;height:1920px;overflow:visible">
     <ellipse cx="585" cy="838" rx="240" ry="78" fill="none" stroke="${red}" stroke-width="8" transform="rotate(-4 585 838)"/>
     <line x1="385" y1="870" x2="455" y2="800" stroke="${ink}" stroke-width="12" stroke-linecap="round"/></svg>`); l.appendChild(svg);
  const [ell, strike] = svg.children;
  const two = $(`<div class="hand" style="left:397px;top:690px;font-size:90px;color:${ink}">2?</div>`); l.appendChild(two);
  return (t) => {
    items.forEach(([e, at]) => wipe(e, t, at, 0.45));
    [eta, three, months].forEach((e) => wipe(e, t, wt(31), 0.4)); stroke(ell, t, wt(33), 0.4);
    const sh = prog(t, wt(34), wt(35) + 0.3); l.style.transform = sh > 0 && sh < 1 ? `translateX(${Math.sin(sh * 40) * 14 * (1 - sh)}px)` : '';
    stroke(strike, t, wt(37) - 0.05, 0.15); wipe(two, t, wt(37), 0.25);
  };
});

// ---------- P3: rule #1 ----------
scene(13.15, 17.05, (l) => {
  board(l); kick(l, "THE INTERN'S PLAN", 250);
  ['1. Build a local server', '2. Write an Android app', '3. Write a desktop app', '4. Add encryption'].forEach((txt, i) => l.appendChild($(`<div class="hand" style="left:140px;top:${330 + i * 105}px;font-size:70px;opacity:.35">${txt}</div>`)));
  const x = $(`<svg style="position:absolute;left:0;top:0;width:1080px;height:1920px"><line x1="150" y1="300" x2="930" y2="900" stroke="${red}" stroke-width="26" stroke-linecap="round"/><line x1="930" y1="300" x2="150" y2="900" stroke="${red}" stroke-width="26" stroke-linecap="round"/></svg>`); l.appendChild(x);
  const card = $(`<div style="position:absolute;left:110px;right:110px;top:330px;height:560px;border-radius:40px;background:${ink};box-shadow:0 40px 100px rgba(0,0,0,.5)"></div>`); l.appendChild(card);
  const badge = $(`<div class="badge y" style="left:395px;top:380px">RULE #1</div>`); l.appendChild(badge);
  const w = words(l, [['Before', 0, wt(41)], ['you', 0, wt(42)], ['build,', 0, wt(43)]], 500, 76, '#c9cde0');
  const w2 = words(l, [['check', 0, wt(45)], ['what', 0, wt(46)], ['already', 1, wt(47), '#FFC83D'], ['exists.', 1, wt(48), '#FFC83D']], 620, 66, '#fff');
  return (t) => {
    stroke(x.children[0], t, wt(38), 0.22); stroke(x.children[1], t, wt(38) + 0.18, 0.22);
    const k = eOut(prog(t, wt(40), wt(41))); card.style.opacity = k; card.style.transform = `translateY(${(1 - k) * 120}px) rotate(${(1 - k) * -4}deg)`;
    popIn(badge, t, wt(40) + 0.2, -8); w(t); w2(t);
  };
});

// ---------- P4: reveal ----------
scene(17.05, 23.05, (l) => {
  const kk = kick(l, 'IT ALREADY EXISTS', 240, 'rgba(255,255,255,.6)');
  const logo = $(`<div class="ls" style="top:300px"><svg viewBox="0 0 100 100" width="130"><path d="M12 48 L88 14 L66 88 L48 60 Z" fill="#fff"/><path d="M48 60 L88 14" stroke="#0e9e8a" stroke-width="6"/></svg></div>`); l.appendChild(logo);
  const title = $(`<div class="title" style="top:540px;font-size:160px">LocalSend</div>`); l.appendChild(title);
  const row1 = $(`<div style="position:absolute;left:0;right:0;top:760px;display:flex;justify-content:center;gap:22px"></div>`); l.appendChild(row1);
  const p1 = [['97k ★ on GitHub', wt(51) + 0.35], ['Free', wt(52)], ['Open source', wt(53)]].map(([s, at]) => { const e = $(`<div class="pill" style="${s === 'Free' ? 'background:#FFC83D' : ''}">${s}</div>`); row1.appendChild(e); return [e, at]; });
  const row2 = $(`<div style="position:absolute;left:0;right:0;top:880px;display:flex;justify-content:center;gap:16px"></div>`); l.appendChild(row2);
  const p2 = [['Android', 59], ['iPhone', 60], ['Windows', 61], ['Mac', 62], ['Linux', 64]].map(([s, i]) => { const e = $(`<div class="pill" style="font-size:36px;padding:12px 24px;background:rgba(255,255,255,.14);color:#fff">${s}</div>`); row2.appendChild(e); return [e, wt(i)]; });
  const fl = $(`<div class="flash"></div>`); l.appendChild(fl);
  return (t) => {
    kk.style.opacity = prog(t, 17.05, 17.3); popIn(logo, t, 17.2, -12, 0.35);
    const k = eBack(prog(t, wt(51), wt(51) + 0.3)); title.style.opacity = prog(t, wt(51), wt(51) + 0.05); title.style.transform = `scale(${0.6 + 0.4 * k})`;
    fl.style.opacity = 0.85 * (1 - prog(t, wt(51), wt(51) + 0.3)) * (t >= wt(51) ? 1 : 0);
    p1.forEach(([e, at]) => popIn(e, t, at, 6)); p2.forEach(([e, at]) => popIn(e, t, at, -6, 0.22));
    logo.style.marginTop = Math.sin(t * 2.4) * 8 + 'px';
  };
});

// ---------- P5: demo ----------
scene(23.05, 29.6, (l) => {
  const wifi = $(`<div class="chip" style="left:380px;top:200px;background:#fff">Same Wi-Fi</div>`); l.appendChild(wifi);
  const ph = $(`<div class="phone" style="left:90px;top:290px;width:380px;height:740px"><div class="notch"></div><div class="scr"><img src="img/ls_phone.png" style="width:348px;height:705px"></div></div>`); l.appendChild(ph);
  const lp = $(`<div style="position:absolute;left:560px;top:420px">${LAPTOP_SVG(440)}</div>`); l.appendChild(lp);
  const done = $(`<div style="position:absolute;left:640px;top:470px;width:275px;text-align:center;font-family:Sans;font-weight:800;font-size:66px;color:${ink};opacity:0">Done ✓</div>`); l.appendChild(done);
  const bar = $(`<div class="bar" style="left:600px;top:740px;width:360px"><i style="width:0"></i></div>`); l.appendChild(bar);
  const pct = $(`<div style="position:absolute;left:600px;top:775px;width:360px;text-align:center;font-family:Mono;font-weight:700;font-size:34px;color:#fff">0%</div>`); l.appendChild(pct);
  const chip = $(`<div class="chip" style="left:0;top:0">video.mp4 · 4 GB</div>`); l.appendChild(chip);
  const tap = ripple(l);
  const row = $(`<div style="position:absolute;left:520px;top:850px;display:flex;flex-direction:column;gap:14px;align-items:flex-start"></div>`); l.appendChild(row);
  const bs = [['No account', 75], ['No internet', 77], ['Encrypted', 79]].map(([s, i]) => { const e = $(`<div class="pill" style="font-size:38px;padding:10px 26px">${s}</div>`); row.appendChild(e); return [e, wt(i) - 0.1]; });
  footer(l, 'LocalSend · Apache-2.0 · app screenshot: localsend.org');
  const t0 = wt(70) + 0.15, t1 = wt(73) - 0.05;
  return (t) => {
    popIn(wifi, t, wt(65), -6); const kp = eOut(prog(t, 23.05, 23.5)); ph.style.transform = `translateY(${(1 - kp) * 160}px) rotate(${(1 - kp) * -6}deg)`;
    popIn(lp, t, 23.3, 4); tap(t, wt(70), 280, 600);
    const kc = eIO(prog(t, t0, t1)); chip.style.opacity = (t > t0 && t < t1 + 0.15) ? 1 : 0;
    chip.style.left = lerp(150, 590, kc) + 'px'; chip.style.top = (640 - Math.sin(kc * Math.PI) * 200) + 'px'; chip.style.transform = `rotate(${Math.sin(kc * 6) * 6}deg)`;
    bar.firstChild.style.width = (100 * kc) + '%'; pct.textContent = Math.round(100 * kc) + '%';
    popIn(done, t, wt(73), -8); bs.forEach(([e, at]) => popIn(e, t, at, 6, 0.22));
    bar.style.opacity = pct.style.opacity = 1 - prog(t, wt(74), wt(74) + 0.2);
  };
});

// ---------- P6: what about my 3 months ----------
scene(29.6, 32.1, (l) => {
  board(l); kick(l, "THE INTERN'S CALENDAR", 250);
  const m = $(`<div class="hand" style="left:0;right:0;text-align:center;top:380px;font-size:150px;color:${red}">3 months</div>`); l.appendChild(m);
  const svg = $(`<svg style="position:absolute;left:0;top:0;width:1080px;height:1920px"><line x1="190" y1="480" x2="890" y2="470" stroke="${ink}" stroke-width="16" stroke-linecap="round"/></svg>`); l.appendChild(svg);
  const fr = words(l, [['now', 0, wt(86)], ['free.', 1, wt(88), '#0e9e8a']], 620, 120);
  return (t) => { const k = eBack(prog(t, 29.65, 29.95)); m.style.opacity = prog(t, 29.65, 29.7); m.style.transform = `scale(${0.6 + 0.4 * k})`; stroke(svg.children[0], t, wt(83), 0.3); fr(t); };
});

// ---------- P7: CTA ----------
scene(32.1, DURATION + 1, (l) => {
  const h = words(l, [['Build', 0, wt(89)], ['something', 0, wt(90)], ['that', 0, wt(91)], ["doesn't", 0, wt(92)]], 240, 76, '#fff');
  const h2 = words(l, [['exist', 1, wt(93), '#FFC83D'], ['yet.', 1, wt(94), '#FFC83D']], 400, 140, '#fff');
  const card = $(`<div class="card" style="top:620px;text-align:center"><div style="font-size:46px;font-weight:700;color:#c9cde0">Want the link?</div><div style="margin-top:18px;font-size:76px;font-weight:800">Comment <span class="pill" style="font-size:76px;background:#FFC83D;padding:8px 34px">SEND</span></div></div>`); l.appendChild(card);
  const hd = $(`<div class="kick" style="top:950px;color:#fff;font-size:40px">@reporacoon</div>`); l.appendChild(hd);
  return (t) => { h(t); h2(t); popIn(card, t, wt(95), -3, 0.32); hd.style.opacity = prog(t, wt(99), wt(99) + 0.3); };
});

// ---------- characters ----------
const CH = layer(''); CH.style.opacity = 1;
function character(side, poses, sched, h, cx, flip = {}) {
  const els = {}; poses.forEach((p) => { const e = $(`<img class="char" src="img/m/${p}.png" style="height:${h}px;display:none">`); CH.appendChild(e); els[p] = e; });
  return (t, speaking, lastWord) => {
    let cur = sched[0]; sched.forEach((s) => { if (t >= s[0]) cur = s; });
    Object.values(els).forEach((e) => (e.style.display = 'none'));
    if (!cur[1]) return; const e = els[cur[1]]; e.style.display = 'block';
    const w = e.naturalWidth * h / e.naturalHeight; e.style.left = (cx - w / 2) + 'px';
    const kp = eBack(prog(t, cur[0], cur[0] + 0.22)); const pop = 0.9 + 0.1 * kp;
    const kb = speaking ? Math.sin(Math.PI * prog(t, lastWord, lastWord + 0.2)) : 0;
    const enter = cur[2] ? eOut(prog(t, cur[0], cur[0] + 0.4)) : 1;
    e.style.transform = `translateX(${(1 - enter) * (side === 'L' ? -700 : 700)}px) scaleX(${flip[cur[1]] ? -1 : 1}) scale(${pop}) scaleY(${1 + 0.035 * kb}) rotate(${Math.sin(t * 1.7 + (side === 'L' ? 1 : 0)) * 1.2}deg)`;
    e.style.filter = speaking ? 'none' : 'brightness(.88)';
  };
}
const raccoon = character('R', ['r_cross', 'point', 'r_present', 'thumbs', 'shock'],
  [[0, 'r_cross'], [13.1, 'point'], [17.0, 'r_present'], [25.9, 'thumbs'], [29.6, 'r_cross'], [32.1, 'r_present'], [34.1, 'point']], 610, 790);
const penguin = character('L', ['p_smug', 'p_explain', 'p_shock', 'p_embar', 'p_think', 'p_celebrate'],
  [[0, null], [4.55, 'p_smug', 1], [5.25, 'p_explain'], [9.3, 'p_smug'], [10.65, 'p_shock'], [11.85, 'p_embar'], [14.4, 'p_think'], [17.6, 'p_shock'], [20.4, 'p_smug'], [23.2, 'p_think'], [25.95, 'p_celebrate'], [29.6, 'p_think'], [32.2, 'p_embar'], [34.2, 'p_celebrate']], 640, 285);

// ---------- speech bubbles ----------
const BB = layer(''); BB.style.opacity = 1;
const G = [[0, 10], [11, 15], [16, 21], [22, 29], [30, 33], [34, 35], [36, 37], [38, 40], [41, 48], [49, 51], [52, 58], [59, 64], [65, 72], [73, 73], [74, 79], [80, 88], [89, 94], [95, 102]];
const ACC = [2, 3, 12, 14, 15, 32, 33, 34, 35, 37, 47, 48, 51, 52, 54, 73, 79, 88, 93, 96];
const bubbles = G.map(([a, b], gi) => {
  const sp = W[a].sp; const isI = sp === 'I';
  const e = $(`<div class="bubble ${isI ? 'i' : ''}" style="bottom:590px;${isI ? 'left:50px' : 'right:50px'}"><div class="who" style="${isI ? 'left:36px' : 'right:36px'}">${isI ? 'INTERN' : 'REPO RACCOON'}</div><div class="tail" style="${isI ? 'left:150px' : 'right:200px'}"></div></div>`);
  const spans = []; for (let i = a; i <= b; i++) { const s = $(`<span>${W[i].w}</span>`); if (ACC.includes(i)) s.style.color = isI ? '#0b6b55' : '#2443E8'; e.appendChild(s); e.appendChild(document.createTextNode(' ')); spans.push([s, i]); }
  BB.appendChild(e);
  const next = G[gi + 1] ? W[G[gi + 1][0]].s : DURATION;
  const on = W[a].s - 0.08, off = Math.min(next - 0.04, W[b].e + 0.7);
  e.style.transformOrigin = isI ? '20% 120%' : '80% 120%';
  return (t) => {
    if (t < on || t >= off) { e.style.opacity = 0; return; }
    const k = eBack(prog(t, on, on + 0.18)); e.style.opacity = 1; e.style.transform = `scale(${0.8 + 0.2 * k})`;
    spans.forEach(([s, i]) => { s.style.opacity = t >= W[i].s - 0.04 ? 1 : 0.22; });
  };
});

// ---------- master ----------
window.render = (t) => {
  S.forEach((s, i) => {
    const on = t >= s.a - (i ? FADE : 0) && t < s.b + FADE;
    s.l.style.display = on ? 'block' : 'none'; if (!on) return;
    const fin = i ? prog(t, s.a - FADE, s.a + FADE) : 1, fout = 1 - prog(t, s.b - FADE, s.b + FADE);
    s.l.style.opacity = Math.min(fin, fout); s.r(t);
  });
  let cur = null; for (const w of W) if (w.s <= t) cur = w;
  const speaking = cur && t < cur.e + 0.35 ? cur.sp : null;
  raccoon(t, speaking === 'R', cur ? cur.s : 0); penguin(t, speaking === 'I', cur ? cur.s : 0);
  bubbles.forEach((b) => b(t));
};
