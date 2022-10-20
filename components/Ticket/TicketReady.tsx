import { Alert } from "@mui/material";
import useOrder from "../../hooks/useOrder";
import QRCode from "react-qr-code";
import styled from "@emotion/styled";

const QrDiv = styled.div`
  text-align: center;
  padding: 40px;
`;

const Container = styled.div`
  a {
    font-weight: bold;
    :hover {
      text-decoration: underline;
    }
  }
`;

const HOSTNAME =
  process.env.NEXT_PUBLIC_HOSTNAME || "https://entradas.lacrypta.com.ar";

const TicketReady = () => {
  const { order, orderId } = useOrder();
  const url = HOSTNAME + "/entrada/" + (orderId || "");
  return (
    <Container>
      <h1>Tu entrada</h1>
      <div>
        {order?.status === "completed" ? (
          <>
            <Alert severity='success'>Entrada LISTA!</Alert>
            <QrDiv>
              <QRCode bgColor='#000000' fgColor='#ffffff' value={url} />
            </QrDiv>
          </>
        ) : (
          <Alert severity='error'>Falta pagar!</Alert>
        )}
      </div>
      <div>#Código: {orderId}</div>
      <div>Nombre: {order?.fullname}</div>
      <div>E-mail: {order?.email}</div>
      <div>Medio de Pago: {order?.payment_method}</div>
      <div>Status: {order?.status}</div>
      <hr />
      <div>
        Dirección:{" "}
        <a
          rel='noreferrer'
          target='_blank'
          href='https://www.google.com/maps/place/Villanueva+1367,+C1426+BMI,+Buenos+Aires/@-34.5648535,-58.4453019,17z/data=!3m1!4b1!4m5!3m4!1s0x95bcb5c8870cdc23:0xc945d369aa39b3e0!8m2!3d-34.5648579!4d-58.4431132'
        >
          Villanueva 1367, CABA
        </a>
      </div>
    </Container>
  );
};

export default TicketReady;
