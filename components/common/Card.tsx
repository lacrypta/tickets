import React from "react";

interface ICardProps {
  children: React.ReactNode;
}

const Card = ({ children }: ICardProps) => {
  return (
    <div
      className='bg-white/[0.08]
          rounded-md ring-2 ring-white/10
          h-[30rem] p-8 mt-8 mb-14 z-'
    >
      <div className='absolute top-0 backdrop-blur-sm drop-shadow-[0_55px_55px_rgba(0,0,0,0.25)] inset-0'></div>
      <div className='relative top-0'>{children}</div>
    </div>
  );
};

export default Card;
