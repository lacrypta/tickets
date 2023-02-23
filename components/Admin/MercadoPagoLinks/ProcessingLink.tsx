export type LinkProcessStatus =
  | "pending"
  | "processing"
  | "saving"
  | "ready"
  | "cancelled"
  | "invalid";

export interface LinkProcess {
  url: string;
  preference_id?: string;
  status: LinkProcessStatus;
}

interface ProcessingLinkProps {
  link: LinkProcess;
}

export const ProcessingLink = ({ link }: ProcessingLinkProps) => {
  return (
    <div className='flex w-full'>
      <span>url : {link.url}</span>
      <span>{link.preference_id}</span>
      <span>{link.status}</span>
    </div>
  );
};

export default ProcessingLink;
