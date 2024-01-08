import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Box, Button, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from 'axios'

export default function Login(){
    const [showPassword, setShowPassword] = React.useState(false);
    const [loginData, setLoginData] = useState({
        email: "",
        password: ""
    })
    const user = false

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const login = async () => {
        const req = await axios.post("http://localhost:3001/login", loginData,
            { headers: { 'Content-Type': 'application/json' }})

        if (req.data) {
            localStorage.setItem("paymentToken", req.data)
        }
        return req.data
    }

    if (user) {
        return <Navigate to="/pagamentos" replace={true} />
      }

    return(
        <Box 
            component="section" 
            display='flex'
            flexDirection="column"
            alignItems="center"
            paddingTop="100px"
        >
        <Typography paddingBottom="20px" variant="h4" component="h2">Payment System</Typography>
        <Typography paddingBottom="20px" color="#556cd6" variant="h4" component="h4">Entrar</Typography>
        <TextField
            label="Email"
            sx={{ m: 1, width: '35ch' }}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                setLoginData({...loginData, email: e.target.value})}
        />
        <TextField
                label="Senha"
                sx={{ m: 1, width: '35ch' }}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                    setLoginData({...loginData, password: e.target.value})}
                type={showPassword ? 'text' : 'password'}
                InputProps={{
                    endAdornment: 
                    <InputAdornment position="end">
                        <IconButton
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                        >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
              </InputAdornment>,
            }}
        />
        <Button 
            sx={{ m: 1, width: '40ch' }}
            variant="contained" 
            onClick={login}
            disabled={false}
        >Entrar</Button>
        <Typography paddingTop="30px" variant="body1" component="h5">Não tem uma conta?</Typography>
        <Link to="/registrar">
            <Button sx={{ m: 1, width: '40ch' }} variant="outlined">Registrar</Button>
        </Link>
    </Box>
    )
}