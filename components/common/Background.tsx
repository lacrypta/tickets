import Image from "next/image";
// import svgSkin from "../../public/images/skin.svg";

import SVGSkin from "../../public/images/skin.svg";

export const Background = () => {
  return (
    <div className='flex justify-center inset-0 overflow-hidden absolute'>
      {/* <Image
        className='opacity-[0.1] scale-[2] h-screen svg-shadow'
        alt='skin'
        src={svgSkin}
      /> */}

      <SVGSkin className='opacity-[0.1] scale-[2] h-screen svg-shadow' />
    </div>
  );
};

export default Background;
