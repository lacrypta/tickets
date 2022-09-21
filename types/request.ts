export interface ISignupRequestBody {
  address: string;
  username: string;
  permitData: {
    contract: string;
    name: string;
    spender: string;
    value: string;
    deadline: number;
  };
  signature: {
    r: string;
    s: string;
    v: number;
  };
}
