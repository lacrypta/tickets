export interface LnUrlWithdrawBody {
  title: string;
  min_withdrawable: number;
  max_withdrawable: number;
  uses: number;
  wait_time: number;
  is_unique: boolean;
  webhook_url?: string | null;
}

export interface LnUrlWithdrawData extends LnUrlWithdrawBody {
  id: "P2WhQG";
  wallet: "44b98150909c4fc5b8cef057a900e6ac";
  unique_hash: "NcuTeQmReR9A64yvGoZzMX";
  k1: "5DG9GqAdvrh235agRKdy2o";
  open_time: 1676296852;
  used: 0;
  usescsv: "0";
  number: 0;
  webhook_url: string | null;
  webhook_headers: string | null;
  webhook_body: string | null;
  custom_url: string | null;
  lnurl: string;
}
