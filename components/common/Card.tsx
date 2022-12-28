import React from "react";

interface ICardProps {
  children: React.ReactNode;
}

const Card = ({ children }: ICardProps) => {
  return (
    <div
      className='
          bg-white/[0.08]
          rounded-md ring-2 ring-white/10 drop-shadow-[0_55px_55px_rgba(0,0,0,0.25)]
          h-[30rem] p-8 mt-8 mb-14'
    >
      {children}
    </div>
  );
};

export default Card;
