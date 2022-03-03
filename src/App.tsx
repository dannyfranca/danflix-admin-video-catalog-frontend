import React, { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import "./i18t";
import { Box } from "@mui/system";
import { CssBaseline, ThemeProvider } from "@mui/material";

import Breadcrumbs from "./components/BreadCrumb";
import NavBar from "./components/NavBar";
import AppRouter from "./routes/AppRouter";
import { theme } from "./config/theme";

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <NavBar />
        <Box paddingTop="70px">
          <Breadcrumbs />
          <AppRouter />
        </Box>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
