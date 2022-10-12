import useOrder from "../../hooks/useOrder";

const TicketReady = () => {
  const { order } = useOrder();

  return (
    <>
      <h1>Ticket ready, mi viejo!</h1>
      <div>{JSON.stringify(order)}</div>
    </>
  );
};

export default TicketReady;
