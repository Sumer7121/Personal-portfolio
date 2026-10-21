"""Scrape one approved LinkedIn profile to a local JSON file."""

from __future__ import annotations

import argparse
import asyncio
import json
from pathlib import Path
from typing import Any

from linkedin_scraper import BrowserManager, PersonScraper


TOOLS_DIR = Path(__file__).resolve().parent
DEFAULT_URL = "https://www.linkedin.com/in/williamhgates/"


def value(obj: Any, *names: str, default: Any = None) -> Any:
    """Read the first available field from a dict or model-like object."""
    for name in names:
        if isinstance(obj, dict) and name in obj:
            found = obj[name]
        else:
            found = getattr(obj, name, None)
        if found is not None:
            return found
    return default


def plain_text(obj: Any, *names: str) -> str | None:
    found = value(obj, *names)
    if found is None:
        return None
    if isinstance(found, (str, int, float)):
        text = str(found).strip()
        return text or None
    return None


def records(items: Any) -> list[Any]:
    if items is None:
        return []
    if isinstance(items, (str, bytes, dict)):
        return [items]
    try:
        return list(items)
    except TypeError:
        return []


def experience_data(item: Any) -> dict[str, str | None]:
    return {
        "title": plain_text(item, "title", "position", "role"),
        "company": plain_text(item, "company", "company_name", "organization"),
        "dates": plain_text(item, "dates", "date_range", "time_period", "duration", "date"),
    }


def education_data(item: Any) -> dict[str, str | None] | str:
    if isinstance(item, str):
        return item.strip()
    return {
        "school": plain_text(item, "school", "institution", "university", "name"),
        "degree": plain_text(item, "degree", "degree_name", "qualification"),
        "dates": plain_text(item, "dates", "date_range", "time_period", "duration", "date"),
    }


def skills_data(person: Any) -> list[str]:
    result: list[str] = []
    for item in records(value(person, "skills", default=[])):
        skill = item if isinstance(item, str) else plain_text(item, "name", "title", "skill")
        if skill and skill.strip():
            result.append(skill.strip())
    return result


def person_payload(person: Any, profile_url: str) -> dict[str, Any]:
    return {
        "name": plain_text(person, "name"),
        "headline": plain_text(person, "headline"),
        "location": plain_text(person, "location"),
        "about": plain_text(person, "about", "summary"),
        "experiences": [experience_data(x) for x in records(value(person, "experiences", default=[]))],
        "education": [education_data(x) for x in records(value(person, "educations", "education", default=[]))],
        "skills": skills_data(person),
        "linkedin_url": plain_text(person, "linkedin_url", "profile_url") or profile_url,
    }


def print_payload(data: dict[str, Any]) -> None:
    for field in ("name", "headline", "location", "about"):
        print(f"{field.replace('_', ' ').title()}: {data.get(field) or 'Not available'}")
    print("Experience:")
    if data["experiences"]:
        for item in data["experiences"]:
            print(f"  - {item.get('title') or '—'} | {item.get('company') or '—'} | {item.get('dates') or '—'}")
    else:
        print("  Not available")
    print("Education:")
    for item in data["education"]:
        print(f"  - {item if isinstance(item, str) else ' | '.join(x for x in (item.get('school'), item.get('degree'), item.get('dates')) if x) or 'Not available'}")
    if not data["education"]:
        print("  Not available")
    print(f"Skills: {', '.join(data['skills']) if data['skills'] else 'Not available'}")


async def scrape(profile_url: str, session_path: Path, output_path: Path, timeout: int) -> int:
    if not session_path.is_file():
        print(f"Session file not found: {session_path}")
        print("Run save_session.py first, then retry.")
        return 1

    try:
        async with BrowserManager(headless=False) as browser:
            await browser.load_session(str(session_path))
            scraper = PersonScraper(browser.page)
            person = await asyncio.wait_for(scraper.scrape(profile_url), timeout=timeout)
            data = person_payload(person, profile_url)
            output_path.write_text(json.dumps(data, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
            print_payload(data)
            print(f"\nSaved JSON to: {output_path}")
            return 0
    except asyncio.TimeoutError:
        print(f"Profile request timed out after {timeout} seconds.")
    except Exception as exc:
        print(f"Could not scrape profile: {type(exc).__name__}: {exc}")
        print("Check that the session is current and the profile is available to your test account.")
    return 1


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Scrape one approved LinkedIn profile to JSON.")
    parser.add_argument("url", nargs="?", default=DEFAULT_URL, help=f"Profile URL (default: {DEFAULT_URL})")
    parser.add_argument("--session", type=Path, default=TOOLS_DIR / "session.json", help="Saved login session JSON")
    parser.add_argument("--output", type=Path, default=TOOLS_DIR / "profile.json", help="Output JSON path")
    parser.add_argument("--timeout", type=int, default=180, help="Maximum scrape time in seconds")
    return parser.parse_args()


if __name__ == "__main__":
    args = parse_args()
    raise SystemExit(asyncio.run(scrape(args.url, args.session, args.output, args.timeout)))
