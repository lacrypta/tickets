import { Fab } from "@mui/material";
import UndoIcon from "@mui/icons-material/Undo";
import { MouseEventHandler } from "react";

interface IBackButtonProps {
  label?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const BackButton = ({ label, onClick }: IBackButtonProps) => {
  return (
    <Fab
      variant='extended'
      size='large'
      color='secondary'
      sx={{ position: "fixed", bottom: 16, left: 16 }}
      aria-label='back'
      onClick={onClick}
    >
      <UndoIcon sx={{ mr: 1 }} />
      {label ? label : "Volver"}
    </Fab>
  );
};

export default BackButton;
