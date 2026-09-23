import assert from "node:assert/strict";
import { test } from "node:test";
import { Client, InMemoryTransport } from "@modelcontextprotocol/client";
import { App } from "@modelcontextprotocol/ext-apps";
import { AppBridge } from "@modelcontextprotocol/ext-apps/app-bridge";
import { createServer } from "../apps/server/src/server";
import { requestSessions } from "../apps/ui/src/use-session-actions";
import { sessionInputSchema } from "@workshop/agenda";

test("UI request crosses the SDK AppBridge and returns real server results", async () => {
  const server = createServer();
  const client = new Client({ name: "bridge-test", version: "1" });
  const [clientTransport, serverTransport] =
    InMemoryTransport.createLinkedPair();
  await server.connect(serverTransport);
  await client.connect(clientTransport);
  const bridge = new AppBridge(
    client,
    { name: "test-host", version: "1" },
    {
      serverTools: {},
      serverResources: {},
      message: { text: {} },
      updateModelContext: { text: {} },
    },
  );
  const app = new App(
    { name: "test-app", version: "1" },
    {},
    { autoResize: false },
  );
  const [appTransport, bridgeTransport] = InMemoryTransport.createLinkedPair();
  const messages: unknown[] = [];
  const contexts: unknown[] = [];
  bridge.onmessage = async (message) => {
    messages.push(message);
    return {};
  };
  bridge.onupdatemodelcontext = async (context) => {
    contexts.push(context);
    return {};
  };
  try {
    await bridge.connect(bridgeTransport);
    await app.connect(appTransport);
    const list = await requestSessions(
      app,
      sessionInputSchema.parse({
        day: "2026-09-25",
        topic: "react",
        startTime: "11:30",
        endTime: "13:00",
      }),
    );
    assert.deepEqual(
      list.sessions.map((s) => s.id),
      ["25-aurora-scharff", "25-mattia-manzati", "25-sara-vieira"],
    );
    const comparison = await requestSessions(app, {
      ...list.filters,
      view: "compare",
    });
    assert.equal(comparison.view, "compare");
    assert.deepEqual(comparison.sessions, list.sessions);
    const empty = await requestSessions(app, {
      ...list.filters,
      startTime: "19:00",
      endTime: "20:00",
    });
    assert.equal(empty.sessions.length, 0);
    await app.updateModelContext({
      structuredContent: { sessionIds: list.sessions.map((s) => s.id) },
    });
    await app.sendMessage({
      role: "user",
      content: [
        {
          type: "text",
          text: "Help me choose between 25-aurora-scharff and 25-mattia-manzati.",
        },
      ],
    });
    assert.equal(contexts.length, 1);
    assert.equal(messages.length, 1);
    await assert.rejects(
      requestSessions(app, { ...list.filters, startTime: "19:00" }),
      /endTime|later|invalid/i,
    );
  } finally {
    await app.close();
    await bridge.close();
    await client.close();
    await server.close();
  }
});
