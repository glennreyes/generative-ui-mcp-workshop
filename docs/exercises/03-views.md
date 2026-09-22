# 3. Choose a presentation

**Timebox:** 25 minutes · **Start:** `02-react-ui` · **Solution:** [`03-views`](../../checkpoints/03-views/)

## Outcome

Render a comparison table when the result asks for compare, while keeping the list view.

The model chooses a view argument. Trusted React code decides what that view looks like.

## Files

- `apps/ui/src/session-results.tsx`
- `packages/agenda/src/schema.ts`

## Build it

1. Inspect `SessionResult` and the two supported view values.
2. Add a comparison branch using the provided shadcn Table components.
3. Show title, time, room, level and description with real table headings.
4. Keep the existing empty-state message for both views.
5. Call the tool twice from the host, changing only `view`. The app’s buttons become functional in exercise 4.

## Try it

```json
{ "topic": "react", "startTime": "13:00", "view": "compare" }
```

Expect a table containing the same three records as the list call. In the local host you select the argument; the instructor can demonstrate a model choosing it from a prompt.

## Acceptance criteria

- [ ] List and compare show the same filtered records.
- [ ] Comparison columns have accessible headers.
- [ ] Stable session IDs are used as keys.
- [ ] Unknown views are rejected by the schema.
- [ ] bun run lint passes without suppressing shadcn rules.

## Optional agent prompt

> Implement exercise 3 in docs/exercises/03-views.md. Add a comparison table selected by result.view using the installed shadcn components. Preserve list and empty states, do not execute model-generated markup, and run lint and typecheck.

<details>
<summary>Hint 1</summary>

Branch on result.view; do not infer intent from titles in React.

</details>

<details>
<summary>Hint 2</summary>

Use Table, TableHeader, TableRow, TableHead, TableBody and TableCell. The empty-state return can stay before the view branch.

</details>

## Review together

Show the changed code, the actual tool arguments and the visible result. Explain one failure mode you tested. Compare with the [solution source](../../checkpoints/03-views/) if needed.

[All exercises](README.md)
