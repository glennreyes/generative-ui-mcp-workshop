# 1. A typed session tool

**Timebox:** 30 minutes · **Start:** `00-start` · **Solution:** [`01-tool`](../../checkpoints/01-tool/)

## Outcome

Return only sessions matching the requested day, topic and time window, with structured data and a useful text fallback.

The tool contract is the shared boundary between the model, server and interface.

## Files

- `packages/agenda/src/show-sessions.ts`
- `packages/agenda/src/schema.ts`
- `apps/server/src/server.ts`

## Build it

1. Inspect the fixture and the existing Zod input/output schemas.
2. Implement `showSessions` using the day, topic and time window. A session must fit entirely inside the window.
3. Return the requested view, normalized filters, matching sessions, summary, schedule source and snapshot date.
4. Inspect how `show_sessions` wraps that result in both `structuredContent` and `content`.
5. Run the tests and call the tool in the host. There is no embedded UI at this checkpoint.

## Try it

```json
{
  "day": "2026-09-25",
  "topic": "react",
  "startTime": "11:30",
  "endTime": "12:30",
  "view": "list"
}
```

Expect two sessions: `25-aurora-scharff` and `25-mattia-manzati`. Both end by 12:30. Sara Vieira’s 12:30–13:00 session is excluded because it ends after the window.

## Acceptance criteria

- [ ] Empty input returns 46 sessions.
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

HH:mm strings compare in time order because the schema requires zero-padded 24-hour times. Match day AND topic AND start >= startTime AND end <= endTime. The all value bypasses its filter.

</details>

## Review together

Show the changed code, the actual tool arguments and the visible result. Explain one failure mode you tested. Compare with the [solution source](../../checkpoints/01-tool/) if needed.

[All exercises](README.md)
