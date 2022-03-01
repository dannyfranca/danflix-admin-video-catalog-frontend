import { Box } from "@mui/system";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Breadcrumbs from "./components/BreadCrumb";
import NavBar from "./components/NavBar";
import AppRouter from "./routes/AppRouter";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <NavBar />
      <Box paddingTop="70px">
        <Breadcrumbs />
        <AppRouter />
      </Box>
    </BrowserRouter>
  );
};

export default App;
