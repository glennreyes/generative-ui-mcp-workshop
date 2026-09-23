import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  ArrowRight,
  Braces,
  Monitor,
  Server,
  Sparkles,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { showSessions } from "@workshop/agenda";
import type { ReactNode } from "react";

function Reveal({
  at,
  step,
  children,
}: {
  at: number;
  step: number;
  children: ReactNode;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      aria-hidden={step < at}
      animate={{
        opacity: step >= at ? 1 : 0,
        y: step >= at ? 0 : reduced ? 0 : 12,
      }}
      transition={{ duration: reduced ? 0 : 0.28 }}
    >
      {children}
    </motion.div>
  );
}
function Code({
  lines,
  step,
  stages = 3,
}: {
  lines: string[];
  step: number;
  stages?: number;
}) {
  return (
    <pre className="code-panel">
      <code>
        {lines.map((line, i) => (
          <motion.span
            key={i}
            className="code-line"
            animate={{
              opacity:
                i < Math.ceil(((step + 1) / stages) * lines.length) ? 1 : 0.28,
            }}
          >
            <span className="line-number" aria-hidden="true">
              {i + 1}
            </span>
            {line}
          </motion.span>
        ))}
      </code>
    </pre>
  );
}
function Exercise({
  number,
  time,
  from,
  to,
  children,
}: {
  number: number;
  time: string;
  from: string;
  to: string;
  children: ReactNode;
}) {
  return (
    <>
      <div className="exercise-meta">
        <span>EXERCISE {number.toString().padStart(2, "0")}</span>
        <span>{time} MINUTES</span>
      </div>
      {children}
      <div className="checkpoint">
        <code>{from}</code>
        <ArrowRight aria-hidden="true" />
        <code>{to}</code>
      </div>
    </>
  );
}
function AgendaExample({ print = false }: { print?: boolean }) {
  const [view, setView] = useState<"list" | "compare">("list");
  const reduced = useReducedMotion();
  const result = showSessions({
    day: "2026-09-25",
    topic: "react",
    startTime: "11:30",
    endTime: "13:00",
    view,
  });
  const selected = print ? "compare" : view;
  return (
    <div className="agenda-example">
      <div className="example-top">
        <span>FRI 25 / 11:30–13:00</span>
        <div className="flex gap-2">
          <Button
            variant={selected === "list" ? "default" : "outline"}
            aria-pressed={selected === "list"}
            onClick={() => setView("list")}
          >
            List
          </Button>
          <Button
            variant={selected === "compare" ? "default" : "outline"}
            aria-pressed={selected === "compare"}
            onClick={() => setView("compare")}
          >
            Compare
          </Button>
        </div>
      </div>
      <div className={`session-grid ${selected}`}>
        {result.sessions.map((session) => (
          <motion.article
            layout={!reduced}
            key={session.id}
            transition={{ duration: 0.35 }}
            className="session-card"
          >
            <span className="session-time">{session.startTime}</span>
            <h3>{session.title}</h3>
            <p>{session.description}</p>
            <span className="session-level">
              {session.date} · {session.speaker}
            </span>
          </motion.article>
        ))}
      </div>
      <p className="example-disclosure">
        React Alicante 2026 schedule snapshot · Local React illustration, no MCP
        call
      </p>
    </div>
  );
}
const flow = [
  {
    icon: Sparkles,
    title: "Model",
    detail: "Chooses show_sessions and validated arguments",
  },
  {
    icon: Monitor,
    title: "Host",
    detail: "Calls the MCP server on the model’s behalf",
  },
  {
    icon: Server,
    title: "Server",
    detail: "Returns structuredContent and a UI resource reference",
  },
  {
    icon: Braces,
    title: "React",
    detail: "Renders the authored UI inside the host sandbox",
  },
];
export function SlideContent({
  slide,
  step,
  print = false,
}: {
  slide: number;
  step: number;
  print?: boolean;
}) {
  switch (slide) {
    case 0:
      return (
        <div className="cover">
          <p className="eyebrow">REACT ALICANTE · 24 SEPTEMBER 2026</p>
          <h1>
            Building
            <br />
            <em>Generative UI</em>
            <br />
            with MCP in React
          </h1>
          <div className="cover-bottom">
            <span>Glenn Reyes</span>
            <span>Tools → data → interfaces</span>
          </div>
          <div className="cover-orbit" aria-hidden="true">
            <Braces />
            <span>ui://</span>
          </div>
        </div>
      );
    case 1:
      return (
        <>
          <p className="eyebrow">THE FINISHED APP</p>
          <h1>
            A conversation.
            <br />
            <em>An interface.</em>
          </h1>
          <AgendaExample print={print} />
          <p className="slide-caption">
            One tool. The real conference schedule. Two useful views.
          </p>
        </>
      );
    case 2:
      return (
        <>
          <p className="eyebrow">HOW WE’LL WORK</p>
          <h1>
            Build together.
            <br />
            <em>Understand every boundary.</em>
          </h1>
          <div className="numbered-lines">
            {[
              "Predict the result.",
              "Build a small change. Read the diff.",
              "Run it. Explain what happened.",
            ].map((text, i) => (
              <Reveal key={text} at={i} step={step}>
                <p>
                  <span>0{i + 1}</span>
                  {text}
                </p>
              </Reveal>
            ))}
          </div>
          <p className="slide-caption">
            Manual coding, pairing and coding agents all work.
          </p>
        </>
      );
    case 3:
      return (
        <>
          <p className="eyebrow">INTENT → PRESENTATION</p>
          <h1>
            The model chooses
            <br />
            <em>an allowed view.</em>
          </h1>
          <div className="intent">
            <blockquote>“Show me Friday’s React sessions.”</blockquote>
            <code>day: "2026-09-25" · topic: "react" · view: "list"</code>
          </div>
          <Reveal at={1} step={step}>
            <div className="intent">
              <blockquote>“Compare them so I can choose.”</blockquote>
              <code>same filters · view: "compare"</code>
            </div>
          </Reveal>
          <p className="slide-caption">
            React renders trusted components. Never execute model-generated UI
            code.
          </p>
        </>
      );
    case 4:
      return (
        <>
          <p className="eyebrow">THE MCP APP FLOW</p>
          <h1>
            Follow <em>one request.</em>
          </h1>
          <div className="flow">
            {flow.map((node, i) => (
              <Reveal key={node.title} at={i} step={step}>
                <div className={`flow-node ${step === i ? "current" : ""}`}>
                  <node.icon aria-hidden="true" />
                  <h2>{node.title}</h2>
                  <p>{node.detail}</p>
                </div>
                {i < 3 && (
                  <span className="flow-arrow" aria-hidden="true">
                    →
                  </span>
                )}
              </Reveal>
            ))}
          </div>
          <Reveal at={4} step={step}>
            <div className="return-path">
              <ArrowRight aria-hidden="true" />
              <p>
                A click in React calls <code>app.callServerTool</code> through
                the host.
                <br />
                The result returns to the caller.
              </p>
            </div>
          </Reveal>
        </>
      );
    case 5:
      return (
        <>
          <p className="eyebrow">THE TOOL CONTRACT</p>
          <h1>
            Intent becomes <em>typed data.</em>
          </h1>
          <Code
            step={step}
            stages={4}
            lines={[
              "show_sessions({",
              '  topic: "react",',
              '  day: "2026-09-25", startTime: "11:30", endTime: "13:00",',
              '  view: "compare",',
              "});",
            ]}
          />
          <p className="slide-caption">
            Zod validates the input and the structured result.
          </p>
        </>
      );
    case 6:
      return (
        <Exercise number={1} time="30" from="00-start" to="01-tool">
          <h1>
            The <em>session tool.</em>
          </h1>
          <div className="numbered-lines">
            {[
              "Filter by day, topic and the complete time window.",
              "Return typed data and useful fallback text.",
              "Try an empty result and an invalid input.",
            ].map((text, i) => (
              <Reveal key={text} at={i} step={step}>
                <p>
                  <Check aria-hidden="true" />
                  {text}
                </p>
              </Reveal>
            ))}
          </div>
        </Exercise>
      );
    case 7:
      return (
        <Exercise number={2} time="35" from="01-tool" to="02-react-ui">
          <h1>
            The <em>React resource.</em>
          </h1>
          <Code
            step={step}
            lines={[
              "_meta: {",
              '  ui: { resourceUri: "ui://agenda/sessions.html" }',
              "}",
            ]}
          />
          <Reveal at={2} step={step}>
            <p className="large-caption">
              useApp → ontoolresult → validated React state
            </p>
          </Reveal>
        </Exercise>
      );
    case 8:
      return (
        <Exercise number={3} time="25" from="02-react-ui" to="03-views">
          <h1>
            Same records.
            <br />
            <em>Your components.</em>
          </h1>
          <AgendaExample print={print} />
        </Exercise>
      );
    case 9:
      return (
        <Exercise number={4} time="30" from="03-views" to="final">
          <h1>
            A click becomes <em>a tool call.</em>
          </h1>
          <Code
            step={step}
            lines={[
              "const result = await app.callServerTool({",
              '  name: "show_sessions", arguments: filters,',
              "});",
              "return sessionResultSchema.parse(",
              "  result.structuredContent,",
              ");",
            ]}
          />
        </Exercise>
      );
    case 10:
      return (
        <>
          <p className="eyebrow">CONTEXT & CONVERSATION</p>
          <h1>
            Bring the choice
            <br />
            <em>back to the conversation.</em>
          </h1>
          <div className="two-up">
            <div>
              <code>updateModelContext</code>
              <p>Share the current selection.</p>
            </div>
            <Reveal at={1} step={step}>
              <div>
                <code>sendMessage</code>
                <p>Ask the host to continue.</p>
              </div>
            </Reveal>
          </div>
          <p className="slide-caption">
            The local host records messages. A conversational host can respond.
          </p>
        </>
      );
    case 11:
      return (
        <>
          <p className="eyebrow">THE INTERACTION CONTRACT</p>
          <h1>
            Handle <em>the whole request.</em>
          </h1>
          <div className="numbered-lines">
            {[
              "Loading: keep useful results. Disable duplicate requests.",
              "Empty: explain how to widen the search.",
              "Errors: validate both sides. Make recovery possible.",
              "No UI support: return useful text.",
            ].map((text, i) => (
              <Reveal key={text} at={i} step={step}>
                <p>
                  <span>0{i + 1}</span>
                  {text}
                </p>
              </Reveal>
            ))}
          </div>
        </>
      );
    case 12:
      return (
        <>
          <p className="eyebrow">PAIR CHALLENGE · 20 MINUTES</p>
          <h1>
            Extend <em>the contract.</em>
          </h1>
          <div className="two-up">
            <div>
              <span className="big-number">A</span>
              <h2>A room filter</h2>
              <p>Schema → server → UI</p>
            </div>
            <Reveal at={1} step={step}>
              <div>
                <span className="big-number">B</span>
                <h2>A timeline view</h2>
                <p>Another trusted presentation</p>
              </div>
            </Reveal>
          </div>
          <p className="slide-caption">
            Preserve existing filters. Add one useful test. Show the actual
            result.
          </p>
        </>
      );
    default:
      return (
        <>
          <p className="eyebrow">KEEP BUILDING</p>
          <h1>
            Tools. Data.
            <br />
            <em>Your React interface.</em>
          </h1>
          <div className="closing-links">
            <a href="https://github.com/glennreyes/generative-ui-mcp-workshop">
              Get the code <ArrowRight aria-hidden="true" />
              <small>github.com/glennreyes/generative-ui-mcp-workshop</small>
            </a>
            <a href="https://discord.gg/8p3uGHNMu">
              Build with Glenn <ArrowRight aria-hidden="true" />
              <small>discord.gg/8p3uGHNMu</small>
            </a>
          </div>
          <p className="slide-caption">
            Questions, experiments and unfinished ideas welcome.
          </p>
        </>
      );
  }
}
