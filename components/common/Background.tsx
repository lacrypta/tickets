import Image from "next/image";
import svgSkin from "../../public/images/skin.svg";

export const Background = () => {
  return (
    <div className='flex justify-center h-full overflow-hidden absolute'>
      <Image className='opacity-[0.1]' alt='skin' src={svgSkin} />
    </div>
  );
};

export default Background;
