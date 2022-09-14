import { Fab } from "@mui/material";
import UndoIcon from "@mui/icons-material/Undo";
import { MouseEventHandler } from "react";

interface IBackButtonProps {
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const BackButton = ({ onClick }: IBackButtonProps) => {
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
      Volver
    </Fab>
  );
};

export default BackButton;
