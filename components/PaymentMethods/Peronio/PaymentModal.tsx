import React, { useContext, useEffect, useState } from "react";
import styled from "@emotion/styled";
import { Backdrop, Box, Fade, Modal as MaterialModal } from "@mui/material";
import { splitSignature } from "@ethersproject/bytes";
import { useSignMessage } from "wagmi";

import { CartContext } from "../../../contexts/Cart";

import {
  ITransferVoucher,
  ITransferVoucherSigned,
} from "../../../plugins/gateway/types/Voucher";
// import { StepsContext } from "../../contexts/Steps";
import useVoucher from "../../../plugins/gateway/hooks/useVoucher";
import useLoading from "../../../hooks/useLoading";
import { IERC20PaymentRequestBody } from "../../../types/request";
import useOrder from "../../../hooks/useOrder";
import { formatVoucher } from "../../../lib/public/utils";
import { ajaxCall } from "../../../lib/public/request";
import { StepsContext } from "../../../contexts/Steps";

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

interface IPaymentModalProps {
  open: boolean;
  voucher?: ITransferVoucher;
  // eslint-disable-next-line no-unused-vars
  setOpen: (args0: boolean) => void;
}

const PaymentModal = ({ voucher, open, setOpen }: IPaymentModalProps) => {
  const { setStep } = useContext(StepsContext);

  const { getSignatureMessage } = useVoucher();
  const { setActive } = useLoading();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { orderId } = useOrder();

  const handleClose = () => setOpen(false);
  const { signMessageAsync } = useSignMessage();

  const { cart } = useContext(CartContext);

  const sendPayment = async (voucher: ITransferVoucherSigned) => {
    if (!orderId) {
      return;
    }
    setActive(true);
    const requestData: IERC20PaymentRequestBody = {
      orderId,
      voucher: formatVoucher(voucher),
    };

    const res = await ajaxCall("gateway/peronio/pay", requestData);

    if (res.success) {
      setStep(3);
    }
    setActive(false);
  };

  const startSigning = async (voucher: ITransferVoucher) => {
    try {
      const messageToSign = await getSignatureMessage(voucher);

      if (!messageToSign) {
        throw new Error("No se pudo generar el mensaje a firmar");
      }

      const signature = await signMessageAsync({ message: messageToSign });
      const { r, s, v } = splitSignature(signature);

      const signedVoucher: ITransferVoucherSigned = {
        voucher,
        signature: {
          r,
          s,
          v,
        },
      };

      sendPayment(signedVoucher);
    } catch (e: any) {
      console.info("Closed dialog");
    }
    setOpen(false);
    setIsLoading(false);
  };

  useEffect(() => {
    if (open && voucher) {
      setIsLoading(true);
      startSigning(voucher);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [voucher]);

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
          {isLoading ? <div>Cargando Firma...</div> : ""}
        </BoxDiv>
      </Fade>
    </Modal>
  );
};

export default React.memo(PaymentModal);
