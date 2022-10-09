import { useEffect, useState } from "react";
import { ISignupRequestBody } from "../types/request";

import { db, onSnapshot, doc } from "../lib/public/firebase";
import { useAccount } from "wagmi";
import { IPermit } from "../types/crypto";

export interface IUser {
  username: string;
  address: string;
}
export interface IUseUserResult {
  user?: IUser;
  isRegistered: boolean;
  permit?: IPermit;
  isLoading: boolean;
  signup(_args: ISignupRequestBody): void;
}

const ajaxSignup = async (requestData: ISignupRequestBody) => {
  const data = await fetch("/api/user/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestData),
  });
};

const useUser = (): IUseUserResult => {
  const [isRegistered, setIsRegistered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { address } = useAccount();
  const [user, setUser] = useState<IUser | undefined>();
  const [permit, setPermit] = useState<IPermit | undefined>();

  // Address
  useEffect(() => {
    if (!address) {
      return;
    }

    setIsLoading(true);
    const userRef = doc(db, "users", address);
    onSnapshot(userRef, {
      next: (snapshot) => {
        const data = snapshot.data();
        if (!data) {
          setUser(undefined);
          setPermit(undefined);
          setIsRegistered(false);
          setIsLoading(false);
          return;
        }
        setUser({
          username: data.username,
          address,
        });
        setPermit(data.permit);
        setIsRegistered(true);
        setIsLoading(false);
      },
    });
  }, [address]);

  const signup = (requestData: ISignupRequestBody) => {
    const { username, address } = requestData;
    ajaxSignup(requestData);

    setIsRegistered(true);
    setUser({
      username: username,
      address: address,
    });
  };
  return { user, isRegistered, permit, isLoading, signup };
};

export default useUser;
