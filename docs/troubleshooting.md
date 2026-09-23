# Troubleshooting

| Symptom                                | Check and fix                                                                                                                           |
| -------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| Node engine mismatch                   | Select Node 24.21.0 using `.nvmrc`, `.node-version` or `mise.toml`; check `node --version`.                                             |
| `bun install --frozen-lockfile` fails  | Use Bun 1.4.2, run from the repository root, and keep the committed lockfile. Check connectivity before removing anything.              |
| Port already in use                    | Stop another workshop copy with Ctrl+C. `bun run doctor` checks 3001, 8080 and 8081.                                                    |
| Host cannot connect                    | Keep `bun run dev` running. Open `http://localhost:3001/health`, then reload the host.                                                  |
| Tool works, no UI                      | At checkpoints 00 and 01 this is expected. Otherwise inspect tool `_meta.ui.resourceUri`, resource MIME type and `bun run build`.       |
| Old UI after an edit                   | Wait for the UI watcher to finish, then reload the host. Existing iframe documents are snapshots; they do not hot-reload.               |
| Host edits not reflected               | `bun run --cwd apps/host build`, then reload. The host is supplied infrastructure and is not watched by default.                        |
| Empty result                           | Check topic and time filters. A session must fit entirely inside the selected time window.                                              |
| Invalid time                           | Use HH:mm, from 00:00 to 23:59, with end after start. Overnight windows are not supported.                                              |
| Unexpected result schema               | Inspect `structuredContent` in Tool Result and compare it with `sessionResultSchema`. Do not cast away the error.                       |
| UI call errors                         | Keep the server running. Check `requestSessions`, tool name and arguments. Rebuild after edits and retry.                               |
| Help me choose has no AI reply         | The local host records the message only. Use a compatible conversational host for an actual reply.                                      |
| Follow-up button missing               | The host has not advertised message support. The rest of the app still works.                                                           |
| `bun run test` fails in a starter      | Tests describe final behavior. Follow the relevant exercise or open a solution checkpoint.                                              |
| Browser blocks the sandbox             | Use exactly `http://localhost:8080`, with the sandbox on 8081. Do not serve both documents from one origin.                             |
| Commercial host cannot reach localhost | Use a supported local stdio connection or prepare an approved HTTPS connection before the session. This is instructor-only preparation. |

## Recovery without losing work

From the original repository, create a new sibling directory:

```sh
bun run checkpoint 02-react-ui ../agenda-recovery
cd ../agenda-recovery
bun install --frozen-lockfile
bun run dev
```

Stop the old server first. The command refuses an existing destination. Keep your previous folder and compare changes after the exercise.

## What to include when asking for help

OS, `node --version`, `bun --version`, checkpoint name, exact command and the first useful error. If a tool succeeds but rendering fails, include the browser console error and whether `bun run smoke` passes.

Ask in [Build with Glenn](https://discord.gg/8p3uGHNMu). Never include API keys, tokens or environment files.
