import React, { useEffect } from "react";
import { IPurchase } from "../../types/purchase";
import ModalMessage from "./ModalMessage";
import { motion } from "framer-motion";
import CheckIcon from "./CheckIcon";

import useSound from "use-sound";

interface ITicketDetailsProps {
  purchase: IPurchase;
}

export const TicketDetails = ({ purchase }: ITicketDetailsProps) => {
  const [play] = useSound("/sounds/success.mp3", { volume: 0.5 });

  useEffect(() => {
    play();
  }, [play]);

  return (
    <ModalMessage>
      <div className='text-3xl bg-black/[0.60] text-white rounded-sm mb-4 p-2'>
        Exitoso
      </div>
      <div className='flex flex-col space-y-4 text-left pl-3'>
        <div>
          Nombre: <b>{purchase.user.fullname}</b>
        </div>
        <div>
          Email: <b>{purchase.user.email}</b>
        </div>
      </div>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ bounce: 0.25, duration: 0.5, delay: 0.3 }}
      >
        <CheckIcon />
      </motion.div>
    </ModalMessage>
  );
};

export default TicketDetails;
