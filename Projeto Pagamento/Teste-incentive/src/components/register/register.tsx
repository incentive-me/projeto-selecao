import { Button, Grid, Paper } from "@mui/material";
import TextField from "@mui/material/TextField";

import {
  btnstyle,
  h2Style,
  paperStyle,
  textFieldStyle,
} from "../login/styleLogin";
import { api } from "../../lib/api";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Register() {
  const Navigate = useNavigate();
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleCadastro = async () => {
    try {
      await api.post("/user", {
        user: user,
        email: email,
        password_hash: password,
      });

      alert("cadastro efetuado com sucesso");
      Navigate("/");
    } catch (error) {
      console.error("Erro no cadastro", error);
    }
  };

  return (
    <Grid alignContent={"center"}>
      <Paper elevation={10} style={paperStyle}>
        <h2 style={h2Style}> Cadastre-se </h2>
        <TextField
          label="Username"
          placeholder="Enter username"
          fullWidth
          required
          style={textFieldStyle}
          onChange={(e) => setUser(e.target.value)}
        />

        <TextField
          label="email"
          placeholder="Enter email"
          fullWidth
          required
          style={textFieldStyle}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          placeholder="Enter password"
          type="password"
          fullWidth
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          type="submit"
          color="primary"
          variant="contained"
          style={btnstyle}
          fullWidth
          onClick={handleCadastro}
        >
          Sign in
        </Button>
      </Paper>
    </Grid>
  );
}
