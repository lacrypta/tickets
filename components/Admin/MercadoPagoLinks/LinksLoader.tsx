import ProcessingLink from "./ProcessingLink";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";

interface LinksLoaderProps {
  links?: string[];
}

export const LinksLoader = ({ links = [] }: LinksLoaderProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const handleFinished = () => {
    setCurrentIndex((c) => c + 1);
    console.info("currentIndex", currentIndex);
  };

  return (
    <div>
      <AnimatePresence>
        {links.map((link, k) => (
          <ProcessingLink
            active={k <= currentIndex}
            link={link}
            key={k}
            index={k}
            onFinished={handleFinished}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default LinksLoader;
