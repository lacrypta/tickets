import { StepsContext } from "../../../contexts/Steps";

import { useContext, useEffect } from "react";
import { useAccount, useNetwork } from "wagmi";
import useOrder from "../../../hooks/useOrder";

import BackButton from "../../BackButton";

import useLoading from "../../../hooks/useLoading";
import { PayWithPeronio } from "./PayWithPeronio";
import InvalidNetworkWidget from "../../Widgets/InvalidNetworkWidget";
import DisconnectedWidget from "../../Widgets/DisconnectedWidget";
import useUser from "../../../hooks/useUser";
import SignupWidget from "../../Widgets/SignupWidget";

export const Peronio = () => {
  const { setStep } = useContext(StepsContext);
  const { isDisconnected } = useAccount();
  const { chain } = useNetwork();
  const { orderId, isPayed } = useOrder();
  const { setActive } = useLoading();
  const { isRegistered, isLoading: isUserLoading } = useUser();

  useEffect(() => {
    if (setStep && isPayed) {
      setStep(3);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPayed, setStep]);

  useEffect(() => {
    if (orderId) {
      setActive(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderId]);

  const ConnectedBlock = () => {
    return chain?.id === 137 ? <ValidNetworkBlock /> : <InvalidNetworkWidget />;
  };

  const ValidNetworkBlock = () => {
    return isRegistered ? <PayWithPeronio /> : <SignupWidget />;
  };

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
