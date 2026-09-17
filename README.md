# Building Generative UI with MCP in React

Build a React interface that lives inside a conversation. Use MCP tools to return typed data, let the model choose a presentation, and connect UI interactions back to the server.

**[React Alicante](https://reactalicante.es) · September 24, 2026 · 3.5-hour workshop with [Glenn Reyes](https://glennreyes.com)**

[Setup](docs/setup.md) · [Exercises](docs/exercises/README.md) · [Slides](slides/README.md) · [Discord](https://discord.gg/8p3uGHNMu) · [Workshop description](docs/workshop.md)

![The Conference Agenda Assistant showing a comparison of fictional React sessions](docs/images/compare.png)

## What you’ll build

A **Conference Agenda Assistant** with twelve fictional sessions, a `show_sessions` tool, list and comparison views, a filter that makes a real MCP call, and an optional conversational follow-up.

The model interprets intent and chooses validated tool arguments. React renders trusted components you designed. There is no runtime execution of model-generated JSX or HTML.

**The core exercises need no AI account, API key or external service.** The included local host calls real MCP tools and renders real MCP Apps. It does not contain a conversational model. Coding agents are optional; the instructor demonstrates the natural-language path separately.

## Quick start

Use **Node 24.21.0** and **npm 11.19.1**. Install dependencies before travelling.

```sh
git clone https://github.com/glennreyes/generative-ui-mcp-workshop.git
cd generative-ui-mcp-workshop
npm ci
npm run doctor
npm run check
npm run dev
```

Open **[localhost:8080](http://localhost:8080/?tool=show_sessions&call=true)**. Select **React**, set **From** to **13:00**, and click **Update sessions**. Expect three afternoon sessions. Switch to **Compare** to see the same records as a table.

The finished demo is the default. Start learning from a separate copy:

```sh
# Stop the demo first with Ctrl+C.
npm run checkpoint -- 00-start ../agenda-start
cd ../agenda-start
npm ci
npm run dev
```

Then follow [Exercise 1](docs/exercises/01-tool.md). The checkpoint command refuses an existing destination and preserves your original work. See [full setup](docs/setup.md) for expected results and recovery steps.

## Workshop path

| Exercise                                            |   Time | Outcome                                                 | Solution                                  |
| --------------------------------------------------- | -----: | ------------------------------------------------------- | ----------------------------------------- |
| [1. Typed tool](docs/exercises/01-tool.md)          | 30 min | Validated filters, structured results and text fallback | [`01-tool`](checkpoints/01-tool/)         |
| [2. React resource](docs/exercises/02-react-ui.md)  | 35 min | A React list rendered in the MCP sandbox                | [`02-react-ui`](checkpoints/02-react-ui/) |
| [3. Views](docs/exercises/03-views.md)              | 25 min | List or comparison selected by the view model           | [`03-views`](checkpoints/03-views/)       |
| [4. Interaction](docs/exercises/04-interaction.md)  | 30 min | Filter and view changes call the server                 | [`final`](checkpoints/final/)             |
| [5. Pair challenge](docs/exercises/05-challenge.md) | 20 min | Add a room filter or timeline                           | Your extension                            |

The [210-minute agenda](docs/events/react-alicante-2026.md) also includes the opening demo, architecture discussion, two breaks and Q&A. Every core exercise includes hints and an optional agent prompt.

## Stack

A small **npm workspaces** monorepo keeps the embedded app, server, test host and slides together.

| Part                 | Choice                                                                           |
| -------------------- | -------------------------------------------------------------------------------- |
| UI                   | React 19.3, TypeScript 6, Vite 8.3                                               |
| Components           | shadcn/ui, Tailwind CSS 4.3, Radix UI                                            |
| Design-system checks | `@shadcn/lint` with ESLint 10                                                    |
| MCP                  | Official TypeScript SDK 2.0 and MCP Apps 2.0                                     |
| Transport            | Streamable HTTP and stdio; current protocol negotiation with compatibility tests |
| Data                 | Zod 4 schemas and twelve local fictional sessions                                |
| Local host           | Adapted, pinned official MCP Apps basic-host                                     |
| Slides               | Editable Markdown, standalone HTML, PowerPoint and PDF                           |

Dependencies are pinned in the manifests and lockfile. This is the compatible snapshot tested for the workshop, not a moving `latest` install. See [architecture and sources](docs/architecture.md).

**Why Vite instead of Next.js?** An MCP App ships as a self-contained HTML resource inside another application. It does not need routing, server components or a Next.js server. Vite produces the required single-file bundle with fewer moving parts. A standalone Next.js product can consume the same MCP server later.

## Repository map

```text
apps/ui/          React MCP App and shadcn components
apps/server/      Tool registration, UI resource, HTTP and stdio
apps/host/        Official local test host adaptation
apps/slides/      Slide commands
packages/agenda/  Shared schemas, fixtures and filtering
checkpoints/      Complete snapshots of the four teaching files
docs/exercises/   Instructions, hints and acceptance criteria
slides/           Editable source and offline exports
tests/            Domain, HTTP compatibility and real AppBridge tests
```

## Commands

| Command                                      | Purpose                                                |
| -------------------------------------------- | ------------------------------------------------------ |
| `npm run dev`                                | Build assets, watch the UI/server and start the host   |
| `npm start`                                  | Run previously built assets without watchers           |
| `npm run check`                              | Lint, type-check, test and build                       |
| `npm run doctor`                             | Check Node, dependencies and free ports before startup |
| `npm run smoke`                              | Check the running HTTP MCP server and UI resource      |
| `npm run smoke -- --stdio`                   | Check the stdio path after building                    |
| `npm run checkpoint -- <stage> <new-folder>` | Create a fresh checkpoint copy                         |
| `npm run slides`                             | Serve the deck locally on port 3030                    |
| `npm run slides:build`                       | Rebuild standalone HTML from Markdown                  |
| `npm run format:check`                       | Check formatting                                       |

The host uses port **8080**, its separate sandbox **8081**, and the MCP server **3001**. After a UI rebuild, reload the host to load the new iframe document.

## Teaching and support

- [Workshop description and learning outcomes](docs/workshop.md)
- [React Alicante event details and agenda](docs/events/react-alicante-2026.md)
- [Architecture and trust boundaries](docs/architecture.md)
- [Troubleshooting](docs/troubleshooting.md)
- [Instructor runbook and rehearsal checklist](docs/instructor.md)
- [Slides and offline exports](slides/README.md)
- [Verification status](docs/verification.md)
- [Build with Glenn on Discord](https://discord.gg/8p3uGHNMu), `#react-alicante-2026`
- [Download the source](https://github.com/glennreyes/generative-ui-mcp-workshop/archive/refs/heads/main.zip) if Git is unavailable. Install npm dependencies before going offline.

The sample sessions are not the real conference schedule. For event logistics, use [reactalicante.es](https://reactalicante.es).

## License

Workshop code and original material: [MIT](LICENSE). The official host and generated components retain their [upstream attribution and terms](THIRD_PARTY_NOTICES.md).
