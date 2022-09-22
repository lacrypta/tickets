import { useState } from "react";
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
  console.info("Initiating request");
  console.dir(requestData);

  const data = await fetch("/api/user/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestData),
  });

  console.info(data);
  console.dir(data);
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
