// Ep10 RustDesk. Built on engine/scene/skit.js.
const T = (i) => wt(i) - 0.1;
const PLAN = ['1. Screen streamer', '2. Relay server', '3. Remote mouse', '4. Encryption'];
SKIT({
  accent: [1, 2, 9, 10, 13, 16, 17, 22, 23, 25, 26, 30, 34, 36, 38, 39, 43, 44, 49, 52, 53, 55, 57, 64, 65, 66, 70, 73, 74, 75, 77, 85, 86, 94, 95, 98, 100, 102],
  panels: [
    [0, T(18), (l, h) => h.task(l, {
      l1: [["Mom's", 0, wt(1)], ['laptop.', 1, wt(2), h.red]],
      l2: [['Another', 0, wt(8)], ['city.', 1, wt(9)]],
      visual: (l) => {
        const me = h.el(l, `<div style="position:absolute;left:110px;top:590px">${h.LAPTOP(300)}</div>`);
        const mom = h.el(l, `<div style="position:absolute;left:640px;top:590px">${h.LAPTOP(300)}</div>`);
        const warn = h.el(l, `<div class="pill" style="position:absolute;left:720px;top:560px;font-size:40px;padding:8px 22px;background:${h.red};color:#fff">⚠ error</div>`);
        const tag = h.el(l, `<div class="chip" style="left:690px;top:800px;font-size:38px;background:#fff">🏠 Mom</div>`);
        const you = h.el(l, `<div class="chip" style="left:180px;top:800px;font-size:38px;background:#fff">You</div>`);
        const line = h.el(l, `<svg style="position:absolute;left:420px;top:640px" width="220" height="60"><path class="p" d="M5 30 H215" stroke="${h.ink}" stroke-width="8" stroke-dasharray="14 12" fill="none" stroke-linecap="round"/></svg>`);
        const km = h.el(l, `<div class="chip" style="left:450px;top:700px;font-size:34px;background:#FFC83D">500 km</div>`);
        return (t) => { h.popIn(mom, t, wt(2), 5); h.popIn(warn, t, wt(4), -7); h.popIn(tag, t, wt(1), 6); h.popIn(me, t, wt(10), -5); h.popIn(you, t, wt(12), -6);
          line.style.opacity = prog(t, wt(8), wt(8) + 0.3); h.popIn(km, t, wt(9), 5); };
      },
      stamps: [['NO PAID APPS', wt(14), 170, -6]], timer: wt(17),
    })],
    [T(18), T(40), (l, h) => h.plan(l, {
      items: [[PLAN[0], wt(22)], [PLAN[1], wt(25)], [PLAN[2], wt(27)], [PLAN[3], wt(30)]],
      eta: ['ETA:', '1', 'year', wt(33)], circleAt: wt(34), shakeAt: wt(36), fix: '11?', fixAt: wt(38),
    })],
    [T(40), T(50), (l, h) => h.rule(l, {
      items: PLAN, xAt: wt(40), cardAt: wt(42), badge: 'SENIOR DEV RULE',
      l1: [['Search', 0, wt(43)], ['GitHub', 1, wt(44), '#FFC83D']],
      l2: [['before', 0, wt(45)], ['you', 0, wt(46)], ['open', 0, wt(47)], ['your', 0, wt(48)], ['editor.', 0, wt(49)]], size2: 60,
    })],
    [T(50), T(66), (l, h) => h.reveal(l, {
      logo: `<svg viewBox="0 0 120 100" width="150"><rect x="4" y="10" width="46" height="34" rx="5" fill="none" stroke="#fff" stroke-width="6"/><path d="M18 52 H36" stroke="#fff" stroke-width="6" stroke-linecap="round"/><rect x="70" y="50" width="46" height="34" rx="5" fill="none" stroke="#fff" stroke-width="6"/><path d="M84 92 H102" stroke="#fff" stroke-width="6" stroke-linecap="round"/><path d="M52 28 Q80 26 90 44 M84 40 L91 47 L96 38" fill="none" stroke="#FFC83D" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
      logoBg: 'linear-gradient(140deg,#2b8cff,#0b4fb8)', logoAt: wt(50), name: 'RustDesk', nameAt: wt(52), nameSize: 150,
      row1: [['130k ★', wt(52) + 0.35], ['Free', wt(53)], ['Open source', wt(54), '#FFC83D']],
      row2: [['TeamViewer alternative', wt(57)], ['AGPL-3.0', wt(62)]],
    })],
    [T(66), T(87), (l, h) => {
      const sh = shot(l, 'rustdesk_shot.png', 1372, 894, { x: 50, y: 200, w: 980, h: 551 }); sh.cam(686, 386, 1372);
      const row = h.el(l, `<div style="position:absolute;left:0;right:0;top:785px;display:flex;justify-content:center;gap:14px;flex-wrap:wrap;padding:0 40px"></div>`);
      const steps = [['Install on both', wt(66)], ['Enter her ID', wt(71)], ['Connect ✓', wt(74)]].map(([s, at]) => { const e = $(`<div class="pill" style="font-size:40px;padding:10px 24px">${s}</div>`); row.appendChild(e); return [e, at]; });
      const row2 = h.el(l, `<div style="position:absolute;left:0;right:0;top:885px;display:flex;justify-content:center;gap:14px;flex-wrap:wrap;padding:0 40px"></div>`);
      const perks = [['No configuration', wt(77), '#fff'], ['Host your own server', wt(83), '#FFC83D']].map(([s, at, bg]) => { const e = $(`<div class="pill" style="font-size:40px;padding:10px 24px;background:${bg}">${s}</div>`); row2.appendChild(e); return [e, at]; });
      const id = h.el(l, `<div class="pill" style="position:absolute;left:90px;top:250px;font-size:44px;background:#fff">ID: <span class="d"></span></div>`);
      const d = id.querySelector('.d'); const ID = '123 456 789';
      const done = h.el(l, `<div class="pill" style="position:absolute;left:780px;top:640px;font-size:56px;background:#9FF0CF">Done ✓</div>`);
      const tap = ripple(l);
      footer(l, 'RustDesk · AGPL-3.0 · screenshot: project README');
      return (t) => {
        const k = eOut(prog(t, T(66), T(66) + 0.45)); sh.el.style.opacity = k; sh.el.style.transform = `translateY(${(1 - k) * 120}px)`;
        const z = eIO(prog(t, wt(73), wt(73) + 0.6)) * (1 - eIO(prog(t, wt(76), wt(76) + 0.6)));
        sh.cam(lerp(686, 640, z), lerp(386, 160, z), lerp(1372, 760, z));
        steps.forEach(([e, at]) => h.popIn(e, t, at, 5, 0.22)); perks.forEach(([e, at]) => h.popIn(e, t, at, -5, 0.22));
        h.popIn(id, t, wt(71), -5); d.textContent = ID.slice(0, Math.round(ID.length * prog(t, wt(71) + 0.1, wt(73))));
        tap(t, wt(74) + 0.05, 560, 260); h.popIn(done, t, wt(75), -7);
      };
    }],
    [T(87), T(96), (l, h) => h.payoff(l, { big: '11 months', at: T(87) + 0.05, strikeAt: wt(94), tail: [['saved.', 1, wt(95), '#0e9e8a']] })],
    [T(96), 99, (l, h) => h.cta(l, {
      h1: [['Visit', 0, wt(96)], ['your', 0, wt(97)], ['mom.', 0, wt(98)]], h2: [['In', 1, wt(99), '#FFC83D'], ['person.', 1, wt(100), '#FFC83D']], size2: 110,
      word: 'REMOTE', at: wt(101), handleAt: wt(104),
    })],
  ],
  raccoon: [[0, 'r_cross'], [wt(10), 'phone'], [wt(17), 'r_cross'], [wt(40), 'point'], [wt(50), 'r_present'], [wt(66), 'laptop'], [wt(75), 'thumbs'], [wt(87), 'r_cross'], [wt(96), 'r_present'], [wt(101), 'point']],
  intern: [[0, null], [wt(18) - 0.15, 'p_smug', 1], [wt(20), 'p_explain'], [wt(33), 'p_smug'], [wt(35), 'p_shock'], [wt(37), 'p_embar'], [wt(42), 'p_think'], [wt(52), 'p_shock'], [wt(57), 'p_smug'], [wt(66), 'p_think'], [wt(75), 'p_celebrate'], [wt(87), 'p_think'], [wt(96), 'p_embar'], [wt(101), 'p_celebrate']],
});
