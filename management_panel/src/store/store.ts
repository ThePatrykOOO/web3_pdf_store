import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import authSlice from "./slices/authSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    user: userSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
