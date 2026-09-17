import { z } from "zod";

export const topicSchema = z.enum([
  "all",
  "react",
  "typescript",
  "ai",
  "testing",
  "accessibility",
]);
export const viewSchema = z.enum(["list", "compare"]);
const timeSchema = z
  .string()
  .regex(/^([01]\d|2[0-3]):[0-5]\d$/, "Use 24-hour HH:mm, such as 13:00.");
export const sessionInputSchema = z
  .object({
    topic: topicSchema
      .default("all")
      .describe("Topic to filter. Use all to explore everything."),
    startTime: timeSchema
      .default("09:00")
      .describe("Earliest session start, in local sample agenda time."),
    endTime: timeSchema
      .default("18:00")
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
  room: z.string(),
  level: z.enum(["beginner", "intermediate", "advanced"]),
  topic: topicSchema.exclude(["all"]),
  description: z.string(),
});
export const sessionResultSchema = z.object({
  view: viewSchema,
  filters: sessionInputSchema,
  sessions: z.array(sessionSchema),
  summary: z.string(),
  source: z.literal("Fictional workshop data"),
});
export type SessionInput = z.infer<typeof sessionInputSchema>;
export type Session = z.infer<typeof sessionSchema>;
export type SessionResult = z.infer<typeof sessionResultSchema>;
