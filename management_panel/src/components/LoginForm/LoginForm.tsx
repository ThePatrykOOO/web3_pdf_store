import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import * as React from "react";
import { useState } from "react";
import { useAppDispatch } from "../../hooks/reduxHooks";
import { doLogin } from "../../store/slices/authSlice";
import { useNavigate } from "react-router-dom";

interface LoginFormData {
  email: string;
  password: string;
}

export const loginFormData: LoginFormData = {
  email: "",
  password: "",
};

export default function LoginForm() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [isLoading, setLoading] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    loginFormData.email = data.get("email") as string;
    loginFormData.password = data.get("password") as string;

    dispatch(doLogin(loginFormData))
      .then((data) => {
        if (data.payload !== undefined) {
          navigate("/");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <TextField
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email Address"
        name="email"
        autoComplete="email"
        autoFocus
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        id="password"
        autoComplete="current-password"
      />
      <FormControlLabel
        control={<Checkbox value="remember" color="primary" />}
        label="Remember me"
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        disabled={isLoading}
      >
        Sign In
      </Button>
    </Box>
  );
}
