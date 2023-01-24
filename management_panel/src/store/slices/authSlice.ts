import { createAsyncThunk, createSlice, Slice } from "@reduxjs/toolkit";
import {
  authMe,
  AuthMeResponse,
  login,
  LoginRequest,
  LoginResponse,
} from "../../api/auth.api";
import { persistToken, readToken } from "../../services/localStorage.service";
import { setUser, userSlice } from "./userSlice";

export interface AuthSlice {
  token: string | null;
}
const initialState: AuthSlice = {
  token: readToken(),
};

export const doLogin = createAsyncThunk(
  "auth/doLogin",
  async (loginPayload: LoginRequest, { dispatch }) =>
    login(loginPayload).then(
      async (res: LoginResponse): Promise<LoginResponse> => {
        await persistToken(res.access_token);
        const authMe = await dispatch(doAuthMe());
        await dispatch(setUser(authMe.payload));
        return res;
      }
    )
);

export const doAuthMe = createAsyncThunk(
  "auth/doAuthMe",
  async (): Promise<AuthMeResponse> => authMe()
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // builder.addCase(doLogin.fulfilled, (state, action) => {
    //   state.token = action.payload.access_token;
    // });
    // builder.addCase(doLogout.fulfilled, (state) => {
    //   state.token = "";
    // });
  },
});

export default authSlice.reducer;
