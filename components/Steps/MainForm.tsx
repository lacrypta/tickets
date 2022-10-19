import styled from "@emotion/styled";
import { useRouter } from "next/router";
import { useContext } from "react";
import { StepsContext } from "../../contexts/Steps";
import useOrder from "../../hooks/useOrder";
import LargeButton from "../common/LargeButton";
import TextField from "../common/TextField";

const Container = styled.div`
  width: 100%;
  margin-bottom: 2em;
  padding: 1em;
  background: rgba(80, 80, 80, 0.3);
  border-radius: 5px;
  backdrop-filter: blur(4px);
`;

const InputField = styled(TextField)`
  label {
    color: white !important;
    background: #111;
  }
`;

const ButtonDiv = styled.div`
  margin-top: 10px;
`;

export const MainForm = () => {
  const { setStep } = useContext(StepsContext);
  const { fullname, setFullname, email, setEmail } = useOrder();
  const router = useRouter();

  function handleSubmit(event: any) {
    router.push("/#payment", undefined);
    setStep(1);
    event.preventDefault();
  }

  return (
    <Container>
      <h1>Entradas limitadas!</h1>
      <form onSubmit={handleSubmit}>
        <InputField
          label='Nombre Completo'
          type='text'
          onChange={(e) => setFullname(e.target.value)}
          required
          variant='outlined'
          value={fullname}
        />
        <InputField
          label='E-mail'
          type='email'
          onChange={(e) => setEmail(e.target.value)}
          required
          variant='outlined'
          value={email}
        />
        <ButtonDiv>
          <LargeButton type='submit'>COMPRAR</LargeButton>
        </ButtonDiv>
      </form>
    </Container>
  );
};
