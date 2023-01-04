import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
}

export const Input = ({ label, ...props }: InputProps) => {
  return (
    <div>
      <label className='block text-sm font-medium text-gray-100'>{label}</label>
      <div className='relative mt-1 rounded-md shadow-sm'>
        <input
          type='text'
          {...props}
          className='block w-full rounded-md text-black border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
        />
      </div>
    </div>
  );
};

export default Input;
