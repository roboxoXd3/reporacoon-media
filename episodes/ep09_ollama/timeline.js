// Ep09 Ollama. Built on engine/scene/skit.js.
const T = (i) => wt(i) - 0.1;
const PLAN = ['1. Buy 4 GPUs', '2. Train a model', '3. Write a server', '4. Build a chat app'];
SKIT({
  accent: [2, 4, 8, 9, 11, 12, 17, 18, 22, 25, 28, 32, 33, 37, 40, 45, 47, 48, 51, 52, 53, 54, 59, 60, 62, 66, 67, 69, 70, 77, 80, 82, 83, 86, 99, 100, 102, 104, 107],
  panels: [
    [0, T(14), (l, h) => h.task(l, {
      l1: [['Your', 0, wt(0)], ['own', 0, wt(2)], ['AI.', 1, wt(4), h.red]],
      l2: [['On', 0, wt(5)], ['your', 0, wt(6)], ['laptop.', 1, wt(8)]],
      visual: (l) => {
        const lap = h.el(l, `<div style="position:absolute;left:140px;top:560px">${h.LAPTOP(400)}</div>`);
        const b1 = h.el(l, `<div class="pill" style="position:absolute;left:215px;top:600px;font-size:30px;padding:8px 18px;background:#fff">Hi! 👋</div>`);
        const b2 = h.el(l, `<div class="pill" style="position:absolute;left:300px;top:665px;font-size:30px;padding:8px 18px;background:#9FF0CF">Hello, human.</div>`);
        const bill = h.el(l, `<div style="position:absolute;left:640px;top:585px;width:260px;padding:26px 0;border-radius:26px;background:#fff;box-shadow:0 18px 40px rgba(0,0,0,.18);text-align:center;font-family:Sans;font-weight:800;font-size:58px;color:${h.ink}">$ / month<div class="x" style="position:absolute;left:-10px;right:-10px;top:50%;height:12px;border-radius:6px;background:${h.red};transform:rotate(-12deg) scaleX(0);transform-origin:left"></div></div>`);
        const x = bill.querySelector('.x');
        return (t) => { h.popIn(lap, t, wt(6), -4); h.popIn(b1, t, wt(7), -6); h.popIn(b2, t, wt(8), 6); h.popIn(bill, t, wt(10), 6); x.style.transform = `rotate(-12deg) scaleX(${eOut(prog(t, wt(12), wt(12) + 0.25))})`; };
      },
      stamps: [['PRIVATE', wt(9), 330, -8]], timer: wt(13),
    })],
    [T(14), T(38), (l, h) => h.plan(l, {
      items: [[PLAN[0], wt(16)], [PLAN[1], wt(19)], [PLAN[2], wt(23)], [PLAN[3], wt(26)]],
      eta: ['ETA:', '6', 'months', wt(32)], circleAt: wt(34), shakeAt: wt(35), fix: '5?', fixAt: wt(37),
    })],
    [T(38), T(49), (l, h) => h.rule(l, {
      items: PLAN, xAt: wt(38), cardAt: wt(41), badge: 'RULE #1',
      l1: [['Check', 0, wt(45)], ['what', 0, wt(46)]],
      l2: [['already', 1, wt(47), '#FFC83D'], ['exists.', 1, wt(48), '#FFC83D']], size2: 90,
    })],
    [T(49), T(63), (l, h) => h.reveal(l, {
      logo: `<svg viewBox="0 0 120 120" width="150"><path d="M34 48 V18 Q34 8 42 10 Q50 12 50 24 V40 M86 48 V18 Q86 8 78 10 Q70 12 70 24 V40" fill="none" stroke="#fff" stroke-width="8" stroke-linecap="round"/><path d="M26 60 Q26 40 60 40 Q94 40 94 60 V96 Q94 110 80 110 H40 Q26 110 26 96 Z" fill="none" stroke="#fff" stroke-width="8" stroke-linejoin="round"/><circle cx="46" cy="66" r="6" fill="#fff"/><circle cx="74" cy="66" r="6" fill="#fff"/><ellipse cx="60" cy="88" rx="13" ry="9" fill="none" stroke="#fff" stroke-width="6"/></svg>`,
      logoBg: 'linear-gradient(140deg,#3a4250,#111318)', logoAt: wt(49), name: 'Ollama', nameAt: wt(51), nameSize: 150,
      row1: [['187k ★', wt(51) + 0.35], ['Free', wt(52)], ['Open source', wt(53), '#FFC83D']],
      row2: [['Mac', wt(59)], ['Windows', wt(60)], ['Linux', wt(62)]],
    })],
    [T(63), T(91), (l, h) => {
      const term = h.el(l, `<div style="position:absolute;left:60px;right:60px;top:200px;height:470px;border-radius:30px;background:#0b0d12;box-shadow:0 30px 80px rgba(0,0,0,.45);padding:76px 36px 0;font-family:Mono;font-weight:700;font-size:31px;line-height:1.5;color:#9FF0CF;white-space:nowrap;overflow:hidden"><div style="position:absolute;left:30px;top:26px;display:flex;gap:12px"><i style="width:20px;height:20px;border-radius:50%;background:#ff5f57"></i><i style="width:20px;height:20px;border-radius:50%;background:#febc2e"></i><i style="width:20px;height:20px;border-radius:50%;background:#28c840"></i></div><div class="l1"><span style="color:#6b7180">$ </span><span class="c1"></span></div><div class="o1" style="color:#c9cde0;opacity:0">✓ Ollama installed</div><div class="l2" style="opacity:0;margin-top:14px;font-size:40px"><span style="color:#6b7180">$ </span><span class="c2"></span></div><div class="o2" style="opacity:0;margin-top:14px;font-size:34px;color:#fff">&gt;&gt;&gt; <span class="q"></span></div><div class="o3" style="opacity:0;font-size:34px;color:#FFC83D">Sure! Here is a quick plan...</div></div>`);
      const c1 = term.querySelector('.c1'), c2 = term.querySelector('.c2'), q = term.querySelector('.q');
      const o1 = term.querySelector('.o1'), l2 = term.querySelector('.l2'), o2 = term.querySelector('.o2'), o3 = term.querySelector('.o3');
      const C1 = 'curl -fsSL https://ollama.com/install.sh | sh', C2 = 'ollama run gemma4', Q = 'Plan my study week';
      const done = h.el(l, `<div class="pill" style="position:absolute;right:100px;top:640px;background:#9FF0CF">Done ✓</div>`);
      const row = h.el(l, `<div style="position:absolute;left:0;right:0;top:780px;display:flex;justify-content:center;gap:16px;flex-wrap:wrap;padding:0 60px"></div>`);
      const ps = [['Runs locally', wt(80)], ['Private', wt(83)], ['REST API', wt(86), '#FFC83D']].map(([s, at, bg]) => { const e = $(`<div class="pill" style="font-size:40px;padding:10px 26px${bg ? ';background:' + bg : ''}">${s}</div>`); row.appendChild(e); return [e, at]; });
      footer(l, 'Ollama · MIT license · commands from the README · example chat');
      return (t) => {
        const kt = eOut(prog(t, T(63), T(63) + 0.4)); term.style.opacity = kt; term.style.transform = `translateY(${(1 - kt) * 80}px)`;
        c1.textContent = C1.slice(0, Math.round(C1.length * prog(t, wt(63), wt(67) + 0.3)));
        o1.style.opacity = prog(t, wt(67) + 0.3, wt(67) + 0.4);
        l2.style.opacity = prog(t, wt(68), wt(68) + 0.1);
        c2.textContent = C2.slice(0, Math.round(C2.length * prog(t, wt(69), wt(74))));
        o2.style.opacity = prog(t, wt(75), wt(75) + 0.1);
        q.textContent = Q.slice(0, Math.round(Q.length * prog(t, wt(75), wt(76) + 0.4)));
        o3.style.opacity = prog(t, wt(76) + 0.5, wt(76) + 0.6);
        h.popIn(done, t, wt(77), -8); ps.forEach(([e, at]) => h.popIn(e, t, at, 6, 0.22));
      };
    }],
    [T(91), T(100), (l, h) => h.payoff(l, { big: '4 GPUs', at: T(91) + 0.05, strikeAt: wt(98), tail: [['not', 0, wt(99)], ['needed.', 1, wt(99) + 0.3, '#0e9e8a']] })],
    [T(100), 99, (l, h) => h.cta(l, {
      h1: [['Return', 0, wt(100)], ['them.', 0, wt(101)]], h2: [['Download', 1, wt(102), '#FFC83D'], ['a', 1, wt(103), '#FFC83D'], ['model.', 1, wt(104), '#FFC83D']], size2: 100,
      word: 'LOCAL', at: wt(106), handleAt: wt(109),
    })],
  ],
  raccoon: [[0, 'r_cross'], [wt(38), 'point'], [wt(49), 'r_present'], [wt(63), 'laptop'], [wt(77), 'thumbs'], [wt(91), 'r_cross'], [wt(100), 'r_present'], [wt(106), 'point']],
  intern: [[0, null], [wt(14) - 0.15, 'p_smug', 1], [wt(16), 'p_explain'], [wt(32), 'p_smug'], [wt(34), 'p_shock'], [wt(36), 'p_embar'], [wt(41), 'p_think'], [wt(51), 'p_shock'], [wt(57), 'p_smug'], [wt(63), 'p_think'], [wt(77), 'p_celebrate'], [wt(91), 'p_think'], [wt(100), 'p_embar'], [wt(106), 'p_celebrate']],
});
