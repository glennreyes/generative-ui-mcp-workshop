import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type FormEvent,
} from "react";
import { useApp } from "@modelcontextprotocol/ext-apps/react";
import {
  applyDocumentTheme,
  applyHostStyleVariables,
  type McpUiHostContext,
} from "@modelcontextprotocol/ext-apps";
import type { CallToolResult } from "@modelcontextprotocol/client";
import {
  sessionInputSchema,
  sessionResultSchema,
  topicSchema,
  daySchema,
  type SessionInput,
  type SessionResult,
} from "@workshop/agenda";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  CalendarDays,
  List,
  Table2,
  LoaderCircle,
  MessageSquare,
} from "lucide-react";
import { SessionResults } from "./session-results";
import { requestSessions } from "./use-session-actions";

function applyContext(context?: McpUiHostContext) {
  if (context?.theme) {
    applyDocumentTheme(context.theme);
    document.documentElement.classList.toggle("dark", context.theme === "dark");
  }
  if (context?.styles?.variables)
    applyHostStyleVariables(context.styles.variables);
}

export function AgendaApp() {
  const [result, setResult] = useState<SessionResult | null>(null);
  const [filters, setFilters] = useState<SessionInput>(() =>
    sessionInputSchema.parse({}),
  );
  const [pending, setPending] = useState(false);
  const [failure, setFailure] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const requestVersion = useRef(0);
  const acceptResult = useCallback((payload: CallToolResult) => {
    requestVersion.current += 1;
    setPending(false);
    if (payload.isError) {
      setFailure(
        "The tool could not load sessions. Check the tool arguments and try again.",
      );
      return;
    }
    const parsed = sessionResultSchema.safeParse(payload.structuredContent);
    if (!parsed.success) {
      setFailure(
        "The tool returned an unexpected result. Check the result schema.",
      );
      return;
    }
    setResult(parsed.data);
    setFilters(parsed.data.filters);
    setFailure(null);
    setNotice(null);
  }, []);
  const { app, error } = useApp({
    appInfo: { name: "Conference Agenda", version: "1.0.0" },
    capabilities: {},
    onAppCreated: (instance) => {
      instance.ontoolresult = acceptResult;
      instance.ontoolcancelled = () => {
        requestVersion.current += 1;
        setPending(false);
        setFailure("The host cancelled this tool call. You can try again.");
      };
      instance.onerror = (err) => {
        setPending(false);
        setFailure(err.message);
      };
      instance.onhostcontextchanged = (context) => applyContext(context);
    },
  });
  useEffect(() => {
    if (app) applyContext(app.getHostContext());
  }, [app]);

  async function refresh(next: SessionInput) {
    if (!app || pending) return;
    const parsed = sessionInputSchema.safeParse(next);
    if (!parsed.success) {
      setFailure(parsed.error.issues[0]?.message ?? "Check your filters.");
      return;
    }
    const version = ++requestVersion.current;
    setPending(true);
    setFailure(null);
    setNotice(null);
    try {
      const data = await requestSessions(app, parsed.data);
      if (version !== requestVersion.current) return;
      setResult(data);
      setFilters(data.filters);
      // Context is advisory. A host without this capability can still render the UI.
      if (app.getHostCapabilities()?.updateModelContext) {
        await app.updateModelContext({
          structuredContent: {
            filters: data.filters,
            sessionIds: data.sessions.map((s) => s.id),
          },
        });
      }
    } catch (err) {
      if (version === requestVersion.current)
        setFailure(
          err instanceof Error ? err.message : "Could not refresh sessions.",
        );
    } finally {
      if (version === requestVersion.current) setPending(false);
    }
  }
  function submit(event: FormEvent) {
    event.preventDefault();
    void refresh(filters);
  }
  async function askForHelp() {
    if (!app || !result || !result.sessions.length) return;
    setNotice(null);
    setFailure(null);
    try {
      const response = await app.sendMessage(
        {
          role: "user",
          content: [
            {
              type: "text",
              text: `Help me choose between these React Alicante sessions: ${result.sessions.map((s) => `${s.id}: ${s.title}`).join("; ")}. My filters are ${JSON.stringify(result.filters)}. Explain the tradeoffs.`,
            },
          ],
        },
        { signal: AbortSignal.timeout(10000) },
      );
      if (response.isError) throw new Error("This host declined the message.");
      setNotice(
        "Follow-up sent to the host. The local test host records it in Messages; a conversational host may respond.",
      );
    } catch (err) {
      setFailure(
        err instanceof Error
          ? err.message
          : "This host could not accept a follow-up.",
      );
    }
  }
  const connected = !!app && !error;
  return (
    <main className="mx-auto max-w-5xl p-5 sm:p-8">
      <header className="mb-7 flex items-start justify-between gap-4">
        <div>
          <div className="mb-3 flex items-center gap-2 text-sm text-muted-foreground">
            <CalendarDays className="size-4" aria-hidden="true" /> Your
            conference, your pace
          </div>
          <h1 className="text-3xl font-semibold tracking-tight">
            Find your next session
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Explore ideas. Compare options. Make room for something new.
          </p>
        </div>
        <Badge variant="outline">React Alicante 2026</Badge>
      </header>
      <form
        onSubmit={submit}
        className="mb-6 flex flex-wrap items-end gap-3 rounded-xl bg-muted p-4"
        aria-label="Session filters"
      >
        <div className="grid gap-2">
          <Label htmlFor="day">Day</Label>
          <select
            id="day"
            value={filters.day}
            onChange={(e) =>
              setFilters({ ...filters, day: daySchema.parse(e.target.value) })
            }
            disabled={!connected || pending}
            className="h-9 rounded-md border border-input bg-background px-3 text-sm"
          >
            <option value="all">All days</option>
            <option value="2026-09-24">Thu 24 · Workshops</option>
            <option value="2026-09-25">Fri 25 · Conference day 1</option>
            <option value="2026-09-26">Sat 26 · Conference day 2</option>
          </select>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="topic">Topic (editorial)</Label>
          <select
            id="topic"
            value={filters.topic}
            onChange={(e) =>
              setFilters({
                ...filters,
                topic: topicSchema.parse(e.target.value),
              })
            }
            disabled={!connected || pending}
            className="h-9 rounded-md border border-input bg-background px-3 text-sm"
          >
            {topicSchema.options.map((topic) => (
              <option key={topic} value={topic}>
                {topic === "all"
                  ? "All topics"
                  : topic === "ai"
                    ? "AI"
                    : topic[0].toUpperCase() + topic.slice(1)}
              </option>
            ))}
          </select>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="start">From</Label>
          <Input
            id="start"
            type="time"
            value={filters.startTime}
            onChange={(e) =>
              setFilters({ ...filters, startTime: e.target.value })
            }
            disabled={!connected || pending}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="end">Until</Label>
          <Input
            id="end"
            type="time"
            value={filters.endTime}
            onChange={(e) =>
              setFilters({ ...filters, endTime: e.target.value })
            }
            disabled={!connected || pending}
          />
        </div>
        <Button type="submit" disabled={!connected || pending}>
          {pending ? (
            <LoaderCircle className="animate-spin" aria-hidden="true" />
          ) : null}
          Update sessions
        </Button>
      </form>
      {(error || failure) && (
        <div
          role="alert"
          className="mb-5 rounded-lg border border-destructive p-4 text-sm text-destructive"
        >
          {error?.message ?? failure}
        </div>
      )}
      {notice && (
        <p role="status" className="mb-4 text-sm text-muted-foreground">
          {notice}
        </p>
      )}
      <section aria-label="Session results" aria-busy={pending}>
        <div className="mb-2 flex flex-wrap items-center justify-between gap-3">
          <p role="status" className="text-sm text-muted-foreground">
            {pending
              ? "Updating sessions…"
              : (result?.summary ??
                (connected
                  ? "Waiting for the host to call show_sessions…"
                  : "Connecting to the MCP Apps host…"))}
          </p>
          <div className="flex gap-1" aria-label="Presentation">
            <Button
              type="button"
              size="sm"
              variant={result?.view === "list" ? "secondary" : "ghost"}
              aria-pressed={result?.view === "list"}
              disabled={!result || pending}
              onClick={() => void refresh({ ...filters, view: "list" })}
            >
              <List aria-hidden="true" />
              List
            </Button>
            <Button
              type="button"
              size="sm"
              variant={result?.view === "compare" ? "secondary" : "ghost"}
              aria-pressed={result?.view === "compare"}
              disabled={!result || pending}
              onClick={() => void refresh({ ...filters, view: "compare" })}
            >
              <Table2 aria-hidden="true" />
              Compare
            </Button>
          </div>
        </div>
        {result && <SessionResults result={result} />}
      </section>
      <footer className="mt-7 flex flex-wrap items-center justify-between gap-4 border-t pt-5">
        <p className="text-xs text-muted-foreground">
          Schedule snapshot: September 23, 2026 · Europe/Madrid. Topic tags are
          editorial. Lightning times cover the whole block.{" "}
          <a
            href="https://reactalicante.es/#schedule"
            target="_blank"
            rel="noreferrer"
            className="underline"
          >
            Check the official schedule for changes.
          </a>
        </p>
        {app?.getHostCapabilities()?.message && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => void askForHelp()}
            disabled={!result?.sessions.length || pending}
          >
            <MessageSquare aria-hidden="true" />
            Help me choose
          </Button>
        )}
      </footer>
    </main>
  );
}
