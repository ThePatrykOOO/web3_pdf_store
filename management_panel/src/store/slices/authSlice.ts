import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  authMe,
  AuthMeResponse,
  login,
  LoginRequest,
  LoginResponse,
} from "../../api/auth.api";
import { persistToken, readToken } from "../../services/localStorage.service";
import { setUser } from "./userSlice";

export interface AuthSlice {
  initialState: any;
  token: string | null;
  me: AuthMeResponse | null;
}
const initialState: { me: null; token: string | null } = {
  token: readToken(),
  me: null,
};

export const doLogin = createAsyncThunk(
  "auth/doLogin",
  async (loginPayload: LoginRequest, { dispatch }) =>
    login(loginPayload).then(
      async (res: LoginResponse): Promise<LoginResponse> => {
        await persistToken(res.access_token);
        const authMe = await doAuthMe();
        await dispatch(setUser(authMe));
        return res;
      }
    )
);

export const doAuthMe = createAsyncThunk(
  "auth/doAuthMe",
  async (): Promise<AuthMeResponse> =>
    authMe().then(async (res: AuthMeResponse): Promise<AuthMeResponse> => {
      return res;
    })
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMe: (state, action) => {
      state.me = action.payload; // mutate the state all you want with immer
    },
  },
  extraReducers: (builder) => {
    // builder.addCase(doLogin.fulfilled, (state, action) => {
    //   state.token = action.payload.access_token;
    // });
    // builder.addCase(doLogout.fulfilled, (state) => {
    //   state.token = "";
    // });
    // builder.addCase(doAuthMe.fulfilled, (state, action) => {
    //   state.me = action.payload as AuthMeResponse;
    // });
  },
});

export const { setMe } = authSlice.actions;

export default authSlice.reducer;
