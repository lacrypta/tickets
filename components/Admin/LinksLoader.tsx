import { preferences } from "mercadopago";
import { useCallback, useEffect, useState } from "react";

interface LinksLoaderProps {
  links?: string[];
}

type LinkProcessStatus =
  | "pending"
  | "processing"
  | "saving"
  | "ready"
  | "cancelled"
  | "invalid";

interface LinkProcess {
  url: string;
  preference_id?: string;
  status: LinkProcessStatus;
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
        <div key={k}>{link.url}</div>
      ))}
    </div>
  );
};

export default LinksLoader;
