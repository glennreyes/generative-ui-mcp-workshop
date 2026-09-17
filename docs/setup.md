# Before the workshop

## Bring

A laptop with permission to install developer tools, an editor, Git (or a downloaded source archive) and a current Chrome, Edge, Firefox or Safari browser. Be comfortable running a React project and reading basic TypeScript.

**No API keys, paid AI accounts, database or deployment are required.** If you already use an AI coding agent, configure it beforehand. Writing code yourself or pairing is equally welcome. Glenn demonstrates the conversational model path from his machine.

## Install

Use **Node.js 24.21.0** and **npm 11.19.1**. The repository pins Node in `.nvmrc`, `.node-version` and `mise.toml`; use whichever version manager you already have, or install Node from [nodejs.org](https://nodejs.org/).

```sh
node --version
npm --version
git clone https://github.com/glennreyes/generative-ui-mcp-workshop.git
cd generative-ui-mcp-workshop
npm ci
npm run doctor
npm run check
npm run dev
```

If your Node installation bundles a different npm 11 release, `npm install --global npm@11.19.1` selects the tested package manager. Run `doctor` before starting the app; occupied ports are expected while it is already running.

Open **[the local test host](http://localhost:8080/?tool=show_sessions&call=true)**. The page calls `show_sessions` and renders the agenda inside a sandbox.

1. Find the list of twelve fictional sessions.
2. Choose **React**, set **From** to **13:00**, and click **Update sessions**.
3. Expect three sessions: React patterns, A faster React screen, A small React design system.
4. Click **Compare**. Expect the same three records in a table.
5. Click **Help me choose**. The host’s **Messages** panel records the follow-up. It does not generate an AI reply.

In another terminal, run:

```sh
npm run smoke
```

This checks real HTTP tool calls and the bundled UI resource. It complements the browser steps above; it does not claim to click the button for you.

## Start the exercises

First verify the finished demo above. Stop it with Ctrl+C. Then make an independent starter:

```sh
npm run checkpoint -- 00-start ../agenda-start
cd ../agenda-start
npm ci
npm run dev
```

Continue with [Exercise 1](exercises/01-tool.md). The starter deliberately returns an empty result and has no linked UI yet. Its final-solution tests are acceptance targets, so they become green as you complete the exercises.

The checkpoint command refuses an existing destination and never replaces your current work. Run only one copy at a time because both use the same three ports.

## Offline and troubleshooting

Install dependencies before travelling. After installation, the app uses local fixtures and bundled assets without a network connection. You can copy a prepared source directory and npm cache to a backup machine, but native dependencies must match its OS and CPU. A source ZIP alone does not contain npm packages.

See [troubleshooting](troubleshooting.md). Ask in [Discord](https://discord.gg/8p3uGHNMu), `#react-alicante-2026`, with your OS, Node version, command and error. Never post credentials.
