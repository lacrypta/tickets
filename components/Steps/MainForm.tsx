import styled from "@emotion/styled";
import { Button } from "@mui/material";
import { useContext } from "react";
import { StepsContext } from "../../contexts/Steps";
import useOrder from "../../hooks/useOrder";
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
  const { fullname, setFullname, email, setEmail } = useOrder();

  function handleSubmit(event: any) {
    setStep(1);
    event.preventDefault();
  }

  return (
    <Container>
      <h1>Entradas limitadas!</h1>
      <form onSubmit={handleSubmit}>
        <TextField
          label='Nombre Completo'
          type='text'
          onChange={(e) => setFullname(e.target.value)}
          required
          variant='outlined'
          value={fullname}
        />
        <TextField
          label='E-mail'
          type='email'
          onChange={(e) => setEmail(e.target.value)}
          required
          variant='outlined'
          value={email}
        />
        <SubmitButton type='submit'>COMPRAR</SubmitButton>
      </form>
    </Container>
  );
};
