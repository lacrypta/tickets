import styled from "@emotion/styled";
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Fade,
  Modal,
} from "@mui/material";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import React, { useContext, useState } from "react";
import { CartContext } from "../../contexts/Cart";
import { useAccount } from "wagmi";
import useERC20Permit from "../../hooks/useERC20Permit";

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
  const { address } = useAccount();
  const [isSignatureLoading, setSignatureLoading] = useState(false);

  const contractAddress = process.env.NEXT_PUBLIC_PERONIO_CONTRACT;
  const gatewayAddress = process.env.NEXT_PUBLIC_GATEWAY_CONTRACT;

  const { requestSignature } = useERC20Permit({
    name: "Peronio",
    contract: contractAddress,
    spender: gatewayAddress,
    value: "1000",
    deadline: 999999999,
  });

  const handleClose = () => setOpen(false);

  const { cart } = useContext(CartContext);

  const handlePay = async () => {
    setSignatureLoading(true);
    await requestSignature();
    setSignatureLoading(false);
  };

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
            {isSignatureLoading ? (
              <CircularProgress
                variant='indeterminate'
                size={40}
                thickness={4}
                value={100}
              />
            ) : (
              <Button
                size='large'
                variant='contained'
                onClick={handlePay}
                endIcon={<AssignmentTurnedInIcon />}
              >
                PAGAR
              </Button>
            )}
          </ButtonDiv>
        </BoxDiv>
      </Fade>
    </Modal>
  );
};

export default PaymentModal;
