import { createContext, useEffect, useState } from "react";
import BarGateway from "@lacrypta/bar-gateway/deployments/matic/BarGateway.json";

interface IGatewayContext {
  step: number;
  setStep(_step: number): void;
}

export const GatewayContext = createContext<IGatewayContext>({
  step: 0,
  setStep: () => {},
});

interface IGatewayProviderProps {
  address: string;
  children: JSX.Element | JSX.Element[];
}

export const GatewayProvider = ({
  address,
  children,
}: IGatewayProviderProps) => {
  const [step, setStep] = useState<number>(0);
  const gatewayAddress = address || BarGateway.address;

  return (
    <GatewayContext.Provider value={{ step, setStep }}>
      {children}
    </GatewayContext.Provider>
  );
};
