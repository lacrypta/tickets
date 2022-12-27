import Image from "next/image";
import svgSkin from "../../public/images/skin.svg";

export const Background = () => {
  return (
    <div className='flex justify-center inset-0 overflow-hidden absolute'>
      <Image
        className='opacity-[0.1] scale-[2] h-screen'
        alt='skin'
        src={svgSkin}
      />
    </div>
  );
};

export default Background;
