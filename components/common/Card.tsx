import React from "react";

interface ICardProps {
  children: React.ReactNode;
}

const Card = ({ children }: ICardProps) => {
  return (
    <div
      className='
          bg-white/[0.08]
          rounded-md
          h-[30rem] p-8 mt-8 mb-14'
    >
      {children}
    </div>
  );
};

export default Card;
