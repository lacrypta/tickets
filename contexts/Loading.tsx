import { Backdrop } from "@mui/material";
import { createContext, Dispatch, SetStateAction, useState } from "react";
import LoadingLogo from "../components/common/LoadingLogo";

interface ILoadingContext {
  active: boolean;
  text: string;
  setActive: Dispatch<SetStateAction<boolean>>;
  setText: Dispatch<SetStateAction<string>>;
}

export const LoadingContext = createContext<ILoadingContext>({
  active: true,
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
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={active}
      >
        <LoadingLogo />
      </Backdrop>
      {children}
    </LoadingContext.Provider>
  );
};
