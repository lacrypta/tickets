import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Button from "../Form/Button";

interface ICryptoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CryptoModal = ({ isOpen, onClose }: ICryptoModalProps) => {
  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog onClose={() => onClose()} className='relative z-50'>
        {/* The backdrop, rendered as a fixed sibling to the panel container */}
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-500'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-black/30' aria-hidden='true' />
        </Transition.Child>

        {/* Full-screen container to center the panel */}
        <div className='fixed inset-0 flex items-center justify-center p-4'>
          {/* The actual dialog panel  */}
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-500'
            enterFrom='opacity-0 scale-95'
            enterTo='opacity-100 scale-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100 scale-100'
            leaveTo='opacity-0 scale-95'
          >
            <Dialog.Panel className='w-full max-w-sm rounded bg-white text-black p-5'>
              <h1 className='mb-2'>Pago con crypto</h1>
              <Dialog.Description>En construcción....</Dialog.Description>

              <Button disabled={true}>Pagar</Button>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default CryptoModal;
