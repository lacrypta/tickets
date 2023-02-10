import { motion } from "framer-motion";
import React from "react";

interface IModalMessageProps {
  children: React.ReactNode;
}

export const ModalMessage = ({ children }: IModalMessageProps) => {
  return (
    <div className='absolute top-[20%] left-[50%] translate-x-[-50%] z-20 w-96'>
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0, height: 0 }}
        transition={{ type: "spring", duration: 0.5 }}
        className='flex flex-col justify-center overflow-hidden text-center text-black
 bg-white/[0.70] p-2 pb-5 rounded-md drop-shadow-md'
      >
        {children}
      </motion.div>
    </div>
  );
};

export default ModalMessage;
