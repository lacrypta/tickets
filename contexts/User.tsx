import { createContext, Dispatch, SetStateAction, useState } from "react";
import { IPermit, IUser } from "../types/crypto";

interface IUserContext {
  isRegistered: boolean;
  setIsRegistered: Dispatch<SetStateAction<boolean>>;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  user?: IUser;
  setUser: Dispatch<SetStateAction<IUser | undefined>>;
  permit?: IPermit;
  setPermit: Dispatch<SetStateAction<IPermit | undefined>>;
}

export const UserContext = createContext<IUserContext>({
  isRegistered: false,
  setIsRegistered: () => {},
  isLoading: false,
  setIsLoading: () => {},
  user: undefined,
  setUser: () => {},
  permit: undefined,
  setPermit: () => {},
});

interface IUserProviderProps {
  children: any;
}

export const UserProvider = ({ children }: IUserProviderProps) => {
  const [isRegistered, setIsRegistered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<IUser | undefined>();
  const [permit, setPermit] = useState<IPermit | undefined>();

  return (
    <UserContext.Provider
      value={{
        isRegistered,
        setIsRegistered,
        isLoading,
        setIsLoading,
        user,
        setUser,
        permit,
        setPermit,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
