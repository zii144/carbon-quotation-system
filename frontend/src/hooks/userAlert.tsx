import { useState, useEffect } from "react";

type AlertSeverity = "success" | "info" | "warning" | "error";

interface AlertState {
  open: boolean;
  message: string;
  severity: AlertSeverity;
}

const useAlert = () => {
  const [alert, setAlert] = useState<AlertState>({
    open: false,
    message: "",
    severity: "success",
  });

  let timeoutId: NodeJS.Timeout;

  const showAlert = (
    message: string,
    severity: AlertSeverity,
    duration = 2000
  ) => {
    setAlert({ open: true, message, severity });
    timeoutId = setTimeout(() => {
      setAlert((prev) => ({ ...prev, open: false }));
    }, duration);
  };

  // Clear timeout on unmount
  useEffect(() => {
    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  return { alert, showAlert };
};

export default useAlert;
