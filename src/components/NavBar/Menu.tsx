import * as React from "react";
import { IconButton, Menu as MuiMenu, MenuItem } from "@mui/material";

import { Menu as MenuIcon } from "@mui/icons-material";
import { Link } from "react-router-dom";
import routes from "../../routes";

const Menu: React.FC = () => {
  const listRoutes = ["dashboard", "categories.list"];
  const menuRoutes = routes.filter((route) => listRoutes.includes(route.name));
  const [anchorElement, setAnchorElement] = React.useState(null);
  const open = Boolean(anchorElement);

  const handleOpen = (event) => setAnchorElement(event.currentTarget);
  const handleClose = () => setAnchorElement(null);

  return (
    <>
      <IconButton
        edge="start"
        color="inherit"
        aria-label="open drawer"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleOpen}
      >
        <MenuIcon />
      </IconButton>
      <MuiMenu
        id="menu-appbar"
        open={open}
        anchorEl={anchorElement}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        transformOrigin={{ vertical: "top", horizontal: "center" }}
      >
        {listRoutes.map((routeName) => {
          const route = menuRoutes.find((r) => r.name === routeName);
          return (
            <MenuItem
              key={route?.name}
              component={Link}
              to={route?.path}
              onClick={handleClose}
            >
              {route?.label}
            </MenuItem>
          );
        })}
      </MuiMenu>
    </>
  );
};

export default Menu;
