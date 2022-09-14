import { createContext, useState } from "react";

interface IStepsContext {
  step: number;
  setStep: (arg0: number) => void;
}

export const StepsContext = createContext<IStepsContext>({
  step: 0,
  setStep: () => {},
});

interface IStepsProviderProps {
  children: any;
}

export const StepsProvider = ({ children }: IStepsProviderProps) => {
  const [step, setStep] = useState<number>(0);

  return (
    <StepsContext.Provider value={{ step, setStep }}>
      {children}
    </StepsContext.Provider>
  );
};
