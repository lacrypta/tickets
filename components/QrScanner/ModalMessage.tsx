import { motion } from "framer-motion";
import React from "react";

interface IModalMessageProps {
  children: React.ReactNode;
}

export const ModalMessage = ({ children }: IModalMessageProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0 }}
      transition={{ duration: 0.3 }}
      className='absolute inset-x-0 bottom-0 h-[30%] z-20 
flex flex-col justify-center text-center
bg-white/[0.25] backdrop-blur-md'
    >
      {children}
    </motion.div>
  );
};

export default ModalMessage;
