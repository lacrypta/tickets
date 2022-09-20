import styled from "@emotion/styled";
import {
  Alert,
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Fade,
  Modal,
  TextField,
} from "@mui/material";

import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import React, { useContext, useState } from "react";
import { CartContext } from "../../providers/Cart";
import { useAccount } from "wagmi";
import useERC20Permit from "../../hooks/useERC20Permit";
import { formatUnits } from "ethers/lib/utils";

const BoxDiv = styled(Box)`
  position: fixed;
  top: 10%;
  left: 50%;
  transform: translate(-50%, 0%);
  width: 600px;
  max-width: 90%;
  background: white;
  border: 2px solid #fff;
  box-shadow: 24;
  padding: 15px;
  color: black;
`;

const ButtonDiv = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
`;

interface IPaymentModalProps {
  open: boolean;
  // eslint-disable-next-line no-unused-vars
  setOpen: (args0: boolean) => void;
}

const SignupModal = ({ open, setOpen }: IPaymentModalProps) => {
  const { address } = useAccount();

  const [username, setUsername] = useState("");
  const [error, setError] = useState("");

  const [isSignatureLoading, setSignatureLoading] = useState(false);

  const contractAddress = process.env.NEXT_PUBLIC_PERONIO_CONTRACT;
  const gatewayAddress = process.env.NEXT_PUBLIC_GATEWAY_CONTRACT;

  const permitData = {
    name: "Peronio",
    contract: contractAddress ?? "",
    spender: gatewayAddress ?? "",
    value: "1000000000000000000000000000000000000000000000", // TODO: Generate proper unlimited
    deadline:
      Math.floor(Date.now() / 1000) +
      parseInt(process.env.NEXT_PUBLIC_SIGNUP_TTL ?? "0"), // 12 hours
  };

  const { requestSignature } = useERC20Permit(permitData);

  const handleClose = () => setOpen(false);

  const { clear } = useContext(CartContext);

  const ajaxSignup = async (signature: any) => {
    console.info("Should send this info:");
    const requestData = {
      address: address,
      username: username,
      permitData: permitData,
      signature: {
        r: signature.r,
        s: signature.s,
        v: signature.v,
      },
    };
    console.dir(requestData);
  };

  const handleSignup = async () => {
    clear(); // Clear Cart
    setSignatureLoading(true);
    const signature = await requestSignature();
    await ajaxSignup(signature);
    console.dir(signature);
    setSignatureLoading(false);
  };

  const handleInput = (event: { target: { value: any } }) => {
    setUsername(event.target.value);
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
            <h2>Ingresá tu Nickname</h2>
          </div>
          <div>
            <TextField
              required
              id='outlined-required'
              label='Nombre'
              value={username}
              onChange={handleInput}
            />
          </div>
          <Alert severity='info'>
            Van a llamarte con ese nombre cuando esté tu pedido
          </Alert>

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
                onClick={handleSignup}
                endIcon={<AssignmentTurnedInIcon />}
              >
                Registrarse
              </Button>
            )}
          </ButtonDiv>
        </BoxDiv>
      </Fade>
    </Modal>
  );
};

export default SignupModal;
