import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useCallback, useMemo } from "react";

interface SidebarButtonProps {
  title: string;
  currentTitle: string;
  SetCurrentTitle: (title: string) => void;
  onLogout?: () => void;
}

export default function SidebarButton({
  title,
  currentTitle,
  SetCurrentTitle,
  onLogout,
}: SidebarButtonProps) {
  const isActive = currentTitle === title;
  const navigate = useNavigate();

  const handleClick = useCallback(() => {
    if (title === "登出" && onLogout) {
      onLogout();
      navigate("/");
    } else {
      SetCurrentTitle(title);
    }
  }, [title, onLogout, SetCurrentTitle, navigate]);

  const buttonStyle = useMemo(
    () => ({
      mt: 2,
      backgroundColor: isActive ? "primary" : "secondary",
      color: isActive ? "white" : "black",
    }),
    [isActive]
  );

  return (
    <Button
      fullWidth
      sx={{
        buttonStyle,
      }}
      variant={isActive ? "contained" : "outlined"}
      onClick={handleClick}
    >
      {title}
    </Button>
  );
}
