import { useCallback, useEffect, useState } from "react";
import ProcessingLink, { LinkProcess } from "./ProcessingLink";

interface LinksLoaderProps {
  links?: string[];
}

export const LinksLoader = ({ links = [] }: LinksLoaderProps) => {
  const [processingLinks, setProcessingLinks] = useState<LinkProcess[]>([]);
  const [processing, setProcessing] = useState(false);

  const processLinks = useCallback(
    async (links: string[]) => {
      setProcessing(true);
      const _processingLinks = links.map(
        (link) =>
          ({
            url: link,
            status: "pending",
          } as LinkProcess)
      );
      setProcessingLinks(_processingLinks);
      console.info("Start Processing Links...");
      console.dir(processingLinks);
    },
    [processingLinks]
  );

  useEffect(() => {
    processLinks(links);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [links]);

  return (
    <div>
      {processingLinks.map((link, k) => (
        <ProcessingLink link={link} key={k} />
      ))}
    </div>
  );
};

export default LinksLoader;
