# React Alicante 2026 schedule data

Source: [official conference schedule](https://reactalicante.es/#schedule), read from all three day tabs on **September 23, 2026**. Times are local **Europe/Madrid** times. The snapshot is bundled in `packages/agenda/src/sessions.ts`; the app makes no live website requests.

| Date                   | Included sessions                                |
| ---------------------- | ------------------------------------------------ |
| Thursday, September 24 | 10 workshops: five 09:00–13:00, five 14:15–18:15 |
| Friday, September 25   | 10 talks and 8 lightning talks                   |
| Saturday, September 26 | 10 talks and 8 lightning talks                   |
| Total                  | 46                                               |

## What comes from the conference

Dates, speaker names, titles, workshop rooms and published time ranges. Breaks, lunch, registration and networking are excluded from the session search. They remain on the official schedule.

- Lightning talks have only a shared **14:25–16:10** block. Each entry carries `timing: "block"`; these are not individual talk durations or claims that the talks run simultaneously. The complete-attendance filter requires the entire block to fit.
- Talk rooms are shown as **Not published** (`room: null`). Workshop room numbers are preserved.
- Kitze's title is listed as a dash on the site. The app displays **Title not announced**.
- No difficulty levels are published, so the old synthetic level field is removed.
- Title punctuation is normalized to avoid em dashes. No talk abstracts or speaker biographies are reproduced.

## What we add for teaching

`topic` is a single editorial tag assigned for this workshop, not an official conference classification. Titles that mention React can be tagged AI, native, tooling or another more specific topic. Session IDs are our stable date/speaker identifiers. Descriptions identify the session type and speaker, or explain missing timing information; they are not conference abstracts.

The tool accepts `day: "all" | "2026-09-24" | "2026-09-25" | "2026-09-26"`. The default is all days, 09:00–19:00. A selected time window applies separately to each selected day.

## Repeatable teaching examples

- Finished demo: **Friday, React, 11:30–13:00** returns Aurora Scharff, Mattia Manzati and Sara Vieira.
- Exercise 1: **Friday, React, 11:30–12:30** returns Aurora and Mattia. Sara ends after the selected window.
- Empty state: **19:00–20:00** returns no sessions.
- Day selection: **Thursday, all topics, 09:00–19:00** returns all ten workshops.
- Afternoon workshops require an end time of **18:15 or later**, not 18:00.

Schedule changes after the snapshot are possible. Follow the linked official schedule for attendance decisions. The older PDF/PPTX and `docs/images/` screenshots retain fictional examples as historical backups; use the current React deck and rebuilt app for this dataset.
