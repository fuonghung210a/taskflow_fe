const ENABLE_LOG =
  import.meta.env.VITE_DEBUG_LOG &&
  import.meta.env.VITE_DEBUG_LOG.toUpperCase() === "ON";

export const logger = {
  log: (...args: unknown[]) => {
    if (ENABLE_LOG) {
      console.log(...args);
    }
  },
  warn: (...args: unknown[]) => {
    console.warn(...args);
  },
  error: (...args: unknown[]) => {
    console.error(...args);
  },
};
