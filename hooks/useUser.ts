import { useEffect, useState } from "react";
import { ISignupRequestBody } from "../types/request";

import { db, onSnapshot, doc } from "../lib/public/firebase";
import { useAccount } from "wagmi";
import { IPermit } from "../types/crypto";

export interface IUser {
  username: string;
  address: string;
}
export interface IUseUserResponse {
  user?: IUser;
  isRegistered: boolean;
  permit: IPermit;
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
  const { address } = useAccount();
  const [user, setUser] = useState<IUser | undefined>();
  const [permit, setPermit] = useState<IPermit | undefined>();
  const [validPermit, isValidPermit] = useState<false>();

  // Address
  useEffect(() => {
    if (!address) {
      return;
    }

    const userRef = doc(db, "users", address);
    onSnapshot(userRef, {
      next: (snapshot) => {
        console.info("User updated");
        console.dir(snapshot.data());
        const data = snapshot.data();
        if (!data) {
          setUser(undefined);
          setPermit(undefined);
          return;
        }
        setUser({
          username: data.username,
          address,
        });
        setPermit(data.permit);
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
  return { user, isRegistered, permit, signup };
};

export default useUser;
