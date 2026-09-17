import { sessions } from "./sessions";
import {
  sessionInputSchema,
  sessionResultSchema,
  type SessionResult,
} from "./schema";

export function showSessions(rawInput: unknown): SessionResult {
  const filters = sessionInputSchema.parse(rawInput);
  const matches = sessions.filter(
    (session) =>
      (filters.topic === "all" || session.topic === filters.topic) &&
      session.startTime >= filters.startTime &&
      session.endTime <= filters.endTime,
  );
  return sessionResultSchema.parse({
    view: filters.view,
    filters,
    sessions: matches,
    summary: `${matches.length} session${matches.length === 1 ? "" : "s"} between ${filters.startTime} and ${filters.endTime}.`,
    source: "Fictional workshop data",
  });
}
