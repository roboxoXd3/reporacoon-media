// Ep18 three Mac apps. Format 5 "cheat-code list": one quick beat per app with a 1/3, 2/3, 3/3 counter.
const T = (i) => wt(i) - 0.1;
const badge = (l, h, n) => h.el(l, `<div style="position:absolute;left:60px;top:190px;padding:6px 26px;border-radius:999px;background:#FFC83D;border:6px solid ${h.ink};font-family:Mono;font-weight:800;font-size:44px;color:${h.ink}">${n}/3</div>`);
const title = (l, h, name, lic, at) => h.el(l, `<div style="position:absolute;left:250px;right:40px;top:178px;font-family:Sans;font-weight:800;font-size:80px;color:#fff;white-space:nowrap">${name} <span style="font-size:34px;vertical-align:middle;padding:6px 16px;border-radius:999px;background:#fff;color:${h.ink}">${lic}</span></div>`);
const KEY = (k) => `<div style="width:130px;height:130px;border-radius:26px;background:#fff;border:7px solid #1d2340;box-shadow:0 10px 0 #1d2340;display:flex;align-items:center;justify-content:center;font-family:Sans;font-weight:800;font-size:70px;color:#1d2340">${k}</div>`;
SKIT({
  accent: [0, 1, 2, 5, 6, 10, 11, 12, 18, 21, 24, 25, 26, 29, 31, 36, 37, 40, 42, 46, 50, 51, 52, 54, 55, 58, 59, 61, 62, 64, 65, 66, 68, 69],
  panels: [
    [0, T(10), (l, h) => {
      const w1 = h.words(l, [['3', 1, 0.05, '#FFC83D'], ['free', 0, wt(1)], ['Mac', 0, wt(2)], ['apps', 0, wt(3)]], 300, 120, '#fff');
      const w2 = h.words(l, [['=', 0, wt(5)], ['cheat', 1, wt(5), '#9FF0CF'], ['codes', 1, wt(6), '#9FF0CF']], 470, 120, '#fff');
      const pad = h.el(l, `<div style="position:absolute;left:0;right:0;margin:auto;width:max-content;top:700px;font-size:200px">🎮</div>`);
      const dots = [0, 1, 2].map((i) => h.el(l, `<div style="position:absolute;left:${330 + i * 150}px;top:960px;width:110px;height:110px;border-radius:50%;background:#fff;border:7px solid ${h.ink};display:flex;align-items:center;justify-content:center;font-family:Sans;font-weight:800;font-size:56px;color:${h.ink}">${i + 1}</div>`));
      return (t) => { w1(t); w2(t); h.popIn(pad, t, wt(7), -8); dots.forEach((d, i) => h.popIn(d, t, wt(8) + i * 0.15, 0, 0.2)); };
    }],
    [T(10), T(36), (l, h) => {
      const b = badge(l, h, 1); const ti = title(l, h, 'Maccy', 'MIT');
      const items = ['git push origin main', 'meeting link: 4 baje', 'ghar ka address', 'that one perfect prompt', 'invoice no. 1043'];
      const card = h.el(l, `<div style="position:absolute;left:90px;right:90px;top:320px;border-radius:30px;background:#fff;border:7px solid ${h.ink};padding:22px;box-sizing:border-box;font-family:Sans;font-size:44px;color:${h.ink}"><div style="font-family:Mono;font-size:30px;font-weight:700;color:#8a8577;margin-bottom:10px">CLIPBOARD HISTORY</div></div>`);
      const rows = items.map((s, i) => { const e = $(`<div style="padding:10px 16px;border-radius:14px;margin-bottom:6px;font-weight:700;opacity:0">${i + 1}. ${s}</div>`); card.appendChild(e); return e; });
      const keys = ['⇧', '⌘', 'C'].map((k, i) => h.el(l, `<div style="position:absolute;left:${240 + i * 210}px;top:820px">${KEY(k)}</div>`));
      const back = h.el(l, `<div class="pill" style="position:absolute;left:600px;top:560px;font-size:48px;background:#9FF0CF">wapas ✓</div>`);
      return (t) => {
        h.popIn(b, t, T(10) + 0.05, -4); h.popIn(ti, t, wt(12) - 0.2, 0, 0.25);
        const k = eOut(prog(t, T(10) + 0.2, T(10) + 0.55)); card.style.opacity = k;
        rows.forEach((e, i) => { e.style.opacity = prog(t, wt(13) + i * 0.4, wt(13) + i * 0.4 + 0.1); e.style.background = t > wt(29) && i === 3 ? '#FFC83D' : 'transparent'; });
        keys.forEach((e, i) => { h.popIn(e, t, wt(24 + i), 0, 0.2); });
        h.popIn(back, t, wt(31), -5);
      };
    }],
    [T(36), T(50), (l, h) => {
      const b = badge(l, h, 2); const ti = title(l, h, 'MonitorControl', 'MIT'); ti.style.fontSize = '66px';
      const sh = shot(l, 'mc_shot.png', 1648, 1481, { x: 90, y: 320, w: 900, h: 520 }); sh.cam(824, 740, 1648);
      const row = h.el(l, `<div style="position:absolute;left:0;right:0;top:870px;display:flex;justify-content:center;gap:12px"></div>`);
      const p = [['☀️ Brightness', wt(40)], ['🔊 Volume', wt(42)], ['⌨️ Mac keyboard', wt(46)]].map(([s, at], i) => { const e = $(`<div class="pill" style="font-size:38px;padding:10px 22px;background:${i === 2 ? '#FFC83D' : '#fff'}">${s}</div>`); row.appendChild(e); return [e, at]; });
      footer(l, 'MonitorControl · MIT · screenshot: project README');
      return (t) => {
        h.popIn(b, t, T(36) + 0.05, 4); h.popIn(ti, t, wt(36), 0, 0.25);
        const k = eOut(prog(t, T(36), T(36) + 0.4)); sh.el.style.opacity = k;
        const z = eIO(prog(t, wt(38), wt(39) + 0.3)); sh.cam(lerp(824, 1370, z), lerp(740, 270, z), lerp(1648, 620, z));
        p.forEach(([e, at]) => h.popIn(e, t, at, 3, 0.22));
      };
    }],
    [T(50), T(61), (l, h) => {
      const b = badge(l, h, 3); const ti = title(l, h, 'KeepingYouAwake', 'MIT'); ti.style.fontSize = '60px';
      const sh = shot(l, 'kya_shot.png', 1000, 600, { x: 90, y: 330, w: 900, h: 540 }); sh.cam(500, 300, 1000);
      const tap = ripple(l);
      const z = h.el(l, `<div class="pill" style="position:absolute;left:0;right:0;margin:auto;width:max-content;top:920px;font-size:54px;background:#9FF0CF">Mac so nahi jayega 😴🚫</div>`);
      footer(l, 'KeepingYouAwake · MIT · screenshot: project README');
      return (t) => {
        h.popIn(b, t, T(50) + 0.05, -4); h.popIn(ti, t, wt(50), 0, 0.25);
        const k = eOut(prog(t, T(50), T(50) + 0.4)); sh.el.style.opacity = k;
        const q = eIO(prog(t, wt(51), wt(53))) * (1 - eIO(prog(t, wt(56), wt(57)))); sh.cam(lerp(500, 470, q), lerp(300, 150, q), lerp(1000, 640, q));
        tap(t, wt(55), 535, 345); h.popIn(z, t, wt(58), -3);
      };
    }],
    [T(61), 99, (l, h) => {
      const r = h.cta(l, { h1: [['Teeno', 0, wt(61)], ['free,', 0, wt(62)]], h2: [['teeno', 1, wt(63), '#FFC83D'], ['open', 1, wt(64), '#FFC83D'], ['source.', 1, wt(65), '#FFC83D']], size2: 96, word: 'MAC', at: wt(68), handleAt: wt(70) });
      const sv = h.el(l, `<div class="pill" style="position:absolute;left:0;right:0;margin:auto;width:max-content;top:990px;font-size:42px;background:#9FF0CF">🔖 Save karo, baad mein kaam aayega</div>`);
      return (t) => { r(t); h.popIn(sv, t, wt(66), 3, 0.25); };
    }],
  ],
  raccoon: [[0, 'r_present'], [wt(10), 'point'], [wt(24), 'laptop'], [wt(36), 'r_present'], [wt(50), 'point'], [wt(55), 'laptop'], [wt(61), 'thumbs'], [wt(66), 'wave']],
  intern: [[0, null], [wt(13) - 0.15, 'p_think', 1], [wt(29), 'p_shock'], [wt(32), 'p_celebrate'], [wt(40), 'p_smug'], [wt(48), 'p_think'], [wt(58), 'p_shock'], [wt(61), 'p_celebrate']],
});
