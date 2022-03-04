import * as React from "react";
import {
  SnackbarProvider as NotistackProvider,
  SnackbarProviderProps,
  WithSnackbarProps,
} from "notistack";
import { IconButton } from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";

const SnackbarProvider: React.FC<SnackbarProviderProps> = (props) => {
  let snackbarProviderRef;
  const { children } = props;

  const defaultProps: Partial<SnackbarProviderProps> = {
    autoHideDuration: 3000,
    maxSnack: 3,
    anchorOrigin: {
      horizontal: "right",
      vertical: "top",
    },
    ref: (el) => (snackbarProviderRef = el),
    action: (key) => (
      <IconButton
        color="inherit"
        style={{ fontSize: 20 }}
        onClick={() =>
          (snackbarProviderRef as WithSnackbarProps).closeSnackbar(key)
        }
      >
        <CloseIcon />
      </IconButton>
    ),
  };

  const newProps = { ...defaultProps, ...props };

  return <NotistackProvider {...newProps}>{children}</NotistackProvider>;
};

export default SnackbarProvider;
