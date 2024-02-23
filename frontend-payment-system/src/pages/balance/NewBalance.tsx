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
import { errorBalanceMessage } from "../../utils/balanceErrorMessages";

export default function NewBalance(){
    const [ balance, setBalance ] = useState(initialBalance)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [err, setErr] = useState<ErrorMessage>(initialStateErrMessage)

    const handleCreateBalance = () => {
        setLoading(true)
        httpClient("balance", "POST", balance)
            .then((res) => {
                dispatch(createBalance(res.data))
                setLoading(false)
                return navigate("/saldos", {
                    state: {
                        message: "Saldo criado com sucesso",
                        open: true
                    }
                })
            }).catch((err) => {
                const error = err.response.data.error
                setErr(errorBalanceMessage(error))
                setLoading(false)
            })
    }

    return(
        <>
        <Box component="section">
            <Title title="Criar novo saldo" />
            <FormContainer>
                <Box component="div">
                    <TextField 
                        label="Nome" 
                        error={err.field === "name"}
                        helperText={err.field === "name" && err.message}
                        sx={inputStyle}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setBalance({...balance, balanceName: e.target.value})
                            setErr(initialStateErrMessage)
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
                        error={err.field === "amount"}
                        helperText={err.field === "amount" && err.message}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setBalance({...balance, amount: Number(e.target.value)})
                            setErr(initialStateErrMessage)
                        }}
                    />
                </Box>
                <FormButtons 
                    path="/saldos" 
                    textButton="criar"
                    onClick={handleCreateBalance}
                    disabled={loading}
                />
            </FormContainer>
        </Box>
        </>
    )
}

const initialBalance = {
    balanceName: "",
    description: "",
    amount: 0,
}

export type ErrorMessage = {
    field: string, 
    message: string
}

export const initialStateErrMessage = {
    field: "", 
    message: ""
}
