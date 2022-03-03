import * as React from "react";
import Box from "@mui/material/Box";
import Link, { LinkProps } from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import MuiBreadcrumbs from "@mui/material/Breadcrumbs";
import RouteParser from "route-parser";
import { Link as RouterLink, Route, useLocation } from "react-router-dom";

import { Container } from "@mui/material";
import { theme } from "@/config/theme";
import routes from "../routes";

const breadcrumbNameMap: { [key: string]: string } = {};

routes.forEach((route) => {
  breadcrumbNameMap[route.path as string] = route.label;
});

interface LinkRouterProps extends LinkProps {
  to: string;
  replace?: boolean;
}

function LinkRouter(props: LinkRouterProps) {
  return <Link {...props} component={RouterLink as any} />;
}

const BreadCrumbsContent: React.FC = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);
  pathnames.unshift("/");

  return (
    <MuiBreadcrumbs aria-label="breadcrumb">
      {pathnames.map((value, index) => {
        const last = index === pathnames.length - 1;
        const to = `${pathnames
          .slice(0, index + 1)
          .join("/")
          .replace("//", "/")}`; // /categories | /categories/create/xpto
        const route = Object.keys(breadcrumbNameMap).find((path) =>
          new RouteParser(path).match(to)
        );

        if (route === undefined) return false;

        return last ? (
          <Typography color="text.primary" key={to}>
            {breadcrumbNameMap[route]}
          </Typography>
        ) : (
          <LinkRouter
            underline="hover"
            color="inherit"
            to={to}
            key={to}
            sx={{
              color: theme.palette.primary.main,
              "&:focus, &:active": { color: theme.palette.primary.main },
              "&:hover": { color: theme.palette.primary.dark },
            }}
          >
            {breadcrumbNameMap[route]}
          </LinkRouter>
        );
      })}
    </MuiBreadcrumbs>
  );
};

const Breadcrumbs: React.FC = () => {
  return (
    <Container>
      <Box sx={{ paddingTop: 2, paddingBottom: 1 }}>
        <Route>
          <BreadCrumbsContent />
        </Route>
      </Box>
    </Container>
  );
};

export default Breadcrumbs;
