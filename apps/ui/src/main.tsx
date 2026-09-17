import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AgendaApp } from "./app";
import "./styles.css";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AgendaApp />
  </StrictMode>,
);
