// Ep15 Universal Android Debloater. Format 1 "result pehle": the payoff (bloat apps vanishing) is on screen from second 0.
const T = (i) => wt(i) - 0.1;
const ICOLS = ['#FF8A65', '#FFC83D', '#9FF0CF', '#BFD0FF', '#F48FB1', '#A5D6A7', '#FFAB91', '#CE93D8', '#80DEEA', '#FFE082', '#B0BEC5', '#EF9A9A'];
SKIT({
  accent: [2, 4, 5, 8, 11, 12, 13, 15, 17, 21, 23, 25, 26, 27, 28, 30, 31, 32, 37, 38, 41, 43, 46, 47, 50, 55, 59, 60, 64, 67, 72, 77, 80, 81],
  panels: [
    [0, T(16), (l, h) => {
      const w1 = h.words(l, [['Bekaar', 1, wt(4), '#FFC83D'], ['system', 0, wt(5)], ['apps', 0, wt(6)]], 200, 92, '#fff');
      const phone = h.el(l, `<div style="position:absolute;left:290px;top:340px;width:500px;height:640px;border-radius:60px;background:${h.ink};padding:46px 34px;box-sizing:border-box;box-shadow:0 30px 80px rgba(0,0,0,.4)"><div style="width:100%;height:100%;border-radius:30px;background:#EEF1FF;position:relative"></div></div>`);
      const scr = phone.firstChild;
      const icons = ICOLS.map((c, i) => { const e = $(`<div style="position:absolute;left:${22 + (i % 3) * 132}px;top:${26 + Math.floor(i / 3) * 128}px;width:94px;height:94px;border-radius:24px;background:${c};border:5px solid ${h.ink};box-sizing:border-box"></div>`); scr.appendChild(e); return e; });
      const keep = [0, 4, 8]; // these stay
      const stamp = h.el(l, `<div class="stamp" style="left:560px;top:330px;font-size:56px;background:#fff">BINA ROOT</div>`);
      const gone = h.el(l, `<div class="pill" style="position:absolute;left:0;right:0;margin:auto;width:max-content;top:1000px;font-size:52px;background:#9FF0CF">gayab ✓</div>`);
      return (t) => {
        w1(t); h.popIn(phone, t, 0.05, -3);
        let n = 0;
        icons.forEach((e, i) => { if (keep.includes(i)) { e.style.opacity = 1; return; } const at = wt(7) + n * 0.4; n++; const k = prog(t, at, at + 0.25); e.style.opacity = 1 - k; e.style.transform = `scale(${1 - 0.6 * k}) rotate(${k * 40}deg)`; });
        h.popIn(stamp, t, wt(12), 6, 0.22); h.popIn(gone, t, wt(15), -4, 0.25);
      };
    }],
    [T(16), T(25), (l, h) => {
      const q = h.el(l, `<div style="position:absolute;left:0;right:0;top:250px;text-align:center;font-family:Serif;font-weight:800;font-size:230px;color:#FFC83D">?!</div>`);
      const w1 = h.words(l, [['Ye', 0, wt(18)], ['toh', 0, wt(20)], ['delete', 1, wt(21), '#FFB4A8']], 560, 100, '#fff');
      const w2 = h.words(l, [['hi', 0, wt(22)], ['nahi', 0, wt(23)], ['hote!', 0, wt(24)]], 680, 100, '#fff');
      const tr = h.el(l, `<div style="position:absolute;left:430px;top:820px"><svg viewBox="0 0 120 130" width="200"><path d="M20 30 H100 L92 120 H28 Z" fill="#fff" stroke="${h.ink}" stroke-width="8" stroke-linejoin="round"/><path d="M10 30 H110 M45 30 V14 H75 V30" fill="none" stroke="${h.ink}" stroke-width="8" stroke-linecap="round"/><path d="M8 8 L112 124" stroke="${h.red}" stroke-width="12" stroke-linecap="round"/></svg></div>`);
      return (t) => { h.popIn(q, t, wt(16), -6); w1(t); w2(t); h.popIn(tr, t, wt(21) + 0.1, 5); };
    }],
    [T(25), T(32), (l, h) => h.reveal(l, {
      kick: 'UNIVERSAL',
      logo: `<svg viewBox="0 0 120 120" width="150"><rect x="34" y="14" width="52" height="92" rx="12" fill="#fff"/><rect x="42" y="26" width="36" height="62" rx="4" fill="#9FF0CF"/><path d="M50 50 L70 70 M70 50 L50 70" stroke="#1d2340" stroke-width="7" stroke-linecap="round"/><circle cx="60" cy="97" r="4" fill="#1d2340"/></svg>`,
      logoBg: 'linear-gradient(140deg,#7b4dff,#2b136b)', logoAt: wt(25), name: 'Android Debloater', nameAt: wt(26), nameSize: 104,
      row1: [['Free', wt(28)], ['Open source', wt(30), '#FFC83D'], ['GPL-3.0', wt(31)]],
      row2: [['Bina root · ADB', wt(29)]],
    })],
    [T(32), T(51), (l, h) => {
      const stepRow = h.el(l, `<div style="position:absolute;left:0;right:0;top:190px;display:flex;justify-content:center;gap:12px;flex-wrap:wrap;padding:0 24px"></div>`);
      const steps = [['① Computer pe app', wt(32)], ['② USB debugging ON', wt(37)], ['③ Cable', wt(41)]].map(([s, at]) => { const e = $(`<div class="pill" style="font-size:36px;padding:8px 18px">${s}</div>`); stepRow.appendChild(e); return [e, at]; });
      const sh = shot(l, 'uad_shot.png', 813, 667, { x: 60, y: 330, w: 960, h: 600 }); sh.cam(406, 333, 813);
      const tap = ripple(l);
      footer(l, 'Universal Android Debloater NG · GPL-3.0 · screenshot: project README');
      return (t) => {
        steps.forEach(([e, at]) => h.popIn(e, t, at, 4, 0.22));
        const k = eOut(prog(t, T(32), T(32) + 0.45)); sh.el.style.opacity = k; sh.el.style.transform = `translateY(${(1 - k) * 120}px)`;
        const K = [[wt(32), 406, 333, 813], [wt(43) - 0.3, 406, 333, 813], [wt(43) + 0.2, 445, 160, 420], [wt(46) - 0.2, 445, 160, 420], [wt(46) + 0.3, 330, 220, 560],
          [wt(49) - 0.2, 330, 220, 560], [wt(49) + 0.3, 650, 230, 420], [wt(50) + 0.4, 650, 230, 420]];
        let c = K[0].slice(1);
        for (let i = 0; i < K.length - 1; i++) { if (t >= K[i][0]) { const q = eIO(prog(t, K[i][0], K[i + 1][0])); c = [1, 2, 3].map((j) => lerp(K[i][j], K[i + 1][j], q)); } }
        sh.cam(c[0], c[1], c[2]);
        tap(t, wt(44), 540, 560); tap(t, wt(47), 300, 640); tap(t, wt(50), 700, 640);
      };
    }],
    [T(51), T(69), (l, h) => {
      const w1 = h.words(l, [['Phone', 0, wt(53)], ['gadbad?', 1, wt(55), '#FFB4A8']], 200, 96, '#fff');
      const sh = shot(l, 'uad_shot.png', 813, 667, { x: 60, y: 340, w: 960, h: 420 }); sh.cam(406, 510, 700);
      const c1 = h.el(l, `<div class="pill" style="position:absolute;left:70px;top:800px;font-size:44px;background:#FFC83D">⚠ Sirf "Recommended"</div>`);
      const c2 = h.el(l, `<div class="pill" style="position:absolute;left:300px;top:900px;font-size:44px;background:#fff">Description padho</div>`);
      footer(l, 'Universal Android Debloater NG · GPL-3.0 · screenshot: project README');
      return (t) => {
        w1(t); const k = eOut(prog(t, wt(58), wt(58) + 0.4)); sh.el.style.opacity = k; sh.el.style.transform = `translateY(${(1 - k) * 80}px)`;
        h.popIn(c1, t, wt(60), -4, 0.25); h.popIn(c2, t, wt(67), 3, 0.25);
      };
    }],
    [T(69), 99, (l, h) => {
      const r = h.cta(l, { h1: [['Phone', 0, wt(69)]], h2: [['saaf', 1, wt(70), '#FFC83D'], ['karo.', 1, wt(70) + 0.2, '#FFC83D']], size2: 130, word: 'CLEAN', at: wt(71), handleAt: wt(72) + 0.2 });
      const send = h.el(l, `<div class="pill" style="position:absolute;left:0;right:0;margin:auto;width:max-content;top:990px;font-size:40px;background:#9FF0CF">↗ bloatware wale dost ko bhejo</div>`);
      return (t) => { r(t); h.popIn(send, t, wt(75), 3, 0.25); };
    }],
  ],
  raccoon: [[0, 'phone'], [wt(16), 'r_cross'], [wt(25), 'r_present'], [wt(32), 'laptop'], [wt(51), 'r_cross'], [wt(58), 'point'], [wt(69), 'thumbs'], [wt(74), 'phone']],
  intern: [[0, null], [wt(16) - 0.15, 'p_shock', 1], [wt(25), 'p_think'], [wt(43), 'p_smug'], [wt(51), 'p_embar'], [wt(60), 'p_think'], [wt(69), 'p_celebrate']],
});
