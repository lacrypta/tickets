import { useContext } from "react";
import styled from "@emotion/styled";
import { AppBar, Box } from "@mui/material";

import { CartContext } from "../contexts/Cart";
import { ConnectButton } from "./common/ConnectButton";

const TopBar = styled(AppBar)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0.6em;
  position: fixed;
  top: 0;
  z-index: 999999;
  width: 100%;
`;

const TotalDiv = styled.div`
  font-size: 15px;
  transition: all 0.3s;
  max-width: 0px;
  opacity: 0;
  overflow: hidden;
  height: 40px;

  &.open {
    max-width: 50%;
    opacity: 1;
  }

  & div {
    background: rgba(255, 255, 255, 0.1);
    padding: 9px;
    font-size: 18px;
    border-radius: 7px;
    font-weight: bold;
  }
`;

const Header = () => {
  const { cart } = useContext(CartContext);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <TopBar position='static' elevation={0}>
        <TotalDiv className={cart.total > 0 ? "open" : ""}>
          <div>$ {cart.total}</div>
        </TotalDiv>
        <ConnectButton />
      </TopBar>
    </Box>
  );
};

export default Header;
