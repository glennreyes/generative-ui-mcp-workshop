import { readFile, access } from "node:fs/promises";
import { createServer } from "node:net";
const manifest = JSON.parse(
  await readFile(new URL("../package.json", import.meta.url), "utf8"),
);
const expected = (
  await readFile(new URL("../.node-version", import.meta.url), "utf8")
).trim();
let failures = 0;
function report(ok, message) {
  console.log(`${ok ? "PASS" : "FAIL"} ${message}`);
  if (!ok) failures++;
}
report(
  process.versions.node === expected,
  `Node ${process.versions.node}; workshop version ${expected}`,
);
try {
  await access(new URL("../node_modules/tsx", import.meta.url));
  report(true, "Dependencies installed");
} catch {
  report(false, "Run npm ci first");
}
for (const port of [3001, 8080, 8081]) {
  await new Promise((resolve) => {
    const server = createServer();
    server.once("error", () => {
      report(
        false,
        `Port ${port} is occupied. Stop the existing workshop process before starting another.`,
      );
      resolve();
    });
    server.listen(port, "127.0.0.1", () =>
      server.close(() => {
        report(true, `Port ${port} available`);
        resolve();
      }),
    );
  });
}
console.log(
  `Next: ${Object.hasOwn(manifest.scripts, "check") ? "npm run check, then npm run dev" : "read README.md"}`,
);
process.exitCode = failures ? 1 : 0;
