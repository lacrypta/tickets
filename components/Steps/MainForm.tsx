import styled from "@emotion/styled";
import { Button } from "@mui/material";
import { useContext } from "react";
import { StepsContext } from "../../contexts/Steps";
import TextField from "../common/TextField";

const Container = styled.div`
  width: 100%;
  margin-bottom: 2em;
  padding: 1em;
  background: rgba(80, 80, 80, 0.3);
  border-radius: 5px;
  backdrop-filter: blur(4px);
`;

const SubmitButton = styled(Button)`
  margin-top: 10px;
  width: 100%;
`;

export const MainForm = () => {
  const { setStep } = useContext(StepsContext);

  function handleSubmit(event: any) {
    setStep(1);
    event.preventDefault();
  }

  return (
    <Container>
      <h1>Conseguí tu entrada!</h1>
      <form onSubmit={handleSubmit}>
        <TextField label='Nombre Completo' variant='outlined' />
        <TextField label='E-mail' variant='outlined' />
        <SubmitButton type='submit'>Manda</SubmitButton>
      </form>
    </Container>
  );
};
