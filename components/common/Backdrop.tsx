import { Transition } from "@headlessui/react";
import { memo, ReactNode } from "react";

interface IBackdropProps {
  children?: ReactNode;
  open: boolean;
}

export const Backdrop = ({ children, open = false }: IBackdropProps) => {
  return (
    <Transition
      show={open}
      enter='transition-opacity ease-out duration-300'
      enterFrom='opacity-0'
      enterTo='opacity-100'
      leave='transition-opacity ease-in duration-200'
      leaveFrom='opacity-100'
      leaveTo='opacity-0'
      className='fixed w-full h-full bottom-0 top-0
            transition duration-500 
            backdrop-blur-sm bg-black/[0.30]
            flex justify-center items-center'
    >
      {children}
    </Transition>
  );
};

export default memo(Backdrop);
