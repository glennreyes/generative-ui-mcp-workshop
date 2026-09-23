import { sessionInputSchema, type SessionResult } from "./schema";

export function showSessions(rawInput: unknown): SessionResult {
  const filters = sessionInputSchema.parse(rawInput);
  // TODO exercise 1: filter the supplied sessions and return the actual count.
  return {
    view: filters.view,
    filters,
    sessions: [],
    summary: "Exercise 1: implement the session filter.",
    source: "React Alicante 2026 schedule snapshot · 2026-09-23",
  };
}
