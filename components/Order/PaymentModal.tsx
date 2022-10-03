import React, { useContext } from "react";
import styled from "@emotion/styled";
import { Backdrop, Box, Fade, Modal as MaterialModal } from "@mui/material";

import { CartContext } from "../../contexts/Cart";

import PanToolAltTwoToneIcon from "@mui/icons-material/PanToolAltTwoTone";

const Modal = styled(MaterialModal)`
  position: fixed;
  top: 20%;
  z-index: 99999999;
  left: 50%;
`;

const BoxDiv = styled(Box)`
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

const Amount = styled.div`
  font-size: 20px;
`;

const PointerWrapper = styled.div`
  transform: rotate(180deg);
  position: fixed;
  top: 150%;
`;

const ClickHere = styled(PanToolAltTwoToneIcon)`
  -webkit-animation: mover 0.5s infinite alternate;
  animation: mover 0.5s infinite alternate;
  font-size: 80px;
  @-webkit-keyframes mover {
    0% {
      transform: translateY(-5px);
    }
    100% {
      transform: translateY(20px);
    }
  }
  @keyframes mover {
    0% {
      transform: translateY(-5px);
    }
    100% {
      transform: translateY(20px);
    }
  }
`;

interface IPaymentModalProps {
  open: boolean;
  // eslint-disable-next-line no-unused-vars
  setOpen: (args0: boolean) => void;
}

const PaymentModal = ({ open, setOpen }: IPaymentModalProps) => {
  const handleClose = () => setOpen(false);

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
            <h2>Tocá Confirmar</h2>
          </div>
          <Amount>Monto: {cart.total} PE</Amount>
          <PointerWrapper>
            <ClickHere color='info' />
          </PointerWrapper>
        </BoxDiv>
      </Fade>
    </Modal>
  );
};

export default PaymentModal;
