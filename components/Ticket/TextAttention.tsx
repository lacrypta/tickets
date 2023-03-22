import { motion } from "framer-motion";
import React, { memo } from "react";

export interface ITextAttentionProps {
  children: React.ReactNode;
}

const TextAttention = ({ children }: ITextAttentionProps) => {
  return (
    <motion.div
      className='box'
      // animate={{
      //   scale: [0.8, 1.3, 1.5, 1.3, 0.8],
      //   rotate: [0, 10, 0, -10, 0],
      // }}
      transition={{
        duration: 1,
        ease: "easeInOut",
        times: [0, 0.2, 0.5, 0.8, 1],
        repeat: Infinity,
        repeatDelay: 0.5,
      }}
    >
      <div className='text-center text-2xl mt-5 mb-5'>{children}</div>
    </motion.div>
  );
};

export default memo(TextAttention);
