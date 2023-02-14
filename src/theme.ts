import { red } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

// A custom theme for this app
const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#000",

      dark: "#fff",
    },
    secondary: {
      main: "#EA9085",
    },
    error: {
      main: red.A400,
    },
    success: {
      main: "#81c784",
    },
  },
});

export default theme;
