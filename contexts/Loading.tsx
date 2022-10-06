import { createContext, Dispatch, SetStateAction, useState } from "react";

interface ILoadingContext {
  active: boolean;
  setActive: Dispatch<SetStateAction<boolean>>;
}

export const LoadingContext = createContext<ILoadingContext>({
  active: false,
  setActive: () => {},
});

export const LoadingProvider = () => {
  const [active, setActive] = useState<boolean>(false);

  return <LoadingContext.Provider value={{ active, setActive }} />;
};
