import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import DarkModeIcon from "./darkModeIcon";
import { useNavigate, redirect } from "react-router-dom";
import { CurrentUserContext } from "./index";
import axios from "axios";
import { signout } from "./functions/signout";

export default function ButtonAppBar() {
  const navigate = useNavigate();
  const current_user = React.useContext(CurrentUserContext);
  console.log(current_user);

  const LoginButtons = () => {
    if (current_user !== null) {
      return (
        <div>
          <Button color="inherit" onClick={() => navigate("/signup")}>
            Signup
          </Button>
          <Button color="inherit" onClick={() => navigate("/signin")}>
            Login
          </Button>
        </div>
      );
    } else {
      return (
        <Button color="inherit" onClick={() => signout(navigate)}>
          Sign out
        </Button>
      );
    }
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 0 }}
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography>
          <LoginButtons />
          <DarkModeIcon />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
