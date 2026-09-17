import { readFile, mkdir, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { Marp } from "@marp-team/marp-core";

const source = new URL("../../slides/slides.md", import.meta.url);
const output = new URL("../../slides/exports/index.html", import.meta.url);

export async function buildSlides() {
  let markdown = await readFile(source, "utf8");
  for (const match of markdown.matchAll(
    /!\[([^\]]*)\]\((\.\.\/docs\/images\/[^)]+)\)/g,
  )) {
    const data = await readFile(new URL(match[2], source));
    markdown = markdown.replace(
      match[0],
      `![${match[1]}](data:image/png;base64,${data.toString("base64")})`,
    );
  }
  const { html, css, comments } = new Marp({ html: true }).render(markdown);
  const notes = JSON.stringify(
    comments.map((slide) => slide.join("\n")),
  ).replaceAll("<", "\\u003c");
  const document = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Building Generative UI with MCP in React</title><style>${css}
body{margin:0;background:#13171b;color:#f3f4f6;font-family:Arial,sans-serif}
.marpit>svg{display:none;width:100vw;height:100vh}.marpit>svg.active{display:block}
#notes{position:fixed;inset:auto 24px 24px;padding:20px;background:#fff;color:#13171b;white-space:pre-wrap;font-size:18px;line-height:1.5;border-radius:8px;max-height:35vh;overflow:auto}
#help{position:fixed;bottom:8px;right:14px;font:12px Arial;color:#a9b5bf;pointer-events:none}
@media print{.marpit>svg{display:block!important;width:100%;height:auto;break-after:page}#notes,#help{display:none!important}}
</style></head><body>${html}<aside id="notes" hidden aria-label="Speaker notes"></aside><div id="help">← → Navigate · N Notes</div>
<script>
const slides=[...document.querySelectorAll('.marpit>svg')];
const notes=${notes};
let current=Math.max(0,Math.min(slides.length-1,Number(location.hash.slice(1)||1)-1));
function show(index){current=Math.max(0,Math.min(slides.length-1,index));slides.forEach((slide,i)=>slide.classList.toggle('active',i===current));document.getElementById('notes').textContent=notes[current]||'';history.replaceState(null,'','#'+(current+1));}
document.addEventListener('keydown',event=>{if(['ArrowRight',' ','PageDown'].includes(event.key)){event.preventDefault();show(current+1);}if(['ArrowLeft','PageUp'].includes(event.key)){event.preventDefault();show(current-1);}if(event.key==='Home')show(0);if(event.key==='End')show(slides.length-1);if(event.key.toLowerCase()==='n'){const panel=document.getElementById('notes');panel.hidden=!panel.hidden;}});
show(current);
</script></body></html>`;
  await mkdir(new URL(".", output), { recursive: true });
  await writeFile(output, document);
  return document;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  await buildSlides();
  console.log(
    "Built slides/exports/index.html with embedded images and speaker notes.",
  );
}
