import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import OutlinedInput from "@mui/material/OutlinedInput";

interface ForgotPasswordProps {
  open: boolean;
  handleClose: () => void;
}

export default function ForgotPassword({
  open,
  handleClose,
}: ForgotPasswordProps) {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        component: "form",
        onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          handleClose();
        },
        sx: { backgroundImage: "none" },
      }}
    >
      <DialogTitle>重設密碼</DialogTitle>
      <DialogContent
        sx={{ display: "flex", flexDirection: "column", gap: 2, width: "100%" }}
      >
        <DialogContentText>
          請輸入您的員工電子郵件地址，然後完成密碼重設程序。
        </DialogContentText>
        <OutlinedInput
          autoFocus
          required
          margin="dense"
          id="email"
          name="email"
          label="Email address"
          placeholder="員工電子郵件地址"
          type="email"
          fullWidth
        />
        <OutlinedInput
          autoFocus
          required
          margin="dense"
          id="birthday"
          name="birthday"
          defaultValue={"1970-01-01"}
          label="Birthday"
          placeholder="出生年月日"
          type="date"
          fullWidth
        />
        <OutlinedInput
          required
          margin="dense"
          id="new-password"
          name="new-password"
          label="New password"
          placeholder="新密碼"
          type="password"
          fullWidth
        />
        <OutlinedInput
          required
          margin="dense"
          id="confirm-password"
          name="confirm-password"
          label="Confirm password"
          placeholder="確認新密碼"
          type="password"
          fullWidth
        />
      </DialogContent>
      <DialogActions sx={{ pb: 3, px: 3 }}>
        <Button onClick={handleClose}>取消</Button>
        <Button variant="contained" type="submit">
          發送重設連結
        </Button>
      </DialogActions>
    </Dialog>
  );
}
