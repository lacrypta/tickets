import { useState } from "react";
import { useAccount } from "wagmi";
import { ISignupRequestBody } from "../types/request";

export interface IUser {
  username: string;
  address: string;
}
export interface IUseUserResponse {
  user?: IUser;
  isRegistered: boolean;
  signup(_args: ISignupRequestBody): void;
}

const ajaxSignup = async (requestData: ISignupRequestBody) => {
  console.info("Should send this info:");
  console.info("Request to send...");
  console.dir(requestData);
};

const useUser = (): IUseUserResponse => {
  const [isRegistered, setIsRegistered] = useState(false);
  const [user, setUser] = useState<IUser>();

  const signup = (requestData: ISignupRequestBody) => {
    const { username, address } = requestData;
    ajaxSignup(requestData);

    setIsRegistered(true);
    setUser({
      username: username,
      address: address,
    });
  };
  return { user, isRegistered, signup };
};

export default useUser;
