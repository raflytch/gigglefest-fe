import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "@tanstack/react-router";
import { router } from "./router";
import { ReduxProvider } from "./providers/ReduxProvider";
import { QueryProvider } from "./providers/QueryProvider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ReduxProvider>
      <QueryProvider>
        <RouterProvider router={router} />
      </QueryProvider>
    </ReduxProvider>
  </StrictMode>
);
