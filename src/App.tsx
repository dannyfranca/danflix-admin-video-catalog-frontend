import React from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import "./i18t";
import { Box } from "@mui/system";
import { CssBaseline, ThemeProvider } from "@mui/material";

import Breadcrumbs from "./components/BreadCrumb";
import NavBar from "./components/NavBar";
import AppRouter from "./routes/AppRouter";
import { theme } from "./config/theme";
import SnackbarProvider from "./components/SnackbarProvider";

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider>
        <CssBaseline />
        <BrowserRouter>
          <NavBar />
          <Box paddingTop="70px">
            <Breadcrumbs />
            <AppRouter />
          </Box>
        </BrowserRouter>
      </SnackbarProvider>
    </ThemeProvider>
  );
};

export default App;
