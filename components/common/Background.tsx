import SVGSkin from "../../public/images/skin.svg";

export const Background = () => {
  return (
    <div className='flex justify-center inset-0 overflow-hidden absolute'>
      <SVGSkin className='opacity-[0.1] scale-[2] h-screen' />
    </div>
  );
};

export default Background;
