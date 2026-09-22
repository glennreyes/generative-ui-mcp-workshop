# Verification status

Automated checks and live app interactions verified on September 22, 2026 with Node 24.21.0 and Bun 1.4.2. Checkpoint exports and the slide visual review were verified on September 19, 2026.

## Automated checks

- `bun run check`: ESLint (including shadcn rules), TypeScript, eleven tests and production UI/host/slide builds pass.
- Domain tests cover defaults, topic/time filters, views, empty results, invalid input and fixture immutability.
- HTTP tests exercise actual MCP clients and servers, current and compatibility negotiation, tool/resource metadata, validation and origin/host protections.
- The AppBridge test connects the official App and host bridge to the real server. It checks UI-to-tool calls, filtered results, comparison, empty results, invalid input, model context and host messages.
- Both `bun run smoke` against the running HTTP server and `bun run smoke --stdio` pass, including the linked single-file React resource.
- All five exported checkpoints install from the lockfile and pass lint, type checking and builds. The final checkpoint also passes all eleven tests. Earlier checkpoints intentionally leave final acceptance behavior unfinished.

## Visual checks

The actual local host rendered the twelve-session list and the filtered three-session list/comparison. The screenshots in `docs/images/` show these real results.

The September 17 PowerPoint/PDF exports remain archived static backups. The current React deck adds Motion reveals, local interactive examples and a complete print view. Browser checks verified keyboard navigation, the slide picker, list/compare interaction, the full MCP reveal sequence, speaker notes and cross-window presenter synchronization. The print view exposes all fourteen completed slides. All fourteen slides received screenshot review, including the presenter layout. See [the slide guide](../slides/README.md) for controls and export instructions.

## Live browser interactions

Verified inside the nested MCP App in Chrome using the running local host:

- React with a 13:00 to 18:00 window returns three afternoon sessions.
- Compare displays those three records in a table; List restores their cards.
- Accessibility in the afternoon shows the empty state.
- An end time equal to the start time shows a useful validation error. Restoring a valid window recovers the results.
- Help me choose records a message in the local host and confirms delivery in the app.

## Instructor rehearsal

The optional conversational-host demonstration, participant-machine pilot and full timed rehearsal remain instructor tasks. Follow the [instructor runbook](instructor.md), and verify repository access from an attendee account before distributing the setup link.
