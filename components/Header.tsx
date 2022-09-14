import styled from "@emotion/styled";
import { AppBar, Box } from "@mui/material";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const TopBar = styled(AppBar)`
  flex-direction: row-reverse;
  padding: 0.6em;
`;

const Header = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <TopBar position='static' elevation={0}>
        <ConnectButton label='Conectar Wallet' />
      </TopBar>
    </Box>
  );
};

export default Header;
