import { Box, TextField } from "@mui/material";
import Title from "../../components/Title";
import FormContainer from "../../components/FormContainer";
import FormButtons from "../../components/FormButtons";
import { useLocation } from "react-router-dom";
import { inputStyle } from "../../styles/global.style";
import React, { useState } from "react";
import { httpClient } from "../../utils/http";

export default function UpdateBalance(){
    const { state } = useLocation()
    const [ newName, setNewName ] = useState(state.balanceName)
    
    const test = { balance: state, newName}
    console.log(test)

    const handleUpdateName = () => {
        httpClient("balance", "POST", test).then(res => console.log(res)).catch(err => console.log("err", err))
        // fetch("http://localhost:3001/balance", {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify(test)
        // }).then(res => console.log("res", res)).catch(err => console.log("err", err))
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