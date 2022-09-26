import {
  Card,
  CardContent,
  Container,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Doamin = process.env.DOMAIN;

export default function Signin() {
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
          <Button type="submit" color="primary">
            Submit
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
}
