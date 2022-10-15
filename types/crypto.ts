// Interfaces
export interface ITokenTransferEvent {
  hash: string;
  contractAddress: string;
  from: string;
  to: string;
  value: number;
}

export interface ITransaction {
  hash: string;
  contractAddress: string;
  from: string;
  to: string;
  value: number;
  orderId: string;
}
