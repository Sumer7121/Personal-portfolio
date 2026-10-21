"""Local-only connector used by Scoutboard to search a small LinkedIn result set.

This binds only to loopback. It never uploads session.json to Render.
"""

from __future__ import annotations

import asyncio
import json
import re
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import parse_qs, quote_plus, urlparse

from linkedin_scraper import BrowserManager, PersonScraper

from scrape_profile import person_payload


TOOLS_DIR = Path(__file__).resolve().parent
SESSION_PATH = TOOLS_DIR / "session.json"
SITE_ORIGIN = "https://scoutboard-recruiter.onrender.com"
HOST = "127.0.0.1"
PORT = 8765
MAX_RESULTS = 10


def canonical_profile_url(raw_url: str) -> str | None:
    try:
        parsed = urlparse(raw_url)
        if parsed.scheme not in {"http", "https"} or not parsed.hostname:
            return None
        host = parsed.hostname.lower()
        if host != "linkedin.com" and not host.endswith(".linkedin.com"):
            return None
        parts = [p for p in parsed.path.split("/") if p]
        if len(parts) < 2 or parts[0].lower() != "in":
            return None
        if parts[1].lower() in {"me", "sales"}:
            return None
        slug = re.sub(r"[^a-zA-Z0-9_%~-]", "", parts[1])
        if not slug:
            return None
        return f"https://www.linkedin.com/in/{slug}/"
    except Exception:
        return None


async def search_profiles(stack_query: str, limit: int) -> list[dict]:
    if not SESSION_PATH.is_file():
        raise RuntimeError("session.json is missing. Run save_session.py first.")

    search_url = "https://www.linkedin.com/search/results/people/?keywords=" + quote_plus(stack_query)
    results: list[dict] = []
    async with BrowserManager(headless=False) as browser:
        await browser.load_session(str(SESSION_PATH))
        page = browser.page
        await page.goto(search_url, wait_until="domcontentloaded", timeout=60_000)
        await page.locator("main").wait_for(timeout=30_000)
        await page.wait_for_timeout(1800)

        current = (page.url or "").lower()
        if any(flag in current for flag in ("checkpoint", "authwall", "challenge")):
            raise RuntimeError("LinkedIn requested an account verification step. Complete it manually, then retry.")

        hrefs = await page.locator("main a[href*='/in/']").evaluate_all(
            "nodes => nodes.map(node => node.href || node.getAttribute('href') || '')"
        )
        profile_urls: list[str] = []
        seen: set[str] = set()
        for href in hrefs:
            candidate = canonical_profile_url(str(href))
            if candidate and candidate not in seen:
                seen.add(candidate)
                profile_urls.append(candidate)
            if len(profile_urls) >= limit:
                break

        if not profile_urls:
            raise RuntimeError("No profile links appeared in the people search results.")

        scraper = PersonScraper(page)
        for profile_url in profile_urls:
            try:
                person = await asyncio.wait_for(scraper.scrape(profile_url), timeout=60)
                results.append(person_payload(person, profile_url))
            except asyncio.TimeoutError:
                print(f"Timed out; skipped {profile_url}")
            except Exception as exc:
                print(f"Could not read {profile_url}: {type(exc).__name__}: {exc}")
    return results


class Handler(BaseHTTPRequestHandler):
    server_version = "ScoutboardLocalConnector/1.0"

    def _cors(self) -> None:
        origin = self.headers.get("Origin", "")
        if origin == SITE_ORIGIN:
            self.send_header("Access-Control-Allow-Origin", SITE_ORIGIN)
            self.send_header("Vary", "Origin")
            self.send_header("Access-Control-Allow-Methods", "POST, OPTIONS")
            self.send_header("Access-Control-Allow-Headers", "Content-Type")
            self.send_header("Access-Control-Allow-Private-Network", "true")

    def _json(self, status: int, payload: dict) -> None:
        body = json.dumps(payload, ensure_ascii=False).encode("utf-8")
        self.send_response(status)
        self._cors()
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.send_header("Cache-Control", "no-store")
        self.end_headers()
        self.wfile.write(body)

    def do_OPTIONS(self) -> None:
        if self.headers.get("Origin") != SITE_ORIGIN:
            self.send_error(403, "Origin not allowed")
            return
        self.send_response(204)
        self._cors()
        self.send_header("Content-Length", "0")
        self.end_headers()

    def do_POST(self) -> None:
        if self.path != "/api/search":
            self._json(404, {"error": "Route not found"})
            return
        if self.headers.get("Origin") != SITE_ORIGIN:
            self._json(403, {"error": "Only the Scoutboard site may call this local connector"})
            return
        try:
            length = int(self.headers.get("Content-Length", "0"))
            if length <= 0 or length > 4096:
                raise ValueError("Request body must be under 4 KB")
            payload = json.loads(self.rfile.read(length).decode("utf-8"))
            query = str(payload.get("query", "")).strip()
            if not query or len(query) > 160:
                raise ValueError("Enter a tech-stack query up to 160 characters")
            limit = max(1, min(int(payload.get("limit", 5)), MAX_RESULTS))
            print(f"Searching LinkedIn people results for {query!r} (limit {limit})")
            profiles = asyncio.run(search_profiles(query, limit))
            self._json(200, {"profiles": profiles, "count": len(profiles)})
        except Exception as exc:
            self._json(400, {"error": str(exc) or type(exc).__name__})

    def log_message(self, fmt: str, *args) -> None:
        print(f"[Scoutboard connector] {fmt % args}")


def main() -> None:
    if not SESSION_PATH.is_file():
        print(f"No session file found at {SESSION_PATH}")
        print("Run save_session.py first. The session file stays on this computer.")
        raise SystemExit(1)
    server = ThreadingHTTPServer((HOST, PORT), Handler)
    print(f"Scoutboard local connector listening on http://{HOST}:{PORT}")
    print("Keep this terminal open while you search from Scoutboard. Press Ctrl+C to stop.")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("Stopping local connector.")
    finally:
        server.server_close()


if __name__ == "__main__":
    main()
