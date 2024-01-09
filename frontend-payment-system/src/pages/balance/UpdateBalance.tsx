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

export default function UpdateBalance(){
    const navigate = useNavigate()
    const { state } = useLocation()
    const dispatch = useDispatch()
    const [ newName, setNewName ] = useState(state.balanceName)

    const handleUpdateName = () => {
        httpClient("balance", "PATCH", {balance: state, newName})
            .then((res) =>{ 
                dispatch(updateName(res.data))
                return navigate("/saldos")})
            .catch(err => console.log("err", err))
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
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                            setNewName(e.target.value)}
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
                />
            </FormContainer>
        </Box>
    )
}