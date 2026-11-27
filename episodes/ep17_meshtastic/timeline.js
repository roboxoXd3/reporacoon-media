// Ep17 Meshtastic. Format 3 "shart": the intern bets it can't be done; the answer is held back until the reveal.
const T = (i) => wt(i) - 0.1;
const NO = (inner) => `<div style="position:relative;width:170px;height:170px;border-radius:40px;background:#fff;border:7px solid #1d2340;display:flex;align-items:center;justify-content:center;font-size:96px">${inner}<svg viewBox="0 0 100 100" style="position:absolute;inset:0;width:100%;height:100%"><path d="M12 12 L88 88" stroke="#E5352B" stroke-width="10" stroke-linecap="round"/></svg></div>`;
const DEV = `<svg viewBox="0 0 80 110" width="80"><rect x="8" y="22" width="64" height="84" rx="12" fill="#FFC83D" stroke="#1d2340" stroke-width="6"/><rect x="18" y="34" width="44" height="30" rx="5" fill="#1d2340"/><path d="M56 22 V4" stroke="#1d2340" stroke-width="6" stroke-linecap="round"/><circle cx="40" cy="84" r="7" fill="#1d2340"/></svg>`;
SKIT({
  accent: [1, 2, 4, 6, 8, 9, 12, 15, 17, 21, 22, 25, 27, 28, 29, 30, 31, 35, 39, 45, 46, 51, 52, 54, 56, 60, 62, 68, 69, 70, 72, 80, 82],
  panels: [
    [0, T(16), (l, h) => {
      const k = h.kick(l, 'SHART', 230, 'rgba(255,255,255,.7)');
      const amt = h.el(l, `<div style="position:absolute;left:0;right:0;margin:auto;width:max-content;top:290px;padding:10px 50px;border-radius:30px;background:#9FF0CF;border:8px solid ${h.ink};font-family:Sans;font-weight:800;font-size:150px;color:${h.ink}">₹100</div>`);
      const n1 = h.el(l, `<div style="position:absolute;left:250px;top:560px">${NO('📶')}</div>`);
      const n2 = h.el(l, `<div style="position:absolute;left:660px;top:560px">${NO('🗼')}</div>`);
      const w = h.words(l, [['Message', 0, wt(12)], ['bhej', 1, wt(13), '#FFC83D'], ['ke', 0, wt(14)], ['dikhao.', 0, wt(15)]], 800, 84, '#fff');
      return (t) => { k.style.opacity = prog(t, 0, 0.2); h.popIn(amt, t, wt(1), -4); h.popIn(n1, t, wt(6), -6); h.popIn(n2, t, wt(8), 6); w(t); };
    }],
    [T(16), T(25), (l, h) => {
      const sc = h.el(l, `<div style="position:absolute;left:80px;right:80px;top:260px;display:flex;justify-content:space-between;align-items:center;font-family:Sans;font-weight:800;font-size:60px;color:#fff"><span>🐧 Intern</span><span style="font-size:48px;padding:8px 24px;border-radius:999px;background:#9FF0CF;color:${h.ink}">₹100</span><span>Raccoon 🦝</span></div>`);
      const w = h.words(l, [['Shart', 0, wt(17)], ['lagi.', 1, wt(18), '#FFC83D']], 420, 120, '#fff');
      const pg = h.el(l, `<div style="position:absolute;left:0;right:0;margin:auto;width:170px;top:640px">${NO('🕊️')}</div>`);
      const lab = h.el(l, `<div class="pill" style="position:absolute;left:0;right:0;margin:auto;width:max-content;top:850px;font-size:44px;background:#fff">kabootar not allowed</div>`);
      return (t) => { h.popIn(sc, t, T(16) + 0.05, 0); w(t); h.popIn(pg, t, wt(21), 5); h.popIn(lab, t, wt(22), -3); };
    }],
    [T(25), T(32), (l, h) => h.reveal(l, {
      kick: 'KABOOTAR NAHI',
      logo: `<svg viewBox="0 0 120 120" width="150"><circle cx="30" cy="80" r="11" fill="#fff"/><circle cx="60" cy="40" r="11" fill="#fff"/><circle cx="90" cy="80" r="11" fill="#fff"/><path d="M30 80 L60 40 L90 80 Z" fill="none" stroke="#9FF0CF" stroke-width="6" stroke-linejoin="round"/></svg>`,
      logoBg: 'linear-gradient(140deg,#2bbf6a,#0d5a31)', logoAt: wt(25), name: 'Meshtastic', nameAt: wt(27), nameSize: 136,
      row1: [['Free', wt(28)], ['Open source', wt(29), '#FFC83D'], ['GPL-3.0', wt(31)]],
      row2: [['No internet · No SIM', wt(27) + 0.3]],
    })],
    [T(32), T(60), (l, h) => {
      const map = h.el(l, `<div style="position:absolute;left:60px;right:60px;top:200px;height:760px;border-radius:40px;background:linear-gradient(#cfe9ff,#f3f7e8);border:8px solid ${h.ink};overflow:hidden"><svg viewBox="0 0 960 760" style="position:absolute;inset:0;width:100%;height:100%"><path d="M0 560 L160 330 L300 520 L470 250 L640 500 L780 300 L960 540 V760 H0 Z" fill="#a9d8a0" stroke="${h.ink}" stroke-width="6"/><path d="M430 300 L470 250 L510 300 Z M740 350 L780 300 L820 350Z" fill="#fff"/></svg></div>`);
      const P = [[150, 610], [390, 440], [640, 560], [860, 420]];
      const devs = P.map(([x, y]) => h.el(l, `<div style="position:absolute;left:${x - 40}px;top:${y - 70}px">${DEV}</div>`));
      const svg = h.svg(l, P.slice(0, -1).map(([x, y], i) => `<line x1="${x}" y1="${y}" x2="${P[i + 1][0]}" y2="${P[i + 1][1]}" stroke="#2443E8" stroke-width="8" stroke-dasharray="18 14" stroke-linecap="round"/>`).join(''));
      const lines = [...svg.querySelectorAll('line')];
      const msg = h.el(l, `<div class="pill" style="position:absolute;left:0;top:0;font-size:38px;background:#fff;border:5px solid ${h.ink}">💬 Hi! 📍</div>`);
      const flash = h.el(l, `<div style="position:absolute;left:110px;top:240px;width:420px;height:46px;border-radius:23px;background:#fff;border:5px solid ${h.ink};overflow:hidden"><div style="height:100%;width:0;background:#FFC83D"></div></div>`);
      const flab = h.el(l, `<div style="position:absolute;left:550px;top:236px;font-family:Mono;font-weight:700;font-size:34px;color:${h.ink}">flashing…</div>`);
      const chips = h.el(l, `<div class="pill" style="position:absolute;left:0;right:0;margin:auto;width:max-content;top:880px;font-size:36px;background:#9FF0CF">ESP32 · nRF52 · RP2040 · Linux</div>`);
      footer(l, 'Meshtastic · GPL-3.0 · illustration');
      return (t) => {
        const k = eOut(prog(t, T(32), T(32) + 0.4)); map.style.opacity = k;
        devs.forEach((e, i) => h.popIn(e, t, i === 0 ? wt(35) : wt(42) + i * 0.3, 0));
        const fk = prog(t, wt(38), wt(40) + 0.2); flash.style.opacity = prog(t, wt(38), wt(38) + 0.1) * (1 - prog(t, wt(41), wt(41) + 0.2)); flab.style.opacity = flash.style.opacity; flash.firstChild.style.width = (fk * 100) + '%';
        lines.forEach((ln, i) => { ln.style.opacity = prog(t, wt(45) + i * 0.25, wt(45) + i * 0.25 + 0.2); ln.style.strokeDashoffset = -t * 60; });
        const segs = P.length - 1, a = wt(51), b = wt(58); const q = prog(t, a, b) * segs; const s = Math.min(segs - 1, Math.floor(q)), f = eIO(q - s);
        const x = lerp(P[s][0], P[s + 1][0], f), y = lerp(P[s][1], P[s + 1][1], f); msg.style.opacity = t >= a ? 1 : 0; msg.style.transform = `translate(${x - 90}px,${y - 150}px)`;
        h.popIn(chips, t, wt(36), 2, 0.22);
      };
    }],
    [T(60), T(70), (l, h) => {
      const p1 = h.el(l, `<div class="pill" style="position:absolute;left:110px;top:300px;font-size:64px;background:#9FF0CF">⛰️ Trekking</div>`);
      const p2 = h.el(l, `<div class="pill" style="position:absolute;left:470px;top:440px;font-size:64px;background:#FFC83D">🚨 Emergency</div>`);
      const m = h.el(l, `<div style="position:absolute;left:0;right:0;margin:auto;width:max-content;top:680px;padding:6px 40px;border-radius:26px;background:#9FF0CF;border:7px solid ${h.ink};font-family:Sans;font-weight:800;font-size:110px;color:${h.ink}">₹100</div>`);
      return (t) => { h.popIn(p1, t, wt(60), -4); h.popIn(p2, t, wt(62), 4); h.popIn(m, t, wt(66), 0); const f = eIO(prog(t, wt(69), wt(69) + 0.8)); if (t > wt(69)) { m.style.transform = `translate(${f * 380}px,${-f * 300}px) rotate(${f * 40}deg) scale(${1 - 0.5 * f})`; m.style.opacity = 1 - f * 0.6; } };
    }],
    [T(70), 99, (l, h) => {
      const r = h.cta(l, { h1: [['Shart', 0, wt(70)]], h2: [['Raccoon', 1, wt(70) + 0.2, '#FFC83D'], ['jeeta.', 1, wt(70) + 0.4, '#FFC83D']], size2: 112, word: 'MESH', at: wt(71), handleAt: wt(73) });
      const send = h.el(l, `<div class="pill" style="position:absolute;left:0;right:0;margin:auto;width:max-content;top:990px;font-size:40px;background:#9FF0CF">↗ trekking wale dost ko bhejo</div>`);
      return (t) => { r(t); h.popIn(send, t, wt(76), 3, 0.25); };
    }],
  ],
  raccoon: [[0, null], [wt(16) - 0.15, 'r_cross', 1], [wt(25), 'r_present'], [wt(32), 'phone'], [wt(60), 'point'], [wt(70), 'thumbs'], [wt(76), 'phone']],
  intern: [[0, 'p_smug'], [wt(16), 'p_think'], [wt(19), 'p_smug'], [wt(27), 'p_shock'], [wt(41), 'p_think'], [wt(66), 'p_embar'], [wt(76), 'p_celebrate']],
});
