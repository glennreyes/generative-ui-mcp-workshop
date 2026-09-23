# Workshop development guide

This repository teaches Building Generative UI with MCP in React. Keep the core path runnable with Node 24.21.0 and Bun 1.4.2, without API keys or external services.

- Read the relevant page in `docs/exercises/` before changing an exercise.
- Use the sourced React Alicante 2026 schedule snapshot. Keep dates, speakers and published times accurate; label editorial topics and shared lightning blocks. Do not invent missing rooms, levels or times.
- The model chooses validated arguments and an allowed view. Never execute model-generated JSX, HTML, or JavaScript.
- Use the official MCP SDK v2 and MCP Apps SDK. Do not hand-roll protocol messages or add legacy SSE.
- UI interactions call `app.callServerTool`. Handle the returned result, validation, loading and errors.
- Use existing shadcn component variants. `@shadcn/lint` is configured in `eslint.config.mjs`; fix errors without suppressing the rules.
- Keep shared workshop copy duration-neutral. Date and 3.5-hour duration belong in the React Alicante event page and agenda.
- Preserve the upstream attribution and licenses in `apps/host`.
- Run `bun run check` after changes. For bridge/UI changes, run `bun run smoke` against the running server and verify the interaction inside the local host.
- Changes to teaching files must be reflected in the matching `checkpoints/` snapshots and exercise links.
- Keep the exact dependency versions and bun.lock in sync. Do not upgrade dependencies during the workshop.
- Keep public copy plain and free of em dashes.
