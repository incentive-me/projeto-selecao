import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Box, Button, IconButton, InputAdornment, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from 'axios'
import { useDispatch, useSelector } from "react-redux";
import { fecthUser } from "../../redux/user.slice";
import { RootState } from "../../redux/store";
import { ErrorMessage, initialStateErrMessage } from "../balance/NewBalance";
import { baseUrl } from "../../utils/http";

export default function Login(){
    const [showPassword, setShowPassword] = React.useState(false);
    const [loginData, setLoginData] = useState({
        email: "",
        password: ""
    })
    const dispatch = useDispatch()
    const user = useSelector((state: RootState) => state.user.user)
    const [err, setErr] = useState<ErrorMessage>(initialStateErrMessage)

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const login = () => {
        axios.post(`${baseUrl}/login`, loginData,
            { headers: { 'Content-Type': 'application/json' }})
            .then((res) => {
                localStorage.setItem("paymentsToken", res.data.token)
                dispatch(fecthUser(res.data.user))
            }).catch((err) => {
                const error = err.response.data.error
                 setErr({field: "login", message: "Email ou senha incorretos"})
            })
    }

    if (user.name !== "") {
        return <Navigate to="/pagamentos" replace={true} />
      }

    return(
        <Box sx={style}>
            <Typography paddingBottom="20px" variant="h4" component="h2">
                Payment System
            </Typography>
            <Typography paddingBottom="20px" color="#556cd6" variant="h4" component="h4">
                Entrar
            </Typography>
            <TextField
                label="Email"
                sx={{ m: 1, width: '35ch' }}
                error={err.field === "login"}
                        helperText={err.field === "login" && err.message}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setErr(initialStateErrMessage)
                    setLoginData({...loginData, email: e.target.value})}}
            />
            <TextField
                    label="Senha"
                    sx={{ m: 1, width: '35ch' }}
                    error={err.field === "login"}
                        helperText={err.field === "login" && err.message}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setErr(initialStateErrMessage)
                        setLoginData({...loginData, password: e.target.value})}}
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
                >Entrar</Button>
                <Typography paddingTop="30px" variant="body1" component="h5">
                    Não tem uma conta?
                </Typography>
                <Link to="/registrar">
                    <Button sx={{ m: 1, width: '40ch' }} variant="outlined">Registrar</Button>
                </Link>
            </Box>
    )
}

const style = {
    component: "section" ,
    display: 'flex',
    flexDirection: "column",
    alignItems: "center",
    paddingTop: "100px"
}