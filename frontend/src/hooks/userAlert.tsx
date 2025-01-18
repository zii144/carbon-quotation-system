import { useState, useEffect, useRef, useCallback } from "react";

type AlertSeverity = "success" | "info" | "warning" | "error";

interface AlertState {
  open: boolean;
  message: string;
  severity: AlertSeverity;
}

interface UseAlertOptions {
  defaultDuration?: number; // Default duration for alerts
  defaultSeverity?: AlertSeverity; // Default severity for alerts
}

const useAlert = ({
  defaultDuration = 2000,
  defaultSeverity = "success",
}: UseAlertOptions = {}) => {
  const [alert, setAlert] = useState<AlertState>({
    open: false,
    message: "",
    severity: defaultSeverity,
  });

  const timeoutIdRef = useRef<NodeJS.Timeout | null>(null);

  const showAlert = useCallback(
    (
      message: string,
      severity: AlertSeverity = defaultSeverity,
      duration: number = defaultDuration,
      onClose?: () => void
    ) => {
      // Clear any existing timeout
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
      }

      // Show the alert
      setAlert({ open: true, message, severity });

      // Set timeout to auto-close the alert
      timeoutIdRef.current = setTimeout(() => {
        setAlert((prev) => ({ ...prev, open: false }));
        if (onClose) {
          onClose(); // Perform any action after the alert closes
        }
      }, duration);
    },
    [defaultDuration, defaultSeverity]
  );

  // Clear timeout on unmount to prevent memory leaks
  useEffect(() => {
    return () => {
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
      }
    };
  }, []);

  return { alert, showAlert };
};

export default useAlert;
