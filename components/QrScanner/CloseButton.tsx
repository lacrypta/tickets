import React from "react";

export const CloseButton = (
  props: React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >
) => {
  return (
    <button
      className='bg-black w-16 h-16 rounded-full hover:bg-white hover:text-black'
      {...props}
    >
      X
    </button>
  );
};

export default CloseButton;
