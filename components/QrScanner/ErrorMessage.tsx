import ModalMessage from "./ModalMessage";

export const ErrorMessage = ({ message }: { message: string }) => {
  return (
    <ModalMessage>
      <h1 className='block'>Error</h1>
      <div>{message}</div>
    </ModalMessage>
  );
};

export default ErrorMessage;
