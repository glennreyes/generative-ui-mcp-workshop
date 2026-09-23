# 2. Connect the React resource

**Timebox:** 35 minutes · **Start:** `01-tool` · **Solution:** [`02-react-ui`](../../checkpoints/02-react-ui/)

## Outcome

Make the host render the bundled React list for a real MCP tool result.

MCP tools return data. The UI resource and host bridge turn that data into an interactive surface.

## Files

- `apps/server/src/server.ts`
- `apps/ui/src/app.tsx`
- `apps/ui/src/session-results.tsx`

## Build it

1. Find the `ui://agenda/sessions.html` resource URI.
2. Link the tool to it with `_meta.ui.resourceUri` and register the resource with `registerAppResource`.
3. Return the built HTML with `RESOURCE_MIME_TYPE`, including its CSP metadata.
4. Inspect `useApp`: `ontoolresult` is registered before connection and validates `structuredContent`.
5. Build, reload the local host and call the tool again. The supplied renderer handles loading, empty results and invalid data.
6. Trace one result from the host’s Tool Result panel into a list item. The filter action is intentionally unfinished until exercise 4.

## Try it

```json
{
  "day": "2026-09-25",
  "topic": "react",
  "startTime": "11:30",
  "endTime": "13:00",
  "view": "list"
}
```

Expect three Friday React sessions inside the sandbox. No network request to an external asset host should be needed.

## Acceptance criteria

- [ ] The tool metadata and resource URI match exactly.
- [ ] The resource MIME type is text/html;profile=mcp-app.
- [ ] A real host result renders the three-session list.
- [ ] Text content remains useful without a UI-capable host.
- [ ] The UI does not import server code or fetch an external API.

## Optional agent prompt

> Implement exercise 2 in docs/exercises/02-react-ui.md. Wire the existing React bundle to show_sessions using the MCP Apps SDK. Keep the text fallback and single-file resource. Explain how useApp receives results, then build and verify the resource.

<details>
<summary>Hint 1</summary>

Use the same resourceUri constant for the tool metadata and resource registration.

</details>

<details>
<summary>Hint 2</summary>

The resource callback reads apps/ui/dist/index.html, not the TypeScript source. Build it with Vite first; useApp receives ontoolresult and validates result.structuredContent.

</details>

## Review together

Show the changed code, the actual tool arguments and the visible result. Explain one failure mode you tested. Compare with the [solution source](../../checkpoints/02-react-ui/) if needed.

[All exercises](README.md)
