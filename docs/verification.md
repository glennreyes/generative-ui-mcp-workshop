# Verification status

The real schedule snapshot was verified on September 23, 2026 with Node 24.21.0 and Bun 1.4.2. The original complete slide review was September 19; the updated real-data example was reviewed again on September 23.

## Automated checks

- `bun run check`: ESLint (including shadcn rules), TypeScript, twelve tests and production UI/host/slide builds pass.
- Domain tests cover defaults, day/topic/time filters and published lightning blocks, views, empty results, invalid input and fixture immutability.
- HTTP tests exercise actual MCP clients and servers, current and compatibility negotiation, tool/resource metadata, validation and origin/host protections.
- The AppBridge test connects the official App and host bridge to the real server. It checks UI-to-tool calls, filtered results, comparison, empty results, invalid input, model context and host messages.
- Both `bun run smoke` against the running HTTP server and `bun run smoke --stdio` pass, including the linked single-file React resource.
- All five exported checkpoints install from the lockfile and pass lint, type checking and builds. The final checkpoint also passes all twelve tests. Earlier checkpoints intentionally leave final acceptance behavior unfinished.

## Visual checks

The images in `docs/images/` are historical screenshots of the former fictional dataset, not the current conference schedule.

The September 17 PowerPoint/PDF exports remain archived static backups. The current React deck adds Motion reveals, local interactive examples and a complete print view. Browser checks verified keyboard navigation, the slide picker, list/compare interaction, the full MCP reveal sequence, speaker notes and cross-window presenter synchronization. The print view exposes all fourteen completed slides. All fourteen slides received screenshot review, including the presenter layout. See [the slide guide](../slides/README.md) for controls and export instructions.

## Live browser interactions

September 23 checks in Chrome verified the real-data path:

- Friday React with an 11:30 to 13:00 window returns three Friday sessions.
- Compare displays those three records with dates, speakers and unpublished-room labels.
- Changing the day to Saturday and clicking Update sessions returns Faris Aziz’s one matching React session while retaining the comparison view.
- The initial result contains all 46 sessions. Workshops show their published rooms; lightning entries explain the shared block.

Empty-state, validation recovery and Help me choose browser checks passed on the former dataset on September 22. Their automated domain and bridge coverage passes with the new dataset; these three browser checks were not repeated on September 23.

## Instructor rehearsal

The optional conversational-host demonstration, participant-machine pilot and full timed rehearsal remain instructor tasks. Follow the [instructor runbook](instructor.md), and verify repository access from an attendee account before distributing the setup link.
