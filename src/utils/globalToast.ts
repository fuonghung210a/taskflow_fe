import type { AlertColor } from "../types/toast";

let notifyFunction:
  | ((message: string, severity?: AlertColor, duration?: number) => void)
  | null = null;

export const setGlobalNotify = (
  notify: (message: string, severity?: AlertColor, duration?: number) => void,
) => {
  notifyFunction = notify;
};

export const globalNotify = (
  message: string,
  severity: AlertColor = "error",
  duration: number = 6000,
) => {
  if (notifyFunction) {
    notifyFunction(message, severity, duration);
  }
};
