# Instructor runbook

## The promise

Every attendee can run a local tool, render a React interface, switch between two views and perform one safe server interaction. AI coding tools are optional. Use the shared model demonstration to show natural-language tool selection; use the local host for dependable exercises.

## Before September 24

| Date      | Preparation                                             | Done when                                                              |
| --------- | ------------------------------------------------------- | ---------------------------------------------------------------------- |
| Sep 15–16 | Read the implementation and run the complete local demo | Explain each MCP boundary without notes                                |
| Sep 17    | Connect your chosen conversational host                 | A real prompt opens the React resource and a button reaches the server |
| Sep 18    | Send tested setup instructions and repo to organizers   | Another React developer installs from scratch                          |
| Sep 19–20 | Pilot with two or three MCP beginners                   | Record where people stall and simplify those steps                     |
| Sep 21    | Full 210-minute rehearsal                               | Exercises, breaks and Q&A fit                                          |
| Sep 22    | Freeze dependencies and record the conversational demo  | Keep recording and offline slide export on the laptop                  |
| Sep 23    | Check projector, links, accounts and backup             | A prepared second copy runs without network access                     |
| Sep 24    | Arrive early and open the final demo                    | Local host is ready before attendees arrive                            |

Personal rehearsal, organizer communication and conversational-account testing remain instructor actions. Do not treat automated repository tests as evidence that these happened.

## Five-minute opening demo

1. Open the completed local host with `show_sessions`.
2. Show all sessions, then React after 13:00. Point out the fictional-data label.
3. Switch to Compare. Ask what changed in the data versus the presentation.
4. Click Update sessions with another topic. Show loading and updated records.
5. Click Help me choose. In this host the message is recorded; in your prepared conversational host it can continue the conversation.
6. Expand Tool Input and Tool Result. Find `view`, `structuredContent` and the resource link in the code.

For the conversational recording, use: “Show me the React sessions I can attend this afternoon”, then “Compare these sessions so I can choose one.” Verify the actual tool arguments rather than assuming a model follows the prompt exactly.

## Session cues

Use the [210-minute agenda](events/react-alicante-2026.md). At the start of each exercise: state the outcome, ask for a prediction, show the starting file and give a bounded task. Reserve the last five minutes of each block for reading the diff and testing behavior.

- **Exercise 1:** Ask whether a session ending after the window should be included. Decide before coding.
- **Exercise 2:** Ask where the HTML comes from and who loads it. Have attendees locate the MIME type and URI.
- **Exercise 3:** Ask what the model can choose. It chooses a supported argument, not arbitrary JSX.
- **Exercise 4:** Ask where a UI-initiated result arrives. It is the call’s return value.
- **Challenge:** Prefer a room filter if the group is behind; timeline is a stretch.

## Recovery commands

```sh
bun run doctor
bun run check
bun run dev
# In another terminal:
bun run smoke
```

Open a prepared solution in a new directory with `bun run checkpoint final ../agenda-final`. Stop the previous copy before starting it.

Do not debug an agent-generated detour for more than a few minutes in front of the room. Explain the failing boundary, preserve the attendee’s folder and move to the next checkpoint.

## Failure plan

- **Model account or internet fails:** use your recorded conversational demo, then continue locally. The local host demonstrates real MCP calls without AI.
- **Attendee installation fails:** pair them with someone whose setup works. A source archive is useful only if dependencies are available too.
- **Renderer fails:** show the included screenshots and text fallback, inspect the protocol result, then move to a known checkpoint.
- **Time runs short:** preserve two views and one server interaction; skip the stretch timeline and extended host integration.

## Discussion prompts

When is a list more useful than text? What should remain in structuredContent? Which interactions should require human approval if this were a real booking app? What does the host control? How would you verify an AI coding agent’s changes?

## Follow-up

Share the [repository](https://github.com/glennreyes/generative-ui-mcp-workshop), [slides](../slides/README.md) and [Discord](https://discord.gg/8p3uGHNMu). The reusable workshop description is in [workshop.md](workshop.md).
