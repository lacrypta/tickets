import styled from "@emotion/styled";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const Container = styled.div`
  color: white;
  z-index: 10;
`;

const Description = styled.div`
  margin-bottom: 20px;
`;

const ConnectDiv = styled.div`
  display: flex;
  justify-content: center;
`;

const DisconnectedWidget = () => {
  return (
    <Container>
      <h1>Conectá tu wallet!</h1>
      <Description>
        Necesitas tener instalado <b>Metamask</b> o <b>Alphawallet</b>
      </Description>
      <ConnectDiv>
        <ConnectButton label='Conectar Wallet' />
      </ConnectDiv>
    </Container>
  );
};

export default DisconnectedWidget;
