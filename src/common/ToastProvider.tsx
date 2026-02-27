"use client";

import { Alert, Snackbar } from "@mui/material";
import { useCallback, useEffect, useState, type ReactNode } from "react";
import type { Toast, AlertColor } from "../types/toast";
import { ToastContext } from "../providers/ToastContext";
import { setGlobalNotify } from "../utils/globalToast";

export const ToastProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const notify = useCallback(
    (
      message: string,
      severity: AlertColor = "error",
      duration: number = 6000,
    ) => {
      setToasts((prev) => [
        ...prev,
        { id: Date.now() + Math.random(), message, severity, duration },
      ]);
    },
    [],
  );

  useEffect(() => {
    setGlobalNotify(notify);
  }, [notify]);

  const handleClose = (id: number) => {
    setToasts((prev) => prev.filter((notify) => notify.id != id));
  };

  return (
    <ToastContext.Provider value={{ notify }}>
      {children}
      {toasts.map((notify) => (
        <Snackbar
          key={notify.id}
          open
          autoHideDuration={notify.duration}
          onClose={() => handleClose(notify.id)}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        >
          <Alert
            onClose={() => handleClose(notify.id)}
            severity={notify.severity}
          >
            {notify.message}
          </Alert>
        </Snackbar>
      ))}
    </ToastContext.Provider>
  );
};
