\# Planner PWA



Personal planner dashboard migrated from Google Apps Script to Vite + Vanilla JS.



\## Goals

\- Live clock (updates every second)

\- Weather forecast for 10–12 hours (Open-Meteo, no API key)

\- Events/tasks (Track A: events.json or public iCal .ics)

\- Installable PWA + deploy



\## Stack

\- Vite + Vanilla JS

\- PWA (manifest + service worker)



\## Project structure (target)

\- src/modules/clock.js

\- src/modules/weather.js

\- src/modules/events.js

\- src/styles/main.css

\- src/main.js



\## Workflow rules

\- Major changes are done via Gemini CLI prompts

\- Keep code modular and readable (ES modules)

\- Record prompts in PROMPTS.md and changes in CHANGELOG.md

\- Keep secrets out of git (.env, .gemini/)



