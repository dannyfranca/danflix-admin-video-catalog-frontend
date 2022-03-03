import { createTheme, PaletteOptions } from "@mui/material";
import { green, red } from "@mui/material/colors";

const palette: PaletteOptions = {
  primary: {
    main: "#0051D6",
    contrastText: "#fff",
  },
  secondary: {
    main: "#D69000",
    contrastText: "#fff",
  },
  background: {
    default: "#fafafa",
  },
  success: {
    main: green["500"],
    contrastText: "#fff",
  },
  error: {
    main: red["500"],
  },
};

export const theme = createTheme({
  palette,
});
