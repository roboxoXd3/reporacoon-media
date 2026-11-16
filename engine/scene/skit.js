// Reusable skit library. An episode's timeline.js calls SKIT({...}) once. See PLAYBOOK.md section 5.
// Word i: W[i].s (start), W[i].e (end), W[i].sp ('R' raccoon | 'I' intern).
function SKIT(cfg) {
  const ink = '#1d2340', red = '#E5352B', DUR = cfg.duration || (W[W.length - 1].e + 0.9);
  window.DURATION = DUR;
  const S = [];
  const h = {
    ink, red, wt, W,
    words(l, items, top, size, color = ink, font = 'Serif', left = null) {
      const e = $(`<div style="position:absolute;${left === null ? 'left:40px;right:40px;text-align:center' : 'left:' + left + 'px'};top:${top}px;font-family:${font};font-weight:800;font-size:${size}px;line-height:1.05;color:${color};letter-spacing:-1px"></div>`);
      const parts = items.map(([w, it, at, c]) => { const s = $(`<span style="display:inline-block;opacity:0;${c ? 'color:' + c : ''}">${it ? '<i>' + w + '</i>' : w}</span>`); e.appendChild(s); e.appendChild(document.createTextNode(' ')); return [s, at]; });
      l.appendChild(e);
      return (t) => parts.forEach(([s, at]) => { const k = eOut(prog(t, at - 0.05, at + 0.16)); s.style.opacity = k; s.style.transform = `translateY(${(1 - k) * 22}px)`; s.style.filter = `blur(${(1 - k) * 6}px)`; });
    },
    popIn(el, t, at, rot = 0, dur = 0.28) { const k = eBack(prog(t, at, at + dur)); el.style.opacity = prog(t, at, at + 0.06); el.style.transform = `scale(${0.3 + 0.7 * k}) rotate(${rot * (2 - k)}deg)`; },
    wipe(el, t, at, dur = 0.35) { const k = eIO(prog(t, at, at + dur)); el.style.clipPath = `inset(-20px ${100 - 100 * k}% -20px -20px)`; el.style.opacity = k > 0 ? 1 : 0; },
    stroke(el, t, at, dur = 0.3) { const L = el.getTotalLength ? el.getTotalLength() : 1000; el.style.strokeDasharray = L; el.style.strokeDashoffset = L * (1 - eOut(prog(t, at, at + dur))); },
    board(l) { l.appendChild($(`<div class="board"></div>`)); },
    kick(l, txt, top = 240, color = '#8a8577') { const k = $(`<div class="kick" style="top:${top}px;color:${color}">${txt}</div>`); l.appendChild(k); return k; },
    el(l, html) { const e = $(html); l.appendChild(e); return e; },
    svg(l, inner) { const e = $(`<svg style="position:absolute;left:0;top:0;width:1080px;height:1920px;overflow:visible">${inner}</svg>`); l.appendChild(e); return e; },
    PHONE: `<svg viewBox="0 0 120 200" width="150"><rect x="6" y="6" width="108" height="188" rx="22" fill="${ink}"/><rect x="16" y="22" width="88" height="150" rx="8" fill="#9FF0CF"/><circle cx="60" cy="183" r="5" fill="#fff"/></svg>`,
    LAPTOP: (w) => `<svg viewBox="0 0 260 170" width="${w}"><rect x="30" y="6" width="200" height="130" rx="12" fill="${ink}"/><rect x="42" y="18" width="176" height="106" rx="4" fill="#BFD0FF"/><path d="M6 140 H254 L240 162 H20 Z" fill="${ink}"/></svg>`,
    DOC: (label, color) => `<div style="width:150px;height:190px;border-radius:16px;background:#fff;box-shadow:0 10px 0 rgba(0,0,0,.15);position:relative;border:5px solid ${ink}"><div style="position:absolute;left:14px;right:14px;top:30px;height:10px;border-radius:5px;background:#d8d4c6;box-shadow:0 26px 0 #d8d4c6,0 52px 0 #d8d4c6,0 78px 0 #d8d4c6"></div><div style="position:absolute;left:-10px;bottom:16px;padding:4px 14px;border-radius:10px;background:${color};color:#fff;font-family:Sans;font-weight:800;font-size:30px">${label}</div></div>`,
  };

  // ---- standard panels ----
  h.task = (l, o) => { // o: {kick, l1:[[txt,it,at,color]], l2, visual:(l)=>(t)=>{}, stamps:[[txt,at,x,rot]], timer:at}
    h.board(l); const k = h.kick(l, o.kick || "TODAY'S TASK", 250);
    const w1 = h.words(l, o.l1, 320, o.size1 || 96); const w2 = o.l2 ? h.words(l, o.l2, 440, o.size2 || 78, '#5b6075') : () => {};
    const vis = o.visual ? o.visual(l) : () => {};
    const st = (o.stamps || []).map(([txt, at, x, rot]) => [h.el(l, `<div class="stamp" style="left:${x}px;top:840px">${txt}</div>`), at, rot]);
    const tm = o.timer ? h.el(l, `<div class="timer" style="left:760px;top:170px;font-size:60px;opacity:0">00:10</div>`) : null;
    return (t) => { k.style.opacity = prog(t, 0, 0.2); w1(t); w2(t); vis(t); st.forEach(([e, at, rot]) => h.popIn(e, t, at, rot, 0.22));
      if (tm) { if (t >= o.timer) { tm.style.opacity = 1; const k2 = eBack(prog(t, o.timer, o.timer + 0.25)); tm.style.transform = `scale(${0.4 + 0.6 * k2})`; tm.textContent = '00:' + String(Math.max(0, 10 - Math.floor((t - o.timer) * 2))).padStart(2, '0'); } else tm.style.opacity = 0; } };
  };
  h.plan = (l, o) => { // o: {items:[[txt,at]], eta:[label,num,unit,at], circleAt, shakeAt, strikeAt, fix:'2?', fixAt}
    h.board(l); h.kick(l, "THE INTERN'S PLAN", 250);
    const items = o.items.map(([txt, at], i) => [h.el(l, `<div class="hand" style="left:140px;top:${330 + i * 105}px;font-size:70px">${txt}</div>`), at]);
    const [lab, num, unit, etaAt] = o.eta;
    const e1 = h.el(l, `<div class="hand" style="left:140px;top:780px;font-size:96px;color:${red}">${lab}</div>`);
    const e2 = h.el(l, `<div class="hand" style="left:400px;top:780px;font-size:96px;color:${red}">${num}</div>`);
    const e3 = h.el(l, `<div class="hand" style="left:${400 + 62 * num.length}px;top:780px;font-size:96px;color:${red}">${unit}</div>`);
    const x2 = 400 + 62 * num.length + 40 * unit.length; const cx = (380 + x2) / 2, rx = (x2 - 360) / 2 + 30;
    const sv = h.svg(l, `<ellipse cx="${cx}" cy="838" rx="${rx}" ry="78" fill="none" stroke="${red}" stroke-width="8" transform="rotate(-3 ${cx} 838)"/><line x1="385" y1="870" x2="${405 + 62 * num.length}" y2="800" stroke="${ink}" stroke-width="12" stroke-linecap="round"/>`);
    const fix = h.el(l, `<div class="hand" style="left:397px;top:690px;font-size:84px;color:${ink}">${o.fix}</div>`);
    return (t) => { items.forEach(([e, at]) => h.wipe(e, t, at, 0.45)); [e1, e2, e3].forEach((e) => h.wipe(e, t, etaAt, 0.4)); h.stroke(sv.children[0], t, o.circleAt, 0.4);
      const sh = prog(t, o.shakeAt, o.shakeAt + 0.8); l.style.transform = sh > 0 && sh < 1 ? `translateX(${Math.sin(sh * 40) * 14 * (1 - sh)}px)` : '';
      h.stroke(sv.children[1], t, o.fixAt - 0.05, 0.15); h.wipe(fix, t, o.fixAt, 0.25); };
  };
  h.rule = (l, o) => { // o: {items:[txt], xAt, cardAt, badge, l1:[[...]], l2:[[...]]}
    h.board(l); h.kick(l, "THE INTERN'S PLAN", 250);
    o.items.forEach((txt, i) => h.el(l, `<div class="hand" style="left:140px;top:${330 + i * 105}px;font-size:70px;opacity:.35">${txt}</div>`));
    const x = h.svg(l, `<line x1="150" y1="300" x2="930" y2="900" stroke="${red}" stroke-width="26" stroke-linecap="round"/><line x1="930" y1="300" x2="150" y2="900" stroke="${red}" stroke-width="26" stroke-linecap="round"/>`);
    const card = h.el(l, `<div style="position:absolute;left:110px;right:110px;top:330px;height:560px;border-radius:40px;background:${ink};box-shadow:0 40px 100px rgba(0,0,0,.5)"></div>`);
    const badge = h.el(l, `<div class="badge y" style="left:0;right:0;margin:auto;width:max-content;top:380px">${o.badge || 'RULE #1'}</div>`);
    const w = h.words(l, o.l1, 500, 72, '#c9cde0'); const w2 = h.words(l, o.l2, 620, o.size2 || 66, '#fff');
    return (t) => { h.stroke(x.children[0], t, o.xAt, 0.22); h.stroke(x.children[1], t, o.xAt + 0.18, 0.22);
      const k = eOut(prog(t, o.cardAt - 0.3, o.cardAt)); card.style.opacity = k; card.style.transform = `translateY(${(1 - k) * 120}px) rotate(${(1 - k) * -4}deg)`;
      h.popIn(badge, t, o.cardAt - 0.1, -8); w(t); w2(t); };
  };
  h.reveal = (l, o) => { // o: {kick, logo:html, logoBg, logoAt, name, nameAt, nameSize, row1:[[txt,at,bg]], row2:[[txt,at]]}
    const kk = h.kick(l, o.kick || 'IT ALREADY EXISTS', 240, 'rgba(255,255,255,.6)');
    const logo = h.el(l, `<div class="ls" style="top:300px;background:${o.logoBg || 'linear-gradient(140deg,#1fd8a4,#0e9e8a)'}">${o.logo}</div>`);
    const title = h.el(l, `<div class="title" style="top:540px;font-size:${o.nameSize || 150}px">${o.name}</div>`);
    const row = (top, arr, small) => { const r = h.el(l, `<div style="position:absolute;left:30px;right:30px;top:${top}px;display:flex;flex-wrap:wrap;justify-content:center;gap:${small ? 16 : 22}px"></div>`);
      return arr.map(([s, at, bg]) => { const e = $(`<div class="pill" style="${small ? 'font-size:36px;padding:12px 24px;background:rgba(255,255,255,.14);color:#fff' : ''}${bg ? ';background:' + bg : ''}">${s}</div>`); r.appendChild(e); return [e, at]; }); };
    const p1 = row(740, o.row1 || []), p2 = row(905, o.row2 || [], true);
    const fl = h.el(l, `<div class="flash"></div>`); const a0 = o.logoAt;
    return (t) => { kk.style.opacity = prog(t, a0 - 0.1, a0 + 0.15); h.popIn(logo, t, a0, -12, 0.35);
      const k = eBack(prog(t, o.nameAt, o.nameAt + 0.3)); title.style.opacity = prog(t, o.nameAt, o.nameAt + 0.05); title.style.transform = `scale(${0.6 + 0.4 * k})`;
      fl.style.opacity = 0.85 * (1 - prog(t, o.nameAt, o.nameAt + 0.3)) * (t >= o.nameAt ? 1 : 0);
      p1.forEach(([e, at]) => h.popIn(e, t, at, 6)); p2.forEach(([e, at]) => h.popIn(e, t, at, -6, 0.22)); logo.style.marginTop = Math.sin(t * 2.4) * 8 + 'px'; };
  };
  h.payoff = (l, o) => { // o: {big, strikeAt, tail:[[...]], kick}
    h.board(l); h.kick(l, o.kick || "THE INTERN'S CALENDAR", 250);
    const m = h.el(l, `<div class="hand" style="left:0;right:0;text-align:center;top:380px;font-size:150px;color:${red}">${o.big}</div>`);
    const sv = h.svg(l, `<line x1="170" y1="480" x2="910" y2="470" stroke="${ink}" stroke-width="16" stroke-linecap="round"/>`);
    const fr = h.words(l, o.tail, 620, 120); const a0 = o.at;
    return (t) => { const k = eBack(prog(t, a0, a0 + 0.3)); m.style.opacity = prog(t, a0, a0 + 0.05); m.style.transform = `scale(${0.6 + 0.4 * k})`; h.stroke(sv.children[0], t, o.strikeAt, 0.3); fr(t); };
  };
  h.cta = (l, o) => { // o: {h1:[[...]], h2:[[...]], word, at, handleAt}
    const a = h.words(l, o.h1, 240, o.size1 || 76, '#fff'); const b = h.words(l, o.h2, 400, o.size2 || 130, '#fff');
    const card = h.el(l, `<div class="card" style="top:620px;text-align:center"><div style="font-size:46px;font-weight:700;color:#c9cde0">Want the link?</div><div style="margin-top:18px;font-size:76px;font-weight:800">Comment <span class="pill" style="font-size:76px;background:#FFC83D;padding:8px 34px">${o.word}</span></div></div>`);
    const hd = h.el(l, `<div class="kick" style="top:950px;color:#fff;font-size:40px">@reporacoon</div>`);
    return (t) => { a(t); b(t); h.popIn(card, t, o.at, -3, 0.32); hd.style.opacity = prog(t, o.handleAt, o.handleAt + 0.3); };
  };
  window.SKIT_H = h;

  // ---- background ----
  const BG = layer('brand'); BG.style.opacity = 1;
  glows(BG, [[150, 300, 320, '#5f7bff'], [950, 1500, 360, '#1124a0']]);
  BG.appendChild($(`<div style="position:absolute;left:0;right:0;top:1640px;bottom:0;background:linear-gradient(#1a2fae,#14238a)"></div>`));

  // ---- panels ----
  cfg.panels.forEach(([a, b, build]) => { const l = layer(''); S.push({ a, b, l, r: build(l, h) }); });
  if (S.length) S[S.length - 1].b = DUR + 1;

  // ---- characters ----
  const CH = layer(''); CH.style.opacity = 1;
  function character(side, sched, hgt, cx) {
    const els = {}; sched.forEach((s) => { if (s[1] && !els[s[1]]) { const e = $(`<img class="char" src="img/m/${s[1]}.png" style="height:${hgt}px;display:none">`); CH.appendChild(e); els[s[1]] = e; } });
    return (t, speaking, lastWord) => {
      let cur = sched[0]; sched.forEach((s) => { if (t >= s[0]) cur = s; });
      Object.values(els).forEach((e) => (e.style.display = 'none'));
      if (!cur[1]) return; const e = els[cur[1]]; e.style.display = 'block';
      const w = e.naturalWidth * hgt / e.naturalHeight; e.style.left = (cx - w / 2) + 'px';
      const kp = eBack(prog(t, cur[0], cur[0] + 0.22)); const pop = 0.9 + 0.1 * kp;
      const kb = speaking ? Math.sin(Math.PI * prog(t, lastWord, lastWord + 0.2)) : 0;
      const enter = cur[2] ? eOut(prog(t, cur[0], cur[0] + 0.4)) : 1;
      e.style.transform = `translateX(${(1 - enter) * (side === 'L' ? -700 : 700)}px) scale(${pop}) scaleY(${1 + 0.035 * kb}) rotate(${Math.sin(t * 1.7 + (side === 'L' ? 1 : 0)) * 1.2}deg)`;
      e.style.filter = speaking ? 'none' : 'brightness(.88)';
    };
  }
  const raccoon = character('R', cfg.raccoon, 610, 790);
  const penguin = character('L', cfg.intern, 640, 285);

  // ---- speech bubbles: auto groups (sentence ends, max 12 words, never across speakers) ----
  const G = []; let g = [0];
  for (let i = 1; i < W.length; i++) {
    const prevEnd = /[.!?]$/.test(W[i - 1].w) && !/\.\.\.$/.test(W[i - 1].w);
    if (W[i].sp !== W[i - 1].sp || (prevEnd && i - g[0] >= 4) || i - g[0] >= 12) { G.push([g[0], i - 1]); g = [i]; }
  }
  G.push([g[0], W.length - 1]);
  const BB = layer(''); BB.style.opacity = 1;
  const ACC = cfg.accent || [];
  const bubbles = G.map(([a, b], gi) => {
    const isI = W[a].sp === 'I';
    const e = $(`<div class="bubble ${isI ? 'i' : ''}" style="bottom:590px;${isI ? 'left:50px' : 'right:50px'}"><div class="who" style="${isI ? 'left:36px' : 'right:36px'}">${isI ? 'INTERN' : 'REPO RACCOON'}</div><div class="tail" style="${isI ? 'left:150px' : 'right:200px'}"></div></div>`);
    const spans = []; for (let i = a; i <= b; i++) { const s = $(`<span>${W[i].w}</span>`); if (ACC.includes(i)) s.style.color = isI ? '#0b6b55' : '#2443E8'; e.appendChild(s); e.appendChild(document.createTextNode(' ')); spans.push([s, i]); }
    BB.appendChild(e);
    const next = G[gi + 1] ? W[G[gi + 1][0]].s : DUR;
    const on = W[a].s - 0.08, off = Math.min(next - 0.04, W[b].e + 0.7);
    e.style.transformOrigin = isI ? '20% 120%' : '80% 120%';
    return (t) => { if (t < on || t >= off) { e.style.opacity = 0; return; }
      const k = eBack(prog(t, on, on + 0.18)); e.style.opacity = 1; e.style.transform = `scale(${0.8 + 0.2 * k})`;
      spans.forEach(([s, i]) => { s.style.opacity = t >= W[i].s - 0.04 ? 1 : 0.22; }); };
  });
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
}
