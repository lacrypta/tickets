import Lottie, { Options } from "react-lottie";
import * as loadingAnimationData from "../../public/images/lottie/loading-egg.json";

const loadingOptions: Options = {
  loop: true,
  autoplay: true,
  animationData: loadingAnimationData,
};

export const LoadingSpinner = () => {
  return (
    <div className='flex justify-center'>
      <div className='w-64 h-64'>
        <Lottie
          width={"100%"}
          height={"100%"}
          style={{ padding: 0 }}
          isClickToPauseDisabled={true}
          options={loadingOptions}
        />
      </div>
    </div>
  );
};

export default LoadingSpinner;
