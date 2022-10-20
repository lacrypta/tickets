import { GatewayContext } from "./../contexts/Gateway";
import { BarGateway as BarGatewayContract } from "@lacrypta/bar-gateway/typechain/BarGateway";

import { useContext } from "react";

interface IUseGatewayResult {
  contract?: BarGatewayContract;
}

const useGateway = (): IUseGatewayResult => {
  const { contract: gatewayContract } = useContext(GatewayContext);

  return {
    contract: gatewayContract,
  };
};

export default useGateway;
