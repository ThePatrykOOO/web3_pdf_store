import { UserModel } from "../domain/UserModel";

export const readToken = (): string | null => {
  return localStorage.getItem("accessToken") || null;
};
export const persistToken = (token: string): void => {
  localStorage.setItem("accessToken", token);
};

export const persistUser = (user: UserModel): void => {
  localStorage.setItem("user", JSON.stringify(user));
};

export const readUser = (): UserModel | null => {
  const userStr = localStorage.getItem("user");
  console.log("userStr", userStr);
  return userStr !== null ? JSON.parse(userStr ?? "") : null;
};

export const deleteToken = (): void => localStorage.removeItem("accessToken");
export const deleteUser = (): void => localStorage.removeItem("user");
