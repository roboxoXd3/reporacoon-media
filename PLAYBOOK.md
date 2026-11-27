# Repo Raccoon: daily reel playbook

This is the full procedure the daily scheduled run follows. One run makes one skit reel and puts it in the Instagram queue.
Worked example of every file: `episodes/ep03_localsend/`.

## Fixed facts
- Instagram: @reporacoon. Posting goes through Nuelink: brand **21035**, collection **110596** ("InstagramRepoRacoon"), channel 327589. The queue slot is 20:05 IST daily.
- Media is served from GitHub Pages: `https://roboxoxd3.github.io/reporacoon-media/reels/<slug>.mp4`.
- Git identity: `roboxoXd3 <rishavshahi87@gmail.com>`. Push with `git -c push.negotiate=true push origin HEAD:main`.
- Mac download folder (Chrome saves here): `~/Downloads/RianInfotech/Content/claudeVideoAssets/`. Bring files into the workspace with `device_stage_files`, path `~/mnt/Downloads/RianInfotech/Content/claudeVideoAssets/<file>`.
- Characters: Repo Raccoon (teacher, right side, voice **Puck**) and the penguin intern (student, left side, voice **Fenrir**). Poses in `engine/scene/img/m/`:
  raccoon: `r_cross` (arms crossed), `r_present` (palm out, revealing), `point`, `thumbs`, `shock`, `facepalm`, `wave`, `laptop`, `phone`, `base`;
  penguin: `p_smug`, `p_explain` (marker), `p_think`, `p_shock`, `p_embar` (sweat drop), `p_celebrate`.

## 0. Decide whether to make a reel
Goal: the queue always holds at least 4 days of reels, so the streak survives the Mac being off for 3 to 4 days.
1. `nuelink_list_posts` (brand 21035, collection 110596, view QUEUE). Count posts whose postDate is in the future.
2. If 5 or more are already waiting: stop, nothing to do (report "queue full").
3. Otherwise make `plan.json` entries with `"status": "planned"` (lowest `ep` first) until 5 are waiting, but at most 3 in one run.

## 1. Research (10 min max)
- **Repo choice (since 2026-11-28).** Prefer repos most viewers have never heard of, with a use case that surprises or solves an everyday annoyance (a cable drawer, phone bloatware, a stuck port), usually 2k to 40k stars. Avoid the famous ones everybody already posts (n8n, Ollama, PowerToys, Home Assistant...). If a planned repo turns out dull, paid-first, abandoned, or has awkward content (adult jokes, politics in screenshots), skip it, note why in plan.json, and pick a better one from GitHub search (`gh api -X GET search/repositories ...`).
- Check the repo is alive in Chrome: open any github.com tab, then in that tab run `fetch('/<owner>/<repo>')` and regex `stargazerCount:(\d+)` and `isArchived:(!?\d)`. Skip the repo (mark `"status":"skipped"` with a reason, take the next one) if archived, 404, or clearly abandoned.
- Read the README with WebFetch. Note the license, platforms, 3 key features, and how it works in 3 steps. Use only facts you read. Round stars down (99,222 becomes "99k").
- Get 1 real UI image (screenshot from the README or the official site). Images stored in the repo can be downloaded straight from the workspace: `curl -sSL -o shot.webp https://raw.githubusercontent.com/<owner>/<repo>/main/<path>` (then convert to PNG with Pillow). For other hosts the workspace cannot reach, so open the image URL in Chrome, then in that tab run a JS `fetch` of the same URL, make a blob link with `download='<slug>_shot.png'`, click it, and stage it from the Mac folder. Convert to PNG and put it in the episode folder.
- Never feature hacking, OSINT, piracy or DRM-bypass tools.

## 2. Script (Hinglish, 2 voices, 20 to 28 s, about 65 to 90 words)
Since 2026-11-28 the old single template (task, over-engineered plan, "X months?", reveal, "what do I do with my months?") is retired: it repeated every day and views dropped. Now:
- **Language: Hinglish in Roman script**, the way young Indian devs talk ("Bhai, drawer mein chaalees cables hain"). Tech words stay English. Numbers as words for TTS ("chaalees", "teen", "ten"). Bubbles show the same text.
- **Rotate 6 formats**; the plan.json entry's `format` field says which. Never the same format two days in a row, never the same ending line twice in a week.
- **First 1 to 2 seconds must show or say something surprising or relatable**, not read out a task. Reach depends on watch time, likes per reach and sends per reach, so aim for "I have to send this to X".
- **CTA varies**: comment keyword ("Comment CABLE"), a send line ("us dost ko bhejo jiske paas..."; never ask for a number of sends), or a save line. Usually comment keyword plus one send line.
- Either character may speak first. Raccoon = expert, intern = the viewer's stand-in, but roles flip in format 2.

