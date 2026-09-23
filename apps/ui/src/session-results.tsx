import type { SessionResult } from "@workshop/agenda";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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
  if (result.view === "compare")
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Session</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>Room</TableHead>
            <TableHead>Speaker</TableHead>
            <TableHead>Schedule notes</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {result.sessions.map((session) => (
            <TableRow key={session.id}>
              <TableCell>
                <span className="font-medium">{session.title}</span>
                <span className="mt-1 block text-xs text-muted-foreground">
                  {session.topic}
                </span>
              </TableCell>
              <TableCell>
                {session.date}
                <br />
                {session.startTime}–{session.endTime}
                {session.timing === "block" ? " (block)" : ""}
              </TableCell>
              <TableCell>{session.room ?? "Not published"}</TableCell>
              <TableCell>{session.speaker}</TableCell>
              <TableCell>{session.description}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
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
