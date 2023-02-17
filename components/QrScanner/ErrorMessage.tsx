import ModalMessage from "./ModalMessage";
import { motion } from "framer-motion";
import ErrorIcon from "./ErrorIcon";
import { memo, useEffect } from "react";
import useSound from "use-sound";

export const ErrorMessage = ({ message }: { message: string }) => {
  const [play] = useSound("/sounds/error.mp3", { volume: 0.5 });

  useEffect(() => {
    play();
  }, [play]);
  return (
    <ModalMessage>
      <div className='text-3xl bg-red-600 text-white rounded-sm mb-4 p-2'>
        Error
      </div>
      <div className='flex flex-col space-y-4 text-left pl-3'>
        <div>
          <b>{message}</b>
        </div>
      </div>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ bounce: 0.25, duration: 0.5, delay: 0.3 }}
      >
        <ErrorIcon />
      </motion.div>
    </ModalMessage>
  );
};

export default memo(ErrorMessage);
