import { McpServer, type CallToolResult } from "@modelcontextprotocol/server";
import {
  sessionInputSchema,
  sessionResultSchema,
  showSessions,
} from "@workshop/agenda";

export const resourceUri = "ui://agenda/sessions.html";
export function createServer() {
  const server = new McpServer({
    name: "Conference Agenda Assistant",
    version: "1.0.0",
  });
  server.registerTool(
    "show_sessions",
    {
      title: "Explore conference sessions",
      description:
        "Browse the React Alicante 2026 schedule snapshot. Filter by day, editorial topic tag and time window. Choose list to explore or compare to help decide between sessions. Times are Europe/Madrid. Lightning times represent the whole block. No bookings.",
      inputSchema: sessionInputSchema,
      outputSchema: sessionResultSchema,
      annotations: {
        readOnlyHint: true,
        destructiveHint: false,
        idempotentHint: true,
        openWorldHint: false,
      },
    },
    async (input): Promise<CallToolResult> => {
      const result = showSessions(input);
      const lines = result.sessions.map(
        (s) =>
          `${s.date} ${s.startTime}-${s.endTime} | ${s.title} | ${s.speaker} | Room ${s.room ?? "not published"} | ${s.kind} | ${s.description}`,
      );
      return {
        structuredContent: result,
        content: [
          {
            type: "text",
            text: [
              result.source,
              result.summary,
              ...lines,
              ...(lines.length
                ? []
                : ["Try another topic or a wider time window."]),
            ].join("\n"),
          },
        ],
      };
    },
  );
  // TODO exercise 2: link and register the bundled React UI resource.
  return server;
}
