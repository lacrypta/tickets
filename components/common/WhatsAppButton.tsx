import { memo, useCallback } from "react";
import whatsAppImage from "../../public/images/whatsapp.png";

export const WhatsAppButton = () => {
  const openWhatsapp = useCallback(() => {
    const phone = "541131080456";
    const message = encodeURIComponent(`Hola, necesito ayuda con mi compra.`);

    window.open(
      `https://api.whatsapp.com/send/?phone=%2B${phone}&text=${message}&type=phone_number&app_absent=0`
    );
  }, []);

  return (
    <button className='flex bg-[#4ec95d] rounded-full w-20 h-20 p-4 object-center items-center justify-center fixed z-50 bottom-4 right-4 hover:scale-110 transition ease-in-out'>
      <img onClick={openWhatsapp} src={whatsAppImage.src} alt='Ayuda' />
    </button>
  );
};

export default memo(WhatsAppButton);
