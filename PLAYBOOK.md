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
- Check the repo is alive in Chrome: open any github.com tab, then in that tab run `fetch('/<owner>/<repo>')` and regex `stargazerCount:(\d+)` and `isArchived:(!?\d)`. Skip the repo (mark `"status":"skipped"` with a reason, take the next one) if archived, 404, or clearly abandoned.
- Read the README with WebFetch. Note the license, platforms, 3 key features, and how it works in 3 steps. Use only facts you read. Round stars down (99,222 becomes "99k").
- Get 1 real UI image (screenshot from the README or the official site). The workspace cannot reach most hosts, so open the image URL in Chrome, then in that tab run a JS `fetch` of the same URL, make a blob link with `download='<slug>_shot.png'`, click it, and stage it from the Mac folder. Convert to PNG and put it in the episode folder.
- Never feature hacking, OSINT, piracy or DRM-bypass tools.

## 2. Script (2 voices, 32 to 38 s, about 95 to 110 words)
Beats, in order:
1. **Teacher, the task.** Concrete, with a number and 2 constraints, ending "Go." This first line must stop the scroll. Example: "Send a four gig video from your phone to your laptop. No cable. No internet. Go."
2. **Intern, over-engineered plan.** "Easy! I'll build X, Y, Z, add W... give me <absurd time>."
3. **Teacher, deadpan one-liner** ("Three months?").
4. **Intern, comic retreat** ("Okay... two?").
5. **Teacher, the rule** (vary the wording each episode: "Rule number one: before you build anything, check what already exists." / "Senior dev rule: search GitHub before you open your editor." / "Never build what ten thousand people already maintain."). Then: "It's called <Name>." plus 2 or 3 facts (free, open source, platforms, stars).
6. **Teacher, how it works** in 3 short steps, then "Done." and 2 or 3 benefits.
7. **Intern, payoff question** that calls back to beat 2.
8. **Teacher, closer.** One punchline, then "Comment <CTA_WORD>, and I'll DM you the link."
Write numbers as words for TTS ("four gig"). Keep every claim checkable against the README.

## 3. Voice in Google AI Studio (Chrome)
1. Open `https://aistudio.google.com/generate-speech` and click **Create new dialog**.
2. Speaker 1 dropdown: search **Puck** and select it. Close the panel with the X (top right).
3. Type line 1 in block 1. Click **Add speech block**: new blocks alternate Speaker 2 / Speaker 1 automatically. The first time Speaker 2 appears, click its card under "Speaker settings" on the right, search **Fenrir**, select it.
4. Typing is only reliable after clicking the empty block's textbox. Use `find` for "Speech block text" refs and click the ref, then type.
5. Click **Run**. When the player appears at the bottom, pause it, then click the download icon next to the time. The wav lands in the Mac folder as `Generated Audio <date> - <time>.wav`. Stage it and save it as `episodes/<slug>/vo.wav`.
If AI Studio shows a quota or paid-key error, stop and report it.

## 4. Timing
Save the AI Studio wav as `episodes/<slug>/vo.wav` and the script as `episodes/<slug>/script.json` = `[["R","line 1"],["I","line 2"],...]`, one entry per speech block, text exactly as typed in AI Studio. Run `python3 engine/align.py episodes/<slug>`. It keeps the original as `vo_raw.wav`, shortens long pauses (a 47 s take becomes about 39 s), and writes `words.json` / `words.js`. It prints every word with its index and start time; use those indexes in the timeline. Aim for a final length of 36 to 41 s; if it is longer, shorten the reveal line in AI Studio and generate again.

