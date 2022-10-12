import { Alert } from "@mui/material";
import useOrder from "../../hooks/useOrder";

const TicketReady = () => {
  const { order, orderId } = useOrder();

  return (
    <>
      <h1>Tu entrada</h1>
      <div>
        {order?.status === "completed" ? (
          <>
            <Alert severity='success'>Entrada LISTA!</Alert>
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
