import assert from "node:assert/strict";
import { test } from "node:test";
import {
  sessions,
  showSessions,
  sessionInputSchema,
  sessionResultSchema,
} from "@workshop/agenda";

test("default agenda contains all twelve fictional sessions", () => {
  const result = showSessions({});
  assert.equal(result.sessions.length, 12);
  assert.equal(new Set(sessions.map((s) => s.id)).size, 12);
  assert.equal(result.source, "Fictional workshop data");
  assert.equal(sessionResultSchema.safeParse(result).success, true);
});
test("topic and time window require complete attendance", () => {
  const result = showSessions({
    topic: "react",
    startTime: "13:00",
    endTime: "15:00",
  });
  assert.deepEqual(
    result.sessions.map((s) => s.id),
    ["react-patterns", "react-performance"],
  );
  assert.equal(
    showSessions({ topic: "react", startTime: "13:01", endTime: "13:45" })
      .sessions.length,
    0,
  );
  assert.equal(
    showSessions({ topic: "react", startTime: "13:00", endTime: "13:44" })
      .sessions.length,
    0,
  );
});
test("compare changes presentation, preserving the records", () => {
  assert.deepEqual(
    showSessions({ view: "compare" }).sessions,
    showSessions({ view: "list" }).sessions,
  );
  assert.equal(showSessions({ view: "compare" }).view, "compare");
});
test("an empty result is valid data with a useful summary", () => {
  const result = showSessions({ startTime: "17:00", endTime: "18:00" });
  assert.equal(result.sessions.length, 0);
  assert.match(result.summary, /^0 sessions/);
});
test("rejects invalid topics, views, times, extra keys and reversed windows", () => {
  for (const input of [
    { topic: "banana" },
    { view: "html" },
    { startTime: "25:00" },
    { endTime: "9:00" },
    { startTime: "14:00", endTime: "13:00" },
    { startTime: "13:00", endTime: "13:00" },
    { admin: true },
  ]) {
    assert.equal(
      sessionInputSchema.safeParse(input).success,
      false,
      JSON.stringify(input),
    );
  }
});
test("input and returned values cannot mutate the fixture", () => {
  const input = { topic: "react" as const };
  const result = showSessions(input);
  result.sessions[0]!.title = "changed";
  assert.notEqual(showSessions(input).sessions[0]!.title, "changed");
  assert.deepEqual(input, { topic: "react" });
});
