import { ThemeProvider as MUIThemeProvider } from "@mui/material";
import theme from "./styles/theme";

export default function Providers({ children }: { children: React.ReactNode }) {
  return <MUIThemeProvider theme={theme}>{children}</MUIThemeProvider>;
}
