import { LoadingContext } from "./../contexts/Loading";
import { Dispatch, SetStateAction, useContext } from "react";

export interface IUseLoadingResult {
  active: boolean;
  text: string;
  setActive: Dispatch<SetStateAction<boolean>>;
  setText: Dispatch<SetStateAction<string>>;
}

const useLoading = (): IUseLoadingResult => {
  const { active, text, setActive, setText } = useContext(LoadingContext);
  return {
    active,
    text,
    setActive,
    setText,
  };
};

export default useLoading;
