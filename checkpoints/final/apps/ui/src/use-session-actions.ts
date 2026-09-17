import type { App } from "@modelcontextprotocol/ext-apps";
import {
  sessionResultSchema,
  type SessionInput,
  type SessionResult,
} from "@workshop/agenda";

// Exercise 4: the host forwards this request to the MCP server.
// A UI-initiated call returns its result directly. Update React with that value.
export async function requestSessions(
  app: App,
  input: SessionInput,
): Promise<SessionResult> {
  const result = await app.callServerTool(
    { name: "show_sessions", arguments: input },
    { signal: AbortSignal.timeout(10000) },
  );
  if (result.isError)
    throw new Error(
      result.content
        .filter((c) => c.type === "text")
        .map((c) => c.text)
        .join("\n") || "The tool could not load sessions.",
    );
  return sessionResultSchema.parse(result.structuredContent);
}
