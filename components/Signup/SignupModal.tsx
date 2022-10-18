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
import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../../contexts/Cart";
import { useAccount } from "wagmi";
import useERC20Permit from "../../hooks/useERC20Permit";
import useUser from "../../hooks/useUser";

import TermsCheckbox from "./TermsCheckbox";

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

const InputDiv = styled.div`
  padding: 0px;
  width: 100%;
  & input,
  div {
    width: 100%;
    font-size: 22px;
    font-variant-caps: all-petite-caps;
  }
`;

interface IPaymentModalProps {
  open: boolean;
  // eslint-disable-next-line no-unused-vars
  setOpen: (args0: boolean) => void;
}

const SignupModal = ({ open, setOpen }: IPaymentModalProps) => {
  // Contexts
  const { address } = useAccount();
  const { signup } = useUser();
  const { requestSignature } = useERC20Permit();
  const { clear } = useContext(CartContext);

  // Local Hooks
  const [username, setUsername] = useState("");
  const [isSignatureLoading, setSignatureLoading] = useState(false);
  const [checkedTerms, setCheckedTerms] = useState(false);
  // const [error, setError] = useState(""); // TODO: Show error

  // Environment variables
  const contractAddress = process.env.NEXT_PUBLIC_PERONIO_CONTRACT;
  const gatewayAddress = process.env.NEXT_PUBLIC_GATEWAY_CONTRACT;
  const signupTTL = process.env.NEXT_PUBLIC_SIGNUP_TTL ?? "0";

  useEffect(() => {
    if (open) {
      setUsername("");
      setCheckedTerms(false);
    }
  }, [open]);

  const generatePermitData = () => {
    return {
      name: "Peronio",
      contract: contractAddress ?? "",
      spender: gatewayAddress ?? "",
      value: "1000000000000000000000000000000000000000000000", // TODO: Generate proper unlimited
      deadline: Math.floor(Date.now() / 1000) + parseInt(signupTTL), // 12 hours
    };
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSignup = async () => {
    clear(); // Clear Cart
    setSignatureLoading(true);
    const permitData = generatePermitData();
    try {
      const signature = await requestSignature(permitData);
      console.info("res:");
      console.dir(signature);
      signup({
        address: address ?? "",
        username,
        permitData,
        signature,
      });
    } catch (e: any) {
      console.info("Modal closed");
    }

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
            <h2>Ingresá tu Sobrenombre</h2>
          </div>

          <Alert severity='info'>
            Van a llamarte con este nombre cuando esté listo tu pedido
          </Alert>

          <div>
            <InputDiv>
              <TextField
                required
                size='medium'
                label='Nombre'
                value={username}
                disabled={isSignatureLoading}
                onChange={handleInput}
              />
            </InputDiv>
            <TermsCheckbox
              checked={checkedTerms}
              disabled={isSignatureLoading}
              onChange={(_e: any, v: boolean) => setCheckedTerms(v)}
            />
          </div>

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
                disabled={!checkedTerms}
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
