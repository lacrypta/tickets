import styled from "@emotion/styled";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import Peronio from "./CryptoOptions/Peronio";
const Container = styled.div`
  width: 100%;
  margin-bottom: 2em;
`;

export const Crypto = () => {
  const { address } = useAccount();
  return (
    <Container>
      <h1>Crypto!!</h1>
      <h2>50% de Descuento!</h2>

      <ConnectButton label='Conectar' />
      {address ? (
        <>
          <Peronio />
        </>
      ) : (
        ""
      )}
    </Container>
  );
};
