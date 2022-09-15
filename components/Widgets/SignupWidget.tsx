import styled from "@emotion/styled";
import { Button } from "@mui/material";
import { useState } from "react";
import SignupModal from "../Signup/SignupModal";

const Container = styled.div`
  color: white;
  z-index: 10;
`;

const SignupWidget = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <Container>
      <div>
        <h1>Bienvenido</h1>
      </div>
      <div>Holaaa</div>

      <Button onClick={handleOpen}>Registrarse</Button>

      <SignupModal open={open} setOpen={setOpen} />
    </Container>
  );
};

export default SignupWidget;
