import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { logger } from "./utils/logger.ts";

logger.log("Main.tsx loaded");

const rootElement = document.getElementById("root");
logger.log("Root element:", rootElement);

if (rootElement) {
  try {
    createRoot(rootElement).render(
      <StrictMode>
        <App />
      </StrictMode>,
    );
    logger.log("Root element rendered successfully");
  } catch (error) {
    logger.error("Failed to render root element", error);
  }
} else {
  logger.error("Root element not found");
}
