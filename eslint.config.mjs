import js from "@eslint/js";
import tseslint from "typescript-eslint";
import hooks from "eslint-plugin-react-hooks";
import { plugin as shadcn } from "@shadcn/lint";
import globals from "globals";

export default tseslint.config(
  {
    ignores: [
      "**/dist/**",
      "**/node_modules/**",
      "apps/host/**",
      ".workshop/**",
      ".codex-finalizer/**",
      "checkpoints/**",
      "slides/exports/**",
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  { languageOptions: { globals: { ...globals.node, ...globals.browser } } },
  {
    files: ["apps/ui/src/**/*.{ts,tsx}"],
    plugins: { "react-hooks": hooks, shadcn },
    settings: {
      shadcn: {
        componentImports: ["^@/components/ui(/|$)"],
        note: "Use the component variants in apps/ui/src/components/ui.",
      },
    },
    rules: {
      ...hooks.configs.recommended.rules,
      "shadcn/no-restyle": ["error", { allow: ["layout"] }],
      "shadcn/no-raw-colors": "error",
      "shadcn/no-arbitrary-values": "error",
    },
  },
  {
    files: ["apps/ui/src/components/ui/**"],
    rules: { "shadcn/no-restyle": "off", "shadcn/no-arbitrary-values": "off" },
  },
);
