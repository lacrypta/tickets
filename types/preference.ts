export interface IPreference {
  id: string;
  type: "link" | "fallback";
  updated: Date;
  paymentId: string;
  link?: string;
}
