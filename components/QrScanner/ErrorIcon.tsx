import { memo } from "react";
import Lottie from "react-lottie";
import * as animationData from "../../public/images/lottie/error.json";

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
};

export const ErrorIcon = () => {
  return <Lottie options={defaultOptions} />;
};

export default memo(ErrorIcon);
