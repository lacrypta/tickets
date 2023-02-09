import React from "react";
import ModalMessage from "./ModalMessage";

interface ITicketDetailsProps {
  children: React.ReactNode;
}

export const TicketDetails = ({ children }: ITicketDetailsProps) => {
  return (
    <ModalMessage>
      <h1 className='block'>Exitoso</h1>
      <div>{children}</div>
    </ModalMessage>
  );
};

export default TicketDetails;
