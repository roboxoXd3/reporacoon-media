# reporacoon-media

Video and cover files for the [@reporacoon](https://instagram.com/reporacoon) Instagram reels, served through GitHub Pages so the scheduler can fetch them.


## Layout
- `PLAYBOOK.md`: how a reel is made and queued, step by step
- `plan.json` / `CONTENT_PLAN.md`: the 30-day schedule and status
- `engine/`: renderer (HTML scene + Playwright), audio mix, cover maker, `build.sh`
- `episodes/<slug>/`: per-episode script timing, timeline, voice, sfx, cover text
- `reels/`, `covers/`: published files (served by GitHub Pages)
