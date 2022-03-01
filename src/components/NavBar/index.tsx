import * as React from "react";
import { AppBar, Button, Toolbar } from "@mui/material";

import Logo from "../Logo";
import Menu from "./Menu";

const NavBar: React.FC = () => {
  return (
    <AppBar>
      <Toolbar sx={{ backgroundColor: "#000000" }}>
        <Menu />
        <Logo />
        <Button color="inherit">Login</Button>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
