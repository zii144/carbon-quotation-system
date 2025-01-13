import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import AddIcon from "@mui/icons-material/Add";
import { blue } from "@mui/material/colors";
import { useState } from "react";
import ArticleRoundedIcon from "@mui/icons-material/ArticleRounded";

// Use SQL to query the content based on the identifier, such as: inquiry_number in CostEntry table
const dialogueContent = [
  "content1",
  "content2",
  "content3",
  "content4",
  "content5",
  "content6",
  "content7",
  "content8",
  "content9",
  "content10",
];

export interface SimpleDialogProps {
  open: boolean;
  selectedValue: string;
  onClose: (value: string) => void;
  title: string;
}

function SimpleDialog(props: SimpleDialogProps) {
  const { onClose, selectedValue, open, title } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value: string) => {
    onClose(value);
  };

  return (
    <Dialog onClose={handleClose} open={open} fullWidth sx={{ p: 10 }}>
      <DialogTitle>查詢{title}</DialogTitle>
      <List sx={{ pt: 0 }}>
        {dialogueContent.map((dialogueContent) => (
          <ListItem disablePadding key={dialogueContent}>
            <ListItemButton
              onClick={() => handleListItemClick(dialogueContent)}
            >
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                  <ArticleRoundedIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={dialogueContent} />
            </ListItemButton>
          </ListItem>
        ))}
        <ListItem disablePadding>
          <ListItemButton
            autoFocus
            onClick={() => handleListItemClick("addAccount")}
          >
            <ListItemAvatar>
              <Avatar>
                <AddIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={`新增${title}`} />
          </ListItemButton>
        </ListItem>
      </List>
    </Dialog>
  );
}

export interface QueryButtonProps {
  diaglogTitle: string;
  onSelectedvalueChanged?: (value: string) => void;
}

export default function QueryButton(props: QueryButtonProps) {
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(dialogueContent[1]);
  const { diaglogTitle, onSelectedvalueChanged } = props;

  const handleClicked = () => {
    setOpen(true);
  };

  const handleClose = (value: string) => {
    setOpen(false);
    setSelectedValue(value);
    if (onSelectedvalueChanged) {
      onSelectedvalueChanged(value);
    }
  };

  return (
    <div>
      <Button
        fullWidth
        variant="outlined"
        onClick={handleClicked}
        sx={{ height: "56px" }}
      >
        查 詢
      </Button>
      <SimpleDialog
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
        title={diaglogTitle as string}
      />
    </div>
  );
}
