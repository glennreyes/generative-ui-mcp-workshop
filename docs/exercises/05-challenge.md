# 5. Your extension

**Timebox:** 20 minutes · **Start:** `final`

Choose one extension with a partner. Predict the contract change before asking an agent to implement it.

## Option A: room filter

Add `room: "all" | "A" | "B"` to the input schema, server filter and form. Preserve room when switching views. Add a test that combines room, topic and time.

Acceptance: filtering to Room B excludes every Room A session in both views; text fallback matches the visible records.

Hint 1: the UI should submit a new argument, not filter a second copy of the data. Hint 2: update the returned `filters` contract so React remembers the server’s normalized values.

## Option B: timeline

Add a `timeline` view to the schema and a trusted React timeline component. Keep the existing list and comparison views. Explain what happens when two fictional sessions run simultaneously.

Acceptance: the same filtered session IDs appear in every view and the timeline has a readable keyboard/screen-reader order.

Hint 1: add the discriminator before the renderer. Hint 2: group by start time without silently dropping simultaneous sessions.

## Optional agent prompt

> Read docs/exercises/05-challenge.md and implement the room-filter option. Before editing, list the schema, server and UI changes. Use existing components, preserve other filters, add one meaningful test and run bun run check. Explain the actual result afterward.

## Review

- What changed in the schema, server and UI?
- Which state belongs to the tool result and which belongs to the current form draft?
- What did the agent get wrong, and how did you verify the correction?
- Does the app still work without a model account?

There is deliberately no single finished solution for this open exercise. The four core exercises have complete checkpoint solutions.
