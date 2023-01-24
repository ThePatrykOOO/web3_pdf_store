import Toolbar from "@mui/material/Toolbar";
import { AppBar } from "@mui/material";
import * as React from "react";

export default function TopBar() {
  return (
    <AppBar position="absolute">
      <Toolbar
        sx={{
          pr: "24px", // keep right padding when drawer closed
        }}
      ></Toolbar>
    </AppBar>
  );
}
