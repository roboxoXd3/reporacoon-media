// Ep12 Immich. Built on engine/scene/skit.js.
const T = (i) => wt(i) - 0.1;
const PLAN = ['1. Backup app', '2. Photo server', '3. Face AI', '4. Map view'];
SKIT({
  accent: [2, 3, 5, 8, 11, 12, 13, 18, 21, 22, 23, 24, 26, 30, 31, 32, 33, 35, 36, 37, 46, 47, 50, 51, 52, 53, 57, 59, 60, 61, 64, 68, 71, 75, 76, 77, 78, 80, 81, 85, 87, 95, 96, 98, 99, 101, 104, 107],
  panels: [
    [0, T(14), (l, h) => h.task(l, {
      l1: [['20,000', 1, wt(2), h.red], ['photos.', 0, wt(5)]],
      l2: [['Your', 0, wt(10)], ['own', 0, wt(11)], ['drive.', 0, wt(12)]],
      visual: (l) => {
        const phone = h.el(l, `<div style="position:absolute;left:110px;top:560px">${h.PHONE}</div>`);
        const cols = ['#FF8A65', '#FFC83D', '#9FF0CF', '#BFD0FF', '#F48FB1', '#A5D6A7'];
        const pics = cols.map((c, i) => h.el(l, `<div style="position:absolute;left:0;top:0;width:54px;height:54px;border-radius:8px;background:${c};border:5px solid ${h.ink}"></div>`));
        const cloud = h.el(l, `<div style="position:absolute;left:400px;top:560px"><svg viewBox="0 0 160 100" width="170"><path d="M40 85 H125 A28 28 0 0 0 120 30 A38 38 0 0 0 48 38 A24 24 0 0 0 40 85 Z" fill="#fff" stroke="${h.ink}" stroke-width="7"/><path d="M30 15 L135 92 M135 15 L30 92" stroke="${h.red}" stroke-width="11" stroke-linecap="round"/></svg></div>`);
        const drive = h.el(l, `<div style="position:absolute;left:700px;top:600px"><svg viewBox="0 0 200 130" width="230"><rect x="6" y="6" width="188" height="118" rx="18" fill="${h.ink}"/><rect x="22" y="78" width="120" height="14" rx="7" fill="#555"/><circle cx="166" cy="85" r="9" fill="#9FF0CF"/><text x="22" y="56" font-family="sans-serif" font-weight="800" font-size="30" fill="#fff">MY DRIVE</text></svg></div>`);
        return (t) => {
          h.popIn(phone, t, wt(4), -4); h.popIn(cloud, t, wt(6), 5); h.popIn(drive, t, wt(9), -3);
          pics.forEach((p, i) => {
            const st = wt(9) + 0.15 + i * 0.16; const k = eIO(prog(t, st, st + 0.55));
            const x0 = 150 + (i % 2) * 40, y0 = 600 + Math.floor(i / 2) * 50, x1 = 760 + (i % 3) * 30, y1 = 630 + (i % 2) * 20;
            p.style.opacity = t < wt(4) ? 0 : (k >= 1 ? 0 : 1);
            p.style.transform = `translate(${lerp(x0, x1, k)}px,${lerp(y0, y1, k) - Math.sin(k * Math.PI) * 140}px) rotate(${k * 30 * (i % 2 ? 1 : -1)}deg)`;
          });
        };
      },
      stamps: [['NO GOOGLE', wt(8), 170, -6]], timer: wt(13),
    })],
    [T(14), T(36), (l, h) => h.plan(l, {
      items: [[PLAN[0], wt(18)], [PLAN[1], wt(21)], [PLAN[2], wt(23)], [PLAN[3], wt(26)]],
      eta: ['ETA:', '6', 'months', wt(30)], circleAt: wt(31), shakeAt: wt(32), fix: '5?', fixAt: wt(35),
    })],
    [T(36), T(48), (l, h) => h.rule(l, {
      items: PLAN, xAt: wt(36), cardAt: wt(38),
      l1: [['Before', 0, wt(38)], ['you', 0, wt(39)], ['code,', 0, wt(45)]],
      l2: [['search', 0, wt(46)], ['GitHub.', 1, wt(47), '#FFC83D']], size2: 70,
    })],
    [T(48), T(62), (l, h) => h.reveal(l, {
      logo: `<svg viewBox="0 0 120 120" width="150"><g transform="translate(60 60)"><ellipse rx="18" ry="34" cy="-26" fill="#FFC83D"/><ellipse rx="18" ry="34" cy="-26" fill="#FF8A65" transform="rotate(90)"/><ellipse rx="18" ry="34" cy="-26" fill="#9FF0CF" transform="rotate(180)"/><ellipse rx="18" ry="34" cy="-26" fill="#BFD0FF" transform="rotate(270)"/><circle r="10" fill="#fff"/></g></svg>`,
      logoBg: 'linear-gradient(140deg,#3a4a8c,#1d2350)', logoAt: wt(48), name: 'Immich', nameAt: wt(50), nameSize: 150,
      row1: [['Open source', wt(51)], ['Self-hosted', wt(53), '#FFC83D'], ['119k ★', wt(60)]],
      row2: [['AGPL-3.0', wt(61)]],
    })],
    [T(62), T(88), (l, h) => {
      const sh = shot(l, 'ep12_immich_shot.png', 1802, 1118, { x: 70, y: 195, w: 940, h: 583 }); sh.cam(901, 559, 1802);
      const row = h.el(l, `<div style="position:absolute;left:0;right:0;top:800px;display:flex;justify-content:center;gap:14px;flex-wrap:wrap;padding:0 40px"></div>`);
      const steps = [['Server ▶', wt(62)], ['Phone app', wt(69)], ['Backup ✓', wt(73)]].map(([s, at]) => { const e = $(`<div class="pill" style="font-size:38px;padding:8px 20px">${s}</div>`); row.appendChild(e); return [e, at]; });
      const row2 = h.el(l, `<div style="position:absolute;left:0;right:0;top:895px;display:flex;justify-content:center;gap:14px;flex-wrap:wrap;padding:0 40px"></div>`);
      const perks = [['Face recognition', wt(77), '#fff'], ['World map', wt(80), '#FFC83D'], ['Search objects', wt(83), '#fff']].map(([s, at, bg]) => { const e = $(`<div class="pill" style="font-size:36px;padding:8px 20px;background:${bg}">${s}</div>`); row2.appendChild(e); return [e, at]; });
      const done = h.el(l, `<div class="pill" style="position:absolute;left:760px;top:650px;font-size:56px;background:#9FF0CF">Done ✓</div>`);
      const tap = ripple(l);
      footer(l, 'Immich · AGPL-3.0 · screenshot: project README');
      return (t) => {
        const k = eOut(prog(t, T(62), T(62) + 0.45)); sh.el.style.opacity = k; sh.el.style.transform = `translateY(${(1 - k) * 120}px)`;
        // camera keyframes: full -> backup screen -> people row -> map -> full
        const K = [[wt(62), 901, 559, 1802], [wt(73) - 0.3, 901, 559, 1802], [wt(73) + 0.4, 1660, 820, 620], [wt(77) - 0.2, 1660, 820, 620], [wt(77) + 0.4, 1430, 140, 620],
          [wt(80) - 0.2, 1430, 140, 620], [wt(80) + 0.4, 680, 420, 760], [wt(83) - 0.2, 680, 420, 760], [wt(83) + 0.5, 901, 559, 1802]];
        let c = K[0].slice(1);
        for (let i = 0; i < K.length - 1; i++) { if (t >= K[i][0]) { const q = eIO(prog(t, K[i][0], K[i + 1][0])); c = [1, 2, 3].map((j) => lerp(K[i][j], K[i + 1][j], q)); } }
        sh.cam(c[0], c[1], c[2]);
        steps.forEach(([e, at]) => h.popIn(e, t, at, 5, 0.22)); perks.forEach(([e, at]) => h.popIn(e, t, at, -5, 0.22));
        tap(t, wt(75), 540, 700); h.popIn(done, t, wt(76), -7);
        done.style.opacity = Math.min(+done.style.opacity || 0, 1 - prog(t, wt(77), wt(77) + 0.25));
      };
    }],
    [T(88), T(97), (l, h) => h.payoff(l, { big: '5 months', at: T(88) + 0.05, strikeAt: wt(95), tail: [['saved.', 1, wt(96), '#0e9e8a']] })],
    [T(97), 99, (l, h) => h.cta(l, {
      h1: [['Take', 0, wt(97)], ['more', 0, wt(98)]], h2: [['photos.', 1, wt(99), '#FFC83D']], size2: 120,
      word: 'PHOTOS', at: wt(100), handleAt: wt(104),
    })],
  ],
  raccoon: [[0, 'r_cross'], [wt(4), 'phone'], [wt(14), 'r_cross'], [wt(36), 'point'], [wt(48), 'r_present'], [wt(62), 'laptop'], [wt(76), 'thumbs'], [wt(88), 'r_cross'], [wt(97), 'wave'], [wt(100), 'point']],
  intern: [[0, null], [wt(14) - 0.15, 'p_smug', 1], [wt(16), 'p_explain'], [wt(30), 'p_smug'], [wt(32), 'p_shock'], [wt(34), 'p_embar'], [wt(38), 'p_think'], [wt(50), 'p_shock'], [wt(53), 'p_smug'], [wt(62), 'p_think'], [wt(76), 'p_celebrate'], [wt(88), 'p_think'], [wt(97), 'p_embar'], [wt(100), 'p_celebrate']],
});
