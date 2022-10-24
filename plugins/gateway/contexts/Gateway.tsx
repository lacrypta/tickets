import { createContext } from "react";
import BarGatewayArtifact from "@lacrypta/bar-gateway/artifacts/contracts/BarGateway.sol/BarGateway.json";
import { BarGateway as BarGatewayContract } from "@lacrypta/bar-gateway/typechain/BarGateway";
import { useContract, useProvider } from "wagmi";

const { abi: barGatewayABI } = BarGatewayArtifact;

interface IGatewayContext {
  contract?: BarGatewayContract;
}

export const GatewayContext = createContext<IGatewayContext>({});

interface IGatewayProviderProps {
  address: string;
  children: JSX.Element | JSX.Element[];
}

export const GatewayProvider = ({
  address,
  children,
}: IGatewayProviderProps) => {
  const provider = useProvider();

  const contract: BarGatewayContract = useContract({
    addressOrName: address,
    contractInterface: barGatewayABI,
    signerOrProvider: provider,
  });

  return (
    <GatewayContext.Provider value={{ contract }}>
      {children}
    </GatewayContext.Provider>
  );
};
