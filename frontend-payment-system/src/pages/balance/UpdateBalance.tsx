import { Box, TextField } from "@mui/material";
import Title from "../../components/Title";
import FormContainer from "../../components/FormContainer";
import FormButtons from "../../components/FormButtons";
import { useLocation, useNavigate } from "react-router-dom";
import { inputStyle } from "../../styles/global.style";
import React, { useState } from "react";
import { httpClient } from "../../utils/http";
import { useDispatch } from "react-redux";
import { updateName } from "../../redux/balance.slice";
import { ErrorMessage, initialStateErrMessage } from "./NewBalance";
import { errorBalanceMessage } from "../../utils/balanceErrorMessages";

export default function UpdateBalance(){
    const navigate = useNavigate()
    const { state } = useLocation()
    const dispatch = useDispatch()
    const [ newName, setNewName ] = useState(state.balanceName)
    const [loading, setLoading] = useState(false)
    const [err, setErr] = useState<ErrorMessage>(initialStateErrMessage)

    const handleUpdateName = () => {
        setLoading(true)
        httpClient("balance", "PATCH", {balance: state, newName})
            .then((res) =>{ 
                dispatch(updateName(res.data))
                setLoading(false)
                return navigate("/saldos", {
                    state: {
                        message: "Nome do saldo atualizado com sucesso",
                        open: true
                    }
                })})
            .catch(err => {
                const error = err.response.data.error
                setErr(errorBalanceMessage(error))
                setLoading(false)
            })
    }

    return(
        <Box component="section">
            <Title title="Editar saldo" />
            <FormContainer>
                <Box component="div">
                    <TextField 
                        label="Nome" 
                        sx={inputStyle}
                        value={newName}
                        error={err.field === "name"}
                        helperText={err.field === "name" && err.message}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setNewName(e.target.value)
                            setErr(initialStateErrMessage)
                        }}
                    />
                    <TextField 
                        disabled={true} 
                        label="Valor"
                        sx={inputStyle}
                        defaultValue={state.totalValue}
                    />
                </Box>
                <FormButtons 
                    path="/saldos" 
                    textButton="salvar" 
                    onClick={handleUpdateName} 
                    disabled={loading}
                />
            </FormContainer>
        </Box>
    )
}