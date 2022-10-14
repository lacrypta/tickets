import styled from "@emotion/styled";
import { Button } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useLoading from "../../hooks/useLoading";
import useOrder from "../../hooks/useOrder";
import { IClaimCodeRequestBody, ResponseDataType } from "../../types/request";
import TextField from "../common/TextField";
const Container = styled.div`
  width: 100%;
  margin-bottom: 2em;
`;

const SubmitButton = styled(Button)`
  margin-top: 10px;
  width: 100%;
`;

const claimCode = async (
  data: IClaimCodeRequestBody
): Promise<ResponseDataType> => {
  console.info("Claiming Approve");
  console.dir(data);
  const res = await fetch("/api/gateway/codes/approve", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res.json();
};

export const InvitationCode = () => {
  const [code, setCode] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const { orderId } = useOrder();
  const { setActive } = useLoading();

  const handleSubmit = async (event: any) => {
    if (!code || !orderId) {
      return;
    }
    setIsLoading(true);
    event.preventDefault();
    const res = await claimCode({
      orderId,
      code,
    });
    setIsLoading(false);
    if (!res.success) {
      alert("Incorrect code");
      return;
    }
    router.push("/entrada/" + orderId);
  };

  useEffect(() => {
    setActive(isLoading);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  return (
    <Container>
      <h1>Ingresá el codigo de la invitación</h1>
      <form onSubmit={handleSubmit}>
        <TextField
          label='Código'
          type='text'
          onChange={(e) => setCode(e.target.value)}
          required
          variant='outlined'
          value={code}
        />
        {isLoading ? (
          "Reclamando..."
        ) : (
          <SubmitButton disabled={!orderId} type='submit'>
            RECLAMAR
          </SubmitButton>
        )}
      </form>
    </Container>
  );
};
