import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { readToken } from "../services/localStorage.service";
import { toast } from "react-toastify";

export const httpApi = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

httpApi.interceptors.request.use((config: AxiosRequestConfig) => {
  config.headers.set("Authorization", `Bearer ${readToken()}`);

  return config;
});

export class ApiError<T> extends Error {
  options?: T;

  constructor(message: string, options?: T) {
    super(message);
    this.options = options;
  }
}

interface AxiosErrorResponse {
  error: string;
  message: Array<string>;
  statusCode: string;
}

httpApi.interceptors.response.use(undefined, (error: AxiosError) => {
  // @ts-ignore
  const errorResponse: AxiosErrorResponse = error.response?.data;
  console.log("errorResponse", errorResponse);

  toast.error(errorResponse.message.join("\n"), {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
});
