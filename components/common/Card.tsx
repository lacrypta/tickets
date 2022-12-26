import { Transition } from "@headlessui/react";
import React from "react";

interface ICardProps {
  children: React.ReactNode;
  show?: boolean;
}

const Card = ({ children, show = true }: ICardProps) => {
  return (
    <div className='perspective'>
      <Transition
        appear={true}
        show={show}
        enter='ease-bounce'
        enterFrom='opacity-0 rotateY-90'
        enterTo='opacity-100 ease-in'
        leave='-rotateY-90'
        leaveFrom='opacity-100 scale-1'
        leaveTo='scale-0'
        className='card transition opacity-100 duration-500 backdrop-blur-sm bg-white/[0.08]'
      >
        <div
          className='rounded-md
            h-[30rem] mt-8 p-8 mb-14'
        >
          {children}
        </div>
      </Transition>
    </div>
  );
};

export default Card;
