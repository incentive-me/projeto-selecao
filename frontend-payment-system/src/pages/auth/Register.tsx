import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Navigate, redirect, useNavigate } from "react-router-dom";
import { Box, Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField, Typography } from "@mui/material";
import React from "react";

export default function Register(){
    const user = true
    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

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
            id="outlined-start-adornment"
            margin="normal" 
            sx={{ m: 1, width: '35ch' }}
        />
        <TextField
            label="Email"
            id="outlined-start-adornment"
            margin="normal" 
            sx={{ m: 1, width: '35ch' }}
        />
        <TextField
                label="Senha"
                sx={{ m: 1, width: '35ch' }}
                id="outlined-start-password"
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
            disabled={true}
        >Registrar</Button>
        <Button sx={{ m: 1, width: '40ch' }}>Voltar</Button>
    </Box>
    )
}