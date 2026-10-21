"""Open a headed Chromium browser for manual login and save session.json."""

import asyncio
from pathlib import Path

from linkedin_scraper import BrowserManager, wait_for_manual_login


TOOLS_DIR = Path(__file__).resolve().parent
SESSION_PATH = TOOLS_DIR / "session.json"


async def main() -> None:
    try:
        async with BrowserManager(headless=False) as browser:
            await browser.page.goto(
                "https://www.linkedin.com/login",
                wait_until="domcontentloaded",
                timeout=60_000,
            )
            print("Log in manually in the browser window. Complete any verification steps.")
            await wait_for_manual_login(browser.page, timeout=600)
            await browser.save_session(str(SESSION_PATH))
            print(f"Session saved to {SESSION_PATH}")
            print("Keep this file private. It contains active login data.")
    except asyncio.TimeoutError:
        print("Login was not completed before the 10-minute timeout; no session was saved.")
    except Exception as exc:
        print(f"Could not save the login session: {type(exc).__name__}: {exc}")


if __name__ == "__main__":
    asyncio.run(main())
