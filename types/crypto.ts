// Interfaces
export interface ITokenTransferEvent {
  hash: string;
  contractAddress: string;
  from: string;
  to: string;
  value: number;
}
