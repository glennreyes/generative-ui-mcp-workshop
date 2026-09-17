import { createMcpExpressApp } from "@modelcontextprotocol/express";
import { createMcpHandler } from "@modelcontextprotocol/server";
import { toNodeHandler } from "@modelcontextprotocol/node";
import cors from "cors";
import { createServer } from "./server";

export function createHttpApp() {
  const app = createMcpExpressApp({ host: "127.0.0.1" });
  // Only the local test host needs browser access. UI calls travel through its bridge.
  app.use(
    cors({
      origin: "http://localhost:8080",
      exposedHeaders: ["Mcp-Session-Id", "MCP-Protocol-Version"],
      allowedHeaders: [
        "Content-Type",
        "Accept",
        "Mcp-Session-Id",
        "MCP-Protocol-Version",
        "Last-Event-ID",
      ],
    }),
  );
  const handler = createMcpHandler(createServer, { onerror: console.error });
  const handle = toNodeHandler(handler, { onerror: console.error });
  app.all("/mcp", (req, res) => handle(req, res, req.body));
  app.get("/health", (_req, res) =>
    res.json({ status: "ok", name: "Conference Agenda Assistant" }),
  );
  return { app, handler };
}
