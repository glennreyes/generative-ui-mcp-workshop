import { z } from "zod";

export const topicSchema = z.enum([
  "all",
  "react",
  "typescript",
  "ai",
  "testing",
  "accessibility",
  "native",
  "tooling",
  "design",
  "other",
]);
export const daySchema = z.enum([
  "all",
  "2026-09-24",
  "2026-09-25",
  "2026-09-26",
]);
export const viewSchema = z.enum(["list", "compare"]);
const timeSchema = z
  .string()
  .regex(/^([01]\d|2[0-3]):[0-5]\d$/, "Use 24-hour HH:mm, such as 13:00.");
export const sessionInputSchema = z
  .object({
    day: daySchema
      .default("all")
      .describe(
        "Conference date in Europe/Madrid; all includes all three days.",
      ),
    topic: topicSchema
      .default("all")
      .describe("Topic to filter. Use all to explore everything."),
    startTime: timeSchema
      .default("09:00")
      .describe("Earliest session start, in Europe/Madrid time."),
    endTime: timeSchema
      .default("19:00")
      .describe(
        "Latest session end. Sessions must fit entirely in this window.",
      ),
    view: viewSchema
      .default("list")
      .describe("Use list to browse, compare to choose between sessions."),
  })
  .strict()
  .refine((input) => input.startTime < input.endTime, {
    message: "endTime must be later than startTime.",
    path: ["endTime"],
  });

export const sessionSchema = z.object({
  id: z.string(),
  title: z.string(),
  startTime: timeSchema,
  endTime: timeSchema,
  room: z.string().nullable(),
  date: daySchema.exclude(["all"]),
  speaker: z.string(),
  kind: z.enum(["workshop", "talk", "lightning"]),
  timing: z.enum(["session", "block"]),
  topic: topicSchema.exclude(["all"]),
  description: z.string(),
});
export const sessionResultSchema = z.object({
  view: viewSchema,
  filters: sessionInputSchema,
  sessions: z.array(sessionSchema),
  summary: z.string(),
  source: z.literal("React Alicante 2026 schedule snapshot · 2026-09-23"),
});
export type SessionInput = z.infer<typeof sessionInputSchema>;
export type Session = z.infer<typeof sessionSchema>;
export type SessionResult = z.infer<typeof sessionResultSchema>;
