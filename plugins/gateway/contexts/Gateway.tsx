import { createContext } from "react";
import BarGateway from "@lacrypta/bar-gateway/deployments/matic/BarGateway.json";
import { BarGateway as BarGatewayContract } from "@lacrypta/bar-gateway/typechain/BarGateway";
import { useContract, useProvider } from "wagmi";
import { connectorsForWallets } from "@rainbow-me/rainbowkit";

interface IGatewayContext {
  name?: string;
  contract?: BarGatewayContract;
}

export const GatewayContext = createContext<IGatewayContext>({});

interface IGatewayProviderProps {
  address?: string;
  name?: string;
  children: JSX.Element | JSX.Element[];
}

export const GatewayProvider = ({
  name,
  address,
  children,
}: IGatewayProviderProps) => {
  const provider = useProvider();

  const gatewayAddress = address || BarGateway.address;
  const gatewayName = name || "Bar Gateway";

  const contract: BarGatewayContract = useContract({
    addressOrName: gatewayAddress,
    contractInterface: BarGateway.abi,
    signerOrProvider: provider,
  });

  return (
    <GatewayContext.Provider value={{ name: gatewayName, contract }}>
      {children}
    </GatewayContext.Provider>
  );
};
