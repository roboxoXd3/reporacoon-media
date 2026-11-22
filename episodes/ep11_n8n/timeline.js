// Ep11 n8n. Built on engine/scene/skit.js.
const T = (i) => wt(i) - 0.1;
const PLAN = ['1. Email scraper', '2. Cron server', '3. AI pipeline', '4. Bot'];
SKIT({
  accent: [3, 5, 6, 9, 11, 12, 13, 20, 22, 23, 27, 29, 30, 33, 34, 36, 38, 39, 45, 47, 50, 53, 54, 55, 56, 57, 62, 63, 64, 67, 71, 74, 76, 77, 78, 79, 82, 83, 95, 96, 97, 98, 100, 101, 103, 106],
  panels: [
    [0, T(15), (l, h) => h.task(l, {
      l1: [['Every', 0, wt(0)], ['8 AM.', 1, wt(3), h.red]],
      l2: [['AI', 0, wt(5)], ['inbox', 0, wt(9)], ['summary.', 0, wt(9) + 0.15]],
      visual: (l) => {
        const ENV = (c) => `<svg viewBox="0 0 120 84" width="130"><rect x="4" y="4" width="112" height="76" rx="10" fill="#fff" stroke="${h.ink}" stroke-width="7"/><path d="M8 10 L60 50 L112 10" fill="none" stroke="${c}" stroke-width="7" stroke-linejoin="round"/></svg>`;
        const envs = [[120, 600, -8], [190, 660, 6], [110, 730, -3]].map(([x, y, r]) => h.el(l, `<div style="position:absolute;left:${x}px;top:${y}px;transform:rotate(${r}deg)">${ENV(h.red)}</div>`));
        const cnt = h.el(l, `<div class="chip" style="left:360px;top:770px;font-size:34px;background:#fff">📥 47 unread</div>`);
        const arrow = h.el(l, `<svg style="position:absolute;left:370px;top:660px" width="230" height="80"><path d="M10 40 H200 M175 18 L205 40 L175 62" stroke="${h.ink}" stroke-width="9" stroke-dasharray="16 12" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>`);
        const ai = h.el(l, `<div class="pill" style="position:absolute;left:420px;top:590px;font-size:40px;padding:6px 20px;background:#FFC83D">AI</div>`);
        const phone = h.el(l, `<div style="position:absolute;left:640px;top:560px">${h.PHONE}</div>`);
        const msg = h.el(l, `<div class="chip" style="left:720px;top:610px;font-size:30px;background:#fff;line-height:1.2">☀ 3 things<br>matter today</div>`);
        return (t) => { envs.forEach((e, i) => h.popIn(e, t, wt(6) + i * 0.15, 4)); h.popIn(cnt, t, wt(9), -5);
          arrow.style.opacity = prog(t, wt(10), wt(10) + 0.3); h.popIn(ai, t, wt(5), 6); h.popIn(phone, t, wt(11), -4); h.popIn(msg, t, wt(11) + 0.3, 5); };
      },
      stamps: [['ZERO CLICKS', wt(12), 170, -6]], timer: wt(14),
    })],
    [T(15), T(40), (l, h) => h.plan(l, {
      items: [[PLAN[0], wt(19)], [PLAN[1], wt(22)], [PLAN[2], wt(25)], [PLAN[3], wt(29)]],
      eta: ['ETA:', '2', 'months', wt(33)], circleAt: wt(34), shakeAt: wt(36), fix: '7 wks?', fixAt: wt(38),
    })],
    [T(40), T(51), (l, h) => h.rule(l, {
      items: PLAN, xAt: wt(40), cardAt: wt(42),
      l1: [['Before', 0, wt(43)], ['you', 0, wt(44)], ['build,', 0, wt(45)]],
      l2: [['check', 0, wt(47)], ['what', 0, wt(48)], ['already', 0, wt(49)], ['exists.', 1, wt(50), '#FFC83D']], size2: 62,
    })],
    [T(51), T(65), (l, h) => h.reveal(l, {
      logo: `<svg viewBox="0 0 140 100" width="160"><path d="M30 50 H62 M78 50 C95 50 95 24 110 24 M78 50 C95 50 95 76 110 76" fill="none" stroke="#fff" stroke-width="6" stroke-linecap="round"/><circle cx="20" cy="50" r="14" fill="none" stroke="#fff" stroke-width="6"/><circle cx="70" cy="50" r="10" fill="#FFC83D"/><circle cx="120" cy="24" r="12" fill="none" stroke="#fff" stroke-width="6"/><circle cx="120" cy="76" r="12" fill="none" stroke="#fff" stroke-width="6"/></svg>`,
      logoBg: 'linear-gradient(140deg,#ff7a59,#d3406a)', logoAt: wt(51), name: 'n8n', nameAt: wt(53), nameSize: 170,
      row1: [['Fair-code', wt(56)], ['Self-hostable', wt(57), '#FFC83D'], ['211k ★', wt(63)]],
      row2: [['Source available', wt(64)]],
    })],
    [T(65), T(88), (l, h) => {
      const sh = shot(l, 'n8n_shot.png', 3025, 1818, { x: 70, y: 195, w: 940, h: 565 }); sh.cam(1512, 909, 3025);
      const row = h.el(l, `<div style="position:absolute;left:0;right:0;top:785px;display:flex;justify-content:center;gap:14px;flex-wrap:wrap;padding:0 40px"></div>`);
      const steps = [['Docker ▶', wt(65)], ['Gmail → AI → Telegram', wt(69)], ['Connect ✓', wt(77)]].map(([s, at]) => { const e = $(`<div class="pill" style="font-size:36px;padding:8px 18px">${s}</div>`); row.appendChild(e); return [e, at]; });
      const row2 = h.el(l, `<div style="position:absolute;left:0;right:0;top:885px;display:flex;justify-content:center;gap:14px;flex-wrap:wrap;padding:0 40px"></div>`);
      const perks = [['1500+ integrations', wt(79), '#fff'], ['Code when needed', wt(83), '#FFC83D']].map(([s, at, bg]) => { const e = $(`<div class="pill" style="font-size:40px;padding:10px 24px;background:${bg}">${s}</div>`); row2.appendChild(e); return [e, at]; });
      const term = h.el(l, `<div class="pill" style="position:absolute;left:90px;top:230px;font-size:38px;background:${h.ink};color:#9FF0CF;font-family:monospace">$ <span class="d"></span></div>`);
      const d = term.querySelector('.d'); const CMD = 'docker run n8nio/n8n';
      const done = h.el(l, `<div class="pill" style="position:absolute;left:780px;top:640px;font-size:56px;background:#9FF0CF">Done ✓</div>`);
      const tap = ripple(l);
      footer(l, 'n8n · fair-code, Sustainable Use License · screenshot: project README');
      return (t) => {
        const k = eOut(prog(t, T(65), T(65) + 0.45)); sh.el.style.opacity = k; sh.el.style.transform = `translateY(${(1 - k) * 120}px)`;
        const z = eIO(prog(t, wt(69), wt(69) + 0.6)) * (1 - eIO(prog(t, wt(76), wt(76) + 0.6)));
        const pan = eIO(prog(t, wt(71), wt(76) - 0.2));
        sh.cam(lerp(1512, lerp(700, 2400, pan), z), lerp(909, 860, z), lerp(3025, 1500, z));
        steps.forEach(([e, at]) => h.popIn(e, t, at, 5, 0.22)); perks.forEach(([e, at]) => h.popIn(e, t, at, -5, 0.22));
        h.popIn(term, t, wt(65), -4); term.style.opacity = Math.min(term.style.opacity || 1, 1 - prog(t, wt(69) - 0.2, wt(69)));
        d.textContent = CMD.slice(0, Math.round(CMD.length * prog(t, wt(65) + 0.1, wt(68) + 0.3)));
        tap(t, wt(77) + 0.05, 540, 470); h.popIn(done, t, wt(78), -7);
      };
    }],
    [T(88), T(97), (l, h) => h.payoff(l, { big: '7 weeks', at: T(88) + 0.05, strikeAt: wt(95), tail: [['saved.', 1, wt(96), '#0e9e8a']] })],
    [T(97), 99, (l, h) => h.cta(l, {
      h1: [['Sleep', 0, wt(97)], ['in.', 0, wt(98)]], h2: [['Robot', 1, wt(100), '#FFC83D'], ['reads', 1, wt(101), '#FFC83D'], ['it.', 1, wt(103), '#FFC83D']], size2: 110,
      word: 'AUTO', at: wt(105), handleAt: wt(108),
    })],
  ],
  raccoon: [[0, 'r_cross'], [wt(11), 'phone'], [wt(15), 'r_cross'], [wt(40), 'point'], [wt(51), 'r_present'], [wt(65), 'laptop'], [wt(78), 'thumbs'], [wt(88), 'r_cross'], [wt(97), 'wave'], [wt(105), 'point']],
  intern: [[0, null], [wt(15) - 0.15, 'p_smug', 1], [wt(17), 'p_explain'], [wt(33), 'p_smug'], [wt(35), 'p_shock'], [wt(37), 'p_embar'], [wt(42), 'p_think'], [wt(53), 'p_shock'], [wt(57), 'p_smug'], [wt(65), 'p_think'], [wt(78), 'p_celebrate'], [wt(88), 'p_think'], [wt(97), 'p_embar'], [wt(105), 'p_celebrate']],
});
