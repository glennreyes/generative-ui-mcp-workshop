import assert from "node:assert/strict";
import { test } from "node:test";
import { request } from "node:http";
import { once } from "node:events";
import {
  Client,
  StreamableHTTPClientTransport,
} from "@modelcontextprotocol/client";
import { createHttpApp } from "../apps/server/src/http";
import { resourceUri } from "../apps/server/src/server";
import { sessionResultSchema } from "@workshop/agenda";

for (const mode of ["auto", "legacy"] as const) {
  test(`real HTTP tool calls support ${mode} negotiation`, async () => {
    const { app, handler } = createHttpApp();
    const http = app.listen(0, "127.0.0.1");
    await once(http, "listening");
    const address = http.address();
    assert(address && typeof address === "object");
    const url = new URL(`http://127.0.0.1:${address.port}/mcp`);
    const client = new Client(
      { name: "workshop-tests", version: "1.0.0" },
      { versionNegotiation: { mode } },
    );
    try {
      await client.connect(new StreamableHTTPClientTransport(url));
      assert.equal(
        client.getProtocolEra(),
        mode === "auto" ? "modern" : "legacy",
      );
      const { tools } = await client.listTools();
      const tool = tools.find((t) => t.name === "show_sessions");
      assert(tool);
      assert.equal(tool.annotations?.readOnlyHint, true);
      assert.equal(
        (tool._meta?.ui as { resourceUri: string }).resourceUri,
        resourceUri,
      );
      assert(tool.outputSchema);
      const result = await client.callTool({
        name: "show_sessions",
        arguments: { topic: "react", startTime: "13:00", view: "compare" },
      });
      assert.equal(result.isError, undefined);
      const parsed = sessionResultSchema.parse(result.structuredContent);
      assert.equal(parsed.sessions.length, 3);
      assert.equal(parsed.view, "compare");
      const fallback = result.content
        .filter((c) => c.type === "text")
        .map((c) => c.text)
        .join("\n");
      assert.match(fallback, /Fictional workshop data/);
      assert.match(fallback, /Room A/);
      assert.match(fallback, /React patterns/);
      const empty = await client.callTool({
        name: "show_sessions",
        arguments: { startTime: "17:00" },
      });
      assert.match(JSON.stringify(empty.content), /wider time window/);
      const invalid = await client.callTool({
        name: "show_sessions",
        arguments: { topic: "banana" },
      });
      assert.equal(invalid.isError, true);
      const origin = await fetch(url, {
        method: "POST",
        headers: {
          Origin: "https://example.com",
          "Content-Type": "application/json",
        },
        body: "{}",
      });
      assert.equal(origin.status, 403);
      const wrongHostStatus = await new Promise<number | undefined>(
        (resolve, reject) => {
          const req = request(
            url,
            { headers: { Host: "example.com" } },
            (res) => {
              res.resume();
              res.on("end", () => resolve(res.statusCode));
            },
          );
          req.on("error", reject);
          req.end();
        },
      );
      assert.equal(wrongHostStatus, 403);
    } finally {
      await client.close();
      await handler.close();
      http.closeAllConnections();
      await new Promise<void>((resolve, reject) =>
        http.close((error) => (error ? reject(error) : resolve())),
      );
    }
  });
}
