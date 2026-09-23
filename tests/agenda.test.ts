import assert from "node:assert/strict";
import { test } from "node:test";
import {
  sessions,
  showSessions,
  sessionInputSchema,
  sessionResultSchema,
} from "@workshop/agenda";

test("default agenda contains all 46 published workshops and talks", () => {
  const result = showSessions({});
  assert.equal(result.sessions.length, 46);
  assert.equal(new Set(sessions.map((s) => s.id)).size, 46);
  assert.equal(
    result.source,
    "React Alicante 2026 schedule snapshot · 2026-09-23",
  );
  assert.equal(sessionResultSchema.safeParse(result).success, true);
});
test("topic and time window require complete attendance", () => {
  const result = showSessions({
    day: "2026-09-25",
    topic: "react",
    startTime: "11:30",
    endTime: "12:30",
  });
  assert.deepEqual(
    result.sessions.map((s) => s.id),
    ["25-aurora-scharff", "25-mattia-manzati"],
  );
  assert.equal(
    showSessions({
      day: "2026-09-25",
      topic: "react",
      startTime: "11:31",
      endTime: "12:00",
    }).sessions.length,
    0,
  );
  assert.equal(
    showSessions({
      day: "2026-09-25",
      topic: "react",
      startTime: "11:30",
      endTime: "11:59",
    }).sessions.length,
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
  const result = showSessions({ startTime: "19:00", endTime: "20:00" });
  assert.equal(result.sessions.length, 0);
  assert.match(result.summary, /^0 sessions/);
});
test("rejects invalid topics, views, times, extra keys and reversed windows", () => {
  for (const input of [
    { topic: "banana" },
    { day: "2026-09-27" },
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

test("days stay separate and published lightning blocks are not invented slots", () => {
  for (const [day, count] of [
    ["2026-09-24", 10],
    ["2026-09-25", 18],
    ["2026-09-26", 18],
  ] as const) {
    const result = showSessions({ day });
    assert.equal(result.sessions.length, count);
    assert(result.sessions.every((s) => s.date === day));
  }
  assert.equal(sessions.filter((s) => s.kind === "lightning").length, 16);
  assert(
    sessions
      .filter((s) => s.kind === "lightning")
      .every(
        (s) =>
          s.timing === "block" &&
          s.startTime === "14:25" &&
          s.endTime === "16:10",
      ),
  );
  assert(
    sessions.filter((s) => s.kind !== "workshop").every((s) => s.room === null),
  );
  assert.equal(
    showSessions({ day: "2026-09-24", startTime: "14:15", endTime: "18:00" })
      .sessions.length,
    0,
  );
  assert.equal(
    showSessions({ day: "2026-09-24", startTime: "14:15", endTime: "18:15" })
      .sessions.length,
    5,
  );
});
