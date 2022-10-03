import styled from "@emotion/styled";
import { Button } from "@mui/material";
import { useState } from "react";
import SignupModal from "../Signup/SignupModal";

import PanToolAltRoundedIcon from "@mui/icons-material/PanToolAltRounded";

const Container = styled.div`
  color: white;
  z-index: 10;

  h1 {
    text-align: center;
  }
`;

const Center = styled.div`
  text-align: center;
  margin-top: 20px;
`;

const YouNeed = styled.div`
  font-size: 22px;

  ul li {
    font-weight: bold;
    font-size: 20px;
    margin-bottom: 10px;
  }
`;

const ClickHere = styled(PanToolAltRoundedIcon)`
  width: 80px;
  height: 80px;
  top: 1px;

  -webkit-animation: mover 0.5s infinite alternate;
  animation: mover 0.5s infinite alternate;

  @-webkit-keyframes mover {
    0% {
      transform: translateY(-5px);
    }
    100% {
      transform: translateY(20px);
    }
  }
  @keyframes mover {
    0% {
      transform: translateY(-5px);
    }
    100% {
      transform: translateY(20px);
    }
  }
`;

const SignupWidget = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <Container>
      <div>
        <h1>Primero, registrate!</h1>
      </div>

      <YouNeed>
        Necesitas:
        <ul>
          <li>20 segundos</li>
          <li>1 dedo</li>
        </ul>
      </YouNeed>
      <Center>
        <Button onClick={handleOpen}>Registrarse</Button>
        <div>
          <ClickHere />
        </div>
      </Center>

      <SignupModal open={open} setOpen={setOpen} />
    </Container>
  );
};

export default SignupWidget;
