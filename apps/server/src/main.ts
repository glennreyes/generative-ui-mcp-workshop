import { serveStdio } from "@modelcontextprotocol/server/stdio";
import { createServer } from "./server";
import { createHttpApp } from "./http";

if (process.argv.includes("--stdio")) {
  serveStdio(createServer, { onerror: console.error });
} else {
  const { app, handler } = createHttpApp();
  const http = app.listen(3001, "127.0.0.1", () =>
    console.log("MCP server: http://localhost:3001/mcp"),
  );
  http.on("error", (error) => {
    console.error(error);
    process.exitCode = 1;
  });
  const shutdown = () => {
    void handler.close();
    http.close();
  };
  process.once("SIGINT", shutdown);
  process.once("SIGTERM", shutdown);
}
