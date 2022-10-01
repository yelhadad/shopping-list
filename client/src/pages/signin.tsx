import {
  Card,
  CardContent,
  Container,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CurrentUser } from "..";

const Doamin = process.env.DOMAIN;

export default function Signin() {
  const { user, setUser } = useContext(CurrentUser);
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const onSubmit = async (e: React.FormEvent<HTMLDivElement>) => {
    e.preventDefault();
    try {
      await axios.post("/api/auth/signin", {
        email,
        password,
      });
      navigate("/shopping");
      setUser({ email });
    } catch (error) {
      alert("userName or password are not corrent");
    }
  };

  return (
    <Container>
      <Card
        sx={{ marginTop: 10 }}
        onSubmit={onSubmit}
        component="form"
        variant="outlined"
      >
        <CardContent
          sx={{
            display: "flex",
            margin: 4,
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography fontSize={20}>Sign In!</Typography>
          <TextField
            onChange={(e) => setEmail(e.target.value)}
            variant="standard"
            label="email"
            type="email"
            value={email}
          />
          <br />
          <TextField
            onChange={(e) => setPassword(e.target.value)}
            variant="standard"
            label="password"
            type="password"
            value={password}
          />
          <br />
          <Button type="submit" color="primary" variant="outlined">
            Submit
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
}
