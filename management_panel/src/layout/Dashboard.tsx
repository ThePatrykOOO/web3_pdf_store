import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Sidebar from "../components/layouts/Sidebar";
import TopBar from "../components/layouts/TopBar";
import { Outlet } from "react-router-dom";
import { grey } from "@mui/material/colors";

const mdTheme = createTheme();

export default function Dashboard() {
  const boxStyle = {
    backgroundColor: grey["100"],
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  };

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <TopBar />
        <Sidebar />
        <Box component="main" sx={boxStyle}>
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Outlet />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
