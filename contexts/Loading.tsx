import { createContext, Dispatch, SetStateAction, useState } from "react";
import { Backdrop } from "../components/common/Backdrop";
import { LoadingLogo } from "../components/common/LoadingLogo";

interface ILoadingContext {
  active: boolean;
  text: string;
  setActive: Dispatch<SetStateAction<boolean>>;
  setText: Dispatch<SetStateAction<string>>;
}

export const LoadingContext = createContext<ILoadingContext>({
  active: false,
  text: "",
  setActive: () => {},
  setText: () => {},
});

interface ILoadingProviderProps {
  children: any;
}

export const LoadingProvider = ({ children }: ILoadingProviderProps) => {
  const [active, setActive] = useState<boolean>(true);
  const [text, setText] = useState<string>("");

  return (
    <LoadingContext.Provider value={{ active, setActive, text, setText }}>
      {children}
      <Backdrop open={active}>
        <LoadingLogo />
      </Backdrop>
    </LoadingContext.Provider>
  );
};
