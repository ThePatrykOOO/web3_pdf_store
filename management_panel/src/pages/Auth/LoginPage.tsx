import * as React from "react";
import Typography from "@mui/material/Typography";
import LoginForm from "../../components/LoginForm/LoginForm";

export default function LoginPage() {
  return (
    <>
      <Typography component="h1" variant="h5">
        Login user
      </Typography>
      <LoginForm />
    </>
  );
}
