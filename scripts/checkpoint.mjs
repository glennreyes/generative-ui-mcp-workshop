import { access, cp, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
const root = fileURLToPath(new URL("..", import.meta.url));
const stages = ["00-start", "01-tool", "02-react-ui", "03-views", "final"];
const [stage, destination] = process.argv.slice(2);
if (!stages.includes(stage) || !destination) {
  console.error(
    "Usage: npm run checkpoint -- <00-start|01-tool|02-react-ui|03-views|final> ../agenda-start",
  );
  process.exit(1);
}
const target = path.resolve(destination);
const relative = path.relative(root, target);
if (!relative.startsWith(`..${path.sep}`))
  throw new Error("Choose a new sibling directory outside this repository.");
try {
  await access(target);
  throw new Error(
    `Destination already exists: ${target}. Your files have not been changed.`,
  );
} catch (error) {
  if (error.code !== "ENOENT") throw error;
}
const blocked = new Set([
  ".git",
  "node_modules",
  "dist",
  ".workshop",
  ".codex-finalizer",
  ".DS_Store",
]);
await cp(root, target, {
  recursive: true,
  errorOnExist: true,
  force: false,
  filter: (source) =>
    !path
      .relative(root, source)
      .split(path.sep)
      .some((part) => blocked.has(part) || part.startsWith(".env")),
});
// Every stage stores complete versions of the four teaching files.
await cp(path.join(root, "checkpoints", stage), target, { recursive: true });
await writeFile(
  path.join(target, "CHECKPOINT.md"),
  `# ${stage}\n\nCreated from the workshop snapshot. Your original project is unchanged.\n\nRun npm ci, then npm run dev. Follow docs/exercises/README.md.\n\nThe final-solution tests in npm test are acceptance targets and may fail until the matching exercise is complete.\n`,
);
console.log(
  `Created ${stage} in ${target}\nNext: cd ${target} && npm ci && npm run dev`,
);
