import { Container, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <Container>
      <Typography variant="h2" fontSize={30} textAlign="center">
        Page was not found please return to home Page
      </Typography>
      <Button onClick={() => navigate("/")}>Home</Button>
    </Container>
  );
}
