import React, { memo, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { WithChildrenProps } from "../types/generalTypes";
import { doAuthMe, setMe } from "../store/slices/authSlice";

const RequireAuth: React.FC<WithChildrenProps> = ({ children }) => {
  const dispatch = useAppDispatch();

  const token = useAppSelector((state) => state.auth.token);
  let me = useAppSelector((state) => state.auth.me);

  useEffect(() => {
    function authMe() {
      dispatch(doAuthMe()).then((res) => dispatch(setMe(res)));
    }

    if (!me) {
      authMe();
    }
  }, [dispatch]);

  console.log("me", token, me);

  if (!me) {
    return <div>Loading...</div>;
  } else {
    return token && me ? (
      <>{children}</>
    ) : (
      <Navigate to="/auth/login" replace />
    );
  }
};

export default memo(RequireAuth);
