import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { App } from "./App";
import { ThemeProvider } from "./theme/ThemeProvider";
import "./styles/index.scss";

const root = document.getElementById("root") as HTMLDivElement;

createRoot(root).render(
  <BrowserRouter>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </BrowserRouter>
);
