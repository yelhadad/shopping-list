import axios from "axios";
import { NavigateFunction } from "react-router-dom";

export const signout = (navigate: NavigateFunction) => {
  try {
    axios.post("/api/auth/signout");
    navigate("/");
  } catch (error) {
    console.error("unable to sign out");
  }
};
