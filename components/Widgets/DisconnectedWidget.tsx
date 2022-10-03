import styled from "@emotion/styled";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const Container = styled.div`
  color: white;
  z-index: 10;
  min-height: 40vh;
  text-align: center;
  padding: 10px;
`;

const Description = styled.div`
  margin-bottom: 20px;
`;

const WalletsList = styled.div``;

const ConnectDiv = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
`;

const DisconnectedWidget = () => {
  return (
    <Container>
      <h1>Conectá tu wallet!</h1>
      <Description>
        Si ya tenes una wallet, hacé click en Conectar Wallet
      </Description>
      <ConnectDiv>
        <ConnectButton label='Conectar Wallet' />
      </ConnectDiv>
      <Description>Si no tenes, descargate alguna de estas.</Description>
      <WalletsList>
        <div>Alphawallet</div>
        <div>Metamask</div>
      </WalletsList>
    </Container>
  );
};

export default DisconnectedWidget;
