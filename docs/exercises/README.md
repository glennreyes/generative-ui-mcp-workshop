# Exercises

First run the [setup check](../setup.md) against the finished demo. Then create `00-start` in a new sibling directory. Each checkpoint contains complete source files; the copy command never overwrites an existing project.

| Exercise                                       | Timebox | Start         | Solution       |
| ---------------------------------------------- | ------- | ------------- | -------------- |
| [1. Typed session tool](01-tool.md)            | 30 min  | `00-start`    | `01-tool`      |
| [2. React UI resource](02-react-ui.md)         | 35 min  | `01-tool`     | `02-react-ui`  |
| [3. Comparison view](03-views.md)              | 25 min  | `02-react-ui` | `03-views`     |
| [4. UI-to-tool interaction](04-interaction.md) | 30 min  | `03-views`    | `final`        |
| [5. Pair challenge](05-challenge.md)           | 20 min  | `final`       | Your extension |

## How we work

Before coding, predict the arguments and result together. Build one bounded change, manually or with an agent. Read the diff. Run the checks and show the observable outcome. Explain which boundary the change crosses.

AI tools are optional. Work alone, pair up or follow the shared build. An agent saying “done” is not an acceptance criterion.

## Open a checkpoint

Stop the running copy, then run from the original repository:

```sh
bun run checkpoint 02-react-ui ../agenda-ui
cd ../agenda-ui
bun install --frozen-lockfile
bun run dev
```

The host is at `http://localhost:8080`. Call `show_sessions` with the arguments in the exercise. Reload after the UI watcher finishes rebuilding.

The final code remains in the original project. The [snapshot directories](../../checkpoints/) contain the four files that change across the course. You can read them without switching projects.

## Checks during exercises

`bun run lint`, `bun run typecheck` and `bun run build` should work at every checkpoint. `bun run test` describes finished behavior: earlier checkpoints intentionally fail tests for work you have not implemented. By the final checkpoint, `bun run check` should pass in full.

Use [troubleshooting](../troubleshooting.md) or [Discord](https://discord.gg/8p3uGHNMu) when stuck.
