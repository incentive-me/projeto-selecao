import { Box, TextField } from "@mui/material";
import Title from "../../components/Title";
import FormContainer from "../../components/FormContainer";
import SelectBalance from "../../components/SelectBalance";
import FormButtons from "../../components/FormButtons";
import { inputStyle } from "../../styles/global.style";
import React, { useState } from "react";

export default function NewPayment(){
    const [newPayment, setNewPayment] = useState({
        name: "",
        description: "",
        amount: ""
    })
    return(
        <Box component="section">
            <Title title="Criar pedido de pagamento" />
            <FormContainer>
                <Box component="div">
                    <TextField 
                        label="Nome" 
                        sx={inputStyle}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                            setNewPayment({...newPayment, name: e.target.value})}
                    />
                    <TextField 
                        label="Descrição" 
                        sx={inputStyle}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                            setNewPayment({...newPayment, description: e.target.value})}
                    />
                    <TextField 
                        label="Valor" 
                        sx={inputStyle}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                            setNewPayment({...newPayment, amount: e.target.value})}
                    />
                    <SelectBalance />
                </Box>
                <FormButtons />
            </FormContainer>
        </Box>
    )
}