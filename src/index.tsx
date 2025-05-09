import { createRoot } from "react-dom/client";
import { App } from "./components/app";
import { StrictMode } from "react";
import "./index.scss";

const root = document.getElementById("root") as HTMLDivElement;

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>
);
