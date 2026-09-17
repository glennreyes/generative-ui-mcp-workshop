# 4. Call the server from the UI

**Timebox:** 30 minutes · **Start:** `03-views` · **Solution:** [`final`](../../checkpoints/final/)

## Outcome

Make Update sessions and the view buttons call the real MCP tool and display the returned result.

A button inside an MCP App talks through the host bridge. It does not need direct access to the server.

## Files

- `apps/ui/src/use-session-actions.ts`
- `apps/ui/src/app.tsx`

## Build it

1. Implement `requestSessions` with `app.callServerTool({ name: "show_sessions", arguments: input })`.
2. Add a timeout, check `isError` and parse `structuredContent` with the result schema.
3. Read the supplied `refresh` controller: it tracks pending state, disables duplicate submissions and ignores stale results.
4. Filter to React after 13:00, then switch to Compare using the app’s buttons.
5. Try a reversed window and an empty 17:00–18:00 window.
6. Click Help me choose and inspect the host’s Messages panel. Explain why the local host does not reply like a model.

## Try it

Choose React, From 13:00, Until 18:00. Click Update sessions. Expect three sessions. Click Compare. Expect the same three rows.

Then use From 17:00 and Until 18:00. Expect the explicit empty state. Restore 13:00 and retry.

## Acceptance criteria

- [ ] A UI action makes a real host-mediated tool call.
- [ ] The returned result updates the UI, including when the view changes.
- [ ] Controls are disabled during the request and recover afterward.
- [ ] Failures and invalid result shapes show a message, not a crash.
- [ ] A follow-up includes visible session IDs and the applied filters.
- [ ] npm run check passes in the finished project.

## Optional agent prompt

> Implement exercise 4 in docs/exercises/04-interaction.md. Complete requestSessions using the MCP Apps bridge. Validate results and preserve timeout and error handling. Do not replace the call with local filtering. Run the checks and explain how the result returns to React.

<details>
<summary>Hint 1</summary>

UI-initiated tool calls return directly to the caller. Do not wait for another ontoolresult event.

</details>

<details>
<summary>Hint 2</summary>

Check isError before parsing structuredContent. Return the parsed view model; refresh already updates state and clears pending in finally.

</details>

## Review together

Show the changed code, the actual tool arguments and the visible result. Explain one failure mode you tested. Compare with the [solution source](../../checkpoints/final/) if needed.

[All exercises](README.md)