## 5. Timeline (the creative part)
Write `episodes/<slug>/timeline.js` as one `SKIT({...})` call using `engine/scene/skit.js`. Copy the closest example: `episodes/ep04_markitdown/timeline.js` (terminal demo), `ep05_scrcpy` (real screenshot plus checklist), `ep06_stirling-pdf` (screenshot with camera zoom plus flying files). (`ep03_localsend` is the older hand-written version; do not copy it.)
- `panels`: 7 entries `[start, end, (l, h) => renderFn]`, with boundaries at the first word of each beat (`T(i) = wt(i) - 0.1`). Standard builders: `h.task` (hook card: two word lines, a small custom visual, red stamps, timer), `h.plan` (intern's handwritten list, red ETA circle, strike plus fix), `h.rule` (red X plus a rule card), `h.reveal` (logo tile, name with a flash, two pill rows), `h.payoff` (struck-out time, "saved."), `h.cta` (headline plus "Comment WORD" card). The demo panel is custom each time: use `shot(l, 'file.png', w, h, box)` with `.cam(cx, cy, width)`, `h.el`, `h.popIn`, `ripple(l)`, and `footer(l, '<Name> · <License> · screenshot: <source>')`.
- `raccoon` / `intern`: pose schedules `[[time, pose], ...]`; the intern starts `[0, null]` and enters with `[wt(first intern word) - 0.15, 'p_smug', 1]`.
- `accent`: word indexes to highlight in the speech bubbles (bubbles are grouped automatically).
- Draw your own simple logo SVG for the reveal; never copy the project's real logo.
Check stills before the full render: `engine/stills.sh episodes/<slug> <8 to 13 times>` writes `episodes/<slug>/stills.jpg`. Look at it for overlaps, text running off the card, and wrong timing. Fix and repeat.

## 6. Build
- `sfx.json` (copy `episodes/ep04_markitdown/sfx.json` for the shape; times in seconds): `whoosh` at every panel change; `thud` for stamps and the red X; `pophi` for each pill, badge or list item; `pop` for the penguin entrance and the reveal; `click` for taps; `ding` for "Done" and the reveal.
- `cover.json`: `{"ep":"REPO #NN","title":"<2 short lines, max about 16 characters each, one in <i>italic</i>>","repo":"owner / repo","mascot":"<pose>"}`. Use a different raccoon pose than the last two covers (check `covers/`). The title must not wrap to a third line: open `covers/epNN.png` after the build and check. The cover is the first frame on Instagram, so make it a question or contrast (example: "3 months<br>or <i>3 seconds?</i>").
- Run `engine/build.sh episodes/<slug>` (about 3 min). Output: `reels/<slug>.mp4` and `covers/epNN.png`.

## 7. Publish
1. `git add -A && git commit` (message "Add epNN <Name>" plus the attribution trailers), then push.
2. Wait about 60 s. In a Chrome tab, `fetch(<pages url>, {method:'HEAD'})` must return 200 with the right content-length.
3. `nuelink_create_post`: brandId 21035, collectionId 110596, publishMode **QUEUE**, media `[{"url": <pages url>}]`, platforms `{"instagram":{"shareToFeed":true}}`. Caption template:
   ```
   <cover hook> 🤔

   <one-line story of the intern's over-engineered plan>

   Rule #1: before you build anything, check what already exists.

   <Name> is <one-line description>:
   <emoji> <fact 1>
   <emoji> <fact 2>
   <emoji> <fact 3>
   ⭐ <N>k+ stars on GitHub

   Comment <CTA_WORD> and we'll DM you the link 👇

   #opensource #github #<name> #<category tags> #developers #techtips #reporacoon
   ```
4. `nuelink_list_posts` (view QUEUE) to read the assigned postDate (UTC; add 5:30 for IST).
5. In `plan.json` set `status` to `"queued"`, `post_date` to the IST date, and `nuelink_post_id`. Commit and push.

## 8. Report
Send one short message: which episode, which repo, when it posts, and anything that went wrong. If any step is blocked (Chrome extension not connected, Mac asleep, AI Studio quota, Nuelink error), do not improvise around it. Leave the plan entry as `planned`, report the blocker, and stop.
