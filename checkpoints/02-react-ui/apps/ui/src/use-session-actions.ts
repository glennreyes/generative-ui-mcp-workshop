import type { App } from "@modelcontextprotocol/ext-apps";
import type { SessionInput, SessionResult } from "@workshop/agenda";

export async function requestSessions(
  app: App,
  input: SessionInput,
): Promise<SessionResult> {
  // TODO exercise 4: call show_sessions through the host, check errors and parse the result.
  void app;
  void input;
  throw new Error("Exercise 4: connect this action to the MCP server.");
}
