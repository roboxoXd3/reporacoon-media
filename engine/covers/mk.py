"""usage: python3 mk.py out.png "REPO #04" "Title<br><i>accent</i>" "owner / repo" mascot_pose"""
import sys, urllib.parse, pathlib
from playwright.sync_api import sync_playwright
out, ep, t, repo, m = sys.argv[1:6]
with sync_playwright() as p:
    b = p.chromium.launch(executable_path="/usr/bin/google-chrome", args=["--allow-file-access-from-files"])
    pg = b.new_page(viewport={"width": 1080, "height": 1920})
    u = (pathlib.Path(__file__).parent / 'cover.html').resolve().as_uri() + '?' + urllib.parse.urlencode(dict(ep=ep, t=t, repo=repo, m=m))
    pg.goto(u); pg.wait_for_function("document.fonts.status==='loaded' && document.getElementById('m').complete"); pg.wait_for_timeout(300)
    pg.screenshot(path=out); b.close()
