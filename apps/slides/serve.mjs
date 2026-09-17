import { createServer } from "node:http";
import { buildSlides } from "./build.mjs";

const server = createServer(async (request, response) => {
  if (request.url !== "/") {
    response.writeHead(404).end("Not found");
    return;
  }
  try {
    const html = await buildSlides();
    response
      .writeHead(200, {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "no-store",
      })
      .end(html);
  } catch (error) {
    console.error(error);
    response.writeHead(500).end("Could not build slides. Check the terminal.");
  }
});
server.listen(3030, "127.0.0.1", () =>
  console.log(
    "Slides: http://localhost:3030 · reload after editing slides/slides.md",
  ),
);
server.on("error", (error) => {
  console.error(error.message);
  process.exitCode = 1;
});
