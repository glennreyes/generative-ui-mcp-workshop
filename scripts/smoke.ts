import assert from "node:assert/strict";
import {
  Client,
  StreamableHTTPClientTransport,
} from "@modelcontextprotocol/client";
import { StdioClientTransport } from "@modelcontextprotocol/client/stdio";
import { resourceUri } from "../apps/server/src/server";
import { sessionResultSchema } from "@workshop/agenda";

const stdio = process.argv.includes("--stdio");
const client = new Client(
  { name: "workshop-setup-check", version: "1.0.0" },
  { versionNegotiation: { mode: "auto" } },
);
try {
  await client.connect(
    stdio
      ? new StdioClientTransport({
          command: process.execPath,
          args: ["--import", "tsx", "apps/server/src/main.ts", "--stdio"],
          cwd: process.cwd(),
        })
      : new StreamableHTTPClientTransport(new URL("http://localhost:3001/mcp")),
  );
  const { tools } = await client.listTools();
  assert(tools.some((t) => t.name === "show_sessions"));
  const result = await client.callTool({
    name: "show_sessions",
    arguments: { topic: "react", startTime: "13:00", view: "compare" },
  });
  const data = sessionResultSchema.parse(result.structuredContent);
  assert.equal(data.sessions.length, 3);
  assert.equal(data.view, "compare");
  const resource = await client.readResource({ uri: resourceUri });
  const html = resource.contents[0];
  assert(html && "text" in html);
  assert.equal(html.mimeType, "text/html;profile=mcp-app");
  assert.match(html.text, /Find your next session/);
  assert(!/<script[^>]+src=/.test(html.text), "UI JavaScript must be inlined");
  console.log(
    `PASS: ${stdio ? "stdio" : "HTTP"} MCP (${client.getProtocolEra()}), filtered tool result, linked single-file React resource.`,
  );
  console.log(
    "Browser check: open http://localhost:8080/?tool=show_sessions&call=true, select React, click Update sessions, then Compare.",
  );
} finally {
  await client.close();
}
