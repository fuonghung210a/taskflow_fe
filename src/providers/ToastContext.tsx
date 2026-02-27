import { createContext, useContext } from "react";
import type { AlertColor } from "../types/toast";

interface ToastContextType {
  notify: (message: string, severity?: AlertColor, duration?: number) => void;
}

export const ToastContext = createContext<ToastContextType | undefined>(
  undefined,
);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within ToastProvider");
  }

  return context;
};
