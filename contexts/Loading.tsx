import { createContext, Dispatch, SetStateAction, useState } from "react";

interface IStepsContext {
  active: boolean;
  setActive: Dispatch<SetStateAction<boolean>>;
}

export const StepsContext = createContext<IStepsContext>({
  active: false,
  setActive: () => {},
});

export const StepsProvider = () => {
  const [active, setActive] = useState<boolean>(false);

  return <StepsContext.Provider value={{ active, setActive }} />;
};
