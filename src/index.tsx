import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { App } from "app/App";
import { ThemeProvider } from "app/providers/ThemeProvider";

const root = document.getElementById("root") as HTMLDivElement;

createRoot(root).render(
  <BrowserRouter>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </BrowserRouter>
);
