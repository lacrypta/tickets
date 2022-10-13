import { Alert } from "@mui/material";
import useOrder from "../../hooks/useOrder";
import QRCode from "react-qr-code";
import styled from "@emotion/styled";

const QrDiv = styled.div`
  text-align: center;
  padding: 40px;
`;

const HOSTNAME =
  process.env.NEXT_PUBLIC_HOSTNAME || "https://entradas.lacrypta.com.ar";

const TicketReady = () => {
  const { order, orderId } = useOrder();
  const url = HOSTNAME + "/entrada/" + (orderId || "");
  return (
    <>
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
    </>
  );
};

export default TicketReady;
