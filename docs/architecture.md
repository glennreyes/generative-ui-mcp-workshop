# How the application works

```text
User asks to compare React sessions
  → conversational model chooses show_sessions arguments
  → MCP host calls the server over Streamable HTTP (or stdio)
  → server validates input and returns structuredContent + text
  → host reads _meta.ui.resourceUri from the tool definition
  → host reads ui://agenda/sessions.html
  → sandbox loads the bundled React app
  → useApp receives ontoolresult
  → React selects SessionResults from result.view
  → filter calls app.callServerTool through the host
  → React validates and displays the returned result
```

The local test host replaces the first two steps with explicit tool selection and JSON input. It is a real MCP client and renderer, but contains no model. A coding agent that helps write this repository is separate from the conversational model that later uses the finished app.

## File map

| Responsibility                      | Source                                 |
| ----------------------------------- | -------------------------------------- |
| Input/output schemas                | `packages/agenda/src/schema.ts`        |
| 46 published workshops and talks    | `packages/agenda/src/sessions.ts`      |
| Filtering and view model            | `packages/agenda/src/show-sessions.ts` |
| Tool, text fallback and UI resource | `apps/server/src/server.ts`            |
| Streamable HTTP endpoint            | `apps/server/src/http.ts`              |
| HTTP / stdio entry point            | `apps/server/src/main.ts`              |
| Host lifecycle and error handling   | `apps/ui/src/app.tsx`                  |
| Trusted list/comparison components  | `apps/ui/src/session-results.tsx`      |
| UI-to-tool request                  | `apps/ui/src/use-session-actions.ts`   |
| Copied shadcn components            | `apps/ui/src/components/ui/`           |
| Official local host adaptation      | `apps/host/`                           |

## Data and metadata

`content` is meaningful text usable without an interactive renderer. `structuredContent` is the validated view model available to the host/model and UI. Tool `_meta.ui.resourceUri` declares the UI resource. Resource `_meta.ui.csp` describes network/resource needs. These metadata purposes are different; UI-only metadata is not a substitute for the tool’s data contract or for authorization.

The `ui://` URI identifies an MCP resource, not an HTTP webpage. `resources/read` returns one HTML document with all JavaScript and CSS inlined. Vite+ and `vite-plugin-singlefile` make that bundle; there is no Next.js runtime inside the iframe.

## Current MCP baseline

Pinned on September 15, 2026: MCP TypeScript SDK **2.0.0** and MCP Apps **2.0.0**. The server uses `createMcpHandler` and `toNodeHandler`; stdio uses `serveStdio`. Automatic negotiation in the local client supports the **2026-07-28** protocol revision and the SDK’s compatibility path for older clients. Integration tests cover both modern and legacy negotiation. There is no deprecated standalone SSE transport fallback.

MCP Apps is an extension; a host supporting core MCP is not automatically an MCP Apps renderer. Host-specific accounts, connection setup and policies differ. The core workshop does not depend on them.

## Trust boundaries

React renders text and known components. Neither tool results nor model output are executed as code. All tool inputs and structured results are validated with Zod. The sample tool is read-only and has no real-world side effects.

The official host uses an outer sandbox on a separate origin (`localhost:8081`) and an inner app frame. Requests from the app flow through the SDK bridge, rather than fetching the server directly. The single-file UI requires no external resources. Local servers bind to loopback and validate Host/Origin headers. This workshop host is a development aid, not a production host implementation to deploy.

## Sources

- [MCP TypeScript SDK v2](https://ts.sdk.modelcontextprotocol.io/v2/)
- [Protocol revision 2026-07-28](https://blog.modelcontextprotocol.io/posts/2026-07-28/)
- [MCP Apps overview](https://modelcontextprotocol.io/extensions/apps/overview)
- [MCP Apps v2 migration](https://apps.extensions.modelcontextprotocol.io/api/documents/migrate-to-v2.html)
- [Pinned official host](https://github.com/modelcontextprotocol/ext-apps/tree/6d9bdc7babf275b759225aa722cbf5510c4c6021/examples/basic-host)
- [shadcn lint](https://github.com/shadcn-ui/lint)

## Tooling and presentation

Bun 1.4.2 installs the exact dependency graph in `bun.lock` and runs workspace scripts. Vite+ 0.3.3 is project-local: `vp build` uses its pinned Vite/Rolldown toolchain. The Vite alias and Vitest override align plugin resolution with Vite+. The existing Node test runner, ESLint/shadcn checks and Prettier remain explicit scripts; `bun run check` is the full workshop check.

The React/Motion deck in `apps/slides` shares the agenda fixtures and shadcn Button. Its interactive example is local presentation state, clearly labeled as making no MCP call. The actual MCP demo stays in the separate host. The deck bundles scripts and styles into one offline HTML file.

- [Vite+ project-local setup](https://viteplus.dev/guide/local-cli)
- [Bun installs](https://bun.sh/docs/pm/cli/install)
- [Motion for React](https://motion.dev/docs/react)
