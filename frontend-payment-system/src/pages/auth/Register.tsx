import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Link, Navigate } from "react-router-dom";
import { Box, Button, IconButton, InputAdornment, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { fecthUser } from "../../redux/user.slice";
import { ErrorMessage, initialStateErrMessage } from "../balance/NewBalance";
import { errorRegisterMessage } from "../../utils/registerErrorMessages";
import { verifyPassword } from "../../utils/verifyPassword";

export default function Register(){
    const [showPassword, setShowPassword] = React.useState(false);
    const [resgisterData, setRegisterData] = useState<RegisterDataState>({
        name: "", 
        email: "", 
        password: ""
    })
    const dispatch = useDispatch()
    const user = useSelector((state: any) => state.user.user)
    const [err, setErr] = useState<ErrorMessage>(initialStateErrMessage)
    
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };
    
    const handleRegister = () => {
        const verify = verifyPassword(resgisterData)
        if(verify.field !== "") {
            return setErr(verify)
        }
        axios.post("http://localhost:3001/user", resgisterData, 
            { headers: { 'Content-Type': 'application/json' }})
                .then((res) => {
                    localStorage.setItem("paymentsToken", res.data.token)
                    dispatch(fecthUser(res.data.user))
                }).catch((err) => {
                    const error = err.response.data.error
                     setErr(errorRegisterMessage(error))
                })
                
        }
        
    if (user.name !== "") {
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
            error={err.field === "name"}
            helperText={err.field === "name" && err.message}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setErr(initialStateErrMessage)
                setRegisterData({...resgisterData, name: e.target.value})}}
            sx={{ m: 1, width: '35ch' }}
        />
        <TextField
            label="Email"
            error={err.field === "email"}
            helperText={err.field === "email" && err.message}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setErr(initialStateErrMessage)
                setRegisterData({...resgisterData, email: e.target.value})}}
            sx={{ m: 1, width: '35ch' }}
        />
        <TextField
                label="Senha"
                error={err.field === "password"}
                helperText={err.field === "password" && err.message}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setErr(initialStateErrMessage)
                    setRegisterData({...resgisterData, password: e.target.value})}}
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
            onClick={handleRegister}
            disabled={false}
        >Registrar</Button>
        <Link to="/entrar">
            <Button sx={{ m: 1, width: '40ch' }}>Voltar</Button>
        </Link>
    </Box>
    )
}

export type RegisterDataState = {
    name: string, 
    email: string, 
    password: string
}