# 1. A typed session tool

**Timebox:** 30 minutes · **Start:** `00-start` · **Solution:** [`01-tool`](../../checkpoints/01-tool/)

## Outcome

Return only sessions matching the requested topic and time window, with structured data and a useful text fallback.

The tool contract is the shared boundary between the model, server and interface.

## Files

- `packages/agenda/src/show-sessions.ts`
- `packages/agenda/src/schema.ts`
- `apps/server/src/server.ts`

## Build it

1. Inspect the fixture and the existing Zod input/output schemas.
2. Implement `showSessions` using the topic and time window. A session must fit entirely inside the window.
3. Return the requested view, normalized filters, matching sessions, summary and fictional-data label.
4. Inspect how `show_sessions` wraps that result in both `structuredContent` and `content`.
5. Run the tests and call the tool in the host. There is no embedded UI at this checkpoint.

## Try it

```json
{ "topic": "react", "startTime": "13:00", "endTime": "15:00", "view": "list" }
```

Expect two sessions: `react-patterns` and `react-performance`. Both end by 15:00. The 15:00 session ends at 15:45, so it is excluded.

## Acceptance criteria

- [ ] Empty input returns twelve sessions.
- [ ] The example above returns exactly two sessions.
- [ ] A reversed window or unsupported topic is rejected.
- [ ] A valid empty result explains how to broaden the search.
- [ ] Text fallback contains titles, times and rooms.

## Optional agent prompt

> Implement exercise 1 in docs/exercises/01-tool.md. Use the existing schemas and fixtures. Explain the filter boundary, make the smallest change, and run the relevant tests. Do not add APIs, dependencies or generated UI code.

<details>
<summary>Hint 1</summary>

Parse input before filtering. Default values should come from the schema, not a second set of defaults.

</details>

<details>
<summary>Hint 2</summary>

HH:mm strings compare in time order because the schema requires zero-padded 24-hour times. Match topic AND start >= startTime AND end <= endTime.

</details>

## Review together

Show the changed code, the actual tool arguments and the visible result. Explain one failure mode you tested. Compare with the [solution source](../../checkpoints/01-tool/) if needed.

[All exercises](README.md)
