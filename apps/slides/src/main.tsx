import { StrictMode, useCallback, useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  AnimatePresence,
  MotionConfig,
  motion,
  useReducedMotion,
} from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  Maximize,
  NotebookPen,
  Printer,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SlideContent } from "./content";
import { clampPosition, move, parseHash, steps } from "./navigation";
import type { Position } from "./navigation";
import notes from "./notes.json";
import "./styles.css";

const mode = new URLSearchParams(location.search);
const printMode = mode.has("print");
const presenter = mode.has("presenter");

function Deck() {
  const [position, setPosition] = useState(() => parseHash(location.hash));
  const [showNotes, setShowNotes] = useState(presenter);
  const [notice, setNotice] = useState("");
  const [seconds, setSeconds] = useState(0);
  const channel = useRef<BroadcastChannel | null>(null);
  const reduced = useReducedMotion();
  const navigate = useCallback((next: Position) => {
    setPosition(next);
    history.replaceState(null, "", `#/${next.slide + 1}/${next.step}`);
    channel.current?.postMessage(next);
  }, []);
  useEffect(() => {
    const timer = setInterval(() => setSeconds((value) => value + 1), 1000);
    return () => clearInterval(timer);
  }, []);
  useEffect(() => {
    if (location.protocol === "file:" || !("BroadcastChannel" in window))
      return;
    const connection = new BroadcastChannel("react-alicante-slides");
    channel.current = connection;
    connection.onmessage = ({ data }: MessageEvent<Position>) => {
      if (
        !data ||
        typeof data.slide !== "number" ||
        typeof data.step !== "number"
      )
        return;
      const next = clampPosition(data.slide, data.step);
      setPosition(next);
      history.replaceState(null, "", `#/${next.slide + 1}/${next.step}`);
    };
    return () => {
      connection.close();
      channel.current = null;
    };
  }, []);
  useEffect(() => {
    const syncHash = () => setPosition(parseHash(location.hash));
    window.addEventListener("hashchange", syncHash);
    return () => window.removeEventListener("hashchange", syncHash);
  }, []);
  const fullscreen = useCallback(async () => {
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      else await document.documentElement.requestFullscreen();
    } catch {
      setNotice("Use your browser’s fullscreen command on this device.");
    }
  }, []);
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.ctrlKey || event.metaKey || event.altKey) return;
      const target = event.target as HTMLElement;
      if (
        target.closest("input, textarea, select, button, a, [contenteditable]")
      )
        return;
      if (["ArrowRight", "PageDown", " "].includes(event.key)) {
        event.preventDefault();
        navigate(move(position, 1));
      }
      if (["ArrowLeft", "PageUp"].includes(event.key)) {
        event.preventDefault();
        navigate(move(position, -1));
      }
      if (event.key === "Home") {
        event.preventDefault();
        navigate({ slide: 0, step: 0 });
      }
      if (event.key === "End") {
        event.preventDefault();
        navigate({ slide: steps.length - 1, step: 0 });
      }
      if (event.key.toLowerCase() === "n") setShowNotes((value) => !value);
      if (event.key.toLowerCase() === "f") void fullscreen();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [position, navigate, fullscreen]);
  if (printMode)
    return (
      <main className="print-deck">
        {notes.map((note, index) => (
          <section key={note.title} className="slide" aria-label={note.title}>
            <SlideContent slide={index} step={steps[index]} print />
            <footer className="slide-folio">
              GLENN REYES · REACT ALICANTE
              <span>{String(index + 1).padStart(2, "0")} / 14</span>
            </footer>
          </section>
        ))}
        <div className="print-instructions">
          <Button onClick={() => window.print()}>Print / Save PDF</Button>
          <p>Use landscape, no margins, and background graphics.</p>
        </div>
      </main>
    );
  return (
    <div className={`deck ${presenter ? "presenter" : ""}`}>
      <header className="deck-toolbar">
        <a href="https://reactalicante.es" className="brand">
          REACT ALICANTE <span>/ MCP APPS</span>
        </a>
        <div className="toolbar-actions">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Toggle speaker notes"
            aria-pressed={showNotes}
            onClick={() => setShowNotes((value) => !value)}
          >
            <NotebookPen />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Fullscreen"
            onClick={() => void fullscreen()}
          >
            <Maximize />
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <a
              href="?print=1"
              target="_blank"
              rel="noreferrer"
              aria-label="Open print view"
            >
              <Printer />
            </a>
          </Button>
        </div>
      </header>
      <main className="stage">
        <AnimatePresence mode="wait" initial={false}>
          <motion.section
            key={position.slide}
            className="slide"
            aria-label={notes[position.slide].title}
            initial={{ opacity: 0, y: reduced ? 0 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduced ? 0 : -12 }}
            transition={{ duration: reduced ? 0 : 0.2 }}
          >
            <SlideContent slide={position.slide} step={position.step} />
            <footer className="slide-folio">
              GLENN REYES · REACT ALICANTE
              <span>{String(position.slide + 1).padStart(2, "0")} / 14</span>
            </footer>
          </motion.section>
        </AnimatePresence>
      </main>
      <nav className="deck-controls" aria-label="Slide navigation">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            aria-label="Previous step"
            disabled={position.slide === 0 && position.step === 0}
            onClick={() => navigate(move(position, -1))}
          >
            <ArrowLeft />
          </Button>
          <Button
            size="icon"
            aria-label="Next step"
            disabled={
              position.slide === steps.length - 1 &&
              position.step === steps[position.slide]
            }
            onClick={() => navigate(move(position, 1))}
          >
            <ArrowRight />
          </Button>
          <span className="step-count" aria-live="polite">
            {position.slide + 1} / 14 · step {position.step + 1} /{" "}
            {steps[position.slide] + 1}
          </span>
        </div>
        <label className="slide-picker">
          <span className="sr-only">Jump to slide</span>
          <select
            aria-label="Jump to slide"
            value={position.slide}
            onChange={(event) =>
              navigate({ slide: Number(event.target.value), step: 0 })
            }
          >
            {notes.map((note, index) => (
              <option key={note.title} value={index}>
                {index + 1}. {note.title}
              </option>
            ))}
          </select>
        </label>
        <span className="key-hint">← → navigate · N notes · F fullscreen</span>
      </nav>
      {showNotes && (
        <aside className="speaker-notes" aria-label="Speaker notes">
          <div>
            <span className="eyebrow">SPEAKER NOTES</span>
            <span className="timer">
              {Math.floor(seconds / 60)
                .toString()
                .padStart(2, "0")}
              :{(seconds % 60).toString().padStart(2, "0")}
            </span>
            <Button variant="ghost" size="sm" onClick={() => setSeconds(0)}>
              Reset timer
            </Button>
          </div>
          <p>{notes[position.slide].notes}</p>
          <a
            href={`?presenter=1#/${position.slide + 1}/${position.step}`}
            target="_blank"
            rel="noreferrer"
          >
            Open synchronized presenter window
          </a>
          <small>
            Sync works between tabs on this origin while served locally. Offline
            file copies navigate independently.
          </small>
        </aside>
      )}
      {notice && (
        <p role="status" className="notice">
          {notice}
        </p>
      )}
    </div>
  );
}
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MotionConfig reducedMotion="user">
      <Deck />
    </MotionConfig>
  </StrictMode>,
);
