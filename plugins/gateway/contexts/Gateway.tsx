import { createContext } from "react";
import BarGatewayArtifact from "@lacrypta/bar-gateway/artifacts/contracts/BarGateway.sol/BarGateway.json";
import BarGatewayDeployment from "@lacrypta/bar-gateway/deployments/matic/BarGateway.json";
import { BarGateway as BarGatewayContract } from "@lacrypta/bar-gateway/typechain/BarGateway";
import { useContract, useProvider } from "wagmi";

const { abi: barGatewayABI } = BarGatewayArtifact;
const { address: deployedAddress } = BarGatewayDeployment;

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

  const gatewayAddress = address || deployedAddress;
  const gatewayName = name || "Bar Gateway";

  const contract: BarGatewayContract = useContract({
    addressOrName: gatewayAddress,
    contractInterface: barGatewayABI,
    signerOrProvider: provider,
  });

  return (
    <GatewayContext.Provider value={{ name: gatewayName, contract }}>
      {children}
    </GatewayContext.Provider>
  );
};
