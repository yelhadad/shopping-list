import React from "react";
import ReactDOM from "react-dom";
import { ScopedCssBaseline, Button } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const themeLight = createTheme({
  palette: {
    background: {
      default: "#fff",
    },
    text: {
      //@ts-ignore
      default: "#000",
    },
  },
});

const themeDark = createTheme({
  palette: {
    background: {
      default: "#000",
    },
    text: {
      primary: "#fff",
    },
  },
});

export default function Shopping() {
  const [light, setLight] = React.useState(true);

  return (
    <ThemeProvider theme={light ? themeLight : themeDark}>
      <ScopedCssBaseline enableColorScheme>
        <Button onClick={() => setLight((prev) => !prev)}>Toggle Theme</Button>
      </ScopedCssBaseline>
    </ThemeProvider>
  );
}
