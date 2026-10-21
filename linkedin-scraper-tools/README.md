# LinkedIn profile test tools

These local scripts are for approved, one-profile test runs. They are not part of the hosted Scoutboard web app.

## Install

```bash
python -m pip install linkedin-scraper playwright
python -m playwright install chromium
```

## Save a manual login session

```bash
python save_session.py
```

A headed browser opens. Sign in manually and complete any verification steps. The script writes `session.json` beside itself.

## Scrape one profile

```bash
python scrape_profile.py
```

The default target is William Gates's profile. Pass a different approved profile URL as the first argument. The script prints available fields and writes `profile.json` beside itself; fields that are absent are represented as `null` or empty lists.

`session.json` contains active login state and `profile.json` contains personal data. Both are excluded from Git by the adjacent `.gitignore`; keep them local and do not share them.
