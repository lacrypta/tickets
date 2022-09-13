import { Fab } from "@mui/material";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import { MouseEventHandler } from "react";

interface IPayButtonProps {
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const PayButton = ({ onClick }: IPayButtonProps) => {
  return (
    <Fab
      variant='extended'
      size='large'
      color='primary'
      sx={{ position: "fixed", bottom: 16, right: 16 }}
      aria-label='add'
      onClick={onClick}
    >
      <ShoppingCartCheckoutIcon sx={{ mr: 1 }} />
      Pagar
    </Fab>
  );
};

export default PayButton;
