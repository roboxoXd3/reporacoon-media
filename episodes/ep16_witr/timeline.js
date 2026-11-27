// Ep16 witr. Format 2 "role ulta": the raccoon is stuck, the intern teaches him.
const T = (i) => wt(i) - 0.1;
const TERM = (top, h) => `<div style="position:absolute;left:60px;right:60px;top:${top}px;height:${h}px;border-radius:24px;background:#0f1430;border:6px solid #000;box-shadow:0 24px 70px rgba(0,0,0,.45);padding:66px 30px 0;box-sizing:border-box;font-family:monospace;font-size:34px;line-height:1.55;color:#e8ebff;overflow:hidden"><div style="position:absolute;left:22px;top:20px;display:flex;gap:10px"><i style="width:18px;height:18px;border-radius:50%;background:#E5352B"></i><i style="width:18px;height:18px;border-radius:50%;background:#FFC83D"></i><i style="width:18px;height:18px;border-radius:50%;background:#9FF0CF"></i></div></div>`;
const line = (term, html) => { const e = $(`<div style="white-space:nowrap;opacity:0">${html}</div>`); term.appendChild(e); return e; };
SKIT({
  accent: [1, 2, 8, 9, 10, 11, 12, 22, 23, 24, 28, 29, 30, 31, 32, 33, 34, 35, 37, 38, 39, 44, 45, 46, 51, 55, 56, 60, 64, 66, 68, 70, 73, 75, 77, 85, 89],
  panels: [
    [0, T(21), (l, h) => {
      const w = h.words(l, [['Port', 0, 0.05], ['5000', 1, wt(1), '#FFC83D'], ['pe', 0, wt(3)], ['kaun', 0, wt(4)], ['hai?', 0, wt(7)]], 200, 92, '#fff');
      const term = h.el(l, TERM(340, 560));
      const L = [[wt(8), '$ ps aux | grep 5000'], [wt(8) + 0.3, '<span style="color:#9aa0b5">root 1 ... /sbin/init</span>'], [wt(9), '$ lsof -i :5000'], [wt(9) + 0.3, '<span style="color:#9aa0b5">node 14233 deploy ... LISTEN</span>'], [wt(10), '$ top'], [wt(10) + 0.3, '<span style="color:#9aa0b5">PID USER %CPU COMMAND ...</span>'], [wt(14), '<span style="color:#FFB4A8">...ye aaya kahan se??</span>']].map(([at, s]) => [line(term, s), at]);
      const st = h.el(l, `<div class="stamp" style="left:520px;top:830px;font-size:58px;background:#fff">30 MIN WASTE</div>`);
      return (t) => { w(t); const k = eOut(prog(t, 0.1, 0.5)); term.style.opacity = k; term.style.transform = `translateY(${(1 - k) * 80}px)`; L.forEach(([e, at]) => { e.style.opacity = prog(t, at, at + 0.1); }); h.popIn(st, t, wt(12), -6, 0.22); };
    }],
    [T(21), T(29), (l, h) => {
      const k = h.kick(l, 'INTERN SE SEEKHO', 240, 'rgba(255,255,255,.7)');
      const w = h.words(l, [['Ek', 0, wt(22)], ['command.', 1, wt(23), '#9FF0CF']], 300, 110, '#fff');
      const term = h.el(l, TERM(520, 260));
      const cmd = '$ witr --port 5000'; const e = line(term, ''); e.style.opacity = 1; e.style.fontSize = '50px';
      const q = h.el(l, `<div style="position:absolute;left:0;right:0;top:820px;text-align:center;font-family:Serif;font-weight:800;font-style:italic;font-size:110px;color:#FFC83D">witr?</div>`);
      return (t) => { k.style.opacity = prog(t, T(21), T(21) + 0.2); w(t); const n = Math.round(cmd.length * prog(t, wt(24), wt(27) + 0.3)); e.innerHTML = cmd.slice(0, n) + (Math.floor(t * 3) % 2 ? '▌' : ''); h.popIn(q, t, wt(28), -5); };
    }],
    [T(29), T(44), (l, h) => h.reveal(l, {
      kick: 'WHY IS THIS RUNNING?',
      logo: `<svg viewBox="0 0 120 120" width="150"><circle cx="52" cy="52" r="28" fill="none" stroke="#fff" stroke-width="10"/><path d="M73 73 L100 100" stroke="#fff" stroke-width="12" stroke-linecap="round"/><text x="52" y="66" text-anchor="middle" font-family="sans-serif" font-weight="800" font-size="40" fill="#FFC83D">?</text></svg>`,
      logoBg: 'linear-gradient(140deg,#0e9e8a,#0b4f47)', logoAt: wt(29), name: 'witr', nameAt: wt(29) + 0.15, nameSize: 180,
      row1: [['Free', wt(33)], ['Open source', wt(34), '#FFC83D'], ['Apache-2.0', wt(36)]],
      row2: [['Linux', wt(37)], ['Mac', wt(38)], ['Windows', wt(39)]],
    })],
    [T(44), T(64), (l, h) => {
      const chips = h.el(l, `<div style="position:absolute;left:0;right:0;top:190px;display:flex;justify-content:center;gap:14px"></div>`);
      const cs = [['Process', wt(44)], ['Port', wt(45)], ['Container', wt(46)]].map(([s, at]) => { const e = $(`<div class="pill" style="font-size:40px;padding:8px 22px">${s}</div>`); chips.appendChild(e); return [e, at]; });
      const term = h.el(l, TERM(300, 560)); term.style.fontSize = '29px'; term.style.lineHeight = '1.45';
      const L = [[wt(47), '<span style="color:#9FF0CF">$ witr --port 5000</span>'], [wt(48), 'Process : node (pid 14233)'], [wt(48) + 0.2, 'Command : node /srv/expense-manager/index.js'], [wt(49), 'Started : 2 days ago'], [wt(49) + 0.2, 'Restarts: 3'], [wt(50), '<span style="color:#FFC83D">Why It Exists :</span>'], [wt(51), '&nbsp;systemd (pid 1)'], [wt(53), '&nbsp;&nbsp;→ PM2 v5.3.1: God (pid 5034)'], [wt(55), '&nbsp;&nbsp;&nbsp;&nbsp;→ node (pid 14233)'], [wt(58), 'Source : pm2-deploy.service']].map(([at, s]) => [line(term, s), at]);
      const p1 = h.el(l, `<div class="pill" style="position:absolute;left:70px;top:885px;font-size:36px;background:#FFC83D">kisne start kiya ✓</div>`);
      const p2 = h.el(l, `<div class="pill" style="position:absolute;left:470px;top:885px;font-size:36px;background:#9FF0CF">kaun zinda rakh raha ✓</div>`);
      footer(l, 'witr · Apache-2.0 · output: example from the README');
      return (t) => { cs.forEach(([e, at]) => h.popIn(e, t, at, 3, 0.22)); const k = eOut(prog(t, T(44), T(44) + 0.4)); term.style.opacity = k; L.forEach(([e, at]) => { e.style.opacity = prog(t, at, at + 0.12); }); h.popIn(p1, t, wt(55), -3, 0.25); h.popIn(p2, t, wt(59), 3, 0.25); };
    }],
    [T(64), T(74), (l, h) => {
      const nodes = [['systemd', wt(64), '#fff'], ['PM2', wt(66), '#FFC83D'], ['node', wt(68), '#9FF0CF']].map(([s, at, bg], i) => [h.el(l, `<div class="pill" style="position:absolute;left:${70 + i * 330}px;top:300px;font-size:58px;background:${bg};border:6px solid ${h.ink}">${s}</div>`), at]);
      const arr = [0, 1].map((i) => h.el(l, `<div style="position:absolute;left:${300 + i * 330}px;top:300px;font-family:Sans;font-weight:800;font-size:80px;color:#fff">→</div>`));
      const w = h.words(l, [['Senior', 0, wt(70)], ['kaun?', 1, wt(73), '#FFC83D']], 560, 120, '#fff');
      const sw = h.el(l, `<div style="position:absolute;left:0;right:0;top:760px;text-align:center;font-family:Sans;font-weight:800;font-size:64px;color:#fff">🐧 ⇄ 🦝</div>`);
      return (t) => { nodes.forEach(([e, at]) => h.popIn(e, t, at, -3, 0.22)); arr.forEach((e, i) => { e.style.opacity = prog(t, nodes[i + 1][1] - 0.15, nodes[i + 1][1]); }); w(t); const k = prog(t, wt(71), wt(73)); sw.style.opacity = k; sw.style.transform = `rotate(${k * 360}deg)`; };
    }],
    [T(74), 99, (l, h) => {
      const r = h.cta(l, { h1: [['Aaj', 0, wt(74)]], h2: [['intern', 1, wt(75), '#FFC83D'], ['jeeta.', 1, wt(75) + 0.25, '#FFC83D']], size2: 120, word: 'WHY', at: wt(76), handleAt: wt(78) });
      const send = h.el(l, `<div class="pill" style="position:absolute;left:0;right:0;margin:auto;width:max-content;top:990px;font-size:40px;background:#9FF0CF">↗ lsof wale senior ko bhejo</div>`);
      return (t) => { r(t); h.popIn(send, t, wt(82), 3, 0.25); };
    }],
  ],
  raccoon: [[0, 'laptop'], [wt(8), 'facepalm'], [wt(21), 'r_cross'], [wt(28), 'shock'], [wt(44), 'laptop'], [wt(64), 'shock'], [wt(69), 'facepalm'], [wt(74), 'thumbs']],
  intern: [[0, null], [wt(21) - 0.15, 'p_smug', 1], [wt(29), 'p_explain'], [wt(64), 'p_smug'], [wt(74), 'p_celebrate'], [wt(82), 'p_smug']],
});
