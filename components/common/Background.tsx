import Image from "next/image";
import svgSkin from "../../public/images/skin.svg";

export const Background = () => {
  return (
    <div className='flex justify-center inset-0 overflow-hidden absolute'>
      <Image
        fill
        className='opacity-[0.1] scale-[2] w-full'
        alt='skin'
        src={svgSkin}
      />
    </div>
  );
};

export default Background;
