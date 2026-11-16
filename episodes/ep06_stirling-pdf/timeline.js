// Ep06 Stirling PDF. Built on engine/scene/skit.js.
const T = (i) => wt(i) - 0.1;
const PLAN = ['1. PDF engine', '2. Merge tool', '3. Compressor', '4. Signature pad'];
SKIT({
  accent: [0, 3, 6, 9, 11, 16, 17, 35, 36, 37, 39, 44, 47, 51, 53, 55, 71, 74, 75, 87, 96, 102, 104],
  panels: [
    [0, T(18), (l, h) => h.task(l, {
      l1: [['Merge.', 0, wt(0)], ['Shrink.', 0, wt(3)], ['Sign.', 1, wt(6), h.red]],
      l2: [['Without', 0, wt(10)], ['uploading', 1, wt(11)], ['them.', 0, wt(12)]],
      visual: (l) => {
        const docs = [150, 250, 350].map((x, i) => [h.el(l, `<div style="position:absolute;left:${x}px;top:${570 + i * 12}px">${h.DOC('PDF', '#E5352B')}</div>`), wt(1) + i * 0.12]);
        const site = h.el(l, `<div style="position:absolute;left:620px;top:575px;width:330px;height:200px;border-radius:24px;background:#fff;border:5px solid ${h.ink};box-shadow:0 10px 0 rgba(0,0,0,.15);font-family:Mono;font-weight:700;font-size:26px;color:#8a8577;overflow:hidden"><div style="background:#e9e6dc;padding:12px 18px">random-pdf.site</div><div style="padding:22px 18px;font-family:Sans;font-size:40px;color:${h.ink}">Upload your file?</div></div>`);
        return (t) => { docs.forEach(([e, at], i) => h.popIn(e, t, at, (i - 1) * 6)); h.popIn(site, t, wt(14), 5); };
      },
      stamps: [['NO UPLOADS', wt(10) + 0.5, 300, -8]], timer: wt(17),
    })],
    [T(18), T(40), (l, h) => h.plan(l, {
      items: [[PLAN[0], wt(22)], [PLAN[1], wt(25)], [PLAN[2], wt(28)], [PLAN[3], wt(30)]],
      eta: ['ETA:', '6', 'weeks', wt(32)], circleAt: wt(34), shakeAt: wt(36), fix: '5?', fixAt: wt(39),
    })],
    [T(40), T(48), (l, h) => h.rule(l, {
      items: PLAN, xAt: wt(40), cardAt: wt(43),
      l1: [['Check', 0, wt(43)], ['GitHub', 0, wt(44)]],
      l2: [['before', 0, wt(45)], ['you', 0, wt(46)], ['build.', 1, wt(47), '#FFC83D']], size2: 84,
    })],
    [T(48), T(65), (l, h) => h.reveal(l, {
      logo: `<svg viewBox="0 0 100 120" width="120"><path d="M14 6 H64 L88 30 V114 H14 Z" fill="#fff"/><path d="M64 6 V30 H88" fill="#f3c9c4"/><text x="51" y="86" text-anchor="middle" font-family="Sans" font-weight="800" font-size="28" fill="#b3261e">PDF</text></svg>`,
      logoBg: 'linear-gradient(140deg,#e2554a,#9e1f17)', logoAt: wt(48), name: 'Stirling PDF', nameAt: wt(50), nameSize: 124,
      row1: [['96k ★ on GitHub', wt(50) + 0.4], ['50+ PDF tools', wt(53), '#FFC83D']],
      row2: [['Merge', wt(59)], ['Split', wt(60)], ['Compress', wt(61)], ['Sign', wt(62)], ['OCR', wt(64)]],
    })],
    [T(65), T(88), (l, h) => {
      const sh = shot(l, 'stirling_shot.png', 1384, 778, { x: 50, y: 200, w: 980, h: 551 }); sh.cam(692, 389, 1384);
      const own = h.el(l, `<div class="pill" style="position:absolute;left:0;right:0;margin:auto;width:max-content;top:785px;font-size:44px;background:#FFC83D">Runs on your own machine</div>`);
      const stay = h.el(l, `<div class="pill" style="position:absolute;left:0;right:0;margin:auto;width:max-content;top:885px;font-size:44px">Files never leave it</div>`);
      const docs = [0, 1, 2].map((i) => h.el(l, `<div style="position:absolute;left:0;top:0;transform-origin:50% 50%">${h.DOC('PDF', '#E5352B')}</div>`));
      const done = h.el(l, `<div class="pill" style="position:absolute;left:770px;top:230px;font-size:56px;background:#9FF0CF">Done ✓</div>`);
      const tap = ripple(l);
      footer(l, 'Stirling PDF · open-core, see its LICENSE · screenshot: project README');
      return (t) => {
        const k = eOut(prog(t, T(65), T(65) + 0.45)); sh.el.style.opacity = k; sh.el.style.transform = `translateY(${(1 - k) * 120}px)`;
        const z = eIO(prog(t, wt(84) - 0.2, wt(84) + 0.7)); sh.cam(lerp(692, 1180, z), lerp(389, 300, z), lerp(1384, 520, z));
        h.popIn(own, t, wt(67), -4); h.popIn(stay, t, wt(74), 4);
        docs.forEach((e, i) => { const kd = eIO(prog(t, wt(81) + i * 0.12, wt(83) + i * 0.12)); e.style.opacity = kd > 0 && kd < 1 ? 1 : 0;
          e.style.left = lerp(140 + i * 60, 470, kd) + 'px'; e.style.top = (lerp(900, 420, kd) - Math.sin(kd * Math.PI) * 150) + 'px'; e.style.transform = `scale(${1 - 0.5 * kd}) rotate(${(1 - kd) * (i - 1) * 12}deg)`; });
        tap(t, wt(85), 860, 300); h.popIn(done, t, wt(87), -7);
      };
    }],
    [T(88), T(97), (l, h) => h.payoff(l, { big: '5 weeks', at: T(88) + 0.05, strikeAt: wt(91), tail: [['saved.', 1, wt(95), '#0e9e8a']] })],
    [T(97), 99, (l, h) => h.cta(l, {
      h1: [['Spend', 0, wt(97)], ['them', 0, wt(98)], ['on', 0, wt(99)]], h2: [['work', 1, wt(100), '#FFC83D'], ['worth', 1, wt(101), '#FFC83D'], ['signing.', 1, wt(102), '#FFC83D']], size2: 110,
      word: 'PDF', at: wt(103), handleAt: wt(106),
    })],
  ],
  raccoon: [[0, 'r_cross'], [wt(40), 'point'], [wt(48), 'r_present'], [wt(87), 'thumbs'], [wt(89), 'r_cross'], [wt(97), 'r_present'], [wt(103), 'point']],
  intern: [[0, null], [wt(18) - 0.15, 'p_smug', 1], [wt(20), 'p_explain'], [wt(33), 'p_smug'], [wt(36), 'p_shock'], [wt(38), 'p_embar'], [wt(42), 'p_think'], [wt(50), 'p_shock'], [wt(56), 'p_smug'], [wt(65), 'p_think'], [wt(87), 'p_celebrate'], [wt(88) + 0.3, 'p_think'], [wt(97), 'p_embar'], [wt(103), 'p_celebrate']],
});
