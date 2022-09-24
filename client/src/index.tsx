import React from "react";
import ReactDOM from "react-dom/client";
import Home from "./pages/home";
import Layout from "./pages/layout";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Shopping from "./pages/shopping";
import Dark from "./darkModeIcon";
import Appbar from "./appbar";
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";
import Signin from "./pages/signin";

// fix ws error
window.process = {} as any;

export const ColorModeContext = React.createContext({
  toggleColorMode: () => {},
});

function ToggleColorMode() {
  const [mode, setMode] = React.useState<"light" | "dark">("light");
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Appbar />
        <App />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/shopping" element={<Shopping />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ToggleColorMode />
  </React.StrictMode>
);
