export type AlertColor = "success" | "info" | "warning" | "error";

export interface Toast {
  id: number;
  message: string;
  severity?: AlertColor;
  duration?: number;
}
