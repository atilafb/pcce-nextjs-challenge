"use client";
import { createTheme, responsiveFontSizes } from "@mui/material/styles";

let theme = createTheme({
  palette: {
    primary: {
      main: "#1D428A",
      contrastText: "#fff",
    },
    secondary: {
      main: "#FFC72C",
      contrastText: "#fff",
    },
    text: {
      primary: "#212427",
      secondary: "#fff",
    },
  },
});
theme = responsiveFontSizes(theme);

export default theme;
