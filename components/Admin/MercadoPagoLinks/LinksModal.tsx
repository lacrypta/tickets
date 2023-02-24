import React, { useCallback, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Button from "../../Form/Button";
import LinksLoader from "./LinksLoader";

interface IModalMessageProps {
  show: boolean;
  onClose: () => void;
}

const Header = ({ onClose }: { onClose: () => void }) => (
  <div className='bg-white rounded-sm h-16 flex flex-col justify-center text-xl mb-4'>
    <h2 className=''>Links</h2>
    <button
      className='absolute top-4 right-4 h-8 w-8 rounded-full bg-black text-white p-0 flex justify-center align-middle'
      onClick={onClose}
    >
      x
    </button>
  </div>
);

export const LinksModal = ({ show, onClose }: IModalMessageProps) => {
  const [links, setLinks] = useState<string[]>([]);

  const handleSubmit = useCallback((e: any) => {
    setLinks(e.target.links.value.split("\n"));
    e.preventDefault();
    return false;
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <div className='absolute top-[20%] left-[50%] translate-x-[-50%] z-20 w-screen max-w-3xl'>
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0, height: 0 }}
            transition={{ type: "spring", duration: 0.5 }}
            className='flex flex-col justify-center overflow-hidden text-center text-black
 bg-gray-100 p-2 pb-5 rounded-md drop-shadow-md'
          >
            <div>
              <Header onClose={onClose} />

              <LinksLoader links={links} />

              <form onSubmit={handleSubmit} className='mt-4'>
                <div>
                  <textarea
                    id='links'
                    name='links'
                    className='w-full'
                  ></textarea>
                </div>
                <Button type='submit'>Agregar Links</Button>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default LinksModal;
