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
      secondary: "#818f98",
    },
    common: {
      black: "#212427",
      white: "#ffffff",
    },
  },
});
theme = responsiveFontSizes(theme);

export default theme;
