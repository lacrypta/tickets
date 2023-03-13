import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { ajaxCall } from "../../../lib/public/request";
import ElementAnimation from "./ElementAnimation";

export type LinkProcessStatus =
  | "pending"
  | "processing"
  | "saving"
  | "ready"
  | "cancelled"
  | "invalid";

interface ProcessingLinkProps {
  link: string;
  index: number;
  active: boolean;
  onFinished: () => void;
}

export const ProcessingLink = ({
  link,
  index,
  active,
  onFinished,
}: ProcessingLinkProps) => {
  const [status, setStatus] = useState<LinkProcessStatus>("pending");

  useEffect(() => {
    if (active) {
      processLink(link);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [link, active]);

  const processLink = useCallback(async (link: string) => {
    setStatus("processing");
    const res = await ajaxCall("mercadopago", {
      link,
    });
    setTimeout(() => {
      setStatus("ready");
      onFinished && onFinished();
    }, 500);

    console.dir(res);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <motion.div
      className={
        "flex items-center pl-4 overflow-hidden relative transition-all " +
        (status === "ready" && "bg-white")
      }
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: 40, opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{
        duration: 0.25,
        delay: 0.15 + 0.15 * index,
      }}
    >
      <span>{link}</span>
      <span className='w-[40px] h-[40px] relative'>
        <AnimatePresence>
          {status === "processing" && <ElementAnimation type='spinner' />}
          {status === "ready" && <ElementAnimation type='check' />}
        </AnimatePresence>
      </span>
      {/* <span>{link.status}</span> */}
    </motion.div>
  );
};

export default ProcessingLink;
