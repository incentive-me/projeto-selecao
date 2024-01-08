import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Link, Navigate } from "react-router-dom";
import { Box, Button, IconButton, InputAdornment, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import axios, { AxiosError, AxiosResponse } from "axios";

export default function Register(){
    const user = false
    const [showPassword, setShowPassword] = React.useState(false);
    const [resgisterData, setRegisterData] = useState({
        name: "", 
        email: "", 
        password: ""
    })

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const register = async () => {
            const res: any = await axios.post("http://localhost:3001/user",resgisterData, 
            { headers: { 'Content-Type': 'application/json' }})
            
            console.log(res)
        
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
        <Typography paddingBottom="20px" color="#556cd6" variant="h4" component="h4">Registrar</Typography>
        <TextField
            label="Nome"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                setRegisterData({...resgisterData, name: e.target.value})}
            sx={{ m: 1, width: '35ch' }}
        />
        <TextField
            label="Email"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                setRegisterData({...resgisterData, email: e.target.value})}
            sx={{ m: 1, width: '35ch' }}
        />
        <TextField
                label="Senha"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                    setRegisterData({...resgisterData, password: e.target.value})}
                sx={{ m: 1, width: '35ch' }}
                type={showPassword ? 'text' : 'password'}
                InputProps={{
                    endAdornment: 
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
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
            onClick={register}
            disabled={false}
        >Registrar</Button>
        <Link to="/entrar">
            <Button sx={{ m: 1, width: '40ch' }}>Voltar</Button>
        </Link>
    </Box>
    )
}