The 6 formats:
1. **`1_result_pehle` (result first).** Second 0: the payoff on screen ("Phone ke 37 bekaar apps, ek click mein gayab"). Then the intern: "Ye kaise?!" Raccoon: name + 2 facts + 3 steps. End on a twist or punchline.
2. **`2_role_ulta` (role reversal).** The intern confidently teaches the raccoon something; the raccoon is the one stuck or doing it the hard way. Intern reveals the tool; raccoon reacts ("Main senior hoon ya tu?").
3. **`3_shart` (bet / open loop).** Opens with a bet or a claim that sounds impossible ("Sau rupaye ki shart: bina internet message bhej ke dikha"). The answer is held back until the reveal, so people stay to see who wins.
4. **`4_relatable_dard` (relatable pain).** Opens on an everyday annoyance in the intern's voice ("Chaalees cables, kaunsa fast charge karta hai? Koi nahi jaanta"). Raccoon walks in with the fix. Worked example: `episodes/ep14_whatcable/`.
5. **`5_cheat_code_list` (list).** "Teen free tools jo cheat code jaise lagte hain." Three repos, one quick beat each (hook line, one visual, one fact), counter 1/3, 2/3, 3/3. Saveable. Check each repo like a normal one.
6. **`6_before_after` (split screen).** Mostly visual: left "pehle" (the painful way), right "ab" (with the tool), short lines, a big wipe between them.

Keep every claim checkable against the README (free vs paid tiers, platform limits like "Apple Silicon only").

