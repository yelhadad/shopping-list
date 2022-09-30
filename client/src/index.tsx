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
import Signup from "./pages/signup";
import NotFound from "./pages/notFound";
import axios from "axios";
import ShoppingTest from "./pages/shopping-test";

// fix ws error
window.process = {} as any;
export const IsLoggedIn = React.createContext(false);

export const ColorModeContext = React.createContext({
  toggleColorMode: () => {},
});

function ToggleColorMode() {
  const [user, setUser] = React.useState(false);
  React.useEffect(() => {
    axios
      .get("/api/auth/currentuser")
      .then((res) => {
        console.log(res.data);
        setUser(true);
      })
      .catch((res) => {
        console.log("error function runs agian");
        setUser(false);
      });
    console.log(user);
  }, []);

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
        <IsLoggedIn.Provider value={user}>
          <CssBaseline />
          <App />
        </IsLoggedIn.Provider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Appbar />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/shopping" element={<Shopping />} />
          <Route path="/shopping-test" element={<ShoppingTest />} />
          <Route path="*" element={<NotFound />} />
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
