import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { App } from "./App";
import "./index.scss";

const root = document.getElementById("root") as HTMLDivElement;

createRoot(root).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
