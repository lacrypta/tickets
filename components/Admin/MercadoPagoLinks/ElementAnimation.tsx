import Lottie from "react-lottie";
import { motion } from "framer-motion";
import * as loadingAnimationData from "../../../public/images/lottie/loading-egg.json";
import * as checkAnimationData from "../../../public/images/lottie/check.json";

const Spinner = () => {
  return (
    <Lottie
      width={"40px"}
      height={"40px"}
      style={{ padding: 0 }}
      isClickToPauseDisabled={true}
      options={{
        loop: true,
        autoplay: true,
        animationData: loadingAnimationData,
      }}
    />
  );
};

const Check = () => {
  return (
    <Lottie
      width={"40px"}
      height={"40px"}
      style={{ padding: 0 }}
      isClickToPauseDisabled={true}
      options={{
        loop: false,
        autoplay: true,
        animationData: checkAnimationData,
      }}
    />
  );
};

interface ElementAnimationProps {
  type: "check" | "spinner";
}

export const ElementAnimation = ({ type }: ElementAnimationProps) => {
  return (
    <motion.div
      className='absolute top-0 left-0'
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
    >
      {type === "check" ? <Check /> : <Spinner />}
    </motion.div>
  );
};

export default ElementAnimation;
