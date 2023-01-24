import { httpApi } from "./http.api";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  payload: undefined;
  access_token: string;
  status: string;
}

export interface AuthMeResponse {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  role: string;
  public_address: string;
}

export const login = (loginPayload: LoginRequest): Promise<LoginResponse> =>
  httpApi
    .post<LoginResponse>("auth/login", { ...loginPayload })
    .then(({ data }) => data);

export const authMe = (): Promise<AuthMeResponse> => {
  return httpApi.get<AuthMeResponse>("auth/me").then(({ data }) => data);
};
