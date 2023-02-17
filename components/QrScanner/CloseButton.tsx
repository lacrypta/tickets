import React, { memo } from "react";

export const CloseButton = (
  props: React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >
) => {
  return (
    <button
      className='bg-black w-16 h-16 rounded-full ring-offset-2 ring-2 text-2xl hover:bg-white hover:text-black'
      {...props}
    >
      X
    </button>
  );
};

export default memo(CloseButton);
