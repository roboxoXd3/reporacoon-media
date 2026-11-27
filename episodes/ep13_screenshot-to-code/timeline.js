// Ep13 Screenshot to Code. Built on engine/scene/skit.js.
// Demo panel is an illustration (README screenshots show a third-party news site, so not used).
const T = (i) => wt(i) - 0.1;
const PLAN = ['1. Vision model', '2. Layout detector', '3. CSS generator', '4. React exporter'];
const MOCK = (w) => `<div style="width:${w}px;height:${Math.round(w * 0.98)}px;border-radius:18px;background:#fff;border:6px solid #1d2340;overflow:hidden;position:relative;box-shadow:0 14px 0 rgba(0,0,0,.18)">
  <div style="height:16%;background:#2443E8;display:flex;align-items:center;gap:6%;padding:0 7%"><div style="width:22%;height:30%;border-radius:8px;background:#FFC83D"></div><div style="flex:1"></div><div style="width:12%;height:18%;border-radius:6px;background:#c9d4ff"></div><div style="width:12%;height:18%;border-radius:6px;background:#c9d4ff"></div></div>
  <div style="position:absolute;left:8%;top:24%;width:70%;height:9%;border-radius:8px;background:#1d2340"></div>
  <div style="position:absolute;left:8%;top:37%;width:50%;height:6%;border-radius:8px;background:#b9b5a8"></div>
  <div style="position:absolute;left:8%;top:49%;width:32%;height:10%;border-radius:30px;background:#E5352B"></div>
  <div style="position:absolute;left:8%;right:8%;top:66%;bottom:7%;display:flex;gap:5%"><div style="flex:1;border-radius:12px;background:#9FF0CF"></div><div style="flex:1;border-radius:12px;background:#FFC83D"></div><div style="flex:1;border-radius:12px;background:#BFD0FF"></div></div>
</div>`;
SKIT({
  accent: [3, 4, 7, 9, 10, 11, 12, 17, 18, 22, 25, 28, 31, 32, 33, 34, 36, 40, 41, 46, 49, 50, 51, 52, 53, 54, 58, 59, 63, 64, 68, 70, 71, 73, 75, 76, 80, 81, 83, 84, 94, 95, 99, 100, 102],
  panels: [
    [0, T(13), (l, h) => h.task(l, {
      l1: [['One', 0, wt(5)], ['screenshot.', 1, wt(7), h.red]],
      l2: [['Real', 0, wt(8)], ['code.', 0, wt(9)], ['Ten', 0, wt(10)], ['minutes.', 0, wt(11)]],
      visual: (l) => {
        const page = h.el(l, `<div style="position:absolute;left:90px;top:560px">${MOCK(330)}</div>`);
        const cam = h.el(l, `<div style="position:absolute;left:60px;top:530px;width:400px;height:385px;border:10px dashed ${h.red};border-radius:24px"></div>`);
        const arrow = h.el(l, `<div style="position:absolute;left:478px;top:650px"><svg viewBox="0 0 120 80" width="120"><path d="M8 40 H92" stroke="${h.ink}" stroke-width="12" stroke-linecap="round"/><path d="M70 14 L104 40 L70 66" fill="none" stroke="${h.ink}" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/></svg></div>`);
        const code = h.el(l, `<div style="position:absolute;left:620px;top:575px;width:330px;height:300px;border-radius:22px;background:${h.ink};display:flex;align-items:center;justify-content:center;font-family:monospace;font-weight:800;font-size:110px;color:#9FF0CF">&lt;/&gt;</div>`);
        return (t) => {
          h.popIn(page, t, wt(3), -4); cam.style.opacity = prog(t, wt(7), wt(7) + 0.1) * (1 - prog(t, wt(7) + 0.25, wt(7) + 0.45)) + (t > wt(7) + 0.45 ? 0 : 0);
          h.popIn(arrow, t, wt(8), 0); h.popIn(code, t, wt(9), 4);
        };
      },
      stamps: [['10 MIN', wt(11), 640, -6]], timer: wt(12),
    })],
    [T(13), T(37), (l, h) => h.plan(l, {
      items: [[PLAN[0], wt(17)], [PLAN[1], wt(21)], [PLAN[2], wt(24)], [PLAN[3], wt(27)]],
      eta: ['ETA:', '4', 'months', wt(31)], circleAt: wt(32), shakeAt: wt(33), fix: '3?', fixAt: wt(36),
    })],
    [T(37), T(47), (l, h) => h.rule(l, {
      items: PLAN, xAt: wt(37), cardAt: wt(39), badge: 'SENIOR DEV RULE',
      l1: [['Search', 0, wt(40)], ['GitHub', 0, wt(41)]],
      l2: [['before', 0, wt(42)], ['your', 0, wt(45)], ['editor.', 1, wt(46), '#FFC83D']], size2: 76,
    })],
    [T(47), T(61), (l, h) => h.reveal(l, {
      logo: `<svg viewBox="0 0 120 120" width="150"><rect x="14" y="22" width="62" height="54" rx="8" fill="#fff"/><rect x="22" y="30" width="46" height="9" rx="4" fill="#2443E8"/><rect x="22" y="45" width="30" height="6" rx="3" fill="#b9b5a8"/><rect x="22" y="57" width="20" height="10" rx="5" fill="#E5352B"/><path d="M58 92 L42 104 L58 116" fill="none" stroke="#9FF0CF" stroke-width="7" stroke-linecap="round" stroke-linejoin="round" transform="translate(30 -24)"/><path d="M92 68 L108 80 L92 92" fill="none" stroke="#9FF0CF" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/><path d="M84 64 L76 96" stroke="#FFC83D" stroke-width="6" stroke-linecap="round"/></svg>`,
      logoBg: 'linear-gradient(140deg,#2b3a8f,#141a3d)', logoAt: wt(47), name: 'Screenshot to Code', nameAt: wt(49), nameSize: 96,
      row1: [['Open source', wt(52)], ['MIT license', wt(54), '#FFC83D'], ['81k ★', wt(58)]],
      row2: [['Screenshot → clean code', wt(51)]],
    })],
    [T(61), T(87), (l, h) => {
      const stepRow = h.el(l, `<div style="position:absolute;left:0;right:0;top:185px;display:flex;justify-content:center;gap:14px;flex-wrap:wrap;padding:0 30px"></div>`);
      const steps = [['① AI key', wt(61)], ['② Drop screenshot', wt(65)], ['③ Pick stack', wt(69)]].map(([s, at]) => { const e = $(`<div class="pill" style="font-size:38px;padding:8px 20px">${s}</div>`); stepRow.appendChild(e); return [e, at]; });
      const page = h.el(l, `<div style="position:absolute;left:60px;top:300px">${MOCK(420)}</div>`);
      const arrow = h.el(l, `<div style="position:absolute;left:488px;top:470px"><svg viewBox="0 0 120 80" width="96"><path d="M8 40 H92" stroke="#fff" stroke-width="12" stroke-linecap="round"/><path d="M70 14 L104 40 L70 66" fill="none" stroke="#fff" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/></svg></div>`);
      const LINES = ['<span style="color:#9FF0CF">&lt;nav</span> class="flex"&gt;', '<span style="color:#9FF0CF">&lt;h1</span> class="text-5xl"&gt;', '<span style="color:#9FF0CF">&lt;p</span> class="text-gray"&gt;', '<span style="color:#9FF0CF">&lt;button</span> class="rounded"&gt;', '<span style="color:#9FF0CF">&lt;section</span> class="grid"&gt;', '&nbsp;&nbsp;<span style="color:#FFC83D">&lt;Card</span> /&gt; ×3'];
      const ed = h.el(l, `<div style="position:absolute;left:592px;top:300px;width:430px;height:412px;border-radius:18px;background:#141a3d;border:6px solid #000;padding:54px 18px 0;box-sizing:border-box;font-family:monospace;font-size:27px;line-height:1.75;color:#e8ebff;overflow:hidden"><div style="position:absolute;left:16px;top:16px;display:flex;gap:9px"><i style="width:16px;height:16px;border-radius:50%;background:#E5352B"></i><i style="width:16px;height:16px;border-radius:50%;background:#FFC83D"></i><i style="width:16px;height:16px;border-radius:50%;background:#9FF0CF"></i></div></div>`);
      const lines = LINES.map((s) => { const e = $(`<div style="white-space:nowrap;opacity:0">${s}</div>`); ed.appendChild(e); return e; });
      const stackRow = h.el(l, `<div style="position:absolute;left:0;right:0;top:760px;display:flex;justify-content:center;gap:14px;flex-wrap:wrap;padding:0 30px"></div>`);
      const stacks = [['React', wt(70), '#BFD0FF'], ['Vue', wt(71), '#9FF0CF'], ['HTML + Tailwind', wt(73), '#FFC83D']].map(([s, at, bg]) => { const e = $(`<div class="pill" style="font-size:40px;padding:8px 22px;background:${bg}">${s}</div>`); stackRow.appendChild(e); return [e, at]; });
      const extraRow = h.el(l, `<div style="position:absolute;left:0;right:0;top:870px;display:flex;justify-content:center;gap:14px;flex-wrap:wrap;padding:0 30px"></div>`);
      const extras = [['Figma designs', wt(80), '#fff'], ['Screen recordings', wt(83), '#fff']].map(([s, at, bg]) => { const e = $(`<div class="pill" style="font-size:38px;padding:8px 20px;background:${bg}">${s} → code</div>`); extraRow.appendChild(e); return [e, at]; });
      const done = h.el(l, `<div class="pill" style="position:absolute;left:740px;top:610px;font-size:56px;background:#9FF0CF">Done ✓</div>`);
      const tap = ripple(l);
      footer(l, 'Screenshot to Code · MIT · illustration, not a real screenshot');
      return (t) => {
        steps.forEach(([e, at]) => h.popIn(e, t, at, 4, 0.22));
        const kp = eOut(prog(t, wt(65), wt(65) + 0.45)); page.style.opacity = kp; page.style.transform = `translateY(${(1 - kp) * -260}px) rotate(${(1 - kp) * -10}deg)`;
        h.popIn(arrow, t, wt(68), 0); const ke = eOut(prog(t, T(61), T(61) + 0.4)); ed.style.opacity = ke; ed.style.transform = `translateY(${(1 - ke) * 100}px)`;
        lines.forEach((e, i) => { const at = wt(69) + i * ((wt(76) - wt(69)) / LINES.length); e.style.opacity = prog(t, at, at + 0.12); });
        stacks.forEach(([e, at]) => h.popIn(e, t, at, -4, 0.22)); extras.forEach(([e, at]) => h.popIn(e, t, at, 4, 0.22));
        tap(t, wt(65) + 0.2, 270, 500); h.popIn(done, t, wt(76), -7);
      };
    }],
    [T(87), T(96), (l, h) => h.payoff(l, { big: '3 months', at: T(87) + 0.05, strikeAt: wt(94), tail: [['saved.', 1, wt(95) + 0.25, '#0e9e8a']] })],
    [T(96), 99, (l, h) => h.cta(l, {
      h1: [['Ship', 0, wt(96)], ['the', 0, wt(97)], ['next', 0, wt(98)]], h2: [['ten', 1, wt(99), '#FFC83D'], ['pages.', 1, wt(100), '#FFC83D']], size2: 120,
      word: 'CODE', at: wt(101), handleAt: wt(105),
    })],
  ],
  raccoon: [[0, 'r_cross'], [wt(3), 'point'], [wt(13), 'r_cross'], [wt(37), 'point'], [wt(47), 'r_present'], [wt(61), 'laptop'], [wt(76), 'thumbs'], [wt(87), 'r_cross'], [wt(96), 'wave'], [wt(101), 'point']],
  intern: [[0, null], [wt(13) - 0.15, 'p_smug', 1], [wt(15), 'p_explain'], [wt(31), 'p_smug'], [wt(33), 'p_shock'], [wt(35), 'p_embar'], [wt(39), 'p_think'], [wt(49), 'p_shock'], [wt(53), 'p_smug'], [wt(61), 'p_think'], [wt(76), 'p_celebrate'], [wt(87), 'p_think'], [wt(96), 'p_embar'], [wt(101), 'p_celebrate']],
});
