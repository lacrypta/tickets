import styled from "@emotion/styled";
import { Button } from "@mui/material";
import { useState } from "react";
import SignupModal from "../Signup/SignupModal";

import PanToolAltRoundedIcon from "@mui/icons-material/PanToolAltRounded";

const Container = styled.div`
  color: white;
  z-index: 10;
`;

const Center = styled.div`
  text-align: center;
  margin-top: 20px;
`;

const ClickHere = styled(PanToolAltRoundedIcon)`
  width: 80px;
  height: 80px;
  positoin: absolute;
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
        <h1>Bienvenido!</h1>
      </div>
      <div>Para ingresar necesitamos tu nombre y que autorizes la App.</div>
      <div>
        Hacé click en Registrarse. Te va a llevar menos de <b>20 segundos</b>.
      </div>
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
