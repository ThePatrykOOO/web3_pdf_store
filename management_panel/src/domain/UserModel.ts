export interface UserModel {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  role: "SELLER" | "ADMIN";
  public_address: string;
}
