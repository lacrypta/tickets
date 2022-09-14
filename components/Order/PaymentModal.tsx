import styled from "@emotion/styled";
import { Backdrop, Box, Button, Fade, Modal } from "@mui/material";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import React, { useContext } from "react";
import { CartContext } from "../../providers/Cart";
import { useAccount } from "wagmi";

const BoxDiv = styled(Box)`
  position: absolute;
  top: 20%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 600px;
  max-width: 90%;
  background: white;
  border: 2px solid #fff;
  box-shadow: 24;
  padding: 15px;
  color: black;
`;

const ButtonDiv = styled.div`
  display: flex;
  justify-content: center;
`;

interface IPaymentModalProps {
  open: boolean;
  // eslint-disable-next-line no-unused-vars
  setOpen: (args0: boolean) => void;
}

const PaymentModal = ({ open, setOpen }: IPaymentModalProps) => {
  const handleClose = () => setOpen(false);
  const { address } = useAccount();

  const contractAddress = "0xMierda";

  const { cart } = useContext(CartContext);

  return (
    <Modal
      aria-labelledby='transition-modal-title'
      aria-describedby='transition-modal-description'
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <BoxDiv>
          <div>
            <h2>Necesitamos una firma tuya</h2>
          </div>
          <div>Monto: {cart.total} PE</div>
          <div>Tu cuenta: {address}</div>
          <div>Contrato: {contractAddress}</div>
          <ButtonDiv>
            <Button
              size='large'
              variant='contained'
              endIcon={<AssignmentTurnedInIcon />}
            >
              PAGAR
            </Button>
          </ButtonDiv>
        </BoxDiv>
      </Fade>
    </Modal>
  );
};

export default PaymentModal;
