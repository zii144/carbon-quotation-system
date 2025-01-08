import { Button } from "@mui/material";

interface SidebarButtonProps {
  title: string;
  currentTitle: string;
  SetCurrentTitle: (title: string) => void;
}

export default function SidebarButton({
  title,
  currentTitle,
  SetCurrentTitle,
}: SidebarButtonProps) {
  const isActive = currentTitle === title;

  return (
    <Button
      fullWidth
      sx={{
        mt: 2,
        backgroundColor: isActive ? "primary" : "secondary",
        color: isActive ? "outlined" : "outlined",
      }}
      variant={isActive ? "contained" : "outlined"}
      onClick={() => SetCurrentTitle(title)}
    >
      {title}
    </Button>
  );
}
