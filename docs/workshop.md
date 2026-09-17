# Building Generative UI with MCP in React

Chat interfaces are everywhere, but text isn’t always the best response. Sometimes users need a comparison table, an interactive list or a form they can act on.

In this workshop, you’ll learn how to build interactive React interfaces that live inside AI conversations. We’ll use the Model Context Protocol (MCP) and its MCP Apps extension to connect tools, data and UI.

Together, we’ll build a small application that responds to user intent with different presentations. An AI model can interpret a request and choose an appropriate view, while React renders components you’ve designed. We’ll make those interfaces interactive, allowing users to refine results and continue the conversation through the UI.

The workshop follows a collaborative, mob-style format. We’ll build together using AI coding agents, discuss the decisions along the way and inspect the code they produce. You can use your preferred coding agent, write the code yourself or pair with another attendee. AI accounts are optional for the core exercises.

## You’ll learn to

- Explain the roles of the model, host, MCP server, tools and resources.
- Connect a typed MCP tool to an interactive React interface.
- Use structured results to choose and populate list and comparison views.
- Connect UI interactions back to tools and the conversation.
- Handle loading, errors, empty results and hosts without interactive UI.
- Use AI coding agents to implement changes and evaluate observable results.

## Who this is for

Developers comfortable with React and basic TypeScript. No prior MCP or AI application experience is required.

Bring a laptop, an editor and a modern browser. Complete [setup](setup.md) before attending. You’ll leave with the source code, checkpoint solutions and a working pattern for bringing React interfaces into conversations.

## The project

The Conference Agenda Assistant uses twelve fictional sessions stored locally. A `show_sessions` tool accepts a topic, time window and `view: "list" | "compare"`. React renders the selected presentation. A filter button calls the server again; an optional follow-up sends the visible choices to the host.

“Generative UI” here means intent-driven selection of trusted React views and data. The model does not write or execute arbitrary UI code at runtime.

See [React Alicante 2026](events/react-alicante-2026.md) for this edition’s date and timing.
