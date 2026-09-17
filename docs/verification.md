# Verification status

Verified on September 17, 2026 with Node 24.21.0 and npm 11.19.1.

## Automated checks

- `npm run check`: ESLint (including shadcn rules), TypeScript, nine tests and production UI/host builds pass.
- Domain tests cover defaults, topic/time filters, views, empty results, invalid input and fixture immutability.
- HTTP tests exercise actual MCP clients and servers, current and compatibility negotiation, tool/resource metadata, validation and origin/host protections.
- The AppBridge test connects the official App and host bridge to the real server. It checks UI-to-tool calls, filtered results, comparison, empty results, invalid input, model context and host messages.
- Both `npm run smoke` against the running HTTP server and `npm run smoke -- --stdio` pass, including the linked single-file React resource.
- All five exported checkpoints install from the lockfile and pass lint, type checking and builds. The final checkpoint also passes all nine tests. Earlier checkpoints intentionally leave final acceptance behavior unfinished.

## Visual checks

The actual local host rendered the twelve-session list and the filtered three-session list/comparison. The screenshots in `docs/images/` show these real results.

All fourteen PowerPoint slides were rendered and inspected. The PDF contains the same fourteen rendered slides. The standalone HTML deck loads locally; keyboard navigation and speaker notes were checked in the browser.

## Manual rehearsal still required

The browser automation environment could inspect and fill the nested app iframe but failed to dispatch clicks to its buttons. This is a limitation of the verification performed, not evidence that the buttons work or fail in a normal browser. The SDK bridge tests pass, but do not replace this final browser check:

1. Run `npm run dev` and open the local host at `http://localhost:8080/?tool=show_sessions&call=true`.
2. Choose React, set From to 13:00, and click **Update sessions**. Expect three afternoon sessions.
3. Click **Compare**, then **List**. Confirm the same three records remain.
4. Choose Accessibility with the afternoon window. Confirm the empty state, then restore All topics.
5. Set Until before From. Confirm a useful validation error, then recover with a valid window.
6. Click **Help me choose**. Confirm the local host receives the message; it does not run a conversational model.

The optional conversational-host demonstration, participant-machine pilot and full timed rehearsal remain instructor tasks. Follow the [instructor runbook](instructor.md), and verify repository access from an attendee account before distributing the setup link.
