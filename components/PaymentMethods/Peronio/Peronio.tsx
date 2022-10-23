import { StepsContext } from "../../../contexts/Steps";

import { useCallback, useContext, useEffect } from "react";
import { useAccount, useNetwork } from "wagmi";
import useOrder from "../../../hooks/useOrder";

import BackButton from "../../BackButton";

import useLoading from "../../../hooks/useLoading";
import PayWithPeronio from "./PayWithPeronio";
import InvalidNetworkWidget from "../../Widgets/InvalidNetworkWidget";
import DisconnectedWidget from "../../Widgets/DisconnectedWidget";
import useUser from "../../../hooks/useUser";
import SignupWidget from "../../Widgets/SignupWidget";

export const Peronio = () => {
  const { setStep } = useContext(StepsContext);
  const { isDisconnected } = useAccount();
  const { chain } = useNetwork();
  const { orderId } = useOrder();
  const { setActive } = useLoading();
  const { isRegistered } = useUser();

  useEffect(() => {
    if (orderId) {
      setActive(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderId]);

  const ConnectedBlock = useCallback(() => {
    return chain?.id === 137 ? <ValidNetworkBlock /> : <InvalidNetworkWidget />;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chain?.id, isRegistered]);

  const ValidNetworkBlock = useCallback(() => {
    return isRegistered ? <PayWithPeronio /> : <SignupWidget />;
  }, [isRegistered]);

  const handleBack = () => {
    setStep(0);
  };

  return (
    <>
      <div>
        <h2>Pago con Peronio</h2>
      </div>
      {isDisconnected ? <DisconnectedWidget /> : <ConnectedBlock />}

      <BackButton onClick={handleBack} />
    </>
  );
};
