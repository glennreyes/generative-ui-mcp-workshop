import type { SessionResult } from "@workshop/agenda";
import { Badge } from "@/components/ui/badge";

export function SessionResults({ result }: { result: SessionResult }) {
  if (!result.sessions.length)
    return (
      <div className="rounded-xl border border-dashed p-8 text-center">
        <h2 className="font-semibold">No sessions in this window</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Try another topic or widen your time window.
        </p>
      </div>
    );
  // TODO exercise 3: render a comparison table when result.view is compare.
  return (
    <ul className="divide-y" aria-label="Conference sessions">
      {result.sessions.map((session) => (
        <li key={session.id} className="flex gap-5 py-5">
          <div className="w-14 shrink-0">
            <p className="font-semibold tabular-nums">{session.startTime}</p>
            <p className="text-xs text-muted-foreground">{session.endTime}</p>
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs text-muted-foreground">
              {session.date} · {session.kind}
            </p>
            <h2 className="font-semibold">{session.title}</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {session.description}
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <Badge variant="secondary">{session.topic}</Badge>
              <span className="text-xs text-muted-foreground">
                Room {session.room ?? "Not published"} · {session.speaker}
              </span>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