## 3. Voice in Google AI Studio (Chrome)
1. Open `https://aistudio.google.com/generate-speech` and click **Create new dialog**.
2. Speaker 1 is whoever speaks first: raccoon = **Puck**, intern = **Fenrir**. Open the Speaker 1 dropdown, focus the "Search voices" box (select its old text), type the name, click the button whose aria-label is the voice name, then click "Close panel".
3. Type line 1 in block 1. Click **Add speech block**: new blocks alternate Speaker 2 / Speaker 1 automatically. Set Speaker 2 to the other voice the same way. Blocks must strictly alternate speakers.
   - The account uses the paid key "GeminiApiKeyRishav" (linked and saved on 2026-11-28 with the owner's OK). If AI Studio shows "No API key selected" again, report it; do not link keys yourself.
   - **Quota / limit hit:** the owner has Gemini Pro on three Google accounts, all usable for voice: rishavshahi87@gmail.com (default), rianinfotech0201@gmail.com, Reseachrian@gmail.com. Switch with AI Studio's account menu only if that account is already signed in in Chrome; never type a password. If it asks for sign-in, report it.
   - Fastest fill: one `javascript_tool` call that clicks "Create new dialog", sets voices (focus "Search voices", set `.value`, dispatch `input`, click `button[aria-label="<Voice>"]`, "Close panel"), writes each block with the native `value` setter plus `input`/`change` events, clicks Run, and waits until the player's total time stops changing. See `episodes/ep15_uad-ng/` onwards for scripts made this way.
   - The **Download** button only works with a real click (`find` → `computer left_click` on its ref) and only while the Chrome window is visible: if `innerWidth` is 0 (window minimized or Mac display asleep) the click does nothing. Report that as "Mac asleep".
   - Screenshots are blocked on aistudio.google.com; work with `find`, `read_page`, `get_page_text` and `javascript_tool`. Focus the last block with JS (`[aria-label="Speech block text"]`, `.click(); .focus()`) and then type with the computer tool.
4. Typing is only reliable after clicking the empty block's textbox. Use `find` for "Speech block text" refs and click the ref, then type.
5. Click **Run** and wait about 30 s, until `get_page_text` shows the player times (e.g. "0:25 0:28"). Pause it, then click the **Download** button (`find` "Download"). The wav lands in the Mac folder as `Generated Audio <date> - <time>.wav`. Stage it and save it as `episodes/<slug>/vo.wav`.
If AI Studio shows a quota or paid-key error, stop and report it.

## 4. Timing
Save the AI Studio wav as `episodes/<slug>/vo.wav` and the script as `episodes/<slug>/script.json` = `[["R","line 1"],["I","line 2"],...]`, one entry per speech block, text exactly as typed in AI Studio. Run `python3 engine/align.py episodes/<slug>`. It keeps the original as `vo_raw.wav`, shortens long pauses (a 47 s take becomes about 39 s), and writes `words.json` / `words.js`. It prints every word with its index and start time; use those indexes in the timeline. Aim for a final length of 20 to 28 s; if it is longer than 30 s, shorten the longest line in AI Studio and generate again.

## 5. Timeline (the creative part)
Write `episodes/<slug>/timeline.js` as one `SKIT({...})` call using `engine/scene/skit.js`. Panels count and order follow the format (5 to 7 panels); `panels` entries can be builders or fully custom `(l, h) => { ...; return (t) => {...} }`. On-screen text is Hinglish too. Start from `episodes/ep14_whatcable/timeline.js` (format 4: pain card with custom visual, custom laptop panel, reveal, screenshot with camera keyframes and answer cards, payoff stamp, CTA plus send pill). Older English examples: `episodes/ep04_markitdown/timeline.js` (terminal demo), `ep05_scrcpy` (real screenshot plus checklist), `ep06_stirling-pdf` (screenshot with camera zoom plus flying files). (`ep03_localsend` is the older hand-written version; do not copy it.)
- `panels`: `[start, end, (l, h) => renderFn]` entries, with boundaries at the first word of each beat (`T(i) = wt(i) - 0.1`). Standard builders: `h.task` (hook card: two word lines, a small custom visual, red stamps, timer), `h.plan` (intern's handwritten list, red ETA circle, strike plus fix), `h.rule` (red X plus a rule card), `h.reveal` (logo tile, name with a flash, two pill rows), `h.payoff` (struck-out time, "saved."), `h.cta` (headline plus "Comment WORD" card). The demo panel is custom each time: use `shot(l, 'file.png', w, h, box)` with `.cam(cx, cy, width)`, `h.el`, `h.popIn`, `ripple(l)`, and `footer(l, '<Name> · <License> · screenshot: <source>')`.
- `raccoon` / `intern`: pose schedules `[[time, pose], ...]`; whoever speaks second starts `[0, null]` and enters with `[wt(their first word) - 0.15, '<pose>', 1]`.
- `accent`: word indexes to highlight in the speech bubbles (bubbles are grouped automatically).
- Draw your own simple logo SVG for the reveal; never copy the project's real logo.
Check stills before the full render: `engine/stills.sh episodes/<slug> <8 to 13 times>` writes `episodes/<slug>/stills.jpg`. Look at it for overlaps, text running off the card, and wrong timing. Fix and repeat.

## 6. Build
- `sfx.json` (copy `episodes/ep04_markitdown/sfx.json` for the shape; times in seconds): `whoosh` at every panel change; `thud` for stamps and the red X; `pophi` for each pill, badge or list item; `pop` for the penguin entrance and the reveal; `click` for taps; `ding` for "Done" and the reveal.
- `cover.json`: `{"ep":"REPO #NN","title":"<2 short lines, max about 16 characters each, one in <i>italic</i>>","repo":"owner / repo","mascot":"<pose>"}`. Use a different raccoon pose than the last two covers (check `covers/`). The title must not wrap to a third line: open `covers/epNN.png` after the build and check. The cover is the first frame on Instagram, so make it a question, contrast or pain in Hinglish (example: "40 cables.<br><i>Kaunsa fast?</i>"). `ep` on the cover is the running number of posted reels ("REPO #13" for ep14, because ep13 was dropped).
- Run `engine/build.sh episodes/<slug>` (about 3 min). Output: `reels/<slug>.mp4` and `covers/epNN.png`.

## 7. Publish
1. `git add -A && git commit` (message "Add epNN <Name>" plus the attribution trailers), then push.
2. Wait about 60 s. In a Chrome tab, `fetch(<pages url>, {method:'HEAD'})` must return 200 with the right content-length.
3. `nuelink_create_post`: brandId 21035, collectionId 110596, publishMode **QUEUE**, media `[{"url": <pages url>}]`, platforms `{"instagram":{"shareToFeed":true}}`. Caption template:
   Caption in Hinglish too, matching the format (no more fixed "Rule #1" line). Shape:
   ```
   <cover hook> 🤔

   <one or two lines of the story in Hinglish>

   <Name> is <one-line description>:
   <emoji> <fact 1>
   <emoji> <fact 2>
   <emoji> <fact 3>
   ⭐ <N>k+ stars on GitHub

   Comment <CTA_WORD> and we'll DM you the link 👇

   #opensource #github #<name> #<category tags> #developers #techtips #reporacoon
   ```
4. `nuelink_list_posts` (view QUEUE) to read the assigned postDate (it is shown in the brand's timezone, IST: the daily slot appears as `20:05:00`).
5. In `plan.json` set `status` to `"queued"`, `post_date` to the IST date, and `nuelink_post_id`. Commit and push.

## 8. Report
Send one short message: which episode, which repo, when it posts, and anything that went wrong. If any step is blocked (Chrome extension not connected, Mac asleep, AI Studio quota, Nuelink error), do not improvise around it. Leave the plan entry as `planned`, report the blocker, and stop.
