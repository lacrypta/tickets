import { Fab } from "@mui/material";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import { MouseEventHandler, useContext } from "react";
import { CartContext } from "../../providers/Cart";

interface IPayButtonProps {
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const PayButton = ({ onClick }: IPayButtonProps) => {
  const { cart } = useContext(CartContext);

  return (
    <Fab
      variant='extended'
      size='large'
      color='primary'
      sx={{ position: "fixed", bottom: 16, right: 16 }}
      aria-label='add'
      disabled={cart.total <= 0}
      onClick={onClick}
    >
      <ShoppingCartCheckoutIcon sx={{ mr: 1 }} />
      Pagar
    </Fab>
  );
};

export default PayButton;
