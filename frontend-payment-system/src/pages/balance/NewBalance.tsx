import { Box, TextField } from "@mui/material";
import Title from "../../components/Title";
import FormContainer from "../../components/FormContainer";
import FormButtons from "../../components/FormButtons";
import { httpClient } from "../../utils/http";
import React, { useState } from "react";
import { inputStyle } from "../../styles/global.style";
import { useDispatch } from "react-redux";
import { createBalance } from "../../redux/balance.slice";
import { useNavigate } from "react-router-dom";

export default function NewBalance(){
    const [ balance, setBalance ] = useState(initialBalance)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleCreateBalance = () => {
        httpClient("balance", "POST", balance)
            .then((res) => dispatch(createBalance(res.data)))
            return navigate("/saldos")
    }

    return(
        <Box component="section">
            <Title title="Criar novo saldo" />
            <FormContainer>
                <Box component="div">
                    <TextField 
                        label="Nome" 
                        sx={inputStyle}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setBalance({...balance, balanceName: e.target.value})
                        }}
                    />
                    <TextField 
                        label="Descrição" 
                        sx={inputStyle}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setBalance({...balance, description: e.target.value})
                        }}
                    />
                    <TextField 
                        label="Valor" 
                        sx={inputStyle}
                        type="number"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setBalance({...balance, amount: Number(e.target.value)})
                        }}
                    />
                </Box>
                <FormButtons 
                    path="/saldos" 
                    textButton="criar"
                    onClick={handleCreateBalance}
                />
            </FormContainer>
        </Box>
    )
}

const initialBalance = {
    balanceName: "",
    description: "",
    amount: 0,
}