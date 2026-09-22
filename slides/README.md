# React workshop deck

Fourteen slides built with React, Motion, Tailwind and the workshop’s shadcn Button. Vite+ bundles the deck into a single offline HTML file.

## Present

From the repository root:

```sh
bun run slides
```

Open [localhost:3030](http://localhost:3030). The slide picker jumps directly to a topic.

| Control                   | Action                                    |
| ------------------------- | ----------------------------------------- |
| Right / Space / Page Down | Reveal the next step, then advance        |
| Left / Page Up            | Previous step or slide                    |
| Home / End                | First or last slide                       |
| N                         | Speaker notes and elapsed timer           |
| F                         | Fullscreen                                |
| Print icon                | Open all slides with every reveal visible |

Shortcuts leave focused buttons, links and form controls alone. Use the visible navigation buttons when a control has focus. Motion respects the system’s reduced-motion preference.

Open the synchronized presenter window from the notes panel and move it to your laptop screen. Served tabs on the same origin share navigation. Each window has its own elapsed timer, which starts on load and can be reset. Keep notes closed on the audience window. Directly opened offline files work independently without cross-window synchronization.

## What moves

- The MCP diagram reveals model, host, server, React and the UI-to-tool return path.
- Code examples progressively emphasize the contract.
- Exercise instructions reveal one step at a time.
- List/Compare buttons rearrange the same three fictional sessions with Motion layout animation.

The embedded example is a **local React illustration, not an MCP call**. Use the [real local host](http://localhost:8080/?tool=show_sessions&call=true) for the protocol demonstration.

## Edit and build

- [React slide content](../apps/slides/src/content.tsx)
- [Speaker notes and picker labels](../apps/slides/src/notes.json)
- [Presentation shell](../apps/slides/src/main.tsx)
- [Slide styling](../apps/slides/src/styles.css)
- [Reveal counts and URL navigation](../apps/slides/src/navigation.ts)

```sh
bun run slides:build
```

[Download the standalone HTML](exports/index.html) and open it locally. JavaScript, styles and icons are bundled; the deck needs no external assets.

## Print and fallback

Open the print view using the toolbar, then choose **Print / Save PDF**. Use landscape, no margins, and background graphics. Every slide renders its completed state; the interactive example prints as a comparison. Browser printing produces a static copy of the current React design.

The [PDF](exports/workshop.pdf) and [PowerPoint](exports/workshop.pptx) are retained static backups from the September 17 edition. They cover the same teaching sequence but do not include the new React styling or animations. [The original Markdown](slides.md) is an archive of that edition, not the current renderer’s source.

Follow the [instructor runbook](../docs/instructor.md) for the teaching sequence and rehearsal.
