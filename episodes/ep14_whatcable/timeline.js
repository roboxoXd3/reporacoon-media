// Ep14 WhatCable. Format 4 "relatable dard": intern opens with the pain, raccoon walks in with the fix. Hinglish.
const T = (i) => wt(i) - 0.1;
const CABLE = (w, col = '#fff') => `<svg viewBox="0 0 220 60" width="${w}"><path d="M10 30 C 60 0, 110 60, 150 30" fill="none" stroke="${col}" stroke-width="12" stroke-linecap="round"/><rect x="146" y="16" width="44" height="28" rx="8" fill="${col}" stroke="#1d2340" stroke-width="5"/><rect x="188" y="22" width="24" height="16" rx="5" fill="#9aa0b5" stroke="#1d2340" stroke-width="4"/></svg>`;
SKIT({
  accent: [3, 4, 5, 11, 12, 13, 16, 17, 18, 21, 24, 25, 27, 28, 29, 32, 33, 36, 37, 49, 50, 51, 52, 54, 55, 56, 62, 63, 64, 68, 72, 73, 78, 80],
  panels: [
    [0, T(19), (l, h) => h.task(l, {
      kick: 'HAR GHAR KA DRAWER',
      l1: [['40', 1, wt(3), h.red], ['USB-C', 0, wt(4)], ['cables.', 0, wt(5)]],
      l2: [['Kaunsa', 0, wt(11)], ['fast', 0, wt(12)], ['charge', 1, wt(13), h.red], ['karta?', 0, wt(14)]],
      visual: (l) => {
        const cols = ['#ffffff', '#f2efe6', '#ffffff', '#f2efe6', '#ffffff', '#f2efe6', '#ffffff', '#f2efe6'];
        const cs = cols.map((c, i) => h.el(l, `<div style="position:absolute;left:${120 + (i % 4) * 200}px;top:${590 + Math.floor(i / 4) * 120}px;filter:drop-shadow(0 6px 0 rgba(0,0,0,.18))">${CABLE(190, '#1d2340')}</div>`));
        const qs = [0, 1, 2].map((i) => h.el(l, `<div style="position:absolute;left:${200 + i * 280}px;top:540px;font-family:Serif;font-weight:800;font-size:120px;color:${h.red}">?</div>`));
        return (t) => {
          cs.forEach((e, i) => { const at = wt(1) + i * 0.18; const k = eOut(prog(t, at, at + 0.35)); e.style.opacity = prog(t, at, at + 0.05); e.style.transform = `translateY(${(1 - k) * -300}px) rotate(${(i % 2 ? 8 : -8) + Math.sin(t * 3 + i) * 2}deg)`; });
          qs.forEach((e, i) => h.popIn(e, t, wt(11) + i * 0.35, i % 2 ? 10 : -10));
        };
      },
      stamps: [['KOI NAHI JAANTA', wt(16), 180, -5]],
    })],
    [T(19), T(25), (l, h) => {
      const w1 = h.words(l, [['Mac', 0, wt(19)], ['se', 0, wt(20)], ['pooch', 1, wt(21), '#FFC83D'], ['le.', 0, wt(22)]], 280, 110, '#fff');
      const lap = h.el(l, `<div style="position:absolute;left:290px;top:520px">${h.LAPTOP(500)}</div>`);
      const bub = h.el(l, `<div style="position:absolute;left:640px;top:430px;width:200px;height:150px;border-radius:40px;background:#fff;border:7px solid ${h.ink};display:flex;align-items:center;justify-content:center;font-family:Serif;font-weight:800;font-size:96px;color:${h.ink}">?</div>`);
      const bub2 = h.el(l, `<div style="position:absolute;left:600px;top:430px;width:290px;height:150px;border-radius:40px;background:#9FF0CF;border:7px solid ${h.ink};display:flex;align-items:center;justify-content:center;font-family:Sans;font-weight:800;font-size:64px;color:${h.ink}">bolega!</div>`);
      return (t) => { w1(t); h.popIn(lap, t, wt(19) + 0.1, -3); h.popIn(bub, t, wt(23), 8); bub.style.opacity = Math.min(+bub.style.opacity, 1 - prog(t, wt(24) + 0.2, wt(24) + 0.3)); h.popIn(bub2, t, wt(24) + 0.25, -6); };
    }],
    [T(25), T(41), (l, h) => h.reveal(l, {
      kick: 'MAC KO POOCHO',
      logo: `<svg viewBox="0 0 120 120" width="150"><path d="M18 74 C 40 40, 62 92, 84 56" fill="none" stroke="#fff" stroke-width="10" stroke-linecap="round"/><rect x="80" y="40" width="26" height="30" rx="7" fill="#fff"/><path d="M58 18 L44 46 H60 L50 72" fill="none" stroke="#FFC83D" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" transform="translate(-20 30) scale(.8)"/></svg>`,
      logoBg: 'linear-gradient(140deg,#8a5cff,#3a1d8c)', logoAt: wt(25), name: 'WhatCable', nameAt: wt(25) + 0.2, nameSize: 140,
      row1: [['Free', wt(27)], ['Open source', wt(28), '#FFC83D'], ['MIT', wt(30)]],
      row2: [['Apple Silicon Mac', wt(32)], ['Menu bar app', wt(36)]],
    })],
    [T(41), T(58), (l, h) => {
      const sh = shot(l, 'whatcable_shot.png', 632, 832, { x: 50, y: 190, w: 500, h: 658 }); sh.cam(316, 416, 632);
      const cards = [['Kitne watt?', '94W charger', wt(50), '#FFC83D'], ['Kitni speed?', 'USB4 · 80 Gbps', wt(52), '#9FF0CF'], ['Slow kyun?', 'Mac port = limit', wt(55), '#FFB4A8']].map(([q, a, at, bg], i) => [h.el(l, `<div style="position:absolute;left:580px;top:${250 + i * 200}px;width:450px;padding:18px 24px;border-radius:26px;background:${bg};border:6px solid ${h.ink};box-sizing:border-box;font-family:Sans;color:${h.ink}"><div style="font-size:34px;font-weight:700;opacity:.75">${q}</div><div style="font-size:46px;font-weight:800">${a}</div></div>`), at]);
      const tag = h.el(l, `<div class="pill" style="position:absolute;left:600px;top:880px;font-size:40px;background:#fff">Plain English ✓</div>`);
      const tap = ripple(l);
      footer(l, 'WhatCable · MIT · screenshot: project README');
      return (t) => {
        const k = eOut(prog(t, T(41), T(41) + 0.45)); sh.el.style.opacity = k; sh.el.style.transform = `translateY(${(1 - k) * 120}px)`;
        const K = [[wt(41), 316, 416, 632], [wt(49) - 0.3, 316, 416, 632], [wt(49) + 0.2, 200, 135, 330], [wt(52) - 0.25, 200, 135, 330], [wt(52) + 0.2, 300, 500, 460],
          [wt(55) - 0.25, 300, 500, 460], [wt(55) + 0.2, 330, 265, 470], [wt(57) + 0.1, 330, 265, 470], [wt(57) + 0.5, 316, 416, 632]];
        let c = K[0].slice(1);
        for (let i = 0; i < K.length - 1; i++) { if (t >= K[i][0]) { const q = eIO(prog(t, K[i][0], K[i + 1][0])); c = [1, 2, 3].map((j) => lerp(K[i][j], K[i + 1][j], q)); } }
        sh.cam(c[0], c[1], c[2]);
        cards.forEach(([e, at], i) => h.popIn(e, t, at, i % 2 ? 3 : -3, 0.25));
        h.popIn(tag, t, wt(45), -4); tap(t, wt(41) + 0.1, 300, 300);
      };
    }],
    [T(58), T(66), (l, h) => {
      const w1 = h.words(l, [['Ye', 0, wt(60)], ['wala', 0, wt(61)], ['sirf', 1, wt(62), '#FFC83D']], 260, 100, '#fff');
      const w2 = h.words(l, [['charging', 1, wt(63), '#FFC83D'], ['cable?!', 0, wt(64)]], 380, 110, '#fff');
      const cab = h.el(l, `<div style="position:absolute;left:140px;top:560px">${CABLE(800)}</div>`);
      const st = h.el(l, `<div class="stamp" style="left:200px;top:820px;font-size:70px">CHARGING ONLY</div>`);
      return (t) => {
        w1(t); w2(t); const k = eOut(prog(t, T(58), T(58) + 0.4)); cab.style.opacity = k; cab.style.transform = `translateX(${(1 - k) * -400}px) rotate(${Math.sin(t * 2) * 2}deg)`;
        h.popIn(st, t, wt(64) + 0.1, -7, 0.22); const sh = prog(t, wt(64) + 0.1, wt(64) + 0.7); l.style.transform = sh > 0 && sh < 1 ? `translateX(${Math.sin(sh * 40) * 12 * (1 - sh)}px)` : '';
      };
    }],
    [T(66), 99, (l, h) => {
      const r = h.cta(l, { h1: [['Drawer', 0, wt(67)], ['saaf', 0, wt(68)]], h2: [['karo.', 1, wt(69), '#FFC83D']], size2: 130, word: 'CABLE', at: wt(72), handleAt: wt(73) + 0.2 });
      const send = h.el(l, `<div class="pill" style="position:absolute;left:0;right:0;margin:auto;width:max-content;top:1010px;font-size:40px;background:#9FF0CF">↗ 40-cable wale dost ko bhejo</div>`);
      return (t) => { r(t); h.popIn(send, t, wt(77), 3, 0.25); };
    }],
  ],
  raccoon: [[0, null], [wt(19) - 0.15, 'r_cross', 1], [wt(21), 'point'], [wt(25), 'r_present'], [wt(41), 'laptop'], [wt(58), 'facepalm'], [wt(66), 'thumbs'], [wt(72), 'point'], [wt(77), 'phone']],
  intern: [[0, 'p_embar'], [wt(11), 'p_think'], [wt(23), 'p_shock'], [wt(27), 'p_think'], [wt(50), 'p_smug'], [wt(58), 'p_shock'], [wt(66), 'p_embar'], [wt(72), 'p_celebrate']],
});
