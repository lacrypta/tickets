import { memo } from "react";

export const Footer = () => {
  return (
    <div className='flex justify-center text-black bg-white p-5'>
      <a href='https://peronio.ar' target='_blank' rel='noopener noreferrer'>
        Hecho con ❤️ por Peronio Army
      </a>
    </div>
  );
};

export default memo(Footer);
