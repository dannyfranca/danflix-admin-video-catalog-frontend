import { createTheme, SimplePaletteColorOptions } from "@mui/material";

import { theme } from "./theme";

export const dataTableTheme = createTheme({
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: theme.palette!.background!.default,
        },
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          minHeight: "48px !important",
          paddingTop: 8,
          paddingBottom: 8,
        },
      },
    },
    MuiTable: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(0,0,0,0) !important",
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(0,0,0,0) !important",
          paddingTop: 8,
          paddingBottom: 8,
        },
        head: {
          paddingTop: 0,
          paddingBottom: 0,
          backgroundColor: `${theme.palette!.primary!.main}!important`,
          " div,span,path": {
            color: "#ffffff",
          },
        },
      },
    },
  },
});
