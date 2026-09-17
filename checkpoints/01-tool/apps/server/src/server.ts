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
        "Browse fictional conference sessions. Filter by topic and time window. Choose list to explore or compare to help decide between sessions. No bookings or real conference data.",
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
          `${s.startTime}-${s.endTime} | ${s.title} | Room ${s.room} | ${s.level} | ${s.description}`,
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
