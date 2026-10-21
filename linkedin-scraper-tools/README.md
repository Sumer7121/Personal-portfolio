# LinkedIn profile test tools

These scripts are a local browser connector for an approved test run. They are not hosted by Scoutboard. The `session.json` file stays on this computer; profile records returned to the site are saved in its browser storage.

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

## Search from Scoutboard

1. Save your session with `python save_session.py` as above.
2. Install the browser and scraper dependencies as above.
3. Start the local connector and leave its terminal open:

   ```bash
   python local_search_connector.py
   ```

4. Open Scoutboard, enter a tech stack in **Search LinkedIn people**, and choose a maximum of 5 or 10 profiles. The connector opens a headed browser, reads the current people-search results, and imports the returned profiles into this browser's candidate list. It does not paginate or work around account challenges. If Chrome asks to allow local network access for Scoutboard, allow it for the connector to work.

The connector binds to `127.0.0.1:8765`, accepts requests only from the Scoutboard Render origin, caps a search at 10 profiles, and does not accept or store LinkedIn credentials. The site itself remains static; the local connector must be running to use LinkedIn search.
