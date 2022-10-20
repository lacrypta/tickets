import { Fab } from "@mui/material";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import { MouseEventHandler } from "react";

interface IPayButtonProps {
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const PayButton = ({ disabled, onClick }: IPayButtonProps) => {
  return (
    <Fab
      variant='extended'
      size='large'
      color='primary'
      sx={{ position: "fixed", bottom: 16, right: 16 }}
      aria-label='add'
      disabled={disabled}
      onClick={onClick}
    >
      <ShoppingCartCheckoutIcon sx={{ mr: 1 }} />
      Pagar
    </Fab>
  );
};

export default PayButton;
