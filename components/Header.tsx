import styled from "@emotion/styled";
import { AppBar, Box } from "@mui/material";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useContext } from "react";
import { CartContext } from "../providers/Cart";

const TopBar = styled(AppBar)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0.6em;
`;

const TotalDiv = styled.div`
  transition: all 0.3s;
  max-width: 0px;
  opacity: 0;
  overflow: hidden;

  &.open {
    max-width: 50%;
    opacity: 1;
  }
`;

const Header = () => {
  const { cart } = useContext(CartContext);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <TopBar position='static' elevation={0}>
        <TotalDiv className={cart.total > 0 ? "open" : ""}>
          $ {cart.total}
        </TotalDiv>
        <ConnectButton label='Conectar Wallet' />
      </TopBar>
    </Box>
  );
};

export default Header;
