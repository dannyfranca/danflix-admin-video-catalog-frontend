import { createTheme, SimplePaletteColorOptions } from "@mui/material";

import { theme } from "./theme";

export const dataTableTheme = createTheme({
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: theme.palette!.background!.default,
        },
        elevation1: {
          backgroundColor: theme.palette!.background!.default,
          boxShadow: "none",
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
    MuiTableRow: {
      styleOverrides: {
        head: {
          backgroundColor: `${theme.palette!.primary!.main}!important`,
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
          backgroundColor: (theme.palette!.primary as SimplePaletteColorOptions)
            .main,
          " div,span,path": {
            color: "#ffffff",
          },
        },
      },
    },
  },
});
