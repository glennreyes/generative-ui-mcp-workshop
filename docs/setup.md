# Before the workshop

## Bring

A laptop with permission to install developer tools, an editor, Git (or a downloaded source archive) and a current Chrome, Edge, Firefox or Safari browser. Be comfortable running a React project and reading basic TypeScript.

**No API keys, paid AI accounts, database or deployment are required.** If you already use an AI coding agent, configure it beforehand. Writing code yourself or pairing is equally welcome. Glenn demonstrates the conversational model path from his machine.

## Install

Use **Node.js 24.21.0** and **Bun 1.4.2**. The repository pins Node in `.nvmrc`, `.node-version` and `mise.toml`; use whichever version manager you already have, or install Node from [nodejs.org](https://nodejs.org/).

```sh
node --version
bun --version
git clone https://github.com/glennreyes/generative-ui-mcp-workshop.git
cd generative-ui-mcp-workshop
bun install --frozen-lockfile
bun run doctor
bun run check
bun run dev
```

Install Bun from [bun.sh](https://bun.sh/docs/installation), or use `mise install` with the included `mise.toml` to select both tested versions. Bun installs dependencies and runs scripts; Node runs the MCP server and Vite+ CLI. No global Vite+ installation is required. Run `doctor` before starting the app; occupied ports are expected while it is already running.

Open **[the local test host](http://localhost:8080/?tool=show_sessions&call=true)**. The page calls `show_sessions` and renders the agenda inside a sandbox.

1. Find the list of twelve fictional sessions.
2. Choose **React**, set **From** to **13:00**, and click **Update sessions**.
3. Expect three sessions: React patterns, A faster React screen, A small React design system.
4. Click **Compare**. Expect the same three records in a table.
5. Click **Help me choose**. The host’s **Messages** panel records the follow-up. It does not generate an AI reply.

In another terminal, run:

```sh
bun run smoke
```

This checks real HTTP tool calls and the bundled UI resource. It complements the browser steps above; it does not claim to click the button for you.

## Start the exercises

First verify the finished demo above. Stop it with Ctrl+C. Then make an independent starter:

```sh
bun run checkpoint 00-start ../agenda-start
cd ../agenda-start
bun install --frozen-lockfile
bun run dev
```

Continue with [Exercise 1](exercises/01-tool.md). The starter deliberately returns an empty result and has no linked UI yet. Its final-solution tests are acceptance targets, so they become green as you complete the exercises.

The checkpoint command refuses an existing destination and never replaces your current work. Run only one copy at a time because both use the same three ports.

## Offline and troubleshooting

Install dependencies before travelling. After installation, the app uses local fixtures and bundled assets without a network connection. You can copy a prepared source directory and Bun cache to a backup machine, but native dependencies must match its OS and CPU. A source ZIP alone does not contain installed packages.

See [troubleshooting](troubleshooting.md). Ask in [Discord](https://discord.gg/8p3uGHNMu), `#react-alicante-2026`, with your OS, Node version, command and error. Never post credentials.
