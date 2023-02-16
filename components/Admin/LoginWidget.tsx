import { useCallback, useState } from "react";
import styled from "@emotion/styled";
import { getAuth, signInWithCustomToken } from "../../lib/public/firebase";
import { ajaxCall } from "../../lib/public/request";
import Button from "../Form/Button";
import Input from "../Form/Input";

const Container = styled.div`
  width: 100%;
  max-width: 800px;
  padding: 10px;
  margin: 50px 0px 40px;
`;

const LoginWidget = () => {
  const [password, setPassword] = useState("");

  const signIn = useCallback(async (token: string) => {
    const auth = getAuth();
    signInWithCustomToken(auth, token)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.info("user: ");
        console.dir(user);
      })
      .catch((error: any) => {
        console.info("Error!");
        console.dir(error);
      });
  }, []);

  const startLogin = useCallback(async (password: string) => {
    console.info("password", password);
    try {
      const res = await ajaxCall("login", { password });
      if (!res.success) {
        alert("Inválido");
        return;
      }

      signIn(res.data.token);
      console.dir(res);
    } catch (error: any) {
      alert("No se pudo conectar");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogin = useCallback(
    (e: any) => {
      startLogin(password);
      e.preventDefault();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [password]
  );

  return (
    <Container>
      <form onSubmit={handleLogin}>
        <div>
          <Input
            label='Contraseña'
            name='password'
            value={password}
            onChange={(e: any) => setPassword(e.target.value)}
            type='password'
          />
        </div>
        <div>
          <Button type='submit'>Ingresar</Button>
        </div>
      </form>
    </Container>
  );
};

export default LoginWidget;
