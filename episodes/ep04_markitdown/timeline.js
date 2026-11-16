// Ep04 MarkItDown. Built on engine/scene/skit.js.
const T = (i) => wt(i) - 0.1;
const PLAN = ['1. PDF parser', '2. Word parser', '3. PowerPoint parser', '4. Fix the tables'];
SKIT({
  accent: [0, 3, 16, 18, 19, 37, 38, 39, 40, 42, 43, 48, 53, 56, 59, 61, 81, 82, 87, 90, 99, 102, 105, 107],
  panels: [
    [0, T(20), (l, h) => h.task(l, {
      l1: [['50', 0, wt(0), h.red], ['files', 0, wt(3)]], l2: [['into', 0, wt(9)], ['AI-ready', 1, wt(13)], ['text.', 1, wt(16)]],
      visual: (l) => {
        const docs = [['PDF', '#E5352B', 150, wt(1)], ['DOCX', '#2b5bd7', 340, wt(2)], ['PPT', '#E07B1F', 530, wt(5)]]
          .map(([lab, c, x, at]) => [h.el(l, `<div style="position:absolute;left:${x}px;top:560px">${h.DOC(lab, c)}</div>`), at]);
        const ai = h.el(l, `<div style="position:absolute;left:750px;top:575px;width:180px;height:180px;border-radius:40px;background:${h.ink};color:#9FF0CF;font-family:Mono;font-weight:700;font-size:64px;display:flex;align-items:center;justify-content:center">AI</div>`);
        const q = h.el(l, `<div style="position:absolute;left:800px;top:500px;font-family:Sans;font-weight:800;font-size:70px;color:${h.red}">???</div>`);
        return (t) => { docs.forEach(([e, at], i) => h.popIn(e, t, at, i % 2 ? 6 : -6)); h.popIn(ai, t, wt(13), 4); h.popIn(q, t, wt(15), -8); };
      },
      stamps: [['BY TONIGHT', wt(17), 290, -9]], timer: wt(19),
    })],
    [T(20), T(44), (l, h) => h.plan(l, {
      items: [[PLAN[0], wt(24)], [PLAN[1], wt(27)], [PLAN[2], wt(30)], [PLAN[3], wt(32)]],
      eta: ['ETA:', '2', 'weeks', wt(35)], circleAt: wt(37), shakeAt: wt(39), fix: '10 days?', fixAt: wt(42),
    })],
    [T(44), T(54), (l, h) => h.rule(l, {
      items: PLAN, xAt: wt(44), cardAt: wt(47), badge: 'SENIOR DEV RULE',
      l1: [['Search', 0, wt(47)], ['GitHub', 0, wt(48)]],
      l2: [['before', 0, wt(49)], ['you', 0, wt(50)], ['open', 0, wt(51)], ['your', 1, wt(52), '#FFC83D'], ['editor.', 1, wt(53), '#FFC83D']], size2: 60,
    })],
    [T(54), T(73), (l, h) => h.reveal(l, {
      logo: `<svg viewBox="0 0 120 90" width="150"><rect x="4" y="4" width="112" height="82" rx="14" fill="none" stroke="#fff" stroke-width="8"/><path d="M22 66 V26 L38 46 L54 26 V66" fill="none" stroke="#fff" stroke-width="9" stroke-linejoin="round" stroke-linecap="round"/><path d="M84 26 V60 M72 50 L84 64 L96 50" fill="none" stroke="#fff" stroke-width="9" stroke-linejoin="round" stroke-linecap="round"/></svg>`,
      logoBg: 'linear-gradient(140deg,#3a4250,#161a22)', logoAt: wt(54), name: 'MarkItDown', nameAt: wt(56), nameSize: 130,
      row1: [['195k ★', wt(56) + 0.35], ['By Microsoft', wt(57)], ['Open source', wt(60), '#FFC83D']],
      row2: [['PDF', wt(65)], ['Word', wt(66)], ['PowerPoint', wt(67)], ['Excel', wt(68)], ['Images', wt(70)], ['Audio', wt(72)]],
    })],
    [T(73), T(91), (l, h) => {
      const term = h.el(l, `<div style="position:absolute;left:70px;right:70px;top:210px;height:250px;border-radius:30px;background:#0b0d12;box-shadow:0 30px 80px rgba(0,0,0,.45);padding:70px 40px 0;font-family:Mono;font-weight:700;font-size:40px;color:#9FF0CF;white-space:nowrap;overflow:hidden"><div style="position:absolute;left:30px;top:26px;display:flex;gap:12px"><i style="width:20px;height:20px;border-radius:50%;background:#ff5f57"></i><i style="width:20px;height:20px;border-radius:50%;background:#febc2e"></i><i style="width:20px;height:20px;border-radius:50%;background:#28c840"></i></div><span style="color:#6b7180">$ </span><span class="cmd"></span><span class="cur" style="background:#9FF0CF;color:#9FF0CF">_</span><div class="out" style="margin-top:22px;font-size:32px;color:#c9cde0;opacity:0">saved report.md</div></div>`);
      const cmd = term.querySelector('.cmd'), cur = term.querySelector('.cur'), out = term.querySelector('.out');
      const CMD = 'markitdown report.pdf -o report.md';
      const md = h.el(l, `<div style="position:absolute;left:110px;right:110px;top:500px;border-radius:30px;background:#F7F5EE;padding:36px 44px;font-family:Mono;font-size:34px;line-height:1.45;color:${h.ink};box-shadow:0 30px 80px rgba(0,0,0,.35)"><b style="color:#2443E8"># Q3 Report</b><br><b style="color:#2443E8">## Sales by region</b><br>- Strong growth in India<br>| Region | Sales |<br>|--------|-------|<br>| India &nbsp;| 42 &nbsp;&nbsp;&nbsp;|</div>`);
      const done = h.el(l, `<div class="pill" style="position:absolute;right:120px;top:470px;background:#9FF0CF">Done ✓</div>`);
      const row = h.el(l, `<div style="position:absolute;left:0;right:0;top:900px;display:flex;justify-content:center;gap:16px"></div>`);
      const ps = [['Headings', wt(83)], ['Lists', wt(84)], ['Tables', wt(86)], ['Built for AI', wt(88), '#FFC83D']].map(([s, at, bg]) => { const e = $(`<div class="pill" style="font-size:38px;padding:10px 26px${bg ? ';background:' + bg : ''}">${s}</div>`); row.appendChild(e); return [e, at]; });
      footer(l, 'MarkItDown · MIT license · by Microsoft · example output');
      return (t) => {
        const kt = eOut(prog(t, T(73), T(73) + 0.4)); term.style.opacity = kt; term.style.transform = `translateY(${(1 - kt) * 80}px)`;
        const n = Math.round(CMD.length * prog(t, wt(73), wt(79) + 0.2)); cmd.textContent = CMD.slice(0, n); cur.style.opacity = Math.floor(t * 3) % 2;
        out.style.opacity = prog(t, wt(80), wt(80) + 0.1);
        const km = eBack(prog(t, wt(80), wt(80) + 0.35)); md.style.opacity = prog(t, wt(80), wt(80) + 0.08); md.style.transform = `scale(${0.85 + 0.15 * km})`;
        h.popIn(done, t, wt(82), -8); ps.forEach(([e, at]) => h.popIn(e, t, at, 6, 0.22));
      };
    }],
    [T(91), T(100), (l, h) => h.payoff(l, { big: '10 days', at: T(91) + 0.05, strikeAt: wt(94), tail: [['given', 0, wt(97)], ['back.', 1, wt(99), '#0e9e8a']] })],
    [T(100), 99, (l, h) => h.cta(l, {
      h1: [['Feed', 0, wt(100)], ['the', 0, wt(101)], ['AI.', 0, wt(102)]], h2: [['Not', 1, wt(103), '#FFC83D'], ['the', 1, wt(104), '#FFC83D'], ['parser.', 1, wt(105), '#FFC83D']], size2: 120,
      word: 'MARK', at: wt(106), handleAt: wt(109),
    })],
  ],
  raccoon: [[0, 'r_cross'], [wt(44), 'point'], [wt(54), 'r_present'], [wt(82), 'thumbs'], [wt(91), 'r_cross'], [wt(100), 'r_present'], [wt(106), 'point']],
  intern: [[0, null], [wt(20) - 0.15, 'p_smug', 1], [wt(22), 'p_explain'], [wt(36), 'p_smug'], [wt(39), 'p_shock'], [wt(41), 'p_embar'], [wt(46), 'p_think'], [wt(56), 'p_shock'], [wt(62), 'p_smug'], [wt(73), 'p_think'], [wt(82), 'p_celebrate'], [wt(91), 'p_think'], [wt(100), 'p_embar'], [wt(106), 'p_celebrate']],
});
