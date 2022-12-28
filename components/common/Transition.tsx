import styled from "@emotion/styled";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";
import React from "react";

interface ITransitionProps {
  children: React.ReactNode;
}

const variants = {
  in: {
    transform: "rotateY(90deg)",
  },
  out: {
    transform: "rotateY(-90deg)",
  },
  inactive: {
    transform: "rotateY(0deg)",
    transition: {
      duration: 0.4,
      delay: 0.5,
      ease: "backOut",
    },
  },
};

const Wrapper = styled.div`
  perspective: 1000px;
  position: relative;
  width: 100%;
  top: 0;
`;

const MotionDiv = styled(motion.div)`
  position: relative;
  top: 0;
  width: 100%;
  height: 100%;

  margin: 0 auto;
  transform: rotateY(0deg);
  transform-style: preserve-3d;

  & * {
    transform-style: preserve-3d;
  }
`;

export const Transition = ({ children }: ITransitionProps) => {
  const { asPath } = useRouter();
  return (
    <Wrapper>
      <AnimatePresence>
        <MotionDiv
          key={asPath}
          variants={variants}
          animate='inactive'
          initial='in'
          exit='out'
          transition={{ duration: 0.4, ease: "backIn" }}
        >
          {children}
        </MotionDiv>
      </AnimatePresence>
    </Wrapper>
  );
};

export default Transition;
