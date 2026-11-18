// Ep07 Upscayl. Built on engine/scene/skit.js.
const T = (i) => wt(i) - 0.1;
const PLAN = ['1. Collect 1M photos', '2. Train AI model', '3. Rent GPUs', '4. Build an app'];
SKIT({
  accent: [6, 8, 11, 14, 15, 16, 21, 26, 30, 36, 37, 38, 39, 41, 45, 46, 51, 54, 55, 56, 61, 62, 64, 66, 67, 77, 80, 84, 93, 94, 97, 100, 102],
  panels: [
    [0, T(17), (l, h) => h.task(l, {
      l1: [['Tiny.', 0, wt(6)], ['Blurry.', 1, wt(8), h.red]],
      l2: [['Sharp', 1, wt(11)], ['enough', 0, wt(12)], ['to', 0, wt(13)], ['print.', 0, wt(14)]], size2: 70,
      visual: (l) => {
        const pol = h.el(l, `<div style="position:absolute;left:150px;top:560px;width:300px;height:340px;background:#fff;border:5px solid ${h.ink};border-radius:10px;box-shadow:0 10px 0 rgba(0,0,0,.15);overflow:hidden"><img src="img/up_before.png" style="position:absolute;left:18px;top:18px;width:254px;height:254px;filter:blur(5px)"><div style="position:absolute;left:0;right:0;bottom:12px;text-align:center;font-family:Mono;font-weight:700;font-size:26px;color:#8a8577">old_photo.jpg</div></div>`);
        const arr = h.el(l, `<svg style="position:absolute;left:480px;top:680px" width="120" height="80" viewBox="0 0 120 80"><path d="M6 40 H96 M70 14 L100 40 L70 66" fill="none" stroke="${h.ink}" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/></svg>`);
        const frame = h.el(l, `<div style="position:absolute;left:630px;top:540px;width:320px;height:380px;border:8px dashed ${h.ink};border-radius:16px;display:flex;align-items:center;justify-content:center;font-family:Sans;font-weight:800;font-size:54px;color:${h.ink}">PRINT</div>`);
        return (t) => { h.popIn(pol, t, wt(1), -6); h.popIn(arr, t, wt(9), 0); h.popIn(frame, t, wt(14), 5); };
      },
      stamps: [['FREE', wt(15), 400, -8]], timer: wt(16),
    })],
    [T(17), T(42), (l, h) => h.plan(l, {
      items: [[PLAN[0], wt(19)], [PLAN[1], wt(23)], [PLAN[2], wt(28)], [PLAN[3], wt(31)]],
      eta: ['ETA:', '4', 'months', wt(36)], circleAt: wt(38), shakeAt: wt(40), fix: '3?', fixAt: wt(41),
    })],
    [T(42), T(52), (l, h) => h.rule(l, {
      items: PLAN, xAt: wt(42), cardAt: wt(45), badge: 'SENIOR DEV RULE',
      l1: [['Search', 0, wt(45)], ['GitHub', 0, wt(46)]],
      l2: [['before', 0, wt(47)], ['you', 0, wt(48)], ['code.', 1, wt(49), '#FFC83D']], size2: 84,
    })],
    [T(52), T(69), (l, h) => h.reveal(l, {
      logo: `<svg viewBox="0 0 120 120" width="150"><circle cx="50" cy="50" r="34" fill="none" stroke="#fff" stroke-width="10"/><path d="M75 75 L106 106" stroke="#fff" stroke-width="14" stroke-linecap="round"/><path d="M50 66 V36 M38 47 L50 34 L62 47" fill="none" stroke="#fff" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
      logoBg: 'linear-gradient(140deg,#a855f7,#5b21b6)', logoAt: wt(52), name: 'Upscayl', nameAt: wt(54), nameSize: 160,
      row1: [['52k ★ on GitHub', wt(54) + 0.4], ['Free', wt(55), '#FFC83D'], ['Open source', wt(56)]],
      row2: [['AI image upscaler', wt(58)], ['Windows', wt(61)], ['Mac', wt(62)], ['Linux', wt(64)]],
    })],
    [T(69), T(86), (l, h) => {
      const sh = shot(l, 'upscayl_shot.png', 1120, 794, { x: 60, y: 190, w: 960, h: 560 }); sh.cam(560, 397, 1120);
      const ba = h.el(l, `<div style="position:absolute;left:60px;top:190px;width:960px;height:560px;border-radius:28px;background:#fff;border:5px solid ${h.ink};overflow:hidden;opacity:0">
        <img src="img/up_before.png" style="position:absolute;left:24px;top:24px;width:444px;height:444px;filter:blur(5px);border-radius:14px">
        <img src="img/up_after.png" style="position:absolute;left:488px;top:24px;width:444px;height:444px;border-radius:14px">
        <div style="position:absolute;left:24px;width:444px;top:480px;text-align:center;font-family:Sans;font-weight:800;font-size:44px;color:#8a8577">Before</div>
        <div style="position:absolute;left:488px;width:444px;top:480px;text-align:center;font-family:Sans;font-weight:800;font-size:44px;color:${h.ink}">After</div></div>`);
      const steps = [['Open photo', wt(69)], ['Pick a model', wt(72)], ['Click upscale', wt(75)]].map(([s, at], i) => [h.el(l, `<div class="pill" style="position:absolute;left:${[70, 390, 730][i]}px;top:785px;font-size:38px;padding:12px 24px">${s}</div>`), at]);
      const done = h.el(l, `<div class="pill" style="position:absolute;left:790px;top:215px;font-size:56px;background:#9FF0CF">Done ✓</div>`);
      const esr = h.el(l, `<div class="pill" style="position:absolute;left:150px;top:885px;font-size:44px;background:#FFC83D">Real-ESRGAN</div>`);
      const gpu = h.el(l, `<div class="pill" style="position:absolute;left:560px;top:885px;font-size:44px">Your own GPU</div>`);
      const tap = ripple(l);
      footer(l, 'Upscayl · AGPL-3.0 · screenshot + sample image: upscayl repo');
      return (t) => {
        const k = eOut(prog(t, T(69), T(69) + 0.45)); sh.el.style.opacity = k * (1 - prog(t, wt(77) - 0.1, wt(77) + 0.2)); sh.el.style.transform = `translateY(${(1 - k) * 120}px)`;
        const z1 = eIO(prog(t, wt(69) - 0.1, wt(69) + 0.5)), z2 = eIO(prog(t, wt(72) - 0.1, wt(72) + 0.5)), z3 = eIO(prog(t, wt(75) - 0.1, wt(75) + 0.5));
        const cy = lerp(lerp(lerp(397, 272, z1), 410, z2), 640, z3);
        sh.cam(lerp(560, 250, z1), cy, lerp(1120, 500, z1));
        steps.forEach(([e, at], i) => h.popIn(e, t, at, (i - 1) * 4));
        tap(t, wt(70), 242, 470); tap(t, wt(73), 270, 470); tap(t, wt(76), 210, 570);
        const kb = eOut(prog(t, wt(77) - 0.1, wt(77) + 0.3)); ba.style.opacity = kb; ba.style.transform = `scale(${0.92 + 0.08 * kb})`;
        h.popIn(done, t, wt(77), -7); h.popIn(esr, t, wt(80), -4); h.popIn(gpu, t, wt(83), 4);
      };
    }],
    [T(86), T(95), (l, h) => h.payoff(l, { big: '3 months', at: T(86) + 0.05, strikeAt: wt(93), tail: [['saved.', 1, wt(94) + 0.4, '#0e9e8a']] })],
    [T(95), 99, (l, h) => h.cta(l, {
      h1: [['Print', 0, wt(95)], ['the', 0, wt(96)], ['photo.', 0, wt(97)]], h2: [['Call', 1, wt(98), '#FFC83D'], ['your', 1, wt(99), '#FFC83D'], ['grandparents.', 1, wt(100), '#FFC83D']], size2: 96,
      word: 'SHARP', at: wt(101), handleAt: wt(104),
    })],
  ],
  raccoon: [[0, 'r_cross'], [wt(42), 'point'], [wt(52), 'r_present'], [wt(77), 'thumbs'], [wt(79), 'r_present'], [wt(86), 'r_cross'], [wt(95), 'r_present'], [wt(101), 'point']],
  intern: [[0, null], [wt(17) - 0.15, 'p_smug', 1], [wt(19), 'p_explain'], [wt(37), 'p_smug'], [wt(39), 'p_shock'], [wt(40), 'p_embar'], [wt(44), 'p_think'], [wt(54), 'p_shock'], [wt(57), 'p_smug'], [wt(69), 'p_think'], [wt(77), 'p_celebrate'], [wt(86), 'p_think'], [wt(95), 'p_embar'], [wt(101), 'p_celebrate']],
});
