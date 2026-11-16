"""Render scene/index.html frame by frame with Playwright, piping JPEGs into ffmpeg.
usage: python3 render.py stills 1.0 4.0 ...   |   python3 render.py video out.mp4"""
import sys, subprocess, pathlib, os
from playwright.sync_api import sync_playwright

ROOT = pathlib.Path(__file__).parent / "scene" / "index.html"
FPS = 30


def with_page(fn):
    with sync_playwright() as p:
        b = p.chromium.launch(executable_path="/usr/bin/google-chrome", args=["--allow-file-access-from-files"])
        pg = b.new_page(viewport={"width": 1080, "height": 1920}, device_scale_factor=1)
        pg.goto(ROOT.as_uri()); pg.wait_for_function("document.fonts.status==='loaded'")
        pg.wait_for_timeout(500)
        fn(pg); b.close()


def stills(ts):
    os.makedirs("chk/st", exist_ok=True)
    def go(pg):
        for t in ts:
            pg.evaluate(f"render({t})"); pg.screenshot(path=f"chk/st/{t}.jpg", type="jpeg", quality=88)
    with_page(go)


def video(out):
    def go(pg):
        dur = pg.evaluate("DURATION"); n = int(dur * FPS)
        tmp = out + ".tmp.mp4"
        ff = subprocess.Popen(["ffmpeg", "-v", "error", "-y", "-f", "image2pipe", "-framerate", str(FPS), "-c:v", "mjpeg", "-i", "-",
                               "-c:v", "libx264", "-preset", "veryfast", "-crf", "17", "-pix_fmt", "yuv420p", tmp], stdin=subprocess.PIPE)
        for i in range(n):
            pg.evaluate(f"render({i / FPS})")
            ff.stdin.write(pg.screenshot(type="jpeg", quality=92))
        ff.stdin.close(); ff.wait()
        if ff.returncode == 0: os.replace(tmp, out)
    with_page(go)


if __name__ == "__main__":
    if sys.argv[1] == "stills": stills([float(x) for x in sys.argv[2:]])
    else: video(sys.argv[2])
