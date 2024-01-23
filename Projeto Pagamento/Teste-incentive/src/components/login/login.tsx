import { ChangeEvent, useState } from "react";
import {
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { api } from "../../lib/api";
import { btnstyle, h2Style, paperStyle, textFieldStyle } from "./styleLogin";

export default function Login() {
  const loginNavigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newEmail = event.target.value;
    setEmail(newEmail);
  };

  const handleLogin = async () => {
    try {
      const response = await api.post("/login", {
        email: email,
        senha: password,
      });

      if (response.status == 201) {
        const data = await response.data;
        const authToken = data.token;

        Cookies.set("authToken", authToken, { expires: 7 });

        loginNavigate("/home");
      } else {
        console.error("Erro no login:", response.statusText);
      }
    } catch (error) {
      console.error("Erro no login:", error);
    }
  };

  return (
    <Grid alignContent={"center"}>
      <Paper elevation={10} style={paperStyle}>
        <Typography style={h2Style}>Login</Typography>

        <TextField
          label="E-mail"
          placeholder="Enter email"
          fullWidth
          required
          style={textFieldStyle}
          value={email}
          onChange={handleEmailChange}
        />
        <TextField
          label="Password"
          placeholder="Enter password"
          type="password"
          fullWidth
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <FormControlLabel
          control={<Checkbox name="checkedB" color="primary" />}
          label="Remember me"
        />
        <Button
          type="submit"
          color="primary"
          variant="contained"
          style={btnstyle}
          fullWidth
          onClick={handleLogin}
        >
          Login
        </Button>
        <Typography>
          Não tem uma conta ?<Link to="/register">Crie uma conta</Link>
        </Typography>
      </Paper>
    </Grid>
  );
}
