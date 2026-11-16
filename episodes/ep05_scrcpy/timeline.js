// Ep05 scrcpy. Built on engine/scene/skit.js.
const T = (i) => wt(i) - 0.1;
const PLAN = ['1. Streaming server', '2. Android app', '3. Desktop client', '4. Touch controls'];
SKIT({
  accent: [1, 5, 10, 15, 16, 19, 20, 38, 39, 40, 42, 43, 47, 52, 57, 68, 70, 79, 85, 90, 99, 108, 110],
  panels: [
    [0, T(21), (l, h) => h.task(l, {
      l1: [['Phone', 0, wt(1)], ['across', 0, wt(3)], ['the', 0, wt(4)], ['room.', 1, wt(5), h.red]],
      l2: [['Control', 0, wt(6)], ['it', 0, wt(7)], ['from', 0, wt(8)], ['your', 0, wt(9)], ['laptop.', 1, wt(10)]],
      visual: (l) => {
        const lp = h.el(l, `<div style="position:absolute;left:130px;top:590px">${h.LAPTOP(330)}</div>`);
        const ph = h.el(l, `<div style="position:absolute;left:800px;top:560px">${h.PHONE}</div>`);
        const kb = h.el(l, `<div class="chip" style="left:520px;top:600px;background:#fff">Mouse</div>`);
        const k2 = h.el(l, `<div class="chip" style="left:500px;top:690px;background:#fff">Keyboard</div>`);
        return (t) => { h.popIn(ph, t, wt(1), 8); h.popIn(lp, t, wt(9), -5); h.popIn(kb, t, wt(11), -6); h.popIn(k2, t, wt(12), 6); };
      },
      stamps: [['NO APP ON PHONE', wt(15), 170, -6]], timer: wt(20),
    })],
    [T(21), T(44), (l, h) => h.plan(l, {
      items: [[PLAN[0], wt(25)], [PLAN[1], wt(28)], [PLAN[2], wt(31)], [PLAN[3], wt(33)]],
      eta: ['ETA:', '1', 'month', wt(35)], circleAt: wt(37), shakeAt: wt(39), fix: '3 weeks?', fixAt: wt(42),
    })],
    [T(44), T(50), (l, h) => h.rule(l, {
      items: PLAN, xAt: wt(44), cardAt: wt(46),
      l1: [['Never', 0, wt(44)], ['build', 0, wt(45)]],
      l2: [['what', 0, wt(46)], ['thousands', 1, wt(47), '#FFC83D'], ['already', 0, wt(48)], ['use.', 0, wt(49)]], size2: 60,
    })],
    [T(50), T(63), (l, h) => h.reveal(l, {
      logo: `<svg viewBox="0 0 120 100" width="150"><rect x="4" y="6" width="112" height="72" rx="10" fill="none" stroke="#fff" stroke-width="8"/><path d="M40 94 H80 M60 78 V94" stroke="#fff" stroke-width="8" stroke-linecap="round"/><rect x="48" y="18" width="24" height="48" rx="6" fill="#fff"/></svg>`,
      logoBg: 'linear-gradient(140deg,#5b7bff,#2a3fc4)', logoAt: wt(50), name: 'scrcpy', nameAt: wt(52), nameSize: 170,
      row1: [['"Screen copy"', wt(53)], ['Free', wt(55), '#FFC83D'], ['Open source', wt(56)]],
      row2: [['155k ★ on GitHub', wt(52) + 0.4], ['Windows', wt(59)], ['Mac', wt(60)], ['Linux', wt(62)]],
    })],
    [T(63), T(91), (l, h) => {
      const sh = shot(l, 'scrcpy_shot.png', 856, 1200, { x: 70, y: 200, w: 450, h: 630 }); sh.cam(428, 600, 856);
      const col = h.el(l, `<div style="position:absolute;left:560px;top:215px;display:flex;flex-direction:column;gap:18px;align-items:flex-start"></div>`);
      const items = [['No app on phone', wt(63)], ['No root', wt(69)], ['USB debugging ✓', wt(73)], ['Plug in ✓', wt(75)], ['Run it ✓', wt(77)]]
        .map(([s, at]) => { const e = $(`<div class="pill" style="font-size:40px;padding:12px 28px">${s}</div>`); col.appendChild(e); return [e, at]; });
      const done = h.el(l, `<div class="pill" style="position:absolute;left:560px;top:640px;font-size:60px;background:#9FF0CF">Done ✓</div>`);
      const fps = h.el(l, `<div class="chip" style="left:560px;top:770px;font-size:46px">Up to 120 fps</div>`);
      const snd = h.el(l, `<div class="chip" style="left:880px;top:770px;font-size:46px;background:#fff">+ sound</div>`);
      const tap = ripple(l);
      footer(l, 'scrcpy · Apache-2.0 · screenshot: scrcpy README');
      return (t) => {
        const k = eOut(prog(t, T(63), T(63) + 0.45)); sh.el.style.opacity = k; sh.el.style.transform = `translateY(${(1 - k) * 140}px) rotate(${(1 - k) * -5}deg)`;
        const z = eIO(prog(t, wt(79), wt(79) + 1.2)); sh.cam(428, lerp(600, 560, z), lerp(856, 700, z));
        items.forEach(([e, at]) => h.popIn(e, t, at, 5, 0.22)); h.popIn(done, t, wt(79), -7); h.popIn(fps, t, wt(83), 6); h.popIn(snd, t, wt(89), -6);
        tap(t, wt(77) + 0.1, 290, 640);
      };
    }],
    [T(91), T(100), (l, h) => h.payoff(l, { big: '3 weeks', at: T(91) + 0.05, strikeAt: wt(94), tail: [['saved.', 1, wt(98), '#0e9e8a']] })],
    [T(100), 99, (l, h) => h.cta(l, {
      h1: [['Use', 0, wt(100)], ['them', 0, wt(101)], ['to', 0, wt(102)], ['find', 0, wt(103)]], h2: [['your', 1, wt(107), '#FFC83D'], ['phone.', 1, wt(108), '#FFC83D']],
      word: 'PHONE', at: wt(109), handleAt: wt(112),
    })],
  ],
  raccoon: [[0, 'r_cross'], [wt(44), 'point'], [wt(50), 'r_present'], [wt(79), 'thumbs'], [wt(91), 'r_cross'], [wt(100), 'r_present'], [wt(109), 'point']],
  intern: [[0, null], [wt(21) - 0.15, 'p_smug', 1], [wt(23), 'p_explain'], [wt(36), 'p_smug'], [wt(39), 'p_shock'], [wt(41), 'p_embar'], [wt(45), 'p_think'], [wt(52), 'p_shock'], [wt(58), 'p_smug'], [wt(71), 'p_think'], [wt(79), 'p_celebrate'], [wt(91), 'p_think'], [wt(100), 'p_embar'], [wt(109), 'p_celebrate']],
});
