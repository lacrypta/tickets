import { useState } from "react";
import { useAccount } from "wagmi";

export interface IUser {
  name: string;
  address: string;
  avatar?: string;
}

export interface ISignupArgs {
  name: string;
  permit: any;
}

export interface IUseUserResponse {
  user?: IUser;
  isRegistered: boolean;
  signUp(_args: ISignupArgs): void;
}

const useUser = (): IUseUserResponse => {
  const { address } = useAccount();
  const [isRegistered, setIsRegistered] = useState(false);
  const [user, setUser] = useState<IUser>();

  const signUp = ({ name, permit }: ISignupArgs) => {
    console.info("Mock signup User...");
    console.info("name", name);
    console.info("permit:");
    console.dir(permit);

    setIsRegistered(true);
    setUser({
      name,
      address: address ?? "",
      avatar: "nada",
    });
  };
  return { user, isRegistered, signUp };
};

export default useUser;
