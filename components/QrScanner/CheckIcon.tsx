import Lottie from "react-lottie";
import * as animationData from "../../public/images/lottie/check.json";

const defaultOptions = {
  loop: false,
  autoplay: true,
  animationData: animationData,
};

export const CheckIcon = () => {
  return <Lottie options={defaultOptions} />;
};

export default CheckIcon;
