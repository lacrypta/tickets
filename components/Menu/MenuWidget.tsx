import styled from "@emotion/styled";
import { Fab } from "@mui/material";

import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";

import { MenuItems } from "./MenuItems";

const Container = styled.div``;

export const MenuWidget = () => {
  return (
    <Container>
      <MenuItems />
      <Fab
        variant='extended'
        size='large'
        color='primary'
        sx={{ position: "absolute", bottom: 16, right: 16 }}
        aria-label='add'
      >
        <ShoppingCartCheckoutIcon sx={{ mr: 1 }} />
        Pagar
      </Fab>
    </Container>
  );
};
