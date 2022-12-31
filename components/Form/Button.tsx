import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export const Button = ({ children, ...rest }: ButtonProps) => {
  return (
    <button
      {...rest}
      className='bg-red-500 text-white rounded-md px-4 py-2 w-full'
    >
      {children}
    </button>
  );
};

export default Button;
