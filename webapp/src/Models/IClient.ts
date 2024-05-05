export interface IClient {
  clientId: number | null;
  name: string;
  email: string;
  password: string;
  cardNo: number;
  expiry: string;
  cvc: string;
  country: string;
}
