// Ep08 Excalidraw. Built on engine/scene/skit.js.
const T = (i) => wt(i) - 0.1;
const PLAN = ['1. Canvas engine', '2. Wobbly-line algo', '3. Sync server', '4. Pen tool'];
SKIT({
  accent: [8, 15, 16, 17, 23, 24, 27, 28, 31, 32, 38, 39, 41, 43, 44, 47, 48, 54, 55, 56, 57, 62, 65, 66, 67, 68, 72, 73, 75, 76, 78, 79, 80, 82, 83, 84, 85, 90, 91, 92, 97, 99],
  panels: [
    [0, T(19), (l, h) => h.task(l, {
      l1: [['Hand-', 0, wt(8)], ['sketched.', 1, wt(8) + 0.25, h.red]],
      l2: [['Team', 0, wt(12)], ['edits', 0, wt(13)], ['it', 0, wt(14)], ['live.', 1, wt(15)]], size2: 76,
      visual: (l) => {
        const sk = 'fill="none" stroke-linecap="round" stroke-linejoin="round"';
        const b1 = h.el(l, `<svg style="position:absolute;left:120px;top:600px" width="300" height="220" viewBox="0 0 300 220"><path d="M14 18 Q150 8 286 16 Q292 110 284 204 Q150 212 16 202 Q8 110 14 18 Z" ${sk} stroke="${h.ink}" stroke-width="8"/><path d="M60 80 H230 M60 130 H190" ${sk} stroke="#8a8577" stroke-width="10"/></svg>`);
        const arr = h.el(l, `<svg style="position:absolute;left:430px;top:660px" width="170" height="100" viewBox="0 0 170 100"><path d="M8 52 Q80 30 150 50 M118 22 L154 50 L116 78" ${sk} stroke="${h.ink}" stroke-width="9"/></svg>`);
        const b2 = h.el(l, `<svg style="position:absolute;left:620px;top:590px" width="300" height="240" viewBox="0 0 300 240"><path d="M150 10 Q230 60 290 120 Q220 180 150 230 Q80 180 10 120 Q70 60 150 10 Z" ${sk} stroke="${h.red}" stroke-width="8"/><path d="M100 120 H200" ${sk} stroke="#8a8577" stroke-width="10"/></svg>`);
        const c1 = h.el(l, `<div class="pill" style="position:absolute;left:330px;top:572px;font-size:30px;padding:8px 18px;background:#7AA7FF">▲ Sam</div>`);
        const c2 = h.el(l, `<div class="pill" style="position:absolute;left:830px;top:572px;font-size:30px;padding:8px 18px;background:#9FF0CF">▲ Priya</div>`);
        return (t) => { h.popIn(b1, t, wt(2), -4); h.popIn(arr, t, wt(3), 0); h.popIn(b2, t, wt(8), 4); h.popIn(c1, t, wt(13), -6); h.popIn(c2, t, wt(14), 6); };
      },
      stamps: [['LIVE', wt(15), 400, -8]], timer: wt(16),
    })],
    [T(19), T(44), (l, h) => h.plan(l, {
      items: [[PLAN[0], wt(23)], [PLAN[1], wt(27)], [PLAN[2], wt(31)], [PLAN[3], wt(34)]],
      eta: ['ETA:', '6', 'weeks', wt(36)], circleAt: wt(38), shakeAt: wt(40), fix: '5?', fixAt: wt(43),
    })],
    [T(44), T(52), (l, h) => h.rule(l, {
      items: PLAN, xAt: wt(44), cardAt: wt(45), badge: 'RULE #1',
      l1: [['Never', 0, wt(44)], ['build', 0, wt(45)]],
      l2: [['what', 0, wt(46)], ['10,000', 1, wt(47), '#FFC83D'], ['maintain.', 0, wt(51)]], size2: 80,
    })],
    [T(52), T(69), (l, h) => h.reveal(l, {
      logo: `<svg viewBox="0 0 120 120" width="150"><path d="M22 96 L84 24 Q92 16 100 24 Q106 32 98 40 L36 104 L16 108 Z" fill="none" stroke="#fff" stroke-width="9" stroke-linejoin="round"/><path d="M76 32 L92 48" stroke="#fff" stroke-width="8" stroke-linecap="round"/></svg>`,
      logoBg: 'linear-gradient(140deg,#8b7cf6,#4c3fb8)', logoAt: wt(52), name: 'Excalidraw', nameAt: wt(54), nameSize: 132,
      row1: [['135k ★ on GitHub', wt(54) + 0.4], ['Free', wt(55), '#FFC83D'], ['Open source', wt(56)]],
      row2: [['MIT license', wt(57)], ['Runs in your browser', wt(60)]],
    })],
    [T(69), T(86), (l, h) => {
      const sh = shot(l, 'excalidraw_shot.png', 1120, 783, { x: 60, y: 190, w: 960, h: 560 }); sh.cam(560, 392, 1120);
      const steps = [['Open the site', wt(69)], ['Draw boxes + arrows', wt(72)], ['Share the link', wt(76)]].map(([s, at], i) => [h.el(l, `<div class="pill" style="position:absolute;left:${[60, 340, 740][i]}px;top:785px;font-size:34px;padding:12px 20px">${s}</div>`), at]);
      const done = h.el(l, `<div class="pill" style="position:absolute;left:790px;top:215px;font-size:56px;background:#9FF0CF">Done ✓</div>`);
      const f1 = h.el(l, `<div class="pill" style="position:absolute;left:60px;top:885px;font-size:34px;background:#FFC83D">Hand-drawn style</div>`);
      const f2 = h.el(l, `<div class="pill" style="position:absolute;left:420px;top:885px;font-size:34px">Live collab</div>`);
      const f3 = h.el(l, `<div class="pill" style="position:absolute;left:660px;top:885px;font-size:34px">🔒 E2E encrypted</div>`);
      const tap = ripple(l);
      footer(l, 'Excalidraw · MIT · screenshot: excalidraw repo');
      return (t) => {
        const k = eOut(prog(t, T(69), T(69) + 0.45)); sh.el.style.opacity = k; sh.el.style.transform = `translateY(${(1 - k) * 120}px)`;
        const z1 = eIO(prog(t, wt(69) - 0.1, wt(69) + 0.5)), z2 = eIO(prog(t, wt(72) - 0.1, wt(72) + 0.5)), z3 = eIO(prog(t, wt(76) - 0.1, wt(76) + 0.5)), z4 = eIO(prog(t, wt(79) - 0.1, wt(79) + 0.6));
        const cx = lerp(lerp(lerp(lerp(560, 560, z1), 640, z2), 900, z3), 560, z4);
        const cy = lerp(lerp(lerp(lerp(392, 150, z1), 450, z2), 150, z3), 392, z4);
        const cw = lerp(lerp(lerp(lerp(1120, 560, z1), 640, z2), 480, z3), 1120, z4);
        sh.cam(cx, cy, cw);
        steps.forEach(([e, at], i) => h.popIn(e, t, at, (i - 1) * 4));
        tap(t, wt(73), 300, 430); tap(t, wt(75), 640, 470); tap(t, wt(77), 560, 470);
        h.popIn(done, t, wt(79), -7); h.popIn(f1, t, wt(80), -4); h.popIn(f2, t, wt(82), 3); h.popIn(f3, t, wt(84), 5);
      };
    }],
    [T(86), T(94), (l, h) => h.payoff(l, { big: '6 weeks', at: T(86) + 0.05, strikeAt: wt(92), tail: [['saved.', 1, wt(93) + 0.2, '#0e9e8a']] })],
    [T(94), 99, (l, h) => h.cta(l, {
      h1: [['Then', 0, wt(94)], ['draw', 0, wt(95)]], h2: [['the', 1, wt(96), '#FFC83D'], ['diagram.', 1, wt(97), '#FFC83D']], size2: 104,
      word: 'DRAW', at: wt(98), handleAt: wt(103),
    })],
  ],
  raccoon: [[0, 'r_cross'], [wt(40), 'shock'], [wt(44), 'point'], [wt(52), 'r_present'], [wt(69), 'laptop'], [wt(79), 'thumbs'], [wt(80), 'r_present'], [wt(86), 'r_cross'], [wt(92), 'facepalm'], [wt(94), 'r_present'], [wt(98), 'point']],
  intern: [[0, null], [wt(19) - 0.15, 'p_smug', 1], [wt(21), 'p_explain'], [wt(37), 'p_smug'], [wt(40), 'p_shock'], [wt(42), 'p_embar'], [wt(44), 'p_think'], [wt(54), 'p_shock'], [wt(57), 'p_smug'], [wt(69), 'p_think'], [wt(79), 'p_celebrate'], [wt(86), 'p_think'], [wt(92), 'p_embar'], [wt(98), 'p_celebrate']],
});
