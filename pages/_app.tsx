import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";

const theme = createTheme({
  palette: {
    primary: {
      main: "#0046E4",
      dark: "#00319E",
      light: "#286AFF",
    },
    error: {
      main: "#E7133D",
    },
    common: {
      white: "#FFF",
      black: "#000",
      golden: "#FFD700",
    },
  },
  typography: {
    fontFamily: "Vazirmatn FD",
    fontSize: 16,
    htmlFontSize: 16,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 600,
    h1: {
      fontWeight: 600,
      fontSize: "2.375rem",
      lineHeight: 1.21,
    },
    h2: {
      fontWeight: 600,
      fontSize: "1.875rem",
      lineHeight: 1.27,
    },
    h3: {
      fontWeight: 600,
      fontSize: "1.5rem",
      lineHeight: 1.33,
    },
    h4: {
      fontWeight: 600,
      fontSize: "1.25rem",
      lineHeight: 1.4,
    },
    h5: {
      fontWeight: 600,
      fontSize: "1rem",
      lineHeight: 1.5,
    },
    h6: {
      fontWeight: 400,
      fontSize: "0.875rem",
      lineHeight: 1.57,
    },
    caption: {
      fontWeight: 400,
      fontSize: "0.75rem",
      lineHeight: 1.66,
    },
    body1: {
      fontSize: "0.875rem",
      lineHeight: 1.57,
    },
    body2: {
      fontSize: "0.75rem",
      lineHeight: 1.66,
    },
    subtitle1: {
      fontSize: "0.875rem",
      fontWeight: 600,
      lineHeight: 1.57,
    },
    subtitle2: {
      fontSize: "0.75rem",
      fontWeight: 500,
      lineHeight: 1.66,
    },
    overline: {
      lineHeight: 1.66,
    },
    button: {
      textTransform: "capitalize",
    },
  },
  direction: "rtl",
});

const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </CacheProvider>
  );
}
