import React, { memo } from "react";

interface ICardProps {
  children: React.ReactNode;
}

export const Card = ({ children }: ICardProps) => {
  return (
    <div
      className='bg-white/[0.08] backdrop-blur-sm
          rounded-md ring-2 ring-white/10
          p-5 mt-8 mb-14
          flex flex-col space-y-6'
    >
      {children}
    </div>
  );
};

export default memo(Card);
