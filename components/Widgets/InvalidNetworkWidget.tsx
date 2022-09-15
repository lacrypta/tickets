import styled from "@emotion/styled";
import { Button } from "@mui/material";
import { useSwitchNetwork } from "wagmi";

const Container = styled.div`
  color: white;
  z-index: 10;
`;
const Centered = styled.div`
  text-align: center;
`;

const InvalidNetworkWidget = () => {
  const { switchNetwork } = useSwitchNetwork();

  const handleSwitch = async () => {
    switchNetwork?.(137);
  };

  return (
    <Container>
      <div>
        <h1>Necesitas conectarte a la Red Polygon</h1>
      </div>
      <Centered>
        <Button onClick={handleSwitch}>Conectar a Polygon</Button>
      </Centered>
    </Container>
  );
};

export default InvalidNetworkWidget;
