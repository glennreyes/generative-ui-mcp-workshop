import assert from "node:assert/strict";
import { test } from "node:test";
import {
  clampPosition,
  move,
  parseHash,
  steps,
} from "../apps/slides/src/navigation";
import notes from "../apps/slides/src/notes.json";

test("deck URLs clamp malformed positions and stay aligned with speaker notes", () => {
  assert.equal(steps.length, notes.length);
  assert.deepEqual(parseHash("#/5/4"), { slide: 4, step: 4 });
  assert.deepEqual(parseHash("#/NaN/Infinity"), { slide: 0, step: 0 });
  assert.deepEqual(parseHash("#/999/99"), { slide: 13, step: 0 });
  assert.deepEqual(clampPosition(-4, -1), { slide: 0, step: 0 });
});
test("deck navigation reveals every step and reverses across slide boundaries", () => {
  let position = { slide: 0, step: 0 };
  const visited = [position];
  for (
    let i = 0;
    i < steps.reduce((total, count) => total + count + 1, 0) - 1;
    i++
  ) {
    position = move(position, 1);
    visited.push(position);
  }
  assert.equal(
    new Set(visited.map((value) => JSON.stringify(value))).size,
    visited.length,
  );
  assert.deepEqual(position, { slide: 13, step: 0 });
  assert.deepEqual(move(position, 1), position);
  for (let i = visited.length - 2; i >= 0; i--) {
    position = move(position, -1);
    assert.deepEqual(position, visited[i]);
  }
  assert.deepEqual(move(position, -1), position);
});
