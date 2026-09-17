# Workshop slides

Fourteen slides with speaker notes, exercise cues and screenshots of the real app.

- [Editable Markdown source](slides.md)
- [PowerPoint deck](exports/workshop.pptx), also importable into Keynote
- [Offline PDF](exports/workshop.pdf)
- [Standalone HTML](exports/index.html), download and open locally

## Present locally

From the repository root:

```sh
npm run slides
```

Open `http://localhost:3030`. Use Left/Right, Space, Home and End to navigate. Press **N** to show or hide speaker notes. Use the browser’s fullscreen command if desired.

The HTML bundles its screenshots and styles, so it works offline once generated. It does not connect to a model or run the MCP demo. Use the separate local test host for the live build.

## Edit

Edit `slides.md`, then run `npm run slides:build`. The HTML is generated from the Markdown source. The PowerPoint/PDF files are editable/offline snapshots of this edition; keep their content aligned when revising the deck.

The full teaching sequence is in [the instructor runbook](../docs/instructor.md). Keep large code samples in the editor and use the slides to explain responsibilities and exercise outcomes.
