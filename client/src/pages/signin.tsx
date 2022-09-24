import { Card, CardContent, Container, TextField, Button } from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";

const Doamin = process.env.DOMAIN;

export default function Signin() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const onSubmit = async () => {
    try {
      await axios.post("/api/signin", {
        email,
        password,
      });
      console.log("sucsses");
    } catch (error) {
      alert("userName or password are not corrent");
    }
  };

  return (
    <Container>
      <Card sx={{}} onSubmit={onSubmit} component="form">
        <CardContent>
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
          <Button color="inherit" type="submit">
            Submit
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
}